# GLPI-Test dan Portal PID

Konfigurasi ini memakai container GLPI-Test yang sudah ada, bukan membuat instance GLPI kedua. Data aplikasi GLPI berada di volume Docker milik container tersebut; database MariaDB tetap di `glpi-db-1`.

## Cara menyalakan untuk portal Vercel

1. Buka Docker Desktop. Aktifkan **Start Docker Desktop when you sign in** di pengaturan General.
2. Jalankan `Start-Helpdesk-Stack.cmd` di folder ini. Script menyalakan GLPI-Test, Keycloak, MariaDB, proxy, dan ngrok.
3. Buka portal Production: `https://portal-pid-app.vercel.app`.

Alamat ngrok menggunakan dev domain akun yang tetap. Ngrok meneruskan ke proxy lokal `127.0.0.1:32770`; proxy, GLPI-Test, dan worker sinkronisasi memakai jaringan API khusus dengan IP tetap `172.30.77.3` (proxy), `172.30.77.2` (GLPI), dan `172.30.77.4` (worker). API client GLPI cukup mengizinkan IP proxy tersebut, sehingga perubahan IP container pada jaringan Docker umum tidak memutus API. Port host GLPI yang acak tidak digunakan portal.

GLPI-Test, Keycloak, MariaDB, dan proxy memakai restart policy `unless-stopped`. Docker Desktop akan menyalakannya kembali setelah engine hidup. Ngrok berjalan sebagai agent lokal dan perlu dijalankan lagi sesudah restart Windows; gunakan script di atas. Script memastikan GLPI-Test terhubung kembali ke jaringan API statis. Script tidak menyimpan token ngrok atau GLPI.

## Rute gateway

- `https://<dev-domain-ngrok>/realms/portal-pid/*` diteruskan ke endpoint realm publik Keycloak.
- `https://<dev-domain-ngrok>/resources/*` diteruskan hanya untuk memuat aset statis tema login Keycloak (JavaScript, CSS, font, dan gambar); rute admin Keycloak tetap diblokir.
- `https://<dev-domain-ngrok>/apirest.php/*` diteruskan ke GLPI-Test dan mewajibkan header `X-GLPI-Tunnel-Key`.
- Halaman admin GLPI, konsol admin Keycloak, dan rute lain mengembalikan 404.
- `GLPI_USER_TOKEN` dan `GLPI_APP_TOKEN` tetap disimpan sebagai Secret server-side di Vercel.
- Cloudflare Quick Tunnel tidak diperlukan untuk konfigurasi ini karena URL-nya berubah ketika tunnel dibuat ulang.

## Port lokal

- Proxy API dan SSO: `http://127.0.0.1:32770` (tetap; port 32769 dipakai layanan lain di mesin ini).
- Jaringan API khusus: proxy `172.30.77.3`, GLPI-Test `172.30.77.2`.
- GLPI-Test UI saat ini: `http://localhost:32769` (pemetaan Docker saat container dibuat; tidak berubah saat stop/start biasa).
- Keycloak lokal: `http://localhost:8080`.
- MariaDB tidak dipublikasikan ke host; aksesnya tetap di jaringan Docker.

Jika container GLPI-Test dihapus dan dibuat ulang, pertahankan volume `/var/glpi` dan jaringan `glpi_default`, serta nama container `GLPI-Test`. Proxy memakai nama tersebut agar tidak perlu mengubah alamat API karena port host.

## Database

`docker compose down` menghentikan/menghapus container Compose tetapi mempertahankan volume database. Jangan memakai `docker compose down --volumes` kecuali memang ingin menghapus database uji secara permanen. File `.env` berisi kredensial lokal dan kunci gateway; jangan dibagikan.

## Sinkronisasi user Keycloak → GLPI

Worker lokal opsional dapat mencatat user dari realm `portal-pid` ke GLPI-Test. Worker memeriksa user aktif yang memiliki email setiap 60 detik, mencocokkan email secara case-insensitive, lalu membuat user GLPI jika belum ada. Akun service Keycloak dan user tanpa email dilewati. Worker tidak menyalin password, tidak mengubah atau menghapus akun GLPI yang sudah ada, dan tidak membuat token per user.

Pada peluncuran pertama, perilaku bawaan hanya menyimpan baseline akun Keycloak yang sudah ada; worker tidak mengimpor akun lama secara massal. User yang dibuat setelah itu akan disinkronkan. Jika ingin memasukkan akun lama juga, set `SYNC_IMPORT_EXISTING=true` sebelum menjalankan worker untuk pertama kali.

Aktivasi memerlukan dua kredensial layanan:

1. Di realm `portal-pid`, buat client confidential `glpi-user-sync`, aktifkan service account, lalu beri service account peran `query-users` dan `view-users` dari client `realm-management`. Worker hanya membaca user Keycloak. Simpan Client Secret.
2. Di GLPI-Test, gunakan akun API khusus sinkronisasi. Izinkan API client menggunakannya dan berikan hak baca/cari, membuat, serta memperbarui user. Jangan gunakan Super-Admin. Ambil user token akun itu; App-Token hanya diperlukan jika API client mewajibkannya. Worker melewati proxy API lokal `172.30.77.3`, sehingga alamat itulah yang perlu diizinkan oleh API client.
3. Salin kunci sinkronisasi dari `user-sync/.env.example` ke `.env` lokal di folder ini, lalu isi Client Secret dan token GLPI. `GLPI_TUNNEL_KEY` yang sudah ada di `.env` tetap digunakan—jangan hapus atau ganti nilainya. Jangan kirim nilai rahasia melalui chat.
4. Jalankan `Start-Helpdesk-Stack.cmd`. Jika ketiga nilai wajib tersedia, worker akan berjalan sebagai container Docker. User baru biasanya tercatat di GLPI dalam satu menit. Status pemrosesan disimpan di folder `user-sync-state` agar restart tidak membuat duplikat.

Worker menggunakan jaringan Docker lokal ke Keycloak dan melewati proxy API GLPI yang sudah ada; ia tidak menambah endpoint publik. User yang dibuat tidak memiliki password GLPI; proses login tetap menggunakan Keycloak dan portal. Pencocokan awal menggunakan email dan username hanya untuk menghubungkan akun; setelah itu relasi Keycloak ID ke GLPI ID disimpan di volume state supaya perubahan First name dan Last name memperbarui akun GLPI yang sama. Email, username, dan atribut profil lain tidak diubah. Sinkronisasi belum membuat relasi requester pada tiket lama.
