/* ====== EDIT ME: link targets and sample content ====== */
const CONFIG = {
  newTab: true, // true: each app opens in a new tab; false: it replaces this page
  apps: [
    { name: "Manual Book", badge: "Available", type: "Application", icon: "book", cta: "Open App",
      desc: "Buka portal dokumentasi dan panduan penggunaan aplikasi internal.", url: "https://manual.example.com" },
    { name: "Ticketing", badge: "Support", type: "Helpdesk", icon: "ticket", cta: "Open App",
      desc: "Laporkan masalah atau trouble ke tim IT melalui aplikasi ticketing.", url: "https://ticketing.example.com" },
    { name: "Portal", badge: "Active", type: "Application", icon: "globe", cta: "Open App",
      desc: "Menuju portal perusahaan yang sudah ada untuk berita, layanan, dan tautan penting.", url: "https://portal.example.com" }
  ],
  announcements: [
    { tag: "Maintenance", tone: "warn", date: "20 Okt 2026", by: "Divisi IT",
      title: "Maintenance jaringan kantor pusat, Sabtu 24 Okt 22:00 sampai 02:00 WIB",
      body: "Akses internet, VPN, dan aplikasi internal dapat terputus sementara. Simpan pekerjaan Anda sebelum jadwal dimulai." },
    { tag: "Security", tone: "", date: "19 Okt 2026", by: "Divisi IT",
      title: "Kebijakan password baru berlaku mulai 1 November 2026",
      body: "Password minimal 12 karakter. Ubah password Anda lewat Account settings, bagian Sign in." },
    { tag: "Info", tone: "", date: "15 Okt 2026", by: "Divisi IT",
      title: "Aplikasi Manual Book sudah memuat panduan VPN terbaru",
      body: "Buka Applications, lalu Manual Book, untuk melihat langkah koneksi dari rumah." }
  ],
  birthdays: [
    { name: "Dewi Anggraini", unit: "Finance" },
    { name: "Rizky Pratama", unit: "IT Infrastructure" },
    { name: "Maya Lestari", unit: "Human Resources" }
  ],
  providers: [["google", "Google"], ["microsoft", "Microsoft"], ["github", "GitHub"]]
};

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const ic = n => `<svg class="i" aria-hidden="true"><use href="#i-${n}"/></svg>`;

const S = {
  view: "applications", mode: "grid", tab: "signin", theme: "auto", pwOpen: false, pwChanged: "3 bulan lalu",
  twofa: true, authapp: false,
  p: { user: "arya.wangsa", email: "arya.wangsa@company.co.id", first: "Arya", last: "Wangsa", bio: "", photo: null },
  sessions: [
    { id: 1, dev: "Windows PC, Chrome", loc: "Jakarta", ip: "103.20.xx.12", last: "Aktif sekarang", ic: "monitor", cur: true },
    { id: 2, dev: "iPhone, Safari", loc: "Jakarta", ip: "114.5.xx.40", last: "2 jam lalu", ic: "phone" },
    { id: 3, dev: "macOS, Firefox", loc: "Bandung", ip: "36.71.xx.8", last: "Kemarin", ic: "monitor" }
  ],
  links: { google: true, microsoft: false, github: false }
};
const NAV = [["applications","grid","Applications"],["information","info","Information"],["profile","user","Public profile"],["account","shield","Account settings"]];

const fullName = () => `${S.p.first} ${S.p.last}`.trim() || S.p.user;
const avatar = () => S.p.photo ? `<img src="${S.p.photo}" alt="">` : esc((S.p.first || S.p.user || "A").charAt(0).toUpperCase());
const initial = n => esc(n.charAt(0).toUpperCase());

const seg = (act, cur, items) => `<div class="seg" role="group">${items.map(([v, i, l]) =>
  `<button data-act="${act}" data-v="${v}" class="${cur === v ? "on" : ""}" aria-pressed="${cur === v}">${i ? ic(i) : ""}${l}</button>`).join("")}</div>`;
const head = (t, sub, right = "") => `<div class="top"><div><h1>${t}</h1><p class="sub">${sub}</p></div>${right}</div>`;

const V = {
  applications() {
    const cards = CONFIG.apps.map(a => `<a class="card app" href="${a.url}" target="${CONFIG.newTab ? "_blank" : "_top"}" rel="noopener" aria-label="Buka ${a.name}"><div class="tile">${ic(a.icon)}</div><div class="bd">
      <div class="hd"><h3>${a.name}</h3><span class="badge">${a.badge}</span></div><p>${a.desc}</p>
      <div class="ft"><span>${a.type}</span><span class="cta">${a.cta} ${ic("ext")}</span></div></div></a>`).join("");
    return head("Applications", "Aplikasi yang dapat diakses oleh akun ini berdasarkan permission dan client yang tersedia di Keycloak.",
      seg("mode", S.mode, [["list", "list", "List"], ["grid", "grid", "Grid"]])) +
      `<div class="grid ${S.mode === "list" ? "list" : ""}">${cards}</div>`;
  },
  information() {
    const d = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const ann = CONFIG.announcements.length ? CONFIG.announcements.map(n => `<div class="row"><div>
      <div class="meta"><span class="badge ${n.tone}">${n.tag}</span><span>${n.date}, ${n.by}</span></div>
      <h4>${n.title}</h4><p>${n.body}</p></div></div>`).join("") : `<p class="empty">Belum ada pengumuman dari divisi IT.</p>`;
    const bd = CONFIG.birthdays.length ? CONFIG.birthdays.map((b, i) => `<div class="row"><div class="dev"><span class="av" style="width:42px;height:42px;border-radius:12px;font-size:16px">${initial(b.name)}</span>
      <div><b>${b.name}</b><p class="hint">${b.unit}</p></div></div><button class="btn" data-act="wish" data-i="${i}">Send wishes</button></div>`).join("")
      : `<p class="empty">Tidak ada yang berulang tahun hari ini.</p>`;
    return head("Information", "Pengumuman dari divisi IT dan informasi harian untuk seluruh karyawan.") +
      `<section class="panel"><h2>${ic("mega")} Announcement</h2>${ann}</section>
       <section class="panel"><h2>${ic("cake")} Birthday Today <span class="muted">${d}</span></h2>${bd}</section>`;
  },
  profile() {
    const p = S.p;
    return head("Public profile", "Informasi yang ditampilkan kepada rekan kerja di dalam organisasi.") +
      `<section class="panel"><div class="pic"><div class="av big">${avatar()}</div><div>
        <div class="acts" style="margin-top:0"><label class="btn" style="display:inline-flex;color:var(--ink)">${ic("up")} Change picture<input id="photo" type="file" accept="image/*" hidden></label>
        <button class="btn d" data-act="delPhoto" ${p.photo ? "" : "disabled"}>${ic("trash")} Delete picture</button></div>
        <p class="hint">JPG atau PNG, maksimal 2 MB.</p></div></div></section>
       <section class="panel"><div class="fg" style="margin-top:0">
        <label>Username<input id="f-user" value="${esc(p.user)}" autocomplete="username"></label>
        <label>Email<input id="f-email" type="email" value="${esc(p.email)}" autocomplete="email"></label>
        <label>First name<input id="f-first" value="${esc(p.first)}" autocomplete="given-name"></label>
        <label>Last name<input id="f-last" value="${esc(p.last)}" autocomplete="family-name"></label>
        <label class="w">Bio<textarea id="f-bio" maxlength="160" rows="4" placeholder="Ceritakan singkat peran dan keahlian Anda">${esc(p.bio)}</textarea>
          <span class="hint"><span id="cnt">${p.bio.length}</span>/160</span></label></div>
        <p class="err" id="perr" role="alert"></p>
        <div class="acts"><button class="btn p" data-act="saveProfile">Save changes</button><button class="btn" data-act="resetProfile">Reset</button></div></section>`;
  },
  account() {
    const t = S.tab;
    return head("Account settings", "Kelola cara masuk, perangkat aktif, dan akun eksternal yang terhubung.",
      seg("tab", t, [["signin", "lock", "Sign in"], ["devices", "monitor", "Device activity"], ["linked", "link", "Linked accounts"]])) +
      (t === "signin" ? signin() : t === "devices" ? devices() : linked());
  }
};

function signin() {
  const pw = S.pwOpen ? `<div class="sub-form"><div class="fg" style="margin-top:0">
    <label class="w">Current password<input id="pw0" type="password" autocomplete="current-password"></label>
    <label>New password<input id="pw1" type="password" autocomplete="new-password"></label>
    <label>Confirm new password<input id="pw2" type="password" autocomplete="new-password"></label></div>
    <p class="err" id="pwerr" role="alert"></p>
    <div class="acts" style="margin-top:6px"><button class="btn p" data-act="pwSave">Update password</button><button class="btn" data-act="pw">Cancel</button></div></div>` : "";
  const app = S.authapp === true ? `<button class="btn d" data-act="appRemove">Remove</button>`
    : S.authapp === "setup" ? "" : `<button class="btn" data-act="appSetup">Set up</button>`;
  const setup = S.authapp === "setup" ? `<div class="sub-form qr"><div class="qrbox">${ic("grid")}<span>QR code dari Keycloak tampil di sini</span></div>
    <div style="flex:1;min-width:200px"><p class="hint" style="margin:0 0 10px">Pindai QR dengan aplikasi authenticator, lalu masukkan kode 6 digit.</p>
    <label>Verification code<input id="code" inputmode="numeric" maxlength="6" placeholder="123456" autocomplete="one-time-code"></label>
    <p class="err" id="cerr" role="alert"></p>
    <div class="acts" style="margin-top:6px"><button class="btn p" data-act="appVerify">Verify</button><button class="btn" data-act="appCancel">Cancel</button></div></div></div>` : "";
  return `<section class="panel"><h2>${ic("lock")} Sign in</h2>
    <div class="row"><div><b>Password</b><p class="hint">Terakhir diubah ${S.pwChanged}.</p></div><button class="btn" data-act="pw">Change password</button></div>${pw}
    <div class="row"><div><b>Two-step authentication</b><p class="hint">Minta kode verifikasi tambahan saat masuk dari perangkat baru.</p></div>
      <button class="sw" role="switch" aria-checked="${S.twofa}" aria-label="Two-step authentication" data-act="twofa"></button></div>
    <div class="row"><div><b>Authenticator application</b><p class="hint">${S.authapp === true ? "Terkonfigurasi. Kode dibuat oleh aplikasi authenticator Anda." : "Belum dikonfigurasi."}</p></div>${app}</div>${setup}</section>`;
}
function devices() {
  const others = S.sessions.some(s => !s.cur);
  return `<section class="panel"><h2>${ic("monitor")} Device activity</h2><p class="hint">Sesi aktif pada perangkat yang masuk ke akun ini.</p>
    ${S.sessions.map(s => `<div class="row"><div class="dev"><span class="tile sm">${ic(s.ic)}</span><div>
      <b>${s.dev} ${s.cur ? '<span class="badge">This device</span>' : ""}</b><p class="hint">${s.loc}, ${s.ip}, ${s.last}</p></div></div>
      ${s.cur ? "" : `<button class="btn d" data-act="signout" data-id="${s.id}">Sign out</button>`}</div>`).join("")}
    ${others ? `<div class="acts"><button class="btn d" data-act="signoutAll">Sign out all other sessions</button></div>` : `<p class="empty">Tidak ada sesi lain yang aktif.</p>`}</section>`;
}
function linked() {
  return `<section class="panel"><h2>${ic("link")} Linked accounts</h2><p class="hint">Kelola akun eksternal yang terhubung dengan akun ini.</p>
    ${CONFIG.providers.map(([id, name]) => `<div class="row"><div class="dev"><span class="tile sm">${ic("link")}</span><div><b>${name}</b>
      <p class="hint">${S.links[id] ? "Terhubung" : "Belum terhubung"}</p></div></div>
      <button class="btn ${S.links[id] ? "d" : "p"}" data-act="link" data-id="${id}">${S.links[id] ? "Unlink account" : "Link account"}</button></div>`).join("")}</section>`;
}

function render() {
  $("#side").innerHTML = `<div class="hb"><span class="logo">${ic("grid")}</span><b>SSO Profile</b></div>
    <div class="me"><div class="av">${avatar()}</div><div><b>${esc(fullName())}</b><small>@${esc(S.p.user)}</small></div></div>
    <nav class="nav" aria-label="Main">${NAV.map(([k, i, l]) => `<a href="#${k}" data-act="nav" data-v="${k}" class="${S.view === k ? "on" : ""}"${S.view === k ? ' aria-current="page"' : ""}>${ic(i)}${l}</a>`).join("")}</nav>
    <div class="out"><div class="seg theme" role="group" aria-label="Theme">${[["light", "sun", "Light"], ["dark", "moon", "Dark"], ["auto", "monitor", "Auto"]].map(([v, i, l]) => `<button data-act="theme" data-v="${v}" class="${S.theme === v ? "on" : ""}" aria-pressed="${S.theme === v}" title="${v === "auto" ? "Auto: ikuti tema perangkat" : l}">${ic(i)}<span class="tl">${l}</span></button>`).join("")}</div>
    <button class="lo" data-act="logout" aria-label="Log out">${ic("out")}<span class="tl">Log out</span></button></div>`;
  $("#main").innerHTML = V[S.view]();
}

let tt;
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 3000);
}
const err = (id, msg) => { $(id).textContent = msg; };

function openTicket() {
  $("#modal").innerHTML = `<div class="ov" data-act="close"><div class="md" role="dialog" aria-modal="true" aria-labelledby="mt">
    <h2 id="mt">Create ticket</h2><p class="sub" style="margin-bottom:6px">Tim IT akan mendapat pemberitahuan begitu tiket dikirim.</p>
    <div class="fg"><label class="w">Subject<input id="t-sub" placeholder="Contoh: VPN tidak bisa tersambung"></label>
    <label>Category<select id="t-cat"><option>Network and VPN</option><option>Hardware</option><option>Software</option><option>Account and access</option><option>Other</option></select></label>
    <label>Priority<select id="t-pri"><option>Low</option><option selected>Medium</option><option>High</option><option>Urgent</option></select></label>
    <label class="w">Description<textarea id="t-desc" rows="5" placeholder="Jelaskan masalah, kapan mulai terjadi, dan pesan error yang muncul"></textarea></label></div>
    <p class="err" id="terr" role="alert"></p>
    <div class="acts"><button class="btn p" data-act="sendTicket">Send to IT</button><button class="btn" data-act="close">Cancel</button></div></div></div>`;
  $("#t-sub").focus();
}
const closeModal = () => { $("#modal").innerHTML = ""; };

const A = {
  nav(t) { S.view = t.dataset.v; render(); window.scrollTo(0, 0); },
  mode(t) { S.mode = t.dataset.v; render(); },
  tab(t) { S.tab = t.dataset.v; render(); },
  theme(t) { S.theme = t.dataset.v; applyTheme(); try { localStorage.setItem("portal-theme", S.theme); } catch (e) {} render(); },
  logout() { toast("Demo: hubungkan tombol ini ke endpoint logout Keycloak."); },
  ticket: openTicket,
  close(t, e) { if (t.classList.contains("ov") && e.target !== t) return; closeModal(); },
  sendTicket() {
    const s = $("#t-sub").value.trim(), d = $("#t-desc").value.trim();
    if (!s) return err("#terr", "Isi subject tiket.");
    if (!d) return err("#terr", "Jelaskan masalah Anda pada kolom description.");
    closeModal(); toast(`Tiket TKT-${1000 + Math.floor(Math.random() * 9000)} dibuat. Tim IT diberi tahu.`);
  },
  wish(t) { toast(`Ucapan untuk ${CONFIG.birthdays[t.dataset.i].name} terkirim.`); },
  delPhoto() { S.p.photo = null; render(); toast("Foto profil dihapus."); },
  saveProfile() {
    const v = id => $(id).value.trim(), email = v("#f-email");
    if (!v("#f-user")) return err("#perr", "Username wajib diisi.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err("#perr", "Format email belum valid.");
    if (!v("#f-first")) return err("#perr", "First name wajib diisi.");
    Object.assign(S.p, { user: v("#f-user"), email, first: v("#f-first"), last: v("#f-last"), bio: $("#f-bio").value.trim() });
    render(); toast("Profil disimpan.");
  },
  resetProfile() { render(); },
  pw() { S.pwOpen = !S.pwOpen; render(); },
  pwSave() {
    const a = $("#pw0").value, b = $("#pw1").value, c = $("#pw2").value;
    if (!a) return err("#pwerr", "Masukkan password saat ini.");
    if (b.length < 8) return err("#pwerr", "Password baru minimal 8 karakter.");
    if (b !== c) return err("#pwerr", "Konfirmasi password tidak cocok.");
    S.pwOpen = false; S.pwChanged = "baru saja"; render(); toast("Password diperbarui.");
  },
  twofa() { S.twofa = !S.twofa; render(); toast(S.twofa ? "Two-step authentication aktif." : "Two-step authentication dimatikan."); },
  appSetup() { S.authapp = "setup"; render(); },
  appCancel() { S.authapp = false; render(); },
  appVerify() {
    if (!/^\d{6}$/.test($("#code").value.trim())) return err("#cerr", "Masukkan 6 digit angka dari aplikasi authenticator.");
    S.authapp = true; render(); toast("Authenticator application terhubung.");
  },
  appRemove() { S.authapp = false; render(); toast("Authenticator application dihapus."); },
  signout(t) { S.sessions = S.sessions.filter(s => String(s.id) !== t.dataset.id); render(); toast("Sesi perangkat dikeluarkan."); },
  signoutAll() { S.sessions = S.sessions.filter(s => s.cur); render(); toast("Semua sesi lain dikeluarkan."); },
  link(t) { const id = t.dataset.id; S.links[id] = !S.links[id]; render(); toast(S.links[id] ? "Akun terhubung." : "Akun dilepas."); }
};

document.addEventListener("click", e => {
  const t = e.target.closest("[data-act]");
  if (!t || t.disabled) return;
  if (t.tagName === "A") e.preventDefault();
  if (A[t.dataset.act]) A[t.dataset.act](t, e);
});
document.addEventListener("input", e => { if (e.target.id === "f-bio") $("#cnt").textContent = e.target.value.length; });
document.addEventListener("change", e => {
  if (e.target.id !== "photo") return;
  const f = e.target.files[0];
  if (!f) return;
  if (!f.type.startsWith("image/")) return toast("Pilih file gambar (JPG atau PNG).");
  if (f.size > 2e6) return toast("Ukuran foto maksimal 2 MB.");
  const r = new FileReader();
  r.onload = () => { S.p.photo = r.result; render(); toast("Foto profil diperbarui."); };
  r.readAsDataURL(f);
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* auto = no data-theme attribute, so the CSS follows the device setting and reacts live when it changes */
function applyTheme() { const r = document.documentElement; if (S.theme === "auto") r.removeAttribute("data-theme"); else r.setAttribute("data-theme", S.theme); }
try { const m = localStorage.getItem("portal-theme"); if (m === "light" || m === "dark") S.theme = m; } catch (e) {}
applyTheme();
const h = (location.hash || "").slice(1);
if (NAV.some(n => n[0] === h)) S.view = h;
render();
