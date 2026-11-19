<#
Sortir file PDF di setiap folder tanggal scan ke subfolder berdasarkan kode pekerjaan.

Contoh:
  .\Sort-ScanByJobCode.ps1 -RootPath 'D:\SCAN\AR INVOICE'           # simulasi
  .\Sort-ScanByJobCode.ps1 -RootPath 'D:\SCAN\AR INVOICE' -Apply   # jalankan

Atur daftar kode pada parameter -JobCodes agar sesuai kode yang dipakai.
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$RootPath,

    [string[]]$JobCodes = @('BM', 'PBK'),

    [switch]$Apply
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $RootPath -PathType Container)) {
    throw "Folder tidak ditemukan: $RootPath"
}

$root = (Resolve-Path -LiteralPath $RootPath).Path
$codeAlternation = ($JobCodes | ForEach-Object { [regex]::Escape($_) }) -join '|'
if ([string]::IsNullOrWhiteSpace($codeAlternation)) {
    throw 'Daftar JobCodes kosong.'
}

# Folder tanggal yang diterima: 12-10-2026 atau 12_10_2026.
$dateFolderPattern = '^\d{1,2}[-_]\d{1,2}[-_]\d{4}$'
$dateFolders = Get-ChildItem -LiteralPath $root -Directory -Recurse |
    Where-Object { $_.Name -match $dateFolderPattern }

if (-not $dateFolders) {
    Write-Warning "Tidak ditemukan folder tanggal di bawah: $root"
    return
}

foreach ($dateFolder in $dateFolders) {
    # Hanya file yang langsung berada di folder tanggal; folder kode yang sudah ada tidak diproses lagi.
    $files = Get-ChildItem -LiteralPath $dateFolder.FullName -File -Filter '*.pdf'
    foreach ($file in $files) {
        # Kode harus berupa token tersendiri: BM cocok pada 'Nama BM File.pdf',
        # tetapi tidak cocok pada 'BMA' atau 'XBM'.
        $matches = [regex]::Matches($file.BaseName, "(?i)(?<![A-Z0-9])($codeAlternation)(?![A-Z0-9])")
        $codesFound = @($matches | ForEach-Object { $_.Groups[1].Value.ToUpperInvariant() } | Select-Object -Unique)

        if ($codesFound.Count -eq 0) {
            Write-Host "LEWATI (kode tidak dikenali): $($file.FullName)" -ForegroundColor Yellow
            continue
        }
        if ($codesFound.Count -gt 1) {
            Write-Host "LEWATI (lebih dari satu kode: $($codesFound -join ', ')): $($file.FullName)" -ForegroundColor Red
            continue
        }

        $destinationFolder = Join-Path $dateFolder.FullName $codesFound[0]
        $destination = Join-Path $destinationFolder $file.Name
        if (Test-Path -LiteralPath $destination) {
            Write-Host "LEWATI (file tujuan sudah ada): $destination" -ForegroundColor Red
            continue
        }

        if ($Apply) {
            New-Item -ItemType Directory -Path $destinationFolder -Force | Out-Null
            Move-Item -LiteralPath $file.FullName -Destination $destination
            Write-Host "PINDAH: $($file.Name) -> $($codesFound[0])\" -ForegroundColor Green
        }
        else {
            Write-Host "SIMULASI: $($file.FullName) -> $destination"
        }
    }
}

if (-not $Apply) {
    Write-Host "`nIni baru simulasi. Periksa hasilnya, lalu tambahkan -Apply untuk memindahkan file." -ForegroundColor Cyan
}
