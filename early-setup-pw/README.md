# Login theme: portal-pid

Menyamakan halaman login Keycloak (Update password, Sign in, Forgot password, OTP, dll.) dengan desain Portal.
Terang/gelap otomatis mengikuti pengaturan browser atau perangkat.

## Pasang
1. Salin folder `portal-pid` ke folder `themes` Keycloak, hasilnya `...\keycloak\themes\portal-pid\login\...`.
2. Mode dev (`kc.bat start-dev`): cache tema nonaktif, cukup refresh. Mode produksi: restart Keycloak.
3. Admin console, Realm settings, tab Themes, Login theme: pilih `portal-pid`, lalu Save.

## Catatan
* Nama yang tampil di atas kartu diambil dari Realm settings, General, Display name (bisa diganti, misal "Company Portal").
* `theme.properties` memakai `parent=keycloak` dan `styles=css/login.css css/portal.css`. Jika tampilan tidak berubah atau
  berantakan, cocokkan baris `styles` itu dengan `theme.properties` tema `keycloak` bawaan versi Anda.
* `preview.html` hanya tiruan statis untuk melihat gaya tanpa Keycloak; tampilan asli bisa sedikit berbeda.
* Belum diuji pada server Keycloak asli (versi Anda belum saya ketahui; gaya ditulis untuk markup PatternFly 4 seperti di screenshot).
