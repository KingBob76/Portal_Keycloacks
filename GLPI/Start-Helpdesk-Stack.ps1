$ErrorActionPreference = 'Stop'
$workspace = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $workspace

$dockerReady = $false
for ($attempt = 0; $attempt -lt 30; $attempt++) {
    & docker info *> $null
    if ($LASTEXITCODE -eq 0) {
        $dockerReady = $true
        break
    }
    Start-Sleep -Seconds 2
}
if (-not $dockerReady) {
    throw 'Docker Desktop belum siap. Buka Docker Desktop, tunggu sampai Running, lalu jalankan script lagi.'
}

& docker start GLPI-Test portal-pid-keycloak
if ($LASTEXITCODE -ne 0) {
    throw 'GLPI-Test atau Keycloak tidak dapat dinyalakan.'
}

& docker compose --profile quick-tunnel up -d db glpi-api-proxy
if ($LASTEXITCODE -ne 0) {
    throw 'Database atau proxy gateway tidak dapat dinyalakan.'
}

$glpiNetworks = (& docker inspect GLPI-Test --format '{{json .NetworkSettings.Networks}}' | ConvertFrom-Json)
$apiNetwork = $glpiNetworks.PSObject.Properties | Where-Object { $_.Name -eq 'glpi-api-static' } | Select-Object -First 1
if (-not $apiNetwork) {
    & docker network connect --ip 172.30.77.2 glpi-api-static GLPI-Test
    if ($LASTEXITCODE -ne 0) {
        throw 'GLPI-Test tidak dapat dihubungkan ke jaringan API statis.'
    }
} elseif ($apiNetwork.Value.IPAddress -ne '172.30.77.2') {
    throw "IP GLPI-Test pada jaringan API statis tidak sesuai: $($apiNetwork.Value.IPAddress)"
}

$ngrokPath = (Get-Command ngrok.exe -ErrorAction SilentlyContinue).Source
if (-not $ngrokPath) {
    $fallbackNgrok = 'C:\laragon\bin\ngrok\ngrok.exe'
    if (Test-Path -LiteralPath $fallbackNgrok) {
        $ngrokPath = $fallbackNgrok
    }
}
if (-not $ngrokPath) {
    throw 'ngrok.exe tidak ditemukan. Pastikan ngrok terpasang dan tersedia di PATH.'
}

$inspectorUrl = 'http://127.0.0.1:4040/api/tunnels'
$tunnels = $null
try {
    $tunnels = (Invoke-RestMethod -Uri $inspectorUrl -TimeoutSec 2).tunnels
} catch {
    $tunnels = $null
}

$activeTunnel = $tunnels | Where-Object { $_.config.addr -match ':32770$' } | Select-Object -First 1
if (-not $activeTunnel) {
    $runningNgrok = Get-Process ngrok -ErrorAction SilentlyContinue
    if ($runningNgrok) {
        throw 'Ngrok sudah berjalan ke target lain. Hentikan tunnel tersebut, lalu jalankan script ini lagi.'
    }

    Start-Process -FilePath $ngrokPath -ArgumentList @('http', '32770') -WindowStyle Hidden
    for ($attempt = 0; $attempt -lt 20; $attempt++) {
        Start-Sleep -Seconds 1
        try {
            $tunnels = (Invoke-RestMethod -Uri $inspectorUrl -TimeoutSec 2).tunnels
            $activeTunnel = $tunnels | Where-Object { $_.config.addr -match ':32770$' } | Select-Object -First 1
        } catch {
            $activeTunnel = $null
        }
        if ($activeTunnel) { break }
    }
}

if (-not $activeTunnel) {
    throw 'Ngrok belum siap. Periksa akun/auth token ngrok, lalu jalankan script lagi.'
}

Write-Host "Backend siap. Ngrok: $($activeTunnel.public_url) -> $($activeTunnel.config.addr)"
Write-Host 'Portal: https://portal-pid-app.vercel.app'

# Start Keycloak ke GLPI user provisioning only after its service credentials are
# configured locally. Do not print credential values to the terminal.
$syncKeys = @('KEYCLOAK_SYNC_CLIENT_ID', 'KEYCLOAK_SYNC_CLIENT_SECRET', 'GLPI_SYNC_USER_TOKEN', 'GLPI_TUNNEL_KEY')
$localEnv = Join-Path $workspace '.env'
$syncValues = @{}
if (Test-Path -LiteralPath $localEnv) {
    foreach ($line in Get-Content -LiteralPath $localEnv) {
        if ($line -match '^\s*([^#=]+)=(.*)$') {
            $syncValues[$Matches[1].Trim()] = $Matches[2].Trim().Trim('"').Trim("'")
        }
    }
}
$syncConfigured = @($syncKeys | Where-Object { [string]::IsNullOrWhiteSpace($syncValues[$_]) }).Count -eq 0
if ($syncConfigured) {
    & docker compose --profile user-sync up -d --force-recreate glpi-keycloak-user-sync
    if ($LASTEXITCODE -ne 0) {
        throw 'Sinkronisasi user Keycloak ke GLPI tidak dapat dinyalakan.'
    }
    Write-Host 'Sinkronisasi user Keycloak ke GLPI aktif.'
} else {
    Write-Host 'Sinkronisasi user belum dikonfigurasi. Lengkapi variabel layanan di .env untuk mengaktifkannya.'
}
