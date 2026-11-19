
(function(){
'use strict';

/* ---------- Icons (24px grid, stroke-based) ---------- */
var I={
 alert:'<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
 eye:'<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>',
 eyeOff:'<path d="M3 3l18 18"/><path d="M10.6 5.2A10.9 10.9 0 0 1 12 5c7 0 11 7 11 7a17.6 17.6 0 0 1-3.4 4.2M6.3 6.5A17.9 17.9 0 0 0 1 12s4 7 11 7a10.6 10.6 0 0 0 4.2-.85"/><path d="M9.5 9.8A3 3 0 0 0 12 15a3 3 0 0 0 2.4-1.2"/>',
 building:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01"/>',
 briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
 badge:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M5.5 16c.6-1.6 2-2.5 3.5-2.5s2.9.9 3.5 2.5M15 10h3.5M15 13h3.5"/>',
 layout:'<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
 users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
 network:'<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-4h12v4"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/>',
 moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
 wallet:'<path d="M3 7a2 2 0 0 1 2-2h13v4"/><path d="M3 7v11a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2z"/><circle cx="16.5" cy="14" r="1"/>',
 receipt:'<path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
 userplus:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
 trend:'<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
 cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"/>',
 file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
 bell:'<path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10.3 20a2 2 0 0 0 3.4 0"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
 help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7"/><path d="M12 17h.01"/>',
 heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
 updown:'<path d="M8 9l4-4 4 4M8 15l4 4 4-4"/>',
 check:'<path d="M5 12l5 5L20 7"/>',
 x:'<path d="M6 6l12 12M18 6L6 18"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
 lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
 cart:'<circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/><path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h9.3a1 1 0 0 0 1-.8L21 7H6"/>',
 box:'<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
 bank:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
 server:'<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01"/>',
 buoy:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/>',
 scale:'<path d="M12 3v18M6 21h12M5 7h14"/><path d="M5 7l-3 7a3.5 3.5 0 0 0 6 0zM19 7l-3 7a3.5 3.5 0 0 0 6 0z"/>',
 kanban:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 8v6M12 8v9M16 8v4"/>',
 logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 shield:'<path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
 download:'<path d="M12 4v11M7 11l5 5 5-5M4 20h16"/>',
 sliders:'<path d="M4 6h8M18 6h2M4 12h2M12 12h8M4 18h10M20 18h0"/><circle cx="15" cy="6" r="2.2"/><circle cx="9" cy="12" r="2.2"/><circle cx="17" cy="18" r="2.2"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'
};
function icon(n,s,w){s=s||20;w=w||1.75;return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+I[n]+'</svg>';}
function flower(s){
  var p='';for(var i=0;i<5;i++){p+='<ellipse cx="16" cy="8.6" rx="4.4" ry="6.6" transform="rotate('+(i*72)+' 16 16)"/>';}
  return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 32 32" aria-hidden="true"><g fill="currentColor" opacity=".9">'+p+'</g><circle cx="16" cy="16" r="3.4" fill="var(--surface)"/></svg>';
}

/* ---------- Utilities ---------- */
var $=function(s,r){return (r||document).querySelector(s);};
var nf=new Intl.NumberFormat('en-US');
function fmt(n){return nf.format(n);}
function pct(n,d){return new Intl.NumberFormat('en-US',{minimumFractionDigits:d,maximumFractionDigits:d}).format(n);}
function initials(n){var p=n.split(' ');return (p[0][0]+(p[1]?p[1][0]:'')).toUpperCase();}
/* ---------- Login page (login.html) ---------- */
var LOGIN_RESET=function(){};
function initLoginPage(){
$('#brandMark').innerHTML=icon('building',18);
$('#brandMark2').innerHTML=icon('building',18);
$('#chips').innerHTML=[['users','HR'],['box','Warehouse'],['server','Asset'],['scale','Legal'],['cap','Learning']].map(function(c){return '<span class="lg-chip">'+icon(c[0],14)+c[1]+'</span>';}).join('');
var eyeBtn=$('#eyeBtn');eyeBtn.innerHTML=icon('eye',18);

/* Demo accounts. Employee and guest credentials are separate: guests are external trainers and vendors. */
var LOGIN_EMP={staff:'staff123',sales:'sales123',ops:'ops123'};
var LOGIN_GUEST={trainer:'trainer123',vendor:'vendor123'};
var MAIL_RE=/@pidc?\.co\.id$/;

/* already signed in? skip straight to the app */
try{
  if(localStorage.getItem('pidc_lms_auth')==='1'||sessionStorage.getItem('pidc_lms_auth')==='1'){goApp();return;}
}catch(e){}

/* greeting, date, and live clock (Jakarta time) */
var clockFmt=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Jakarta',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
var dateFmt=new Intl.DateTimeFormat('id-ID',{timeZone:'Asia/Jakarta',weekday:'long',day:'2-digit',month:'short',year:'numeric'});
$('#calIco').innerHTML=icon('calendar',13,2.2);
var use12h=false;
function tick(){
  var now=new Date(),parts=clockFmt.formatToParts(now),mm='00',ss='00',h24=0;
  parts.forEach(function(p){if(p.type==='hour')h24=parseInt(p.value,10)%24;if(p.type==='minute')mm=p.value;if(p.type==='second')ss=p.value;});
  var g=h24<4?'malam':h24<11?'pagi':h24<15?'siang':h24<18?'sore':'malam';
  $('#greet').textContent='Selamat '+g+' \uD83D\uDC4B';
  $('#dateTxt').textContent=dateFmt.format(now);
  var hh,ampm='';
  if(use12h){var h12=h24%12;if(h12===0)h12=12;hh=pad(h12);ampm='<span class="lg-ampm">'+(h24<12?'AM':'PM')+'</span>';}
  else{hh=pad(h24);}
  $('#clockTxt').innerHTML=hh+'<span class="lg-blink">:</span>'+mm+'<span class="lg-blink">:</span>'+ss+ampm;
}
$('#timePill').addEventListener('click',function(){use12h=!use12h;tick();});
tick();setInterval(tick,1000);

/* employee / guest loginMode */
var loginMode='employee';
var LOGIN_MODES={
  employee:{badge:'Employee',badgeCls:'lg-badge',sub:'Gunakan akun Portal PID Anda untuk melanjutkan.',idLabel:'Employee ID or email',ph:'e.g. staff or raka.pratama@pid.co.id',idErr:'Enter your employee ID or email.',
    btn:'Masuk sebagai Guest',btnIco:'briefcase',
    demo:'Prototype demo: sign in with <b>staff</b> / <b>staff123</b> (Technology), <b>sales</b> / <b>sales123</b>, <b>ops</b> / <b>ops123</b>, or any <b>@pid.co.id</b> email with any password.',
    need:'Enter your employee ID and password to continue.',
    bad:'We could not find an account matching that ID and password. Try staff / staff123, sales / sales123, or ops / ops123.'},
  guest:{badge:'Guest',badgeCls:'lg-badge guest',sub:'Akun Guest untuk trainer eksternal dan vendor. Gunakan username dan password dari HR.',idLabel:'Username',ph:'e.g. trainer or vendor',idErr:'Enter your username.',
    btn:'Masuk sebagai Karyawan',btnIco:'badge',
    demo:'Prototype demo guest accounts: <b>trainer</b> / <b>trainer123</b> (External Trainer) and <b>vendor</b> / <b>vendor123</b> (Vendor).',
    need:'Enter your username and password to continue.',
    bad:'We could not find a guest account matching that username and password. Try trainer / trainer123 or vendor / vendor123.'}
};
function setMode(m){
  loginMode=m;var c=LOGIN_MODES[m];
  $('#badge').textContent=c.badge;$('#badge').className=c.badgeCls;
  $('#sub').textContent=c.sub;$('#idLabel').textContent=c.idLabel;
  $('#empId').placeholder=c.ph;$('#idErr').textContent=c.idErr;
  $('#modeTx').textContent=c.btn;$('#modeIco').innerHTML=icon(c.btnIco,18);
  $('#demo').innerHTML=c.demo;
  document.title='Sign in'+(m==='guest'?' as Guest':'')+' — Portal PID';
  clearAlert();
  $('#fId').classList.remove('invalid','bad');$('#fPw').classList.remove('invalid','bad');
  $('#empId').value='';$('#pw').value='';
  $('#submitBtn').disabled=false;$('#submitBtn').textContent='Sign In';
  $('#empId').focus();
}
$('#modeBtn').addEventListener('click',function(){setMode(loginMode==='employee'?'guest':'employee');});
setMode('employee');$('#empId').blur();

eyeBtn.addEventListener('click',function(){
  var pw=$('#pw'),show=pw.type==='password';
  pw.type=show?'text':'password';
  eyeBtn.innerHTML=icon(show?'eyeOff':'eye',18);
  eyeBtn.setAttribute('aria-label',show?'Hide password':'Show password');
});

$('#forgotLink').addEventListener('click',function(e){
  e.preventDefault();
  showAlert('Password reset is not available in this prototype. Contact your HR administrator for help.');
});

function showAlert(msg){var a=$('#formAlert');a.innerHTML=icon('alert',18)+'<span>'+msg+'</span>';a.hidden=false;}
function clearAlert(){$('#formAlert').hidden=true;}
function setInvalid(sel,on){$(sel).classList.toggle('invalid',on);}

$('#loginForm').addEventListener('submit',function(e){
  e.preventDefault();
  clearAlert();
  $('#fId').classList.remove('bad');$('#fPw').classList.remove('bad');
  var c=LOGIN_MODES[loginMode],id=$('#empId').value.trim(),pw=$('#pw').value;
  var idOk=id.length>0,pwOk=pw.length>0;
  setInvalid('#fId',!idOk);setInvalid('#fPw',!pwOk);
  if(!idOk||!pwOk){showAlert(c.need);return;}

  var key=id.toLowerCase(),acct,matches;
  if(loginMode==='guest'){
    acct=key;matches=LOGIN_GUEST.hasOwnProperty(key)&&pw===LOGIN_GUEST[key];
  }else{
    var isMail=MAIL_RE.test(key);
    acct=isMail?'staff':key;
    matches=isMail||(LOGIN_EMP.hasOwnProperty(key)&&pw===LOGIN_EMP[key]);
  }
  if(!matches){
    $('#fId').classList.add('bad');$('#fPw').classList.add('bad');
    showAlert(c.bad);
    return;
  }

  var btn=$('#submitBtn');
  btn.disabled=true;btn.innerHTML='<span class="spin"></span>Signing in…';
  setTimeout(function(){
    try{
      var store=$('#remember').checked?localStorage:sessionStorage;
      store.setItem('pidc_lms_auth','1');
      store.setItem('pidc_lms_user',id);
      store.setItem('pidc_lms_acct',acct);
      (store===localStorage?sessionStorage:localStorage).removeItem('pidc_lms_acct');
    }catch(err){}
    goApp();
  },550);
});
LOGIN_RESET=function(){setMode('employee');};
}

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

/* ---------- Page routing: one script serves login.html and index.html ---------- */
function goApp(){window.location.href='index.html';}
function goLogin(){
  if(window.parent!==window){window.parent.postMessage('PID_PORTAL_LOGOUT',window.location.origin);return;}
  window.location.replace('/');
}
var ON_LOGIN=!!document.getElementById('loginForm');
if(ON_LOGIN){initLoginPage();return;}

/* ---------- Auth guard (app page only) ---------- */
try{
  if(localStorage.getItem('pidc_lms_auth')!=='1'&&sessionStorage.getItem('pidc_lms_auth')!=='1'){goLogin();return;}
}catch(e){}

/* The React shell forwards a short-lived Keycloak access token to this same-origin iframe. */
var PORTAL_AUTH_TOKEN='';
var portalNotificationTimer=null;
var portalNotificationRequestPending=false;
window.addEventListener('message',function(event){
  if(event.origin!==window.location.origin||event.source!==window.parent)return;
  var data=event.data;
  if(!data||data.type!=='PID_PORTAL_AUTH'||typeof data.token!=='string')return;
  PORTAL_AUTH_TOKEN=data.token;
  startPortalNotificationPolling();
  var status=$('#ticketSsoStatus');
  if(status)status.textContent='Sesi SSO aktif · '+($('#userBtn .u2')||{}).textContent;
});


/* ---------- Data ---------- */
var G=function(label,items){return {label:label,items:items};};
var MODULES=[
 {id:'hr',name:'HR Management',desc:'Employees, attendance, payroll',icon:'users',nav:[
   G('Overview',[['dashboard','Dashboard','layout'],['employees','Employee Data','users'],['org','Organization Structure','network']]),
   G('HR Services',[['attendance','Attendance','clock'],['leave','Leave & Time Off','calendar'],['overtime','Overtime','moon'],['payroll','Payroll','wallet'],['claims','Claims & Reimburse','receipt']]),
   G('Development',[['recruit','Recruitment','userplus'],['performance','Performance','trend'],['training','Training','cap']])
 ]},
 {id:'proc',name:'e-Procurement',desc:'Pengadaan barang & jasa online',icon:'cart',
  stats:[['PRs awaiting approval','23'],['Active POs','61'],['Verified vendors','214']],nav:[
   G('Overview',[['dashboard','Dashboard','layout'],['pr','Purchase Requests','file'],['po','Purchase Orders','receipt']]),
   G('Vendor',[['vendors','Vendor Data','users'],['tender','Quotes & Tenders','trend'],['contract','Procurement Contracts','file']])
 ]},
 {id:'wh',name:'Warehouse',desc:'Stock, receiving, shipping',icon:'box',
  stats:[['Active SKUs','8.412'],['Receipts today','17'],['Delayed shipments','5']],nav:[
   G('Overview',[['dashboard','Dashboard','layout'],['stock','Stock Items','box'],['inbound','Receiving','download']]),
   G('Operations',[['outbound','Shipping','cart'],['opname','Stock Opname','clock']])
 ]},
 {id:'fin',name:'E-Billing System',desc:'Tagihan & manajemen keuangan',icon:'bank',
  stats:[['Invoices due this week','38'],['Budget realization','71.4%'],['Cash & bank','Rp 42.6 B']],nav:[
   G('Overview',[['dashboard','Dashboard','layout'],['budget','Budget','wallet'],['invoice','Invoices','receipt']]),
   G('Pelaporan',[['report','Financial Report','trend'],['cash','Cash & Bank','bank']])
 ]},
 {id:'asset',name:'e-Document',desc:'Pengelolaan dokumen digital',icon:'file',nav:[
   G('Overview',[['dashboard','Dashboard','layout'],['assets','Asset Register','server'],['depr','Depreciation','trend']]),
   G('Operations',[['maint','Maintenance','wrench'],['loan','Loans & Assignments','calendar'],['audit','Asset Audit','clipboard']])
 ]},
 {id:'it',name:'IT Service Mgmt',desc:'Tiket & layanan helpdesk IT',icon:'buoy',nav:[
   G('Overview',[['dashboard','Dashboard','layout']]),
   G('Tickets',[['newticket','Create a ticket','buoy'],['mytickets','My tickets','clock']]),
   G('Support',[['kb','Knowledge Base','cap']])
 ]},
 {id:'legal',name:'QHSSE',desc:'K3, kualitas & manajemen lingkungan hidup',icon:'scale',
  stats:[['Active contracts','389'],['Expiring in 60 days','21'],['Open audit findings','6']],nav:[
   G('Overview',[['dashboard','Dashboard','layout'],['contracts','Contracts','file'],['comply','Compliance','scale']]),
   G('Archive',[['docs','Legal Documents','file']])
 ]},
 {id:'learn',name:'LMS',desc:'E-learning & program pelatihan karyawan',icon:'cap',nav:[
   G('Learning',[['dashboard','Dashboard','layout'],['catalog','Training Catalog','file'],['path','Learning Path','network'],['mytraining','My Training','clock'],['certs','My Certificates','award'],['eval','Post-Training Evaluation','trend']]),
   G('External Training',[['extreq','My Requests','file'],['extassign','My Assignments','clipboard']]),
   G('TNA',[['tnacycle','My TNA Cycles','target'],['tnahist','TNA History','clock']])
 ]},
 {id:'proj',name:'Events Manager',desc:'Pengelolaan & jadwal acara organisasi',icon:'kanban',
  stats:[['Ongoing projects','32'],['Tasks due','14'],['At-risk projects','4']],nav:[
   G('Overview',[['dashboard','Dashboard','layout'],['projects','Projects','kanban'],['tasks','Tasks','check']]),
   G('Planning',[['timeline','Timeline','calendar']])
 ]}
];

/* App launcher labels stay aligned with the SSO Profile application catalog. */
var APP_SWITCHER=[
 {name:'eOffice',desc:'Surat menyurat & agenda dinas',icon:'badge',url:'https://eoffice.example.com'},
 {name:'e-Procurement',desc:'Pengadaan barang & jasa online',icon:'cart',mod:'proc'},
 {name:'e-Document',desc:'Pengelolaan dokumen digital',icon:'file',mod:'asset'},
 {name:'IT Service Mgmt',desc:'Tiket & layanan helpdesk IT',icon:'buoy',mod:'it'},
 {name:'E-Billing System',desc:'Tagihan & manajemen keuangan',icon:'wallet',mod:'fin'},
 {name:'Content Portal',desc:'Manajemen konten & publikasi web',icon:'layout',url:'https://content.example.com'},
 {name:'HR Management',desc:'Data & administrasi kepegawaian',icon:'users',mod:'hr'},
 {name:'Events Manager',desc:'Pengelolaan & jadwal acara organisasi',icon:'calendar',mod:'proj'},
 {name:'Learning Center',desc:'Knowledge sharing & pustaka digital',icon:'cap',url:'https://learning.example.com'},
 {name:'LMS',desc:'E-learning & program pelatihan karyawan',icon:'cap',mod:'learn'},
 {name:'QHSSE',desc:'K3, kualitas & lingkungan hidup',icon:'scale',mod:'legal'},
 {name:'Laporan Kesehatan',desc:'Pelaporan kesehatan karyawan',icon:'heart',url:'https://kesehatan.example.com'},
 {name:'ESS',desc:'Employee Self Service',icon:'user',url:'https://ess.example.com'},
 {name:'PELNI Doc',desc:'Dokumentasi teknis & arsip internal',icon:'file',url:'https://doc.example.com'}
];

var STATUS=[
 {l:'In the office',n:742},{l:'Remote work',n:236},{l:'Field assignment',n:58},
 {l:'Late',n:41},{l:'Leave / time off',n:74},{l:'Not checked in',n:97}
];
var DEPTS=[['Operations',312],['Technology',214],['Sales',176],['Warehouse & Logistics',158],['Finance',96],['Marketing',88],['Procurement',74],['Customer Service',60],['HR',42],['Legal & Compliance',28]];
var TOTAL=DEPTS.reduce(function(a,d){return a+d[1];},0);
var PRESENT=STATUS[0].n+STATUS[1].n+STATUS[2].n+STATUS[3].n;

// deterministic assignment of statuses to employees
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
var rand=rng(2309);
var pool=[];STATUS.forEach(function(s,i){for(var k=0;k<s.n;k++)pool.push(i);});
for(var i=pool.length-1;i>0;i--){var j=Math.floor(rand()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;}
var deptStatus=[];var cursor=0;
DEPTS.forEach(function(d){deptStatus.push(pool.slice(cursor,cursor+d[1]).sort(function(a,b){return a-b;}));cursor+=d[1];});

/* ---------- Signed-in account (Employee / Guest) ---------- */
var PROFILE={name:'Raka Pratama',email:'raka.pratama@pid.co.id',phone:'0812-4455-7781',empId:'PIDC-EMP-01924',division:'Technology',title:'Software Engineer',manager:'Bambang Irawan',location:'Head Office, Jakarta',joined:dt(2023,3,14)};
/* Demo accounts: the signed-in account decides the division, and the division decides which learning path is visible. */
var ACCOUNTS={
  staff:{},
  sales:{name:'Sinta Maharani',email:'sinta.maharani@pid.co.id',phone:'0813-2200-4518',empId:'PIDC-EMP-02177',division:'Sales',title:'Account Executive',manager:'Hendra Wijaya',joined:dt(2022,8,1)},
  trainer:{kind:'guest',name:'Andreas Setiawan',email:'andreas@mitrapelatihan.co.id',phone:'0811-3300-2290',empId:'GST-00231',division:'External',title:'External Trainer',org:'Mitra Pelatihan Nusantara',manager:'\u2014'},
  vendor:{kind:'guest',name:'Maya Kusumawati',email:'maya.k@vendorsejahtera.co.id',phone:'0817-5521-4406',empId:'GST-00418',division:'External',title:'Vendor Representative',org:'PT Vendor Sejahtera',manager:'\u2014'},
  ops:{name:'Dimas Prakoso',email:'dimas.prakoso@pid.co.id',phone:'0821-7788-3095',empId:'PIDC-EMP-01408',division:'Operations',title:'Production Supervisor',manager:'Yulia Santoso',joined:dt(2021,1,18)}
};
var ACCT='staff';
try{ACCT=localStorage.getItem('pidc_lms_acct')||sessionStorage.getItem('pidc_lms_acct')||'staff';}catch(e){}
if(!ACCOUNTS[ACCT])ACCT='staff';
Object.keys(ACCOUNTS[ACCT]).forEach(function(k){PROFILE[k]=ACCOUNTS[ACCT][k];});
var IS_GUEST=PROFILE.kind==='guest';
try{PROFILE.photo=localStorage.getItem('pidc_lms_photo_'+ACCT)||null;}catch(e){PROFILE.photo=null;}
var NOTIF={deadline:true,assigned:true,approvals:true,digest:false};
function renderHeaderUser(){
  var av=$('#userBtn .avatar');
  if(PROFILE.photo){av.innerHTML='<img class="av-img" alt="" src="'+PROFILE.photo+'">';}else{av.textContent=initials(PROFILE.name);}
  $('#userBtn .u1').textContent=PROFILE.name;
  $('#userBtn .u2').textContent=IS_GUEST?'Guest · '+PROFILE.title:'Staff · '+PROFILE.division;
  var whoB=$('#umPanel .who b'),whoSpan=$('#umPanel .who span');
  if(whoB)whoB.textContent=PROFILE.name;
  if(whoSpan)whoSpan.textContent=IS_GUEST?'Logged in as Guest':'Logged in as Staff';
}

var state={mod:IS_GUEST?'learn':'hr',item:IS_GUEST?'guesthome':'dashboard',appName:IS_GUEST?'LMS':'HR Management'};
function curMod(){return MODULES.filter(function(m){return m.id===state.mod;})[0];}
function badgeFor(id){
  if(state.mod==='wh'){if(id==='opname')return pendVar().length;if(id==='outbound')return OUT.filter(function(r){return r.st===5;}).length;if(id==='inbound')return INB.filter(inLate).length;return 0;}
  if(state.mod==='asset'){if(id==='maint')return WOS.filter(woLate).length;if(id==='loan')return LOANS.filter(function(l){return l.status==='requested';}).length;if(id==='audit')return pendAud().length;return 0;}
  if(state.mod==='legal'){if(id==='contracts')return CONTRACTS.filter(function(c){return c.status==='Under review';}).length;if(id==='comply')return pendFind().length;if(id==='docs')return DOCS.filter(function(d){return d.status==='Under review';}).length;return 0;}
  if(state.mod==='learn'){if(id==='mytraining')return LNENR.filter(function(e){return e.status==='Overdue';}).length;if(id==='extassign')return LNASSIGN.filter(asgPending).length;if(id==='extreq')return LNREQ.filter(function(r){return reqActive(r);}).length;if(id==='tnacycle')return LNTNA.filter(function(t){var over=NOW>t.end;return !t.attempt&&over;}).length;return 0;}
  if(state.mod!=='hr')return 0;var k={leave:'leave',overtime:'overtime',claims:'claims',employees:'data'}[id];if(!k)return 0;return REQS.filter(function(r){return r.kind===k&&r.status==='pending';}).length;
}

/* ---------- Static icon slots ---------- */
$('#searchIco').innerHTML=icon('search',20);
$('#bellIco').innerHTML=icon('bell',20);
$('#infoIco').innerHTML=icon('info',20);
$('#helpBtn').innerHTML=icon('help',20);
$('#burger').innerHTML=icon('menu',22);
$('#swChev').innerHTML=icon('updown',18);
$('#flower').innerHTML=flower(32);
$('#railIco').innerHTML=icon('menu',20);

$('#ssoNote').innerHTML=icon('lock',16)+'<span>SSO session active until 17:00 local time</span>';
$('#miProfile').innerHTML=icon('user',18)+'My profile';
$('#miSso').innerHTML=icon('shield',18)+'SSO Profile';
$('#miOut').innerHTML=icon('logout',18)+'Sign out of all apps';
$('#swFoot').innerHTML=icon('lock',16)+'<span>Sign in once. Every app shares the same session — no need to log in again.</span>';
if(/Mac|iPhone|iPad/.test(navigator.platform||'')){$('#kbd').textContent='⌘ K';}

/* ---------- Shell rendering ---------- */
function renderSwitcher(){
  var m=curMod();
  var current=APP_SWITCHER.filter(function(x){return x.name===state.appName;})[0];
  $('#swName').textContent=current?current.name:m.name;
  $('#swTile').innerHTML=icon(current?current.icon:m.icon,18);
  $('#swGrid').innerHTML=APP_SWITCHER.map(function(x){
    return '<button class="sw-item" data-app="'+esc(x.name)+'" '+(x.mod?'data-mod="'+x.mod+'"':'')+(x.url?' data-url="'+esc(x.url)+'"':'')+' '+(x.name===state.appName?'aria-current="true"':'')+'>'
      +'<span class="sw-ico">'+icon(x.icon,22)+'</span>'
      +'<span><span class="a">'+esc(x.name)+'</span><span class="b">'+esc(x.desc)+'</span></span></button>';
  }).join('');
}
var NAV_GUEST=[G('Guest',[['guesthome','Guest Home','layout']])];
function navSrc(){return IS_GUEST?NAV_GUEST:curMod().nav;}
function navKey(){return state.item==='asgdetail'?'extassign':(state.item==='tnaplay'||state.item==='tnaresult')?(state.tnaFrom||'tnacycle'):state.item;}
function tnaMove(dl){var t=lntna(state.tnaId);if(!t||!t.draft)return;var n=TNA_BANK[t.id].length;t.draft.idx=Math.max(0,Math.min(n-1,t.draft.idx+dl));render();window.scrollTo(0,0);}
function tnaGo(k){var t=lntna(state.tnaId);if(!t||!t.draft)return;t.draft.idx=k;render();window.scrollTo(0,0);}
function renderNav(){
  $('#nav').innerHTML=navSrc().map(function(g){
    return '<div class="nav-group"><div class="nav-label">'+esc(g.label)+'</div>'+g.items.map(function(it){
      var b=badgeFor(it[0]);
      return '<button class="nav-item" data-item="'+it[0]+'" title="'+esc(it[1])+'" '+(it[0]===navKey()?'aria-current="page"':'')+'>'
        +icon(it[2],20)+'<span class="lbl">'+esc(it[1])+(b?'<span class="badge">'+b+'</span>':'')+'</span></button>';
    }).join('')+'</div>';
  }).join('');
}
function itemLabel(){
  var out='';
  navSrc().forEach(function(g){g.items.forEach(function(it){if(it[0]===state.item)out=it[1];});});
  return out;
}

/* ---------- Views ---------- */
function todayText(){return 'Wednesday, September 23, 2026 · Data updated 09:42 local time';}

function viewHR(){
  var leaveCount=41;
  return ''
  +'<div class="page-head"><div><h1>Dashboard</h1><p>'+todayText()+'</p></div>'
  +'<button class="btn" id="exportBtn">'+icon('download',18)+'Export summary</button></div>'
  +myAttendCard()
  +'<section class="kpis" aria-label="Ringkasan utama">'
   +'<div class="kpi"><div class="l">Total employees</div><div class="v">'+fmt(TOTAL)+'</div><div class="s ok">+12 since August</div></div>'
   +'<div class="kpi"><div class="l">Attendance rate today</div><div class="v">'+pct(PRESENT/TOTAL*100,1)+'%</div><div class="s">'+fmt(PRESENT)+' present · '+fmt(STATUS[5].n)+' not yet checked in</div></div>'
   +'<div class="kpi"><div class="l">Leave today</div><div class="v">'+fmt(STATUS[4].n)+'</div><div class="s">46 annual leave · 28 other leave</div></div>'
   +'<div class="kpi"><div class="l">Open positions</div><div class="v">18</div><div class="s">7 at interview stage</div></div>'
  +'</section>'
  +'<div class="grid">'
   +'<section class="card c8" aria-labelledby="t-map">'
     +'<div class="card-head"><div><h2 id="t-map">Today’s attendance map</h2><p class="hint">1 square = 1 employee, grouped by unit. Click a status or unit name to highlight.</p></div></div>'
     +'<div class="legend" id="legend"></div>'
     +'<div class="readout" id="readout" aria-live="polite"></div>'
     +'<div class="mosaic" id="mosaic"></div>'
   +'</section>'
   +'<section class="card c4" aria-labelledby="t-appr">'
     +'<div class="card-head"><div><h2 id="t-appr">Needs your action</h2><p class="hint">Submissions awaiting approval</p></div><span class="pill" id="apprCount"></span></div>'
     +'<ul class="appr" id="apprList"></ul>'
   +'</section>'
   +'<section class="card r3a" aria-labelledby="t-trend">'
     +'<div class="card-head"><div><h2 id="t-trend">New Hires vs. Exits</h2><p class="hint">Monthly headcount movement, last 6 months</p></div></div>'
     +'<div class="legend-o" style="margin:0 0 8px"><span><i style="background:var(--brand)"></i>New hires</span><span><i style="background:var(--s2)"></i>Exits</span></div>'
     +'<div id="trend"></div><p class="insight" id="trendNote"></p>'
   +'</section>'
   +'<section class="card r3b" aria-labelledby="t-pay">'
     +'<div class="card-head"><div><h2 id="t-pay">Payroll Cycle</h2><p class="hint">September 2026 period</p></div></div>'
     +'<ol class="steps">'
       +'<li class="done"><span class="node">'+icon('check',14,3)+'</span><span><span class="a">Attendance cut-off</span><span class="b">Attendance data locked</span></span><span class="dt">20 Sep</span></li>'
       +'<li class="now"><span class="node"></span><span><span class="a">Overtime &amp; claims verification</span><span class="b">'+(cnt('overtime','pending')+cnt('claims','pending'))+' items not yet verified</span></span><span class="dt">Sep 23</span></li>'
       +'<li><span class="node"></span><span><span class="a">Finance approval</span><span class="b">Awaiting verification to finish</span></span><span class="dt">24 Sep</span></li>'
       +'<li><span class="node"></span><span><span class="a">Salary transfer &amp; payslips issued</span><span class="b">'+fmt(TOTAL)+' employees</span></span><span class="dt">Sep 25</span></li>'
     +'</ol>'
   +'</section>'
   +'<section class="card r3c" aria-labelledby="t-cal">'
     +'<div class="card-head"><div><h2 id="t-cal">HR Agenda</h2><p class="hint">Next 7 days</p></div></div>'
     +'<ul class="agenda">'
       +'<li><span class="date"><b>24</b><span>Sep</span></span><span><span class="a">Health claim deadline</span><span class="b">Q3 period</span></span></li>'
       +'<li><span class="date"><b>26</b><span>Sep</span></span><span><span class="a">Safety Training batch 3</span><span class="b">48 participants</span></span></li>'
       +'<li><span class="date"><b>30</b><span>Sep</span></span><span><span class="a">Contracts ending</span><span class="b">9 employees need a decision</span></span></li>'
       +'<li><span class="date"><b>1</b><span>Oct</span></span><span><span class="a">Onboarding</span><span class="b">14 new employees</span></span></li>'
     +'</ul>'
   +'</section>'
  +'</div>';
}

function viewGeneric(){
  var m=curMod(),label=itemLabel(),isDash=state.item==='dashboard';
  var html='<div class="page-head"><div><h1>'+esc(isDash?m.name:label)+'</h1><p>'+(isDash?'Dashboard · ':m.name+' · ')+todayText().split(' · ')[0]+'</p></div></div>';
  if(isDash&&m.stats){
    html+='<section class="kpis k3" aria-label="Ringkasan">'+m.stats.map(function(s){
      return '<div class="kpi"><div class="l">'+esc(s[0])+'</div><div class="v">'+esc(s[1])+'</div><div class="s">Sample data</div></div>';
    }).join('')+'</section>';
  }
  html+='<section class="card empty-card"><h2>'+esc(isDash?m.name+' dashboard is designed separately':label+' page is designed separately')+'</h2>'
    +'<p>Sidebar, search, notifications, and account stay the same across every app. Users switch apps from the menu in the top-left corner, without logging in again.</p></section>';
  return html;
}

function viewITDashboard(){
  return '<div class="page-inner">'
    +'<div class="page-head"><div><span class="eyebrow">IT SERVICE MANAGEMENT</span><h1>Helpdesk</h1><p>Laporkan kendala atau ajukan bantuan melalui Portal PID.</p></div></div>'
    +'<section class="card glpi-helpdesk-hero"><div class="glpi-helpdesk-mark">'+icon('buoy',24)+'</div><div class="glpi-helpdesk-copy"><span class="badge">Helpdesk GLPI</span><h2>Butuh bantuan IT?</h2><p>Buat tiket dari portal ini. Tim helpdesk akan menerima laporan Anda di GLPI.</p><p class="glpi-sso-hint">Masuk menggunakan akun Portal PID. Anda tidak perlu masuk ke GLPI.</p></div><button class="btn primary" type="button" data-it-create>'+icon('userplus',18)+' Buat tiket</button></section>'
    +'<div class="glpi-helpdesk-steps"><article class="card"><span class="step-no">01</span><h3>Jelaskan kendala</h3><p>Isi judul dan rincian masalah atau layanan yang dibutuhkan.</p></article><article class="card"><span class="step-no">02</span><h3>Kirim melalui SSO</h3><p>Identitas akun Portal PID dilampirkan pada tiket secara otomatis.</p></article><article class="card"><span class="step-no">03</span><h3>Diproses helpdesk</h3><p>Petugas menindaklanjuti tiket dari sistem GLPI.</p></article></div>'
    +'<section class="card glpi-my-tickets-preview"><div><h2>Lihat progres pengajuan</h2><p>Pantau status tiket yang Anda kirim ke helpdesk.</p></div><button class="btn" type="button" data-it-mytickets>Lihat tiket saya</button></section>'
    +'</div>';
}

var itCurrentTicketId=null;
var itTicketDetailPollTimer=null;
var itTicketDetailSnapshot=null;
var itTicketDetailRequestPending=false;
var itMyTicketsPollTimer=null;
var itMyTicketsSnapshot=null;
var itMyTicketsRequestPending=false;
var itSelectedService=null;
var itSelectedGroup=null;
var IT_SERVICE_CATALOG=[
  {category:'Perangkat dan Jaringan',name:'Gangguan Perangkat / Jaringan',description:'Laporkan kendala pada laptop, PC, printer, scanner, internet, WiFi, LAN, atau perangkat kerja lainnya.',icon:'network',type:1,glpiCategoryId:4},
  {category:'Perangkat dan Jaringan',name:'Instalasi Software',description:'Ajukan instalasi software, aplikasi kerja, driver printer, VPN client, atau tools pendukung pekerjaan.',icon:'server',type:2,glpiCategoryId:7},
  {category:'Perangkat dan Jaringan',name:'Permintaan Perangkat',description:'Ajukan kebutuhan perangkat kerja seperti laptop, PC, monitor, printer, scanner, mouse, keyboard, atau peminjaman perangkat.',icon:'box',type:2,glpiCategoryId:5},
  {category:'Akses & Akun',name:'Reset password akun',description:'Minta bantuan reset kata sandi akun kerja yang tidak dapat digunakan.',icon:'lock',type:1,glpiCategoryId:6},
  {category:'Akses & Akun',name:'Permintaan akses aplikasi',description:'Ajukan akses ke aplikasi perusahaan dan jelaskan kebutuhan pekerjaannya.',icon:'layout',type:2,glpiCategoryId:6},
  {category:'Akses & Akun',name:'Perubahan hak akses pengguna',description:'Minta penyesuaian peran atau hak akses akun.',icon:'users',type:2,glpiCategoryId:6},
  {category:'Akses & Akun',name:'Permintaan akses VPN',description:'Ajukan akses VPN untuk kebutuhan kerja jarak jauh atau akses jaringan perusahaan.',icon:'lock',type:2,glpiCategoryId:6},
  {category:'Akses & Akun',name:'Penonaktifan akun',description:'Ajukan penonaktifan akun dengan identitas pengguna dan tanggal efektif.',icon:'user',type:2,glpiCategoryId:6},
  {category:'Aplikasi',name:'Gangguan aplikasi',description:'Laporkan kendala pada aplikasi perusahaan.',icon:'file',type:1,glpiCategoryId:3},
  {category:'Aplikasi',name:'Perubahan aplikasi',description:'Ajukan perubahan fitur atau konfigurasi aplikasi.',icon:'sliders',type:2,glpiCategoryId:3},
  {category:'Aplikasi',name:'Bantuan penggunaan aplikasi',description:'Minta panduan menggunakan aplikasi perusahaan.',icon:'help',type:2,glpiCategoryId:3},
  {category:'Aplikasi',name:'Permintaan Data / Laporan',description:'Ajukan data atau laporan yang dibutuhkan.',icon:'receipt',type:2,glpiCategoryId:3},
  {category:'Layanan IT Lainnya',name:'Laporkan Kendala Lainnya',description:'Laporkan masalah IT yang tidak tercakup pada kategori lain.',icon:'buoy',type:1,glpiCategoryId:12},
  {category:'Layanan IT Lainnya',name:'Permintaan Layanan Lainnya',description:'Ajukan kebutuhan layanan IT lain.',icon:'briefcase',type:2,glpiCategoryId:12}
];

var IT_APPLICATIONS=[['E-Procurement',3],['E-Food',8],['E-Office',9],['E-Task',10],['SAP Business One',11]];

function itFormFields(service,email){
  var field=function(key,label,placeholder,type,required,value){return '<div class="glpi-field '+(type==='textarea'?'wide':'')+'"><label for="glpiDetail_'+key+'">'+esc(label)+(required?' <i>*</i>':'')+'</label>'+(type==='textarea'?'<textarea class="glpi-control" id="glpiDetail_'+key+'" name="detail_'+key+'" '+(required?'required ':'')+'placeholder="'+esc(placeholder||'')+'"></textarea>':'<input class="glpi-control" id="glpiDetail_'+key+'" name="detail_'+key+'" type="'+esc(type||'text')+'" maxlength="500" '+(required?'required ':'')+(value?'value="'+esc(value)+'" ':'')+'placeholder="'+esc(placeholder||'')+'">')+'</div>';};
  var select=function(key,label,options,required){return '<div class="glpi-field"><label for="glpiDetail_'+key+'">'+esc(label)+(required?' <i>*</i>':'')+'</label><select class="glpi-control" id="glpiDetail_'+key+'" name="detail_'+key+'" '+(required?'required':'')+'><option value="">Pilih '+esc(label.toLowerCase())+'</option>'+options.map(function(option){return '<option value="'+esc(option[0])+'">'+esc(option[1]||option[0])+'</option>';}).join('')+'</select></div>';};
  var out='';
  if(service==='Penonaktifan akun'){
    out+=field('nrp_username','NRP / Username','Masukkan NRP atau username','text',true);
    out+=field('nama_pengguna','Nama pengguna','Nama lengkap pengguna','text',true);
    out+=field('email_pengguna','Email pengguna','nama@pidc.co.id','email',true,email);
    out+=field('unit_divisi','Unit kerja / divisi','Nama unit atau divisi','text',true);
    out+=field('tanggal_efektif','Tanggal efektif penonaktifan','','date',true);
    out+=field('akun_aplikasi','Akun / aplikasi yang dinonaktifkan','Nama akun atau aplikasi','text',true);
    out+=field('alasan','Alasan penonaktifan','Jelaskan alasan','textarea',true);
  } else if(service==='Gangguan Perangkat / Jaringan'){
    out+=field('bagian_bermasalah','Bagian perangkat / jaringan yang bermasalah','Contoh: layar laptop, Wi-Fi, printer','text',true);
  } else if(service==='Instalasi Software'){
    out+=field('nama_software','Software yang diminta','Nama software / aplikasi','text',true);
    out+=field('tujuan_instalasi','Kebutuhan pekerjaan','Jelaskan kegunaan software','textarea',true);
  } else if(service==='Permintaan Perangkat'){
    out+=field('jenis_perangkat','Perangkat yang diminta','Contoh: laptop, monitor, printer','text',true);
    out+=field('alasan_permintaan','Alasan permintaan perangkat','Jelaskan kebutuhan pekerjaan','textarea',true);
  } else if(service==='Gangguan aplikasi'||service==='Perubahan aplikasi'||service==='Bantuan penggunaan aplikasi'||service==='Permintaan Data / Laporan'){
    out+=select('aplikasi','Aplikasi',IT_APPLICATIONS.map(function(item){return [String(item[1]),item[0]];}),true);
    if(service==='Gangguan aplikasi'){
      out+=field('modul_halaman','Modul / halaman yang bermasalah','Contoh: login, transaksi, laporan','text',true);
      out+=field('pesan_error','Pesan error (jika ada)','Salin pesan yang tampil','text',false);
    } else if(service==='Permintaan Data / Laporan'){
      out+=field('nama_laporan','Data / laporan yang diminta','Nama data atau laporan','text',true);
      out+=field('periode','Periode data','Contoh: Januari–Maret 2026','text',true);
      out+=field('tujuan','Tujuan penggunaan','Jelaskan kebutuhan pekerjaan','text',true);
    } else out+=field('kebutuhan_aplikasi','Kebutuhan / perubahan','Jelaskan bagian yang dibutuhkan','textarea',true);
  } else if(service==='Permintaan akses aplikasi'){
    out+=select('aplikasi','Aplikasi',IT_APPLICATIONS.map(function(item){return [String(item[1]),item[0]];}),true);
    out+=field('hak_akses','Hak akses yang diminta','Peran atau modul yang diperlukan','text',true);
    out+=field('alasan_akses','Alasan dan kebutuhan pekerjaan','Jelaskan alasan permintaan','textarea',true);
  } else if(service==='Perubahan hak akses pengguna'){
    out+=field('nrp_username','NRP / Username','Masukkan NRP atau username','text',true);
    out+=field('nama_pengguna','Nama pengguna','Nama lengkap pengguna','text',true);
    out+=field('unit_divisi','Unit kerja / divisi','Nama unit atau divisi','text',true);
    out+=field('hak_akses','Hak akses yang diminta','Peran atau modul','text',true);
    out+=field('alasan_akses','Alasan perubahan akses','Jelaskan alasan','textarea',true);
  } else if(service==='Reset password akun'){
    out+=field('nrp_username','NRP / Username','Masukkan NRP atau username','text',true);
    out+=field('akun_aplikasi','Akun / aplikasi','Akun yang perlu direset','text',true);
  } else if(service==='Permintaan akses VPN'){
    out+=field('nrp_username','NRP / Username','Masukkan NRP atau username','text',true);
    out+=field('masa_akses','Masa akses (opsional)','Contoh: sampai 31/12/2026','text',false);
    out+=field('alasan_akses','Alasan dan kebutuhan pekerjaan','Jelaskan alasan','textarea',true);
  }
  return out;
}

function viewITMyTickets(){
  return '<div class="page-inner"><div class="page-head"><div><span class="eyebrow">HELPDESK · GLPI</span><h1>Tiket saya</h1><p>Status dan progres tiket yang dikirim dari akun Portal PID Anda.</p></div><button class="btn" type="button" data-it-refresh>↻ Muat ulang</button></div>'
    +'<section class="card glpi-my-tickets"><div class="glpi-ticket-intro"><div class="glpi-helpdesk-mark">'+icon('buoy',22)+'</div><div><h2>Pengajuan helpdesk</h2><p>Daftar ini hanya menampilkan tiket milik sesi SSO Anda.</p></div><span class="glpi-sso-pill">'+icon('lock',14)+' SSO</span></div><div id="glpiMyTicketsBody" class="glpi-my-tickets-body" aria-live="polite"><p class="glpi-list-state">Memuat tiket…</p></div></section></div>';
}

function loadITMyTickets(silent){
  var host=$('#glpiMyTicketsBody');if(!host||itMyTicketsRequestPending)return;
  if(!PORTAL_AUTH_TOKEN){host.innerHTML='<p class="glpi-list-state">Sesi SSO belum siap. Muat ulang portal lalu coba kembali.</p>';return;}
  itMyTicketsRequestPending=true;
  if(!silent)host.innerHTML='<p class="glpi-list-state">Memuat tiket…</p>';
  fetch('/api/glpi-tickets',{headers:{'Authorization':'Bearer '+PORTAL_AUTH_TOKEN},cache:'no-store'}).then(function(response){return response.json().catch(function(){return null;}).then(function(data){if(!response.ok)throw new Error(data&&data.error||'Daftar tiket belum dapat dimuat.');return data;});}).then(function(result){
    if(!result||!Array.isArray(result.tickets))throw new Error('Respons daftar tiket tidak valid.');
    consumePortalTicketUpdates(result.tickets);
    var snapshot=JSON.stringify(result.tickets);if(silent&&snapshot===itMyTicketsSnapshot)return;itMyTicketsSnapshot=snapshot;
    if(!result.tickets.length){host.innerHTML='<div class="glpi-list-state"><h3>Belum ada tiket</h3><p>Tiket yang Anda kirim akan muncul di sini.</p><button class="btn primary" type="button" data-it-create>'+icon('userplus',16)+' Buat tiket</button></div>';return;}
    var statuses={1:['Baru','new'],2:['Diproses','active'],3:['Direncanakan','active'],4:['Menunggu','pending'],5:['Selesai','solved'],6:['Ditutup','closed']};
    host.innerHTML='<div class="glpi-ticket-list">'+result.tickets.map(function(ticket){var s=statuses[Number(ticket.status)]||['Status tidak diketahui','pending'];var kind=Number(ticket.type)===2?'Permintaan layanan':'Laporan masalah';var date=ticket.date?new Date(ticket.date.replace(' ','T')).toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'}):'Tanggal tidak tersedia';return '<button class="glpi-ticket-row" type="button" data-it-ticket="'+esc(String(ticket.id))+'"><span class="glpi-ticket-row-main"><span class="glpi-ticket-row-title"><b>#'+esc(String(ticket.id))+' · '+esc(ticket.title)+'</b><span class="glpi-status '+s[1]+'">'+s[0]+'</span></span><small>'+esc(kind)+' · Dikirim '+esc(date)+' · Klik untuk melihat rincian dan percakapan</small></span></button>';}).join('')+'</div>';
  }).catch(function(error){if(!silent)host.innerHTML='<div class="glpi-list-state glpi-list-error"><p>'+esc(error instanceof Error?error.message:'Daftar tiket belum dapat dimuat.')+'</p><button class="btn" type="button" data-it-refresh>Coba lagi</button></div>';}).finally(function(){itMyTicketsRequestPending=false;});
}

function startITMyTicketsPolling(){
  if(itMyTicketsPollTimer)window.clearInterval(itMyTicketsPollTimer);
  itMyTicketsPollTimer=window.setInterval(function(){if(document.visibilityState==='visible'&&state.mod==='it'&&state.item==='mytickets')loadITMyTickets(true);},60000);
}

function portalNotificationScope(){
  var fallback=(typeof PORTAL_PROFILE!=='undefined'&&PORTAL_PROFILE.email)||PROFILE.email||'portal-user';
  try{var payload=PORTAL_AUTH_TOKEN.split('.')[1],normalized=payload.replace(/-/g,'+').replace(/_/g,'/');while(normalized.length%4)normalized+='=';var claims=JSON.parse(atob(normalized));return String(claims.sub||claims.email||fallback);}catch(_){return String(fallback);}
}
function portalNotificationKeys(){var suffix=encodeURIComponent(portalNotificationScope());return {items:'pidc_portal_notifications_v1_'+suffix,state:'pidc_portal_notification_state_v1_'+suffix,initialized:'pidc_portal_notification_initialized_v1_'+suffix};}
function readPortalNotifications(){try{var keys=portalNotificationKeys(),value=JSON.parse(localStorage.getItem(keys.items)||'[]');if(!Array.isArray(value))return [];var recent=value.slice(0,5);if(value.length>5)localStorage.setItem(keys.items,JSON.stringify(recent));return recent;}catch(_){return [];}}
function writePortalNotifications(items){var recent=items.slice(0,5);try{localStorage.setItem(portalNotificationKeys().items,JSON.stringify(recent));}catch(_){}renderPortalNotifications(recent);}
function renderPortalNotifications(items){
  items=items.slice(0,5);
  var list=$('#notificationList'),button=$('#bellBtn'),dot=button&&button.querySelector('.dot-alert');if(!list)return;
  var unread=items.filter(function(item){return !item.read;}).length;
  if(dot)dot.hidden=unread===0;
  if(button)button.setAttribute('aria-label',unread?'Notifikasi, '+unread+' belum dibaca':'Notifikasi');
  list.innerHTML=items.length?items.map(function(item){var date=item.createdAt?new Date(item.createdAt).toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'}):'Baru saja';return '<li class="portal-notification '+(item.read?'read':'unread')+'" data-notification-ticket="'+esc(String(item.ticketId))+'" data-notification-id="'+esc(String(item.id))+'" role="button" tabindex="0"><span class="pip"></span><span><span class="a">'+esc(item.title||'Pembaruan tiket')+'</span><span class="b">'+esc(item.message||'Tiket helpdesk diperbarui')+' · #'+esc(String(item.ticketId))+' · '+esc(date)+'</span></span></li>';}).join(''):'<li class="notif-empty">Belum ada notifikasi helpdesk.</li>';
  var readAll=$('#notifReadAll');if(readAll)readAll.disabled=!unread;
}
function consumePortalTicketUpdates(tickets){
    if(!Array.isArray(tickets))return;
    var keys=portalNotificationKeys(),known={};try{known=JSON.parse(localStorage.getItem(keys.state)||'{}');}catch(_){}
    var initialized=false;try{initialized=localStorage.getItem(keys.initialized)==='1';}catch(_){}
    var items=readPortalNotifications(),now=new Date().toISOString(),statuses={1:'Baru',2:'Diproses',3:'Direncanakan',4:'Menunggu',5:'Selesai',6:'Ditutup'};
    tickets.forEach(function(ticket){
      var id=String(ticket.id),status=Number(ticket.status),modified=String(ticket.date_mod||ticket.date||''),signature=String(status)+'|'+modified,previous=known[id];
      if(initialized&&previous&&previous.signature!==signature){
        var statusChanged=Number(previous.status)!==status;
        var noticeId=id+'|'+signature;
        if(!items.some(function(item){return item.id===noticeId;}))items.unshift({id:noticeId,ticketId:id,title:statusChanged?'Status tiket berubah: '+(statuses[status]||'Diperbarui'):'Ada pembaruan tiket',message:statusChanged?'Status “'+String(ticket.title||'Tiket GLPI')+'” berubah. Buka tiket untuk melihat detail atau pesan terbaru.':'Tiket “'+String(ticket.title||'Tiket GLPI')+'” diperbarui. Buka tiket untuk melihat detail atau pesan terbaru.',createdAt:now,read:false});
      }else if(initialized&&!previous){
        items.unshift({id:id+'|created|'+signature,ticketId:id,title:'Tiket baru dibuat',message:String(ticket.title||'Tiket GLPI'),createdAt:now,read:false});
      }
      known[id]={signature:signature,status:status};
    });
    try{localStorage.setItem(keys.state,JSON.stringify(Object.fromEntries(Object.entries(known).slice(-200))));localStorage.setItem(keys.initialized,'1');}catch(_){}
    writePortalNotifications(items);
}
function pollPortalNotifications(){
  if(!PORTAL_AUTH_TOKEN||portalNotificationRequestPending||document.visibilityState!=='visible'||state.mod==='it'&&(state.item==='mytickets'||state.item==='ticketdetail'))return;
  portalNotificationRequestPending=true;
  fetch('/api/glpi-tickets',{headers:{'Authorization':'Bearer '+PORTAL_AUTH_TOKEN},cache:'no-store'}).then(function(response){return response.json().catch(function(){return null;}).then(function(data){if(!response.ok)throw new Error(data&&data.error||'Notifikasi helpdesk belum dapat dimuat.');return data;});}).then(function(result){
    if(result&&Array.isArray(result.tickets))consumePortalTicketUpdates(result.tickets);
  }).catch(function(){}).finally(function(){portalNotificationRequestPending=false;});
}
function startPortalNotificationPolling(){
  if(portalNotificationTimer)window.clearInterval(portalNotificationTimer);
  pollPortalNotifications();
  portalNotificationTimer=window.setInterval(pollPortalNotifications,60000);
}
renderPortalNotifications(readPortalNotifications());
document.addEventListener('visibilitychange',function(){if(document.visibilityState!=='visible')return;if(state.mod==='it'&&state.item==='mytickets')loadITMyTickets(true);else if(state.mod==='it'&&state.item==='ticketdetail')loadITTicketDetail();else pollPortalNotifications();});

function viewITTicketDetail(){
  return '<div class="page-inner"><div class="page-head"><div><span class="eyebrow">HELPDESK · GLPI</span><h1>Rincian tiket</h1><p>Lihat progres dan percakapan dengan tim helpdesk.</p></div><button class="btn" type="button" data-it-back-list>← Kembali ke tiket</button></div><section class="card glpi-my-tickets glpi-ticket-detail-card"><div id="glpiTicketDetailBody" class="glpi-ticket-detail-body"><p class="glpi-list-state">Memuat rincian tiket…</p></div></section></div>';
}

function loadITTicketDetail(){
  var host=$('#glpiTicketDetailBody');if(!host||!itCurrentTicketId||itTicketDetailRequestPending)return;
  itTicketDetailRequestPending=true;
  fetch('/api/glpi-portal?resource=ticket&id='+encodeURIComponent(itCurrentTicketId),{headers:{'Authorization':'Bearer '+PORTAL_AUTH_TOKEN},cache:'no-store'}).then(function(response){return response.json().catch(function(){return null;}).then(function(data){if(!response.ok)throw new Error(data&&data.error||'Rincian tiket belum dapat dimuat.');return data;});}).then(function(result){
    if(!result||!result.ticket)throw new Error('Respons rincian tiket tidak valid.');
    consumePortalTicketUpdates([{id:result.ticket.id,title:result.ticket.title,status:result.ticket.status,date:result.ticket.date,date_mod:result.ticket.date_mod}]);
    var snapshot=JSON.stringify(result);
    if(snapshot===itTicketDetailSnapshot)return;
    var draftForm=host.querySelector('#glpiFollowupForm'),draftFile=draftForm&&draftForm.querySelector('input[type="file"]');
    if(draftFile&&draftFile.files&&draftFile.files.length)return;
    var draftMessage=draftForm&&draftForm.querySelector('textarea[name="message"]')?draftForm.querySelector('textarea[name="message"]').value:'';
    itTicketDetailSnapshot=snapshot;
    var t=result.ticket,statuses={1:['Baru','new'],2:['Diproses','active'],3:['Direncanakan','active'],4:['Menunggu','pending'],5:['Selesai','solved'],6:['Ditutup','closed']},s=statuses[Number(t.status)]||['Status tidak diketahui','pending'];
    var date=t.date?new Date(t.date.replace(' ','T')).toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'}):'Tanggal tidak tersedia';
    var followups=Array.isArray(result.followups)?result.followups:[],messages=[{id:'initial',speaker:'requester',author:t.requester||'Anda',message:t.description||'Tidak ada rincian tertulis.',date:t.date,attachments:Array.isArray(t.attachments)?t.attachments:[]}].concat(followups);
    host.innerHTML='<div class="glpi-ticket-detail-head"><div class="glpi-ticket-title-block"><span class="glpi-ticket-number">Tiket #'+esc(String(t.id))+'</span><h2>'+esc(t.title)+'</h2><p class="glpi-ticket-submeta"><span>'+icon('clock',14)+' '+esc(date)+'</span><i aria-hidden="true">·</i><span>'+icon('file',14)+' '+esc(Number(t.type)===2?'Permintaan layanan':'Laporan masalah')+'</span></p></div><div class="glpi-ticket-detail-actions"><span class="glpi-status '+s[1]+'">'+s[0]+'</span>'+(Number(t.status)>=5?'':'<button class="btn glpi-close-ticket" type="button" data-it-close-ticket>'+icon('x',15)+' Tutup tiket</button>')+'</div></div>'
      +'<section class="glpi-conversation"><div class="glpi-chat-heading"><div><h3>Percakapan</h3><p>Pesan dan solusi dari tim helpdesk tampil di sini.</p></div><span class="glpi-live-state"><i></i> Pembaruan otomatis · 10 dtk</span></div><div class="glpi-chat-stream">'+messages.map(function(m){var requester=m.speaker==='requester',attachments=Array.isArray(m.attachments)?m.attachments:[],who=requester?'Anda':m.kind==='solution'?'Solusi teknisi':'Teknisi',avatar=initials(m.author||who);return '<article class="glpi-chat-message '+(requester?'requester':'technician')+'"><span class="glpi-chat-avatar">'+esc(avatar)+'</span><div class="glpi-chat-bubble"><div class="glpi-chat-meta"><b>'+esc(m.author||who)+'</b><span>'+who+'</span><time>'+esc(m.date?new Date(String(m.date).replace(' ','T')).toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'}):'')+'</time></div><p>'+esc(m.message||'').replace(/\n/g,'<br>')+'</p>'+(attachments.length?'<div class="glpi-message-files">'+attachments.map(function(file){return '<figure><img data-glpi-document="'+esc(String(file.id))+'" data-ticket-id="'+esc(String(t.id))+'" alt="Lampiran '+esc(file.name)+'" loading="lazy"><figcaption>'+esc(file.name)+'</figcaption></figure>';}).join('')+'</div>':'')+'</div></article>';}).join('')+'</div></section>'
      +(Number(t.status)===5?'<p class="glpi-closed-note">Tiket telah diselesaikan oleh technician. Solusinya tersedia di percakapan di atas.</p>':Number(t.status)===6?'<p class="glpi-closed-note">Tiket ini sudah ditutup.</p>':'<form id="glpiFollowupForm" class="glpi-followup-form"><label for="glpiFollowupMessage">Balas ke teknisi</label><textarea class="glpi-control" id="glpiFollowupMessage" name="message" maxlength="5000" required placeholder="Tulis informasi tambahan atau balasan…"></textarea><label class="glpi-attachment-label" for="glpiFollowupFile">Lampirkan gambar (opsional)</label><input class="glpi-control glpi-file-input" type="file" id="glpiFollowupFile" name="file" accept="image/png,image/jpeg,image/webp,image/gif"><small class="glpi-field-hint">JPG, PNG, WEBP, atau GIF. Maksimal 2,5 MB.</small><div id="glpiFollowupFeedback" class="glpi-ticket-feedback" role="status" aria-live="polite" hidden></div><div class="glpi-form-actions"><span>Pesan dikirim sebagai tindak lanjut publik.</span><button class="btn primary" type="submit">Kirim balasan</button></div></form>');
    var restoredMessage=host.querySelector('#glpiFollowupMessage');if(restoredMessage)restoredMessage.value=draftMessage;
    loadGlpiDocumentPreviews(host);
  }).catch(function(error){if(host.querySelector('.glpi-list-state')&&!host.querySelector('.glpi-chat-stream'))host.innerHTML='<div class="glpi-list-state glpi-list-error"><p>'+esc(error instanceof Error?error.message:'Rincian tiket belum dapat dimuat.')+'</p><button class="btn" type="button" data-it-refresh-detail>Coba lagi</button></div>';}).finally(function(){itTicketDetailRequestPending=false;});
}

function startITTicketDetailPolling(){
  if(itTicketDetailPollTimer)window.clearInterval(itTicketDetailPollTimer);
  itTicketDetailPollTimer=window.setInterval(function(){
    if(document.visibilityState==='visible'&&state.mod==='it'&&state.item==='ticketdetail'&&itCurrentTicketId)loadITTicketDetail();
  },10000);
}

function viewITKnowledge(){
  return '<div class="page-inner"><div class="page-head"><div><span class="eyebrow">SUPPORT · GLPI</span><h1>Knowledge Base</h1><p>Artikel bantuan dari GLPI yang dipublikasikan sebagai FAQ.</p></div></div><section class="card glpi-knowledge-card"><form id="glpiKnowledgeSearch" class="glpi-knowledge-search"><input class="glpi-control" type="search" name="q" placeholder="Cari panduan atau solusi…" aria-label="Cari Knowledge Base"><button class="btn primary" type="submit">Cari</button></form><div id="glpiKnowledgeResults" class="glpi-knowledge-results"><p class="glpi-list-state">Memuat artikel…</p></div></section></div>';
}

function loadITKnowledge(query){
  var host=$('#glpiKnowledgeResults');if(!host)return;
  host.innerHTML='<p class="glpi-list-state">Memuat artikel GLPI…</p>';
  fetch('/api/glpi-portal?resource=knowledge&q='+encodeURIComponent(query||''),{headers:{'Authorization':'Bearer '+PORTAL_AUTH_TOKEN},cache:'no-store'}).then(function(response){return response.json().catch(function(){return null;}).then(function(data){if(!response.ok)throw new Error(data&&data.error||'Knowledge Base GLPI belum dapat dimuat.');return data;});}).then(function(result){
    if(!result||!Array.isArray(result.articles))throw new Error('Respons Knowledge Base tidak valid.');
    if(!result.articles.length){host.innerHTML='<p class="glpi-list-state">Belum ada artikel GLPI yang dapat dibaca oleh akun integrasi. Pastikan profil akun API memiliki hak baca Knowledge Base dan artikel memiliki Target yang mencakup pengguna portal.</p>';return;}
    host.innerHTML=result.articles.map(function(article){var answer=String(article.answer||'');var summary=answer.length>260?answer.slice(0,260)+'…':answer;return '<details class="glpi-kb-article"><summary><b>'+esc(article.title)+'</b><small>'+esc(summary||'Buka artikel untuk melihat panduan.')+'</small></summary><div class="glpi-kb-answer">'+esc(answer).replace(/\n/g,'<br>')+'</div></details>';}).join('');
  }).catch(function(error){host.innerHTML='<div class="glpi-list-state glpi-list-error"><p>'+esc(error instanceof Error?error.message:'Knowledge Base GLPI belum dapat dimuat.')+'</p><button class="btn" type="button" data-it-kb-retry>Coba lagi</button></div>';});
}

function loadITDevices(){
  var select=$('#glpiTicketDevice'),status=$('#glpiDeviceStatus');if(!select)return;
  if(!PORTAL_AUTH_TOKEN){select.innerHTML='<option value="">Sesi SSO belum siap</option>';return;}
  if(status)status.textContent='Mencari perangkat yang ditugaskan ke akun Anda…';
  fetch('/api/glpi-portal?resource=devices',{headers:{'Authorization':'Bearer '+PORTAL_AUTH_TOKEN},cache:'no-store',signal:AbortSignal.timeout(25000)}).then(function(response){return response.json().catch(function(){return null;}).then(function(data){if(!response.ok)throw new Error(data&&data.error||'Daftar perangkat belum dapat dimuat.');return data;});}).then(function(result){
    var assets=Array.isArray(result.assets)?result.assets:[];
    select.innerHTML='<option value="">Tidak terkait perangkat tertentu</option>'+assets.map(function(a){var label=a.itemtype+' · '+a.name+(a.serial?' · S/N '+a.serial:'');return '<option value="'+esc(a.itemtype+':'+a.id)+'">'+esc(label)+'</option>';}).join('');
    if(status)status.textContent=!result.linkedUser?'Email SSO ('+(result.email||'tidak tersedia')+') belum cocok dengan akun pengguna GLPI. Minta admin menambahkan email ini ke akun GLPI.':assets.length?'Pilih perangkat perusahaan yang terkait dengan masalah ini.':'Akun GLPI ditemukan, tetapi belum ada aset yang ditugaskan ke akun tersebut.';
  }).catch(function(error){var message=error instanceof Error?error.message:'Perangkat belum dapat dimuat.';select.innerHTML='<option value="">Perangkat gagal dimuat</option>';if(status)status.textContent=message;});
}

function viewITNewTicket(){
  if(!itSelectedService){
    var groups=[
      {name:'Perangkat dan Jaringan',icon:'network',description:'Perangkat kerja, koneksi, jaringan, dan instalasi software.'},
      {name:'Akses & Akun',icon:'users',description:'Akun pengguna, password, akses aplikasi, VPN, dan penonaktifan.'},
      {name:'Aplikasi',icon:'file',description:'Gangguan, perubahan, panduan, serta permintaan data aplikasi.'},
      {name:'Layanan IT Lainnya',icon:'buoy',description:'Layanan atau kendala IT lainnya.'}
    ];
    if(!itSelectedGroup)return '<div class="page-inner"><div class="page-head"><div><span class="eyebrow">HELPDESK · GLPI</span><h1>Katalog layanan IT</h1><p>Pilih kelompok layanan terlebih dahulu.</p></div><button class="btn" type="button" data-it-back>← Kembali</button></div><div class="glpi-service-catalog">'+groups.map(function(group,index){var count=IT_SERVICE_CATALOG.filter(function(service){return service.category===group.name;}).length;return '<button class="card glpi-service-card glpi-service-group" type="button" data-it-group="'+index+'"><span class="glpi-service-art">'+icon(group.icon,62,1.45)+'</span><span class="glpi-service-copy"><b>'+esc(group.name)+'</b><span>'+esc(group.description)+'</span><small>'+count+' jenis layanan</small></span><span class="glpi-service-pin" aria-hidden="true">›</span></button>';}).join('')+'</div></div>';
    return '<div class="page-inner"><div class="page-head"><div><span class="eyebrow">HELPDESK · GLPI</span><h1>'+esc(itSelectedGroup)+'</h1><p>Pilih jenis tiket di dalam kelompok layanan ini.</p></div><button class="btn" type="button" data-it-back-group>← Semua kelompok</button></div><div class="glpi-service-catalog">'+IT_SERVICE_CATALOG.map(function(service,index){return service.category===itSelectedGroup?'<button class="card glpi-service-card" type="button" data-it-service="'+index+'"><span class="glpi-service-art">'+icon(service.icon,62,1.45)+'</span><span class="glpi-service-copy"><b>'+esc(service.name)+'</b><span>'+esc(service.description)+'</span></span><span class="glpi-service-pin" aria-hidden="true">↗</span></button>':'';}).join('')+'</div></div>';
  }
  var category=itSelectedService.category,service=itSelectedService.name,ticketType=itSelectedService.type;
  var name=($('#userBtn .u1')||{}).textContent||'Pengguna Portal PID';
  var email=($('#userBtn .u2')||{}).textContent||'';
  var ssoStatus=PORTAL_AUTH_TOKEN?'SSO aktif · '+email:'Menunggu sesi SSO…';
  return '<div class="page-inner">'
    +'<div class="page-head"><div><span class="eyebrow">HELPDESK · GLPI</span><h1>Buat tiket</h1><p>'+esc(category)+' · '+esc(service)+'</p></div><button class="btn" type="button" data-it-catalog>← Kembali ke jenis layanan</button></div>'
    +'<section class="card glpi-ticket-card"><div class="glpi-ticket-intro"><div class="glpi-helpdesk-mark">'+icon('buoy',22)+'</div><div><h2>Formulir helpdesk</h2><p>Pengaju diambil dari sesi SSO Portal PID Anda.</p></div><span class="glpi-sso-pill">'+icon('lock',14)+' SSO</span></div>'
    +'<form id="glpiTicketForm" class="fm glpi-ticket-form">'
    +'<div class="glpi-requester"><span class="glpi-requester-avatar">'+esc(initials(name))+'</span><span><b>'+esc(name)+'</b><small>'+esc(email)+'</small></span><span id="ticketSsoStatus" class="glpi-sso-status">'+esc(ssoStatus)+'</span></div>'
    +'<input type="hidden" name="category" value="'+esc(category)+'"><input type="hidden" name="service" value="'+esc(service)+'">'
    +'<input type="hidden" name="glpiCategoryId" id="glpiCategoryId" value="'+esc(String(itSelectedService.glpiCategoryId||12))+'">'
    +'<div class="glpi-form-grid"><div class="glpi-field wide"><label for="glpiTicketTitle">Judul keluhan atau permintaan <i>*</i></label><input class="glpi-control" id="glpiTicketTitle" name="title" type="text" maxlength="120" required value="'+esc(service)+'"></div>'
    +'<div class="glpi-field"><label for="glpiTicketType">Jenis tiket</label><select class="glpi-control" id="glpiTicketType" name="type" required><option value="1" '+(ticketType===1?'selected':'')+'>Laporkan masalah / Report an issue</option><option value="2" '+(ticketType===2?'selected':'')+'>Permintaan layanan / Request a service</option></select></div>'
    +'<div class="glpi-field"><label for="glpiTicketUrgency">Tingkat urgensi</label><select class="glpi-control" id="glpiTicketUrgency" name="urgency"><option value="1">Sangat rendah / Very low</option><option value="2">Rendah / Low</option><option value="3" selected>Normal</option><option value="4">Tinggi / High</option><option value="5">Sangat tinggi / Very high</option></select></div>'
    +(category==='Aplikasi'?'<div class="glpi-field wide"><label for="glpiTicketApplication">Aplikasi terkait <i>*</i></label><select class="glpi-control" id="glpiTicketApplication" name="application" required><option value="">Pilih aplikasi</option>'+IT_APPLICATIONS.map(function(app){return '<option value="'+app[1]+'">'+esc(app[0])+'</option>';}).join('')+'</select></div>':'')
    +'<div class="glpi-form-grid glpi-specific-fields">'+itFormFields(service,email)+'</div>'
    +(category==='Perangkat dan Jaringan'?'<div class="glpi-field wide"><label for="glpiTicketDevice">Perangkat perusahaan terkait (opsional)</label><select class="glpi-control" id="glpiTicketDevice" name="device"><option value="">Memuat perangkat…</option></select><small id="glpiDeviceStatus" class="glpi-field-hint">Mencari perangkat yang ditugaskan ke akun Anda…</small></div>':'')
    +'<div class="glpi-field"><label for="glpiTicketLocation">Lokasi (opsional)</label><input class="glpi-control" id="glpiTicketLocation" name="location" type="text" maxlength="200" placeholder="Kantor / unit / ruangan"></div>'
    +'<div class="glpi-field wide"><label for="glpiTicketDescription">Keterangan lengkap <i>*</i></label><textarea class="glpi-control" id="glpiTicketDescription" name="description" maxlength="8000" required placeholder="Jelaskan masalah atau layanan yang dibutuhkan, kapan terjadi, dan langkah yang sudah dicoba."></textarea><small class="glpi-field-hint">Jangan masukkan kata sandi atau informasi rahasia.</small></div>'
    +'<div class="glpi-field wide"><label for="glpiTicketFile">Lampiran gambar (opsional)</label><input class="glpi-control glpi-file-input" type="file" id="glpiTicketFile" name="file" accept="image/png,image/jpeg,image/webp,image/gif"><small class="glpi-field-hint">JPG, PNG, WEBP, atau GIF. Maksimal 2,5 MB.</small><div id="glpiTicketImagePreview" class="glpi-image-preview" hidden></div></div></div>'
    +'<div id="glpiTicketFeedback" class="glpi-ticket-feedback" role="status" aria-live="polite" hidden></div>'
    +'<div class="glpi-form-actions"><span>Pengajuan dibuat menggunakan sesi SSO Portal PID.</span><button class="btn primary" type="submit">'+icon('check',16)+' Kirim tiket</button></div>'
    +'</form></section></div>';
}

function loadGlpiDocumentPreviews(host){
  Array.prototype.forEach.call(host.querySelectorAll('[data-glpi-document]'),function(img){
    fetch('/api/glpi-portal?resource=document&ticketId='+encodeURIComponent(img.dataset.ticketId)+'&id='+encodeURIComponent(img.dataset.glpiDocument),{headers:{'Authorization':'Bearer '+PORTAL_AUTH_TOKEN},cache:'no-store'}).then(function(response){return response.json().then(function(data){if(!response.ok)throw new Error(data&&data.error||'Lampiran belum bisa ditampilkan.');return data;});}).then(function(data){img.src='data:'+(data.type||'image/jpeg')+';base64,'+data.base64;}).catch(function(){img.alt='Lampiran tidak dapat dimuat';});
  });
}

var ITVIEWS={dashboard:viewITDashboard,newticket:viewITNewTicket,mytickets:viewITMyTickets,ticketdetail:viewITTicketDetail,kb:viewITKnowledge};

/* ---------- HR widgets ---------- */
var mstate={dept:null,status:null},dots=[];
function initMosaic(){
  var mosaic=$('#mosaic'),legend=$('#legend');
  legend.innerHTML=STATUS.map(function(s,i){
    return '<button class="chip" data-status="'+i+'" aria-pressed="false" style="--c:var(--s'+i+')"><i></i>'+esc(s.l)+' <em>'+fmt(s.n)+'</em></button>';
  }).join('');
  var sorted=DEPTS.map(function(d,i){return {i:i,n:d[1]};}).sort(function(a,b){return b.n-a.n;});
  mosaic.innerHTML=sorted.map(function(o,k){
    var cols=Math.max(6,Math.round(Math.sqrt(o.n)*1.3));
    var cells=deptStatus[o.i].map(function(s){return '<i class="d" data-d="'+o.i+'" data-s="'+s+'" style="--c:var(--s'+s+')"></i>';}).join('');
    return '<div class="blk" style="--k:'+k+'"><button class="blk-h" data-dept="'+o.i+'" aria-pressed="false">'+esc(DEPTS[o.i][0])+' <em>'+fmt(o.n)+'</em></button>'
      +'<div class="dots" aria-hidden="true" style="grid-template-columns:repeat('+cols+',9px)">'+cells+'</div></div>';
  }).join('');
  dots=Array.prototype.slice.call(mosaic.querySelectorAll('.d')).map(function(el){return {el:el,d:+el.dataset.d,s:+el.dataset.s};});
  mstate={dept:null,status:null};
  applyMosaic();
}
function applyMosaic(){
  var n=0;
  dots.forEach(function(o){
    var on=(mstate.dept===null||o.d===mstate.dept)&&(mstate.status===null||o.s===mstate.status);
    o.el.classList.toggle('dim',!on);if(on)n++;
  });
  Array.prototype.forEach.call(document.querySelectorAll('#legend .chip'),function(b){b.setAttribute('aria-pressed',String(mstate.status===+b.dataset.status));});
  Array.prototype.forEach.call(document.querySelectorAll('.blk-h'),function(b){b.setAttribute('aria-pressed',String(mstate.dept===+b.dataset.dept));});
  var r=$('#readout');
  if(mstate.dept===null&&mstate.status===null){
    r.innerHTML='<span><b>'+fmt(PRESENT)+'</b> of '+fmt(TOTAL)+' employees are recorded present today</span>';
  }else{
    var parts=[];if(mstate.dept!==null)parts.push(DEPTS[mstate.dept][0]);if(mstate.status!==null)parts.push(STATUS[mstate.status].l);
    r.innerHTML='<span><b>'+fmt(n)+'</b> employees · '+esc(parts.join(' · '))+'</span><button class="link-btn" id="resetMap">Show all</button>';
  }
}

function renderApprovals(){
  var list=$('#apprList');if(!list)return;
  var pend=pending();
  $('#apprCount').textContent=pend.length?pend.length+' pending':'Completed';
  if(!pend.length){list.innerHTML='<li class="empty-note" style="display:block;border:0">All requests have been processed.</li>';return;}
  list.innerHTML=pend.slice(0,5).map(function(a){
    return '<li><span class="av">'+initials(a.name)+'</span><span class="tx"><span class="a">'+esc(a.name)+'</span><span class="b">'+esc(reqWhat(a))+'</span><span class="c">'+esc(a.dept)+'</span></span>'+acts(a)+'</li>';
  }).join('')+(pend.length>5?'<li class="empty-note" style="display:block;border:0;padding:12px 0 0;text-align:left;font-size:13px">+'+(pend.length-5)+' other requests in the Leave, Overtime, and Claims menus</li>':'');
}

var toastT;
function toast(msg){var t=$('#toast');t.textContent=msg;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(function(){t.hidden=true;},2600);}

var HC={labels:['Apr','May','Jun','Jul','Aug','Sep'],hires:[14,9,17,11,16,10],exits:[6,9,5,8,7,6]};
function drawTrend(){
  var el=$('#trend');if(!el)return;
  var W=Math.max(280,el.clientWidth),H=220,m={l:32,r:16,t:16,b:30},hires=HC.hires,exits=HC.exits,n=hires.length;
  var hi=Math.ceil(Math.max.apply(null,hires.concat(exits))/5)*5+2;
  var step=(W-m.l-m.r)/n,gw=Math.min(22,step*.3);
  var y=function(v){return m.t+(hi-v)*(H-m.t-m.b)/hi;},y0=y(0);
  var aria='Grouped bar chart comparing new hires and exits by month, last 6 months';
  var s='<svg viewBox="0 0 '+W+' '+H+'" width="100%" height="'+H+'" role="img" aria-label="'+aria+'">';
  [0,Math.round(hi/2),hi].forEach(function(t){
    s+='<line class="ch-grid" x1="'+m.l+'" x2="'+(W-m.r)+'" y1="'+y(t)+'" y2="'+y(t)+'"/><text class="ch-txt" x="'+(m.l-8)+'" y="'+(y(t)+4)+'" text-anchor="end">'+t+'</text>';
  });
  hires.forEach(function(v,i){
    var cx=m.l+step*i+step/2;
    s+='<rect class="fb-in" x="'+(cx-gw-1)+'" y="'+y(v)+'" width="'+gw+'" height="'+(y0-y(v))+'" rx="2"><title>'+HC.labels[i]+' · New hires: '+v+'</title></rect>';
    s+='<rect class="fb-out" x="'+(cx+1)+'" y="'+y(exits[i])+'" width="'+gw+'" height="'+(y0-y(exits[i]))+'" rx="2"><title>'+HC.labels[i]+' · Exits: '+exits[i]+'</title></rect>';
    s+='<text class="ch-txt" x="'+cx+'" y="'+(H-8)+'" text-anchor="middle">'+HC.labels[i]+'</text>';
  });
  s+='</svg>';
  el.innerHTML=s;
  var totH=hires.reduce(function(a,b){return a+b;},0),totE=exits.reduce(function(a,b){return a+b;},0),net=totH-totE;
  $('#trendNote').textContent=totH+' new hires and '+totE+' exits over the last 6 months — a net change of '+(net>=0?'+':'')+net+' employees.';
}

/* =====================================================================
   Extended dummy data & HR pages
   ===================================================================== */
I.plus='<path d="M12 5v14M5 12h14"/>';
I.left='<path d="M15 6l-6 6 6 6"/>';
I.right='<path d="M9 6l6 6-6 6"/>';
I.info='<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>';

var NOW=new Date(2026,8,23);
var MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var DAYF=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
function dt(y,m,d){return new Date(y,m-1,d);}
function fd(x,y){return x.getDate()+' '+MON[x.getMonth()]+(y?' '+x.getFullYear():'');}
function pad(n,l){n=String(n);while(n.length<(l||2))n='0'+n;return n;}

/* ---------- My Attendance (self check-in, every employee) ---------- */
var MY_ATTEND={};
function myAttendRow(){if(!MY_ATTEND[ACCT])MY_ATTEND[ACCT]={in:null,out:null};return MY_ATTEND[ACCT];}
function myAttendToggle(){
  var r=myAttendRow(),now=new Date(),t=pad(now.getHours())+':'+pad(now.getMinutes());
  if(!r.in){r.in=t;toast('Checked in at '+t);}
  else if(!r.out){r.out=t;toast('Checked out at '+t);}
  render();
}
function myAttendCard(compact){
  var r=myAttendRow(),first=PROFILE.name.split(' ')[0];
  var status=!r.in?'Not checked in yet':!r.out?'Checked in at '+r.in:'Checked in '+r.in+' · Checked out '+r.out;
  var sub=!r.in?'Tap the button once you arrive at work.':!r.out?'Have a productive day, '+first+'.':'See you tomorrow, '+first+'!';
  var btn=!r.in?'<button class="btn primary" data-myattend="1">'+icon('check',18)+'Check In</button>'
    :!r.out?'<button class="btn" data-myattend="1">'+icon('clock',18)+'Check Out</button>'
    :'<span class="st ok">'+icon('check',14,3)+'Done for today</span>';
  return '<section class="card"'+(compact?' style="margin-bottom:24px"':' style="margin-bottom:24px"')+'><div style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">'
   +'<div style="display:flex;align-items:center;gap:14px;min-width:0"><span class="itile" style="width:44px;height:44px;border-radius:12px">'+icon('clock',22)+'</span>'
   +'<div style="min-width:0"><div style="font-size:14px;line-height:20px;font-weight:700">My Attendance — '+esc(PROFILE.name)+'</div><div class="hint" style="margin-top:2px">'+status+' · '+sub+'</div></div></div>'
   +'<div>'+btn+'</div></div></section>';
}
function rp(n){return 'Rp '+fmt(Math.round(n));}
function rpc(n){if(n>=1e9)return 'Rp '+pct(n/1e9,2)+'B';if(n>=1e6)return 'Rp '+pct(n/1e6,1)+'M';return rp(n);}
function diffDays(a,b){return Math.round((a-b)/86400000);}
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function rangeShort(r){
  if(r.s.getTime()===r.e.getTime())return fd(r.s);
  if(r.s.getMonth()===r.e.getMonth())return r.s.getDate()+'–'+r.e.getDate()+' '+MON[r.e.getMonth()];
  return fd(r.s)+' – '+fd(r.e);
}

/* ---------- Employees ---------- */
var r2=rng(4172);
function pick(a){return a[Math.floor(r2()*a.length)];}
var FN=['Adi','Agus','Ahmad','Andi','Anisa','Bagus','Bayu','Citra','Dani','Dinda','Eka','Erlangga','Fajar','Fitri','Galih','Hana','Indra','Irfan','Jihan','Kartika','Maya','Nabila','Oki','Rani','Rio','Salsa','Tegar','Utami','Vina','Wahyu','Yuni','Zahra'];
var LN=['Saputra','Wijaya','Pratama','Hidayat','Kusuma','Nugroho','Santoso','Permana','Setiawan','Utomo','Wibowo','Anggraini','Maulana','Firmansyah','Purnama','Rahayu','Suryani','Hakim','Cahyono','Sulistyo'];
var POS={
 'Operations':['Production Supervisor','Machine Operator','Production Planning Staff','Quality Inspector'],
 'Technology':['Software Engineer','DevOps Engineer','QA Engineer','Product Analyst'],
 'Sales':['Sales Executive','Account Manager','Sales Admin'],
 'Warehouse & Logistics':['Warehouse Staff','Distribution Coordinator','Checker'],
 'Finance':['Accountant','Tax Staff','Finance Analyst'],
 'Marketing':['Brand Executive','Content Specialist','Digital Marketer'],
 'Procurement':['Procurement Officer','Buyer','Vendor Analyst'],
 'Customer Service':['Customer Service','Team Leader CS'],
 'HR':['HR Business Partner','Recruiter','Payroll Staff'],
 'Legal & Compliance':['Legal Officer','Compliance Analyst']
};
var HEAD={'Operations':'Agus Salim','Warehouse & Logistics':'Hesti Rahayu','Procurement':'Dedi Firmansyah','Technology':'Bambang Irawan','Sales':'Andi Kurniawan','Marketing':'Tiara Anggun','Customer Service':'Yulia Sari','Finance':'Dewanti Putri','HR':'Rina Kusuma','Legal & Compliance':'Michael Tanuwijaya'};
var LOCS=['Head Office, Jakarta','Bandung Branch','Surabaya Branch','Cikarang Plant'];
var FIXED=[['Dewi Lestari','Operations','Production Planning Staff'],['Fikri Ramadhan','Technology','Software Engineer'],['Sari Wulandari','Sales','Account Manager'],['Hendra Gunawan','Finance','Accountant'],['Melati Anjani','Customer Service','Customer Service'],['Bagas Prakoso','Technology','DevOps Engineer'],['Nadia Safitri','Marketing','Content Specialist'],['Yoga Pratama','Warehouse & Logistics','Warehouse Staff'],['Ratna Wijaya','Finance','Finance Analyst'],['Andika Nugraha','Sales','Sales Executive'],['Gilang Saputra','Operations','Machine Operator'],['Ayu Ningsih','Warehouse & Logistics','Checker']];
var BOXL=['Enigma','Growing Talent','Star','Dilemma','Key Player','Strong Contributor','Needs Attention','Solid Performer','Trusted Professional'];
var BOXN=[38,96,74,41,232,121,27,198,146];
var RATING=[24,82,526,236,105];

var EMP=[];
(function(){
  var used={},cum=[],acc=0;
  DEPTS.forEach(function(d){acc+=d[1];cum.push(acc);});
  function deptPick(){var x=r2()*acc;for(var i=0;i<cum.length;i++)if(x<cum[i])return DEPTS[i][0];return DEPTS[0][0];}
  function stPick(){var r=r2();return r<.71?'Permanent':r<.93?'Contract':r<.98?'Probation':'Internship';}
  function todayPick(){var x=r2()*TOTAL,a=0;for(var i=0;i<STATUS.length;i++){a+=STATUS[i].n;if(x<a)return i;}return 0;}
  function add(name,dept,pos){
    var n=EMP.length+1,st=stPick(),j;
    if(st==='Permanent')j=dt(2014+Math.floor(r2()*10),1+Math.floor(r2()*12),1+Math.floor(r2()*27));
    else if(st==='Contracts')j=dt(2024+Math.floor(r2()*2),1+Math.floor(r2()*12),1+Math.floor(r2()*27));
    else j=dt(2026,6+Math.floor(r2()*3),1+Math.floor(r2()*27));
    var lvl=r2(),tier=lvl<.5?0:lvl<.85?1:2;
    var gross=Math.round([6.2e6,10.4e6,17.5e6][tier]*(0.9+r2()*0.25)/1e5)*1e5;
    var ot=(dept==='Operations'||dept==='Technology'||dept==='Warehouse & Logistics')?Math.round(r2()*0.09*gross/1e3)*1e3:0;
    var pokok=Math.round(gross*0.62/1e5)*1e5,tunj=Math.round(gross*0.30/1e5)*1e5,base=pokok+tunj,bruto=base+ot;
    var kes=Math.round(base*0.01),jht=Math.round(base*0.02),jp=Math.round(base*0.01);
    var pr=bruto<5.4e6?0:bruto<10e6?0.015:bruto<15e6?0.03:0.05,pph=Math.round(bruto*pr);
    var today=todayPick(),tin='—';
    if(today===0)tin=7*60+30+Math.floor(r2()*40);else if(today===1)tin=7*60+50+Math.floor(r2()*20);
    else if(today===2)tin=7*60+20+Math.floor(r2()*40);else if(today===3)tin=8*60+16+Math.floor(r2()*60);
    if(tin!=='—')tin=pad(Math.floor(tin/60))+'.'+pad(tin%60);
    var fn=name.split(' ')[0].toLowerCase(),ln=name.split(' ').slice(1).join('').toLowerCase();
    EMP.push({id:'E'+pad(n,3),nik:'KC-'+j.getFullYear()+'-'+pad(n*7+100,4),name:name,dept:dept,pos:pos,status:st,join:j,
      loc:pick(LOCS),email:fn+'.'+ln+'@pidc.co.id',phone:'0812-'+pad(Math.floor(r2()*9000)+1000,4)+'-'+pad(Math.floor(r2()*9000)+1000,4),
      boss:HEAD[dept],leaveLeft:Math.floor(r2()*11)+2,today:today,tin:tin,
      pay:{pokok:pokok,tunj:tunj,lembur:ot,bruto:bruto,kes:kes,jht:jht,jp:jp,pph:pph,pot:kes+jht+jp+pph,neto:bruto-kes-jht-jp-pph},
      rev:'',skor:0,box:-1});
  }
  FIXED.forEach(function(f){used[f[0]]=1;add(f[0],f[1],f[2]);});
  while(EMP.length<96){
    var nm=pick(FN)+' '+pick(LN);if(used[nm])continue;used[nm]=1;
    var d=deptPick();add(nm,d,pick(POS[d]));
  }
  // performance review data
  var doneIdx=0,bw=[],ba=0;BOXN.forEach(function(n){ba+=n;bw.push(ba);});
  EMP.forEach(function(e){
    var r=r2();e.rev=r<.62?'Completed':r<.78?'Supervisor review':r<.92?'Self-review':'Not started';
    if(e.rev==='Completed'){
      var b;if(doneIdx<9)b=doneIdx;else{var x=r2()*ba;b=0;while(x>=bw[b])b++;}
      doneIdx++;e.box=b;var k=b%3;
      e.skor=k===0?(r2()<.5?1:2):k===1?3:(r2()<.7?4:5);
    }
  });
})();

/* ---------- Requests (single source for dashboard + Leave, Overtime, Claims) ---------- */
var REQS=[
 {id:'L1',kind:'leave',pr:1,name:'Dewi Lestari',dept:'Operations',type:'Annual leave',s:dt(2026,10,28),e:dt(2026,10,30),days:3,status:'pending',note:'Family matters'},
 {id:'O1',kind:'overtime',pr:2,name:'Fikri Ramadhan',dept:'Technology',d:dt(2026,9,19),st:'09.00',en:'15.00',h:6,status:'pending',note:'Production database migration'},
 {id:'C1',kind:'claims',pr:3,name:'Sari Wulandari',dept:'Sales',no:'KLM-2609-014',cat:'Business travel',d:dt(2026,9,15),amt:1850000,status:'pending',note:'Train ticket and Surabaya accommodation'},
 {id:'D1',kind:'data',pr:4,name:'Hendra Gunawan',dept:'Finance',what:'Bank account update',status:'pending'},
 {id:'L2',kind:'leave',pr:5,name:'Melati Anjani',dept:'Customer Service',type:'Sick leave',s:dt(2026,9,23),e:dt(2026,9,24),days:2,status:'pending',note:'Doctor’s note attached'},
 {id:'L3',kind:'leave',name:'Bagas Prakoso',dept:'Technology',type:'Annual leave',s:dt(2026,10,5),e:dt(2026,10,9),days:5,status:'pending',note:'Family vacation'},
 {id:'L4',kind:'leave',name:'Nadia Safitri',dept:'Marketing',type:'Marriage leave',s:dt(2026,10,12),e:dt(2026,10,14),days:3,status:'pending',note:'Wedding invitation attached'},
 {id:'L5',kind:'leave',name:'Yoga Pratama',dept:'Warehouse & Logistics',type:'Annual leave',s:dt(2026,10,1),e:dt(2026,10,2),days:2,status:'pending',note:'Personal matters'},
 {id:'L6',kind:'leave',name:'Ratna Wijaya',dept:'Finance',type:'Maternity leave',s:dt(2026,10,5),e:dt(2027,1,2),days:90,status:'approved',note:'Midwife certificate'},
 {id:'L7',kind:'leave',name:'Andika Nugraha',dept:'Sales',type:'Annual leave',s:dt(2026,9,21),e:dt(2026,9,25),days:5,status:'approved',note:'Vacation'},
 {id:'L8',kind:'leave',name:'Siska Amelia',dept:'HR',type:'Special leave',s:dt(2026,9,22),e:dt(2026,9,22),days:1,status:'approved',note:'Civil registration matters'},
 {id:'L9',kind:'leave',name:'Lina Marlina',dept:'Procurement',type:'Annual leave',s:dt(2026,9,24),e:dt(2026,9,25),days:2,status:'approved',note:'Family matters'},
 {id:'L10',kind:'leave',name:'Rudi Hartono',dept:'Operations',type:'Annual leave',s:dt(2026,9,14),e:dt(2026,9,18),days:5,status:'approved',note:'Vacation'},
 {id:'L11',kind:'leave',name:'Dimas Aryo',dept:'Technology',type:'Annual leave',s:dt(2026,9,29),e:dt(2026,10,2),days:4,status:'rejected',note:'Conflicts with the product release schedule'},
 {id:'O2',kind:'overtime',name:'Gilang Saputra',dept:'Operations',d:dt(2026,9,18),st:'17.00',en:'21.00',h:4,status:'pending',note:'Finishing export orders'},
 {id:'O3',kind:'overtime',name:'Ayu Ningsih',dept:'Warehouse & Logistics',d:dt(2026,9,19),st:'08.00',en:'14.00',h:6,status:'pending',note:'Quarterly stock opname'},
 {id:'O4',kind:'overtime',name:'Taufik Hidayat',dept:'Operations',d:dt(2026,9,21),st:'17.00',en:'20.00',h:3,status:'approved',note:'Line 2 maintenance'},
 {id:'O5',kind:'overtime',name:'Intan Permata',dept:'Finance',d:dt(2026,9,22),st:'17.00',en:'20.00',h:3,status:'approved',note:'Monthly book closing'},
 {id:'O6',kind:'overtime',name:'Reza Mahendra',dept:'Technology',d:dt(2026,9,20),st:'10.00',en:'14.00',h:4,status:'approved',note:'Server incident response'},
 {id:'O7',kind:'overtime',name:'Dian Kusuma',dept:'Warehouse & Logistics',d:dt(2026,9,16),st:'17.00',en:'22.00',h:5,status:'rejected',note:'Exceeds the 4-hour daily limit'},
 {id:'O8',kind:'overtime',name:'Farhan Alfarizi',dept:'Operations',d:dt(2026,9,17),st:'17.00',en:'20.00',h:3,status:'approved',note:'Meeting the production target'},
 {id:'C2',kind:'claims',name:'Kevin Anggara',dept:'Technology',no:'KLM-2609-017',cat:'Health',d:dt(2026,9,17),amt:640000,status:'pending',note:'Outpatient visit, clinic receipt'},
 {id:'C3',kind:'claims',name:'Putri Ayunda',dept:'Marketing',no:'KLM-2609-019',cat:'Transport',d:dt(2026,9,18),amt:285000,status:'pending',note:'Transport to a trade show'},
 {id:'C4',kind:'claims',name:'Joko Susilo',dept:'Operations',no:'KLM-2609-009',cat:'Business travel',d:dt(2026,9,10),amt:3420000,status:'approved',note:'Supplier visit, Semarang'},
 {id:'C5',kind:'claims',name:'Mira Oktaviani',dept:'HR',no:'KLM-2609-008',cat:'Training',d:dt(2026,9,9),amt:1200000,status:'approved',note:'Certification fee'},
 {id:'C6',kind:'claims',name:'Anton Wijaya',dept:'Customer Service',no:'KLM-2609-012',cat:'Overtime meal',d:dt(2026,9,14),amt:150000,status:'paid',note:'Overtime meals, 3 days'},
 {id:'C7',kind:'claims',name:'Citra Lestari',dept:'Finance',no:'KLM-2609-002',cat:'Communication & internet',d:dt(2026,9,1),amt:350000,status:'paid',note:'Monthly data plan'},
 {id:'C8',kind:'claims',name:'Rendra Wirawan',dept:'Procurement',no:'KLM-2609-004',cat:'Business travel',d:dt(2026,9,3),amt:2760000,status:'paid',note:'Vendor audit, Bandung'},
 {id:'C9',kind:'claims',name:'Sinta Maharani',dept:'Sales',no:'KLM-2609-006',cat:'Transport',d:dt(2026,9,8),amt:410000,status:'rejected',note:'Receipt is illegible'}
];
function pending(){return REQS.filter(function(r){return r.status==='pending';}).sort(function(a,b){return (a.pr||9)-(b.pr||9);});}
function reqWhat(r){
  if(r.kind==='leave')return r.type+' · '+r.days+' days ('+rangeShort(r)+')';
  if(r.kind==='overtime')return 'Overtime · '+r.h+' hours ('+DAYF[r.d.getDay()]+', '+fd(r.d)+')';
  if(r.kind==='claims')return 'Claim: '+r.cat.toLowerCase()+' · '+rp(r.amt);
  return r.what;
}
function reqEv(r){
  if(r.kind==='leave')return r.type+' '+r.name;
  if(r.kind==='overtime')return 'Overtime '+r.name;
  if(r.kind==='claims')return 'Claim '+r.name;
  return r.what+' '+r.name;
}
function resolve(id,ok){
  var r=REQS.filter(function(x){return x.id===id;})[0];if(!r||r.status!=='pending')return;
  r.status=ok?'approved':'rejected';
  toast(reqEv(r)+(ok?' approved':' rejected'));
  if(state.mod==='hr'&&state.item==='dashboard'){renderApprovals();renderNav();}else render();
}

/* ---------- UI state ---------- */
var ui={emp:{q:'',dept:'',status:'',page:0},att:{tab:'all',page:0},leave:{tab:'all'},ot:{tab:'all'},pay:{q:'',page:0},clm:{tab:'all'},rec:{tab:'pipe'},perf:{box:'',page:0},trn:{cat:'all',tab:'catalog'},stk:{q:'',cat:'',status:'',page:0},inb:{tab:'all',page:0},out:{tab:'all',page:0},opn:{tab:'all'},wh:{zone:''},ast:{q:'',cls:'',status:'',loc:'',flag:'',page:0},dep:{cls:'IT'},mnt:{tab:'all'},lon:{tab:'all'},aud:{tab:'all'},adb:{cls:'',stage:null},ctr:{q:'',type:'',tab:'all',page:0},cmp:{ctab:'all',ftab:'all'},doc:{q:'',type:'',status:'',flag:'',page:0},ldb:{cls:'',status:''},lcat:{q:'',cat:'',aud:''},lpath:{div:''},ltrain:{tab:'all'},lcert:{q:''},leval:{tab:'all'},lreq:{tab:'all'},lassign:{q:'',tab:'all'},adraft:{},ltna:{tab:'all'},lhist:{q:'',tab:'all'}};

/* ---------- Shared builders ---------- */
function head(title,sub,act){return '<div class="page-head"><div><h1>'+title+'</h1><p>'+sub+'</p></div>'+(act||'')+'</div>';}
function kpis(arr,cls){return '<section class="kpis '+(cls||'')+'">'+arr.map(function(k){return '<div class="kpi"><div class="l">'+k[0]+'</div><div class="v">'+k[1]+'</div><div class="s'+(k[3]?' '+k[3]:'')+'">'+k[2]+'</div></div>';}).join('')+'</section>';}
function tabs(scope,key,cur,opts){
  return '<div class="tabs" role="tablist">'+opts.map(function(o){
    return '<button class="tab" role="tab" aria-selected="'+(String(cur)===String(o[0]))+'" data-tab="'+scope+'.'+key+':'+o[0]+'">'+o[1]+(o[2]!==undefined?'<em>'+o[2]+'</em>':'')+'</button>';
  }).join('')+'</div>';
}
function chip(cls,t){return '<span class="st '+cls+'">'+t+'</span>';}
function schip(i){return '<span class="st mute"><i class="sd" style="--c:var(--s'+i+')"></i>'+STATUS[i].l+'</span>';}
function who(name,sub){return '<div class="who"><span class="av">'+initials(name)+'</span><span><span class="a">'+esc(name)+'</span><span class="b">'+esc(sub)+'</span></span></div>';}
function pager(scope,total,size,page){
  var from=total?page*size+1:0,to=Math.min(total,(page+1)*size);
  return '<div class="pager"><span>'+from+'–'+to+' of '+fmt(total)+'</span><span class="pg"><button class="btn sm" data-pg="'+scope+':-1"'+(page<=0?' disabled':'')+'>Previous</button><button class="btn sm" data-pg="'+scope+':1"'+(to>=total?' disabled':'')+'>Next</button></span></div>';
}
function rst(r){var m={pending:['warn','Pending'],approved:['ok','Approved'],paid:['info','Paid'],rejected:['bad','Rejected']}[r.status];return chip(m[0],m[1]);}
function acts(r){
  if(r.status!=='pending')return '<span class="dim-txt">—</span>';
  return '<span class="acts"><button class="round" data-act="no" data-rid="'+r.id+'" aria-label="Reject: '+esc(reqEv(r))+'" title="Reject">'+icon('x',16,2)+'</button><button class="round go" data-act="ok" data-rid="'+r.id+'" aria-label="Approve: '+esc(reqEv(r))+'" title="Approve">'+icon('check',16,2.25)+'</button></span>';
}
function hbars(rows,max,f){
  return '<div>'+rows.map(function(r){return '<div class="hb-r"><span class="hb-l">'+esc(r[0])+'</span><span class="hb-t"><i style="width:'+(max?r[1]/max*100:0)+'%"></i></span><span class="hb-v">'+(f?f(r[1]):fmt(r[1]))+'</span></div>';}).join('')+'</div>';
}
function opts(list,cur,all){return '<option value="">'+all+'</option>'+list.map(function(x){return '<option value="'+esc(x)+'"'+(x===cur?' selected':'')+'>'+esc(x)+'</option>';}).join('');}
function cnt(kind,st){return REQS.filter(function(r){return r.kind===kind&&(!st||r.status===st);}).length;}
function tblWrap(inner){return '<div class="tbl-wrap">'+inner+'</div>';}

/* ---------- Drawer ---------- */
function openPanel(title,html){
  $('#dTitle').textContent=title;$('#dBody').innerHTML=html;
  $('#drawer').classList.add('open');$('#dscrim').classList.add('on');$('#drawer').setAttribute('aria-hidden','false');$('#dClose').focus();
}
function closePanel(){$('#drawer').classList.remove('open');$('#dscrim').classList.remove('on');$('#drawer').setAttribute('aria-hidden','true');}
function tenure(j){var m=(NOW.getFullYear()-j.getFullYear())*12+NOW.getMonth()-j.getMonth();if(NOW.getDate()<j.getDate())m--;var y=Math.floor(m/12),b=m%12;return (y?y+' yr ':'')+(b||!y?b+' mo':'');}
function stCls(s){return {Permanent:'ok',Contract:'info',Probation:'warn',Internship:'mute'}[s];}

/* ================= 1. Employee Data ================= */
function viewEmployees(){
  var u=ui.emp,q=u.q.toLowerCase();
  var rows=EMP.filter(function(e){return (!q||(e.name+' '+e.nik+' '+e.pos).toLowerCase().indexOf(q)>-1)&&(!u.dept||e.dept===u.dept)&&(!u.status||e.status===u.status);});
  var size=10,pages=Math.max(1,Math.ceil(rows.length/size));if(u.page>=pages)u.page=pages-1;
  var slice=rows.slice(u.page*size,u.page*size+size);
  var dreq=REQS.filter(function(r){return r.kind==='data'&&r.status==='pending';});
  var h=head('Employee Data','Directory and employment status of all employees','<button class="btn primary" data-toast="Prototype: add-employee form">'+icon('userplus',18)+'Add employee</button>');
  h+=kpis([['Permanent employees','884',pct(884/TOTAL*100,1)+'% of total'],['Contracts','271',pct(271/TOTAL*100,1)+'% of total'],['Probation','58',pct(58/TOTAL*100,1)+'% of total'],['Internship','35',pct(35/TOTAL*100,1)+'% of total']]);
  dreq.forEach(function(r){h+='<div class="banner">'+icon('info',20)+'<span class="bgrow"><b>'+esc(r.name)+'</b> · '+esc(r.what)+'  awaiting approval</span>'+acts(r)+'</div>';});
  h+='<div class="toolbar"><input class="inp" type="text" data-keep="emp-q" data-f="emp.q" value="'+esc(u.q)+'" placeholder="Search name, ID, or job title" aria-label="Search employees">'
    +'<select class="sel" data-f="emp.dept" aria-label="Filter unit">'+opts(DEPTS.map(function(d){return d[0];}),u.dept,'All units')+'</select>'
    +'<select class="sel" data-f="emp.status" aria-label="Filter employment status">'+opts(['Permanent','Contract','Probation','Internship'],u.status,'All statuses')+'</select>'
    +'<span class="spacer"></span><button class="btn" data-toast="Prototype: export employee data">'+icon('download',18)+'Export</button></div>';
  h+='<section class="card">'+tblWrap('<table class="tbl"><thead><tr><th>Employee</th><th>Job Title</th><th>Unit</th><th>Status</th><th>Joined</th><th>Location</th><th></th></tr></thead><tbody>'
    +(slice.length?slice.map(function(e){
      return '<tr class="click" tabindex="0" data-emp="'+e.id+'"><td>'+who(e.name,e.nik)+'</td><td>'+esc(e.pos)+'</td><td>'+esc(e.dept)+'</td><td>'+chip(stCls(e.status),e.status)+'</td><td>'+fd(e.join,true)+'</td><td class="muted">'+esc(e.loc)+'</td><td class="muted">'+icon('right',18)+'</td></tr>';
    }).join(''):'<tr><td colspan="7" class="empty-note">No employees match the filter.</td></tr>')
    +'</tbody></table>')+pager('emp',rows.length,size,u.page)
    +'<p class="note">Sample data: 96 of '+fmt(TOTAL)+' employees are shown in this prototype.</p></section>';
  return '<div class="page-inner">'+h+'</div>';
}
function openEmp(id){
  var e=EMP.filter(function(x){return x.id===id;})[0];if(!e)return;
  openPanel('Employee profile','<div class="prof"><span class="big">'+initials(e.name)+'</span><div><h3>'+esc(e.name)+'</h3><p>'+esc(e.pos)+' · '+esc(e.dept)+'</p></div></div>'
   +'<dl class="kv"><dt>Employee ID</dt><dd>'+e.nik+'</dd><dt>Employment status</dt><dd>'+chip(stCls(e.status),e.status)+'</dd><dt>Joined</dt><dd>'+fd(e.join,true)+'</dd><dt>Tenure</dt><dd>'+tenure(e.join)+'</dd><dt>Location</dt><dd>'+esc(e.loc)+'</dd><dt>Direct supervisor</dt><dd>'+esc(e.boss)+'</dd></dl>'
   +'<div class="kv-h">Contact</div><dl class="kv"><dt>Email</dt><dd>'+esc(e.email)+'</dd><dt>Phone</dt><dd>'+e.phone+'</dd></dl>'
   +'<div class="kv-h">Leave &amp; attendance</div><dl class="kv"><dt>Remaining annual leave</dt><dd>'+e.leaveLeft+' days</dd><dt>Attendance today</dt><dd>'+schip(e.today)+'</dd></dl>'
   +'<div class="d-actions"><button class="btn primary" data-toast="Prototype: edit-data form">Edit details</button><button class="btn" data-goto="payroll:'+e.id+'">View payslip</button></div>');
}

/* ================= 2. Organization Structure ================= */
var ORG={name:'Hendra Wijaksana',role:'President Director',dirs:[
 {role:'Operations Director',name:'Budi Santoso',units:[['Operations','Agus Salim',312],['Warehouse & Logistics','Hesti Rahayu',158],['Procurement','Dedi Firmansyah',74]]},
 {role:'Technology Director',name:'Anindya Prameswari',units:[['Engineering','Bambang Irawan',128],['Infrastructure & Security','Lukman Hakim',46],['Data & Analytics','Sekar Ayu',40]]},
 {role:'Commercial Director',name:'Rizky Hakim',units:[['Sales','Andi Kurniawan',176],['Marketing','Tiara Anggun',88],['Customer Service','Yulia Sari',60]]},
 {role:'Finance & HR Director',name:'Maya Puspita',units:[['Finance','Dewanti Putri',96],['HR','Rina Kusuma',42],['Legal & Compliance','Michael Tanuwijaya',28]]}
]};
function dirTotal(d){return d.units.reduce(function(a,u){return a+u[2];},0);}
function viewOrg(){
  var max=312;
  var cols=ORG.dirs.map(function(d,i){
    return '<div class="org-col"><button class="onode dir" data-unit="d'+i+'"><span class="r">'+esc(d.role)+'</span><span class="p">'+esc(d.name)+'</span><span class="c"><span>'+d.units.length+' units</span><span>'+fmt(dirTotal(d))+' employees</span></span></button>'
     +'<div class="org-units">'+d.units.map(function(u,j){
        return '<button class="onode" data-unit="u'+i+'-'+j+'"><span class="r">'+esc(u[0])+'</span><span class="p">'+esc(u[1])+'</span><span class="c"><span>Unit head</span><span>'+fmt(u[2])+'</span></span><span class="bar"><i style="width:'+(u[2]/max*100)+'%"></i></span></button>';
      }).join('')+'</div></div>';
  }).join('');
  return '<div class="page-inner">'+head('Organization Structure','Organization chart by directorate · click a box for details','<button class="btn" data-toast="Prototype: export org chart">'+icon('download',18)+'Export chart</button>')
   +kpis([['Directorates','4','Reporting to the President Director'],['Work units','12','Including 3 Technology teams'],['Total employees',fmt(TOTAL),'Across all locations'],['Work locations','4','Jakarta, Bandung, Surabaya, Cikarang']])
   +'<section class="card sp"><div class="org"><div class="org-in"><div class="org-top"><button class="onode ceo" data-unit="ceo"><span class="r">'+esc(ORG.role)+'</span><span class="p">'+esc(ORG.name)+'</span><span class="c"><span>4 directorates</span><span>'+fmt(TOTAL)+' employees</span></span></button></div><div class="org-cols">'+cols+'</div></div></div></section></div>';
}
function openUnit(key){
  var body='',title='';
  if(key==='ceo'){
    title=ORG.role;
    body='<div class="prof"><span class="big">'+initials(ORG.name)+'</span><div><h3>'+esc(ORG.name)+'</h3><p>'+ORG.role+'</p></div></div><dl class="kv"><dt>Directorates</dt><dd>4</dd><dt>Work units</dt><dd>12</dd><dt>Total employees</dt><dd>'+fmt(TOTAL)+'</dd></dl><div class="kv-h">Direct reports</div><dl class="kv">'+ORG.dirs.map(function(d){return '<dt>'+esc(d.role.replace('Director ',''))+'</dt><dd>'+esc(d.name)+'</dd>';}).join('')+'</dl>';
  }else if(key.charAt(0)==='d'){
    var d=ORG.dirs[+key.slice(1)];title=d.role;
    body='<div class="prof"><span class="big">'+initials(d.name)+'</span><div><h3>'+esc(d.name)+'</h3><p>'+d.role+'</p></div></div><dl class="kv"><dt>Reports to</dt><dd>'+esc(ORG.name)+'</dd><dt>Number of employees</dt><dd>'+fmt(dirTotal(d))+'</dd><dt>Share of total</dt><dd>'+pct(dirTotal(d)/TOTAL*100,1)+'%</dd></dl><div class="kv-h">Units underneath</div><dl class="kv">'+d.units.map(function(u){return '<dt>'+esc(u[0])+'</dt><dd>'+fmt(u[2])+' employees</dd>';}).join('')+'</dl>';
  }else{
    var p=key.slice(1).split('-'),dd=ORG.dirs[+p[0]],u=dd.units[+p[1]];title=u[0];
    body='<div class="prof"><span class="big">'+initials(u[1])+'</span><div><h3>'+esc(u[1])+'</h3><p>Unit head · '+esc(u[0])+'</p></div></div><dl class="kv"><dt>Reports to</dt><dd>'+esc(dd.name)+'</dd><dt>Number of employees</dt><dd>'+fmt(u[2])+'</dd><dt>Share of total</dt><dd>'+pct(u[2]/TOTAL*100,1)+'%</dd><dt>Directorates</dt><dd>'+esc(dd.role)+'</dd></dl>';
  }
  openPanel(title,body);
}

/* ================= 3. Attendance ================= */
var ATT=(function(){
  var r=rng(551),days=[];
  for(var d=1;d<=30;d++){
    var x=dt(2026,9,d),w=x.getDay(),v=null;
    if(d<=23&&w!==0&&w!==6){v=91.6+(r()-.5)*3;if(w===1)v-=1.4;if(w===5)v-=2.2;v=Math.round(v*10)/10;}
    if(d===23)v=Math.round(PRESENT/TOTAL*1000)/10;
    days.push({d:d,w:w,v:v});
  }
  return days;
})();
function viewAttendance(){
  var u=ui.att;
  var rows=EMP.filter(function(e){return u.tab==='all'||String(e.today)===u.tab;});
  var size=10,pages=Math.max(1,Math.ceil(rows.length/size));if(u.page>=pages)u.page=pages-1;
  var slice=rows.slice(u.page*size,u.page*size+size);
  var vals=ATT.filter(function(x){return x.v!==null;}).map(function(x){return x.v;});
  var avg=vals.reduce(function(a,b){return a+b;},0)/vals.length,mx=Math.max.apply(null,vals),mn=Math.min.apply(null,vals);
  var cells='<div class="wd">Mon</div><div class="wd">Tue</div><div class="wd">Wed</div><div class="wd">Thu</div><div class="wd">Fri</div><div class="wd">Sat</div><div class="wd">Sun</div>';
  var off=(ATT[0].w+6)%7;for(var i=0;i<off;i++)cells+='<div></div>';
  ATT.forEach(function(x){
    if(x.v===null){cells+='<div class="cd off">'+x.d+'</div>';return;}
    var t=clamp((x.v-86)/(94-86),0,1),bg='color-mix(in srgb, var(--brand) '+Math.round(18+t*72)+'%, var(--surface))',fg=t>.5?'var(--brand-ink)':'var(--ink)';
    cells+='<div class="cd'+(x.d===23?' today':'')+'" style="background:'+bg+';color:'+fg+'" title="'+x.d+' Sep: '+pct(x.v,1)+'%">'+x.d+'</div>';
  });
  var h=head('Attendance','Wednesday, September 23, 2026 · Updated 09:42 local time','<button class="btn" data-toast="Prototype: export attendance summary">'+icon('download',18)+'Export summary</button>');
  h+=myAttendCard();
  h+=kpis([['Present today',fmt(PRESENT),pct(PRESENT/TOTAL*100,1)+'% of '+fmt(TOTAL)+' employees'],['Remote work',fmt(STATUS[1].n),pct(STATUS[1].n/TOTAL*100,1)+'% of total'],['Late',fmt(STATUS[3].n),'Check-in cutoff 08:15'],['Not checked in',fmt(STATUS[5].n),'Automatic reminder at 10:00']]);
  h+='<div class="grid"><section class="card c8"><div class="card-head"><div><h2>Today’s attendance log</h2><p class="hint">Sample of 96 out of '+fmt(TOTAL)+' employees</p></div></div>'
    +tabs('att','tab',u.tab,[['all','All']].concat(STATUS.map(function(s,i){return [String(i),s.l];})))
    +'<div class="sp">'+tblWrap('<table class="tbl"><thead><tr><th>Employee</th><th>Check-in time</th><th>Check-in method</th><th>Status</th></tr></thead><tbody>'
    +slice.map(function(e){
      var met=['Face scan (office)','App + GPS location','Field GPS','Face scan (office)','—','—'][e.today];
      return '<tr><td>'+who(e.name,e.dept)+'</td><td class="tnum">'+e.tin+'</td><td class="muted">'+met+'</td><td>'+schip(e.today)+'</td></tr>';
    }).join('')+'</tbody></table>')+'</div>'+pager('att',rows.length,size,u.page)+'</section>'
    +'<section class="card c4"><div class="card-head"><div><h2>Attendance Calendar</h2><p class="hint">September 2026 · daily average</p></div></div><div class="cal">'+cells+'</div>'
    +'<div class="cal-legend"><span>86%</span><span class="sw" style="background:color-mix(in srgb, var(--brand) 18%, var(--surface))"></span><span class="sw" style="background:color-mix(in srgb, var(--brand) 54%, var(--surface))"></span><span class="sw" style="background:color-mix(in srgb, var(--brand) 90%, var(--surface))"></span><span>94%</span></div>'
    +'<div class="mini"><div><b>'+pct(avg,1)+'%</b><span>This month’s average</span></div><div><b>'+pct(mx,1)+'%</b><span>Highest</span></div><div><b>'+pct(mn,1)+'%</b><span>Lowest</span></div></div></section></div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= 4. Leave & Time Off ================= */
function viewLeave(){
  var u=ui.leave,all=REQS.filter(function(r){return r.kind==='leave';});
  var rows=all.filter(function(r){return u.tab==='all'||r.status===u.tab;});
  var h=head('Leave & Time Off','Requests, approvals, and the team’s absence calendar','<button class="btn primary" data-toast="Prototype: leave request form">'+icon('plus',18)+'Request leave</button>');
  h+=kpis([['Awaiting approval',cnt('leave','pending'),'Needs your action',cnt('leave','pending')?'':''],['Leave today',fmt(STATUS[4].n),'46 annual leave · 28 other leave'],['Approved this month',cnt('leave','approved'),'Including 1 maternity leave'],['Average remaining leave','7.4 days','Annual quota of 12 days']]);
  h+='<div class="grid"><section class="card c12"><div class="card-head"><div><h2>Request list</h2><p class="hint">Sorted by most recent</p></div></div>'
    +tabs('leave','tab',u.tab,[['all','All',all.length],['pending','Pending',cnt('leave','pending')],['approved','Approved',cnt('leave','approved')],['rejected','Rejected',cnt('leave','rejected')]])
    +'<div class="sp">'+tblWrap('<table class="tbl"><thead><tr><th>Employee</th><th>Type &amp; note</th><th>Date</th><th class="num">Duration</th><th>Status</th><th></th></tr></thead><tbody>'
    +(rows.length?rows.map(function(r){return '<tr><td>'+who(r.name,r.dept)+'</td><td>'+esc(r.type)+'<span class="ks" style="display:block;white-space:normal;max-width:260px">'+esc(r.note)+'</span></td><td>'+rangeShort(r)+'</td><td class="num">'+r.days+'days</td><td>'+rst(r)+'</td><td>'+acts(r)+'</td></tr>';}).join(''):'<tr><td colspan="5" class="empty-note">No requests.</td></tr>')
    +'</tbody></table>')+'</div></section>'
    +'<section class="card c4"><div class="card-head"><div><h2>Leave Type Breakdown</h2><p class="hint">Current month, all employees</p></div></div>'
    +hbars([['Annual leave',61],['Sick leave',22],['Special leave',8],['Maternity leave',6],['Marriage leave',3]],61,function(v){return v+'%';})
    +'<div class="tip-line">'+icon('info',18)+'<span>Maternity leave runs 3 months and marriage leave 3 days, per labor regulations.</span></div></section>';
  // gantt
  var W0=dt(2026,9,23),cols=[];for(var i=0;i<14;i++)cols.push(new Date(2026,8,23+i));
  var gr=all.filter(function(r){return r.status!=='rejected'&&r.e>=W0&&r.s<=cols[13];});
  var head14=cols.map(function(c,i){return '<div class="gcell'+(c.getDay()===0||c.getDay()===6?' we':'')+'" style="grid-column:'+(i+2)+'"></div><div class="gc" style="grid-column:'+(i+2)+'"><b>'+c.getDate()+'</b>'+DAYS[c.getDay()]+'</div>';}).join('');
  var body=gr.map(function(r){
    var a=Math.max(0,diffDays(r.s,W0)),b=Math.min(13,diffDays(r.e,W0));
    return '<div class="grow"><div class="gname" title="'+esc(r.name)+' · '+esc(r.type)+'">'+esc(r.name)+'</div>'
     +cols.map(function(c,i){return '<div class="gcell'+(c.getDay()===0||c.getDay()===6?' we':'')+'" style="grid-column:'+(i+2)+'"></div>';}).join('')
     +'<div class="gbar'+(r.status==='pending'?' pend':'')+'" style="grid-column:'+(a+2)+' / '+(b+3)+'" title="'+esc(r.type)+' · '+rangeShort(r)+'"></div></div>';
  }).join('');
  h+='<section class="card c8"><div class="card-head"><div><h2>Team Leave Calendar</h2><p class="hint">Next 14 days · solid = approved, dashed = pending</p></div></div><div class="gantt"><div class="gin"><div class="grow gh"><div class="gname"></div>'+head14+'</div>'+body+'</div></div></section></div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= 5. Overtime ================= */
function viewOvertime(){
  var u=ui.ot,all=REQS.filter(function(r){return r.kind==='overtime';});
  var rows=all.filter(function(r){return u.tab==='all'||r.status===u.tab;});
  var perUnit=[['Operations',1420],['Technology',1105],['Warehouse & Logistics',890],['Sales',402],['Finance',388],['Procurement',251],['Marketing',176],['Customer Service',98],['HR',52],['Legal & Compliance',30]];
  var tot=perUnit.reduce(function(a,b){return a+b[1];},0);
  var h=head('Overtime','Overtime requests and monitoring · September 2026','<button class="btn primary" data-toast="Prototype: overtime request form">'+icon('plus',18)+'Request overtime</button>');
  h+=kpis([['Total overtime hours',fmt(tot)+' hours','Current month, all units'],['Awaiting approval',cnt('overtime','pending'),'Needs your action'],['Estimated overtime cost','Rp 618M','Included in the Sep 25 payroll cycle'],['Approaching weekly limit','3 employees','18-hour weekly limit']]);
  h+='<div class="grid"><section class="card c12"><div class="card-head"><div><h2>Overtime Requests</h2><p class="hint">Sample requests from this week and before</p></div></div>'
    +tabs('ot','tab',u.tab,[['all','All',all.length],['pending','Pending',cnt('overtime','pending')],['approved','Approved',cnt('overtime','approved')],['rejected','Rejected',cnt('overtime','rejected')]])
    +'<div class="sp">'+tblWrap('<table class="tbl"><thead><tr><th>Employee</th><th>Date</th><th>Time</th><th class="num">Duration</th><th>Reason</th><th>Status</th><th></th></tr></thead><tbody>'
    +(rows.length?rows.map(function(r){return '<tr><td>'+who(r.name,r.dept)+'</td><td>'+DAYS[r.d.getDay()]+', '+fd(r.d)+'</td><td class="tnum">'+r.st+' – '+r.en+'</td><td class="num">'+r.h+' hours</td><td class="wrap">'+esc(r.note)+'</td><td>'+rst(r)+'</td><td>'+acts(r)+'</td></tr>';}).join(''):'<tr><td colspan="7" class="empty-note">No requests.</td></tr>')
    +'</tbody></table>')+'</div></section>'
    +'<section class="card c8"><div class="card-head"><div><h2>Overtime hours by unit</h2><p class="hint">Accumulated, September 2026</p></div></div>'+hbars(perUnit,perUnit[0][1],function(v){return fmt(v)+' hours';})+'</section>'
    +'<section class="card c4"><div class="card-head"><div><h2>Approaching weekly limit</h2><p class="hint">18-hour weekly limit</p></div></div>'
    +hbars([['Fikri Ramadhan',15],['Gilang Saputra',14],['Ayu Ningsih',13]],18,function(v){return v+' hours';})
    +'<div class="tip-line">'+icon('info',18)+'<span>Overtime is capped at 4 hours per day and 18 hours per week (Government Regulation No. 35/2021). Requests above the cap are flagged automatically.</span></div></section></div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= 6. Payroll ================= */
function viewPayroll(){
  var u=ui.pay,q=u.q.toLowerCase();
  var rows=EMP.filter(function(e){return !q||(e.name+' '+e.nik+' '+e.dept).toLowerCase().indexOf(q)>-1;});
  var size=8,pages=Math.max(1,Math.ceil(rows.length/size));if(u.page>=pages)u.page=pages-1;
  var slice=rows.slice(u.page*size,u.page*size+size);
  var comp=[['Base salary',7.10e9,'var(--s0)'],['Fixed allowance',3.15e9,'var(--s1)'],['Overtime',0.62e9,'var(--s2)'],['Incentives & other allowances',0.55e9,'var(--s4)']];
  var sum=comp.reduce(function(a,c){return a+c[1];},0);
  var h=head('Payroll','September 2026 period · Pay date September 25','<button class="btn" data-toast="Prototype: export bank transfer file">'+icon('download',18)+'Transfer file</button>');
  h+=kpis([['Total gross',rpc(sum),fmt(TOTAL)+' employees'],['Total deductions','Rp 1.38B','Social security and income tax'],['Total paid (net)','Rp 10.04B','After deductions'],['Cycle status','Verification','Step 2 of 4','']]);
  h+='<div class="grid"><section class="card c12"><div class="card-head"><div><h2>Payslips</h2><p class="hint">Sample of 96 employees · click a row for details</p></div></div>'
    +'<div class="toolbar" style="margin:0 0 8px"><input class="inp" type="text" data-keep="pay-q" data-f="pay.q" value="'+esc(u.q)+'" placeholder="Search name, ID, or unit" aria-label="Search payslips"></div>'
    +tblWrap('<table class="tbl"><thead><tr><th>Employee</th><th class="num">Base salary</th><th class="num">Allowance</th><th class="num">Overtime</th><th class="num">Deductions</th><th class="num">Net</th></tr></thead><tbody>'
    +(slice.length?slice.map(function(e){var p=e.pay;return '<tr class="click" tabindex="0" data-slip="'+e.id+'"><td>'+who(e.name,e.dept)+'</td><td class="num">'+rp(p.pokok)+'</td><td class="num">'+rp(p.tunj)+'</td><td class="num">'+(p.lembur?rp(p.lembur):'—')+'</td><td class="num">'+rp(p.pot)+'</td><td class="num"><b>'+rp(p.neto)+'</b></td></tr>';}).join(''):'<tr><td colspan="6" class="empty-note">No data.</td></tr>')
    +'</tbody></table>')+pager('pay',rows.length,size,u.page)+'</section>'
    +'<div class="c12" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:24px;align-items:start"><section class="card"><div class="card-head"><div><h2>Payroll Cost Breakdown</h2><p class="hint">Total gross '+rpc(sum)+'</p></div></div>'
    +'<div class="stackbar">'+comp.map(function(c){return '<i style="width:'+(c[1]/sum*100)+'%;background:'+c[2]+'"></i>';}).join('')+'</div>'
    +'<ul class="comp">'+comp.map(function(c){return '<li><span class="sq" style="background:'+c[2]+'"></span><span>'+c[0]+'</span><span class="v">'+rpc(c[1])+'</span><span class="p">'+pct(c[1]/sum*100,1)+'%</span></li>';}).join('')+'</ul></section>'
    +'<section class="card"><div class="card-head"><div><h2>Cycle status</h2><p class="hint">September 2026 period</p></div></div><ol class="steps">'
    +'<li class="done"><span class="node">'+icon('check',14,3)+'</span><span><span class="a">Attendance cut-off</span><span class="b">Attendance data locked</span></span><span class="dt">20 Sep</span></li>'
    +'<li class="now"><span class="node"></span><span><span class="a">Overtime &amp; claims verification</span><span class="b">'+(cnt('overtime','pending')+cnt('claims','pending'))+' items not yet verified</span></span><span class="dt">Sep 23</span></li>'
    +'<li><span class="node"></span><span><span class="a">Finance approval</span><span class="b">Awaiting verification to finish</span></span><span class="dt">24 Sep</span></li>'
    +'<li><span class="node"></span><span><span class="a">Salary transfer &amp; payslips issued</span><span class="b">'+fmt(TOTAL)+' employees</span></span><span class="dt">Sep 25</span></li></ol></section></div></div>';
  return '<div class="page-inner">'+h+'</div>';
}
function openSlip(id){
  var e=EMP.filter(function(x){return x.id===id;})[0];if(!e)return;var p=e.pay;
  openPanel('Payslip · September 2026','<div class="prof"><span class="big">'+initials(e.name)+'</span><div><h3>'+esc(e.name)+'</h3><p>'+e.nik+' · '+esc(e.dept)+'</p></div></div>'
   +'<div class="kv-h" style="margin-top:0;border-top:0;padding-top:0">Earnings</div><dl class="kv"><dt>Base salary</dt><dd>'+rp(p.pokok)+'</dd><dt>Fixed allowance</dt><dd>'+rp(p.tunj)+'</dd><dt>Overtime</dt><dd>'+(p.lembur?rp(p.lembur):'—')+'</dd></dl><dl class="kv kv-total" style="margin-top:12px"><dt>Total gross</dt><dd>'+rp(p.bruto)+'</dd></dl>'
   +'<div class="kv-h">Deductions</div><dl class="kv"><dt>Health Insurance (1%)</dt><dd>'+rp(p.kes)+'</dd><dt>Pension Fund JHT (2%)</dt><dd>'+rp(p.jht)+'</dd><dt>Pension Fund JP (1%)</dt><dd>'+rp(p.jp)+'</dd><dt>Income Tax PPh 21 (estimate)</dt><dd>'+(p.pph?rp(p.pph):'—')+'</dd></dl><dl class="kv kv-total" style="margin-top:12px"><dt>Total deductions</dt><dd>'+rp(p.pot)+'</dd></dl>'
   +'<div class="kv-h">Take-home</div><dl class="kv kv-total"><dt>Net salary</dt><dd>'+rp(p.neto)+'</dd></dl>'
   +'<p class="note">The PPh 21 income-tax deduction is a dummy estimate for display purposes, not an actual tax calculation.</p>'
   +'<div class="d-actions"><button class="btn primary" data-toast="Prototype: download payslip PDF">'+icon('download',18)+'Download PDF</button></div>');
}

/* ================= 7. Claims & Reimbursement ================= */
function viewClaims(){
  var u=ui.clm,all=REQS.filter(function(r){return r.kind==='claims';});
  var rows=all.filter(function(r){return u.tab==='all'||r.status===u.tab;});
  function sum(st){return all.filter(function(r){return st.indexOf(r.status)>-1;}).reduce(function(a,r){return a+r.amt;},0);}
  var byCat={};all.filter(function(r){return r.status!=='rejected';}).forEach(function(r){byCat[r.cat]=(byCat[r.cat]||0)+r.amt;});
  var catRows=Object.keys(byCat).map(function(k){return [k,byCat[k]];}).sort(function(a,b){return b[1]-a[1];});
  var h=head('Claims & Reimbursement','Employee expense reimbursement requests · September 2026','<button class="btn primary" data-toast="Prototype: new claim form">'+icon('plus',18)+'New claim</button>');
  h+=kpis([['Total submitted',rpc(sum(['pending','approved','paid','rejected'])),all.length+' claims this month'],['Awaiting approval',rpc(sum(['pending'])),cnt('claims','pending')+' claims'],['Approved, not yet paid',rpc(sum(['approved'])),cnt('claims','approved')+' claims'],['Already paid',rpc(sum(['paid'])),cnt('claims','paid')+' claims']]);
  h+='<div class="grid"><section class="card c12"><div class="card-head"><div><h2>Claim List</h2><p class="hint">Receipts and documentation are attached to each claim</p></div></div>'
    +tabs('clm','tab',u.tab,[['all','All',all.length],['pending','Pending',cnt('claims','pending')],['approved','Approved',cnt('claims','approved')],['paid','Paid',cnt('claims','paid')],['rejected','Rejected',cnt('claims','rejected')]])
    +'<div class="sp">'+tblWrap('<table class="tbl"><thead><tr><th>Claim no.</th><th>Employee</th><th>Category</th><th>Date</th><th class="num">Amount</th><th>Status</th><th></th></tr></thead><tbody>'
    +(rows.length?rows.map(function(r){return '<tr><td class="tnum">'+r.no+'</td><td>'+who(r.name,r.dept)+'</td><td>'+esc(r.cat)+'<span class="ks" style="display:block;white-space:normal;max-width:220px">'+esc(r.note)+'</span></td><td>'+fd(r.d)+'</td><td class="num"><b>'+rp(r.amt)+'</b></td><td>'+rst(r)+'</td><td>'+acts(r)+'</td></tr>';}).join(''):'<tr><td colspan="7" class="empty-note">No claims.</td></tr>')
    +'</tbody></table>')+'</div></section>'
    +'<section class="card c8"><div class="card-head"><div><h2>Claims by Category</h2><p class="hint">Excluding rejected claims</p></div></div>'+hbars(catRows,catRows[0][1],rpc)+'</section>'
    +'<section class="card c4"><div class="card-head"><div><h2>Claim Flow</h2><p class="hint">Paid together with the September 25 payroll</p></div></div><ol class="steps">'
    +'<li class="done"><span class="node">'+icon('check',14,3)+'</span><span><span class="a">Submission &amp; receipt</span><span class="b">Receipt uploaded by the employee</span></span><span></span></li>'
    +'<li class="done"><span class="node">'+icon('check',14,3)+'</span><span><span class="a">Supervisor approval</span><span class="b">Direct supervisor</span></span><span></span></li>'
    +'<li class="now"><span class="node"></span><span><span class="a">HR verification</span><span class="b">Completeness and policy check</span></span><span></span></li>'
    +'<li><span class="node"></span><span><span class="a">Finance payment</span><span class="b">Included in the payroll cycle</span></span><span></span></li></ol></section></div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= 8. Recruitment ================= */
var STAGES=['Applicants','Screening','Interview','Offer','Hired'];
var CAND=[
 ['Aditya Firmansyah','Software Engineer',78,'LinkedIn',0],['Bella Kartika','Digital Marketer',71,'Jobstreet',0],['Cahyo Nugroho','Warehouse Staff',64,'Career site',0],['Dian Puspitasari','Accountant',82,'Referral',0],['Eko Prasetyo','Sales Executive',69,'Jobstreet',0],['Farah Nabilah','Customer Service',75,'LinkedIn',0],
 ['Galuh Ananda','Data Analyst',84,'LinkedIn',1],['Hafiz Ramadhan','DevOps Engineer',88,'Referral',1],['Ika Septiani','HR Business Partner',79,'Jobstreet',1],['Jalu Wicaksono','Procurement Officer',73,'Career site',1],
 ['Kirana Dewi','Software Engineer',90,'LinkedIn',2],['Lutfi Hakim','Account Manager',86,'Referral',2],['Mega Silvia','Legal Officer',81,'Jobstreet',2],['Naufal Akbar','QA Engineer',85,'LinkedIn',2],['Olivia Tan','Finance Analyst',83,'Career site',2],
 ['Pandu Wibisono','Production Supervisor',87,'Referral',3],['Qonita Azzahra','Content Specialist',89,'LinkedIn',3],
 ['Rafi Maulana','Buyer',84,'Jobstreet',4],['Shinta Dewi','Payroll Staff',80,'Referral',4]
].map(function(c,i){return {id:'K'+i,name:c[0],pos:c[1],score:c[2],src:c[3],stage:c[4]};});
var JOBS=[
 ['Software Engineer (Backend)','Technology','Jakarta',64,'Interview',dt(2026,10,16)],['QA Engineer','Technology','Jakarta',31,'Interview',dt(2026,10,16)],['DevOps Engineer','Technology','Jakarta',27,'Application Review',dt(2026,10,30)],['Data Analyst','Technology','Jakarta',48,'Application Review',dt(2026,10,30)],
 ['Account Manager','Sales','Surabaya',22,'Interview',dt(2026,10,9)],['Sales Executive','Sales','Bandung',55,'Application Review',dt(2026,10,23)],['Content Specialist','Marketing','Jakarta',39,'Offer',dt(2026,10,2)],['Digital Marketer','Marketing','Jakarta',44,'Application Review',dt(2026,10,23)],
 ['Production Supervisor','Operations','Cikarang',18,'Offer',dt(2026,10,2)],['Machine Operator','Operations','Cikarang',72,'Application Review',dt(2026,11,6)],['Quality Inspector','Operations','Cikarang',26,'Interview',dt(2026,10,9)],['Distribution Coordinator','Warehouse & Logistics','Cikarang',33,'Application Review',dt(2026,10,30)],
 ['Procurement Officer','Procurement','Jakarta',29,'Interview',dt(2026,10,16)],['Legal Officer','Legal & Compliance','Jakarta',21,'Interview',dt(2026,10,9)],['Accountant','Finance','Jakarta',37,'Offer',dt(2026,10,2)],['Buyer','Procurement','Jakarta',25,'Offer',dt(2026,10,2)],
 ['HR Business Partner','HR','Jakarta',34,'Interview',dt(2026,10,16)],['Payroll Staff','HR','Jakarta',41,'Offer',dt(2026,10,2)]
];
function viewRecruit(){
  var u=ui.rec,inter=JOBS.filter(function(j){return j[4]==='Interview';}).length;
  var h=head('Recruitment','Openings and the candidate pipeline','<button class="btn primary" data-toast="Prototype: new job posting form">'+icon('plus',18)+'Post a job</button>');
  h+=kpis([['Open positions',JOBS.length,'Across 8 units'],['Positions at interview stage',inter,'Out of '+JOBS.length+' openings'],['Candidates in the pipeline',CAND.length,'Sample of the active pipeline'],['Average time to hire','27 days','From application to offer']]);
  h+='<div class="toolbar">'+tabs('rec','tab',u.tab,[['pipe','Candidate pipeline'],['jobs','Job list']])+'</div>';
  if(u.tab==='pipe'){
    h+='<div class="kanban">'+STAGES.map(function(s,si){
      var list=CAND.filter(function(c){return c.stage===si;});
      return '<div class="kcol"><h3>'+s+'<em>'+list.length+'</em></h3>'+list.map(function(c){
        return '<div class="kcard"><div class="kn">'+esc(c.name)+'</div><div class="ks">'+esc(c.pos)+'</div><div class="ks" style="margin-top:4px">'+esc(c.src)+'</div>'
         +'<div class="kf">'+'<span title="Score kecocokan">'+chip(c.score>=85?'ok':c.score>=75?'info':'mute','Score '+c.score)+'</span>'+'<span class="acts">'
         +'<button class="round" data-mv="'+c.id+':-1" aria-label="Move back a stage: '+esc(c.name)+'" title="Back"'+(si===0?' disabled style="opacity:.35;cursor:default"':'')+'>'+icon('left',16,2)+'</button>'
         +'<button class="round go" data-mv="'+c.id+':1" aria-label="Advance stage: '+esc(c.name)+'" title="Advance"'+(si===4?' disabled style="opacity:.35;cursor:default"':'')+'>'+icon('right',16,2)+'</button></span></div></div>';
      }).join('')+'</div>';
    }).join('')+'</div>';
  }else{
    h+='<section class="card">'+tblWrap('<table class="tbl"><thead><tr><th>Position</th><th>Unit</th><th>Location</th><th class="num">Applicants</th><th>Stage</th><th>Deadline</th></tr></thead><tbody>'
     +JOBS.map(function(j){return '<tr><td><b>'+esc(j[0])+'</b></td><td>'+esc(j[1])+'</td><td class="muted">'+j[2]+'</td><td class="num">'+j[3]+'</td><td>'+chip(j[4]==='Interview'?'info':j[4]==='Offer'?'ok':'mute',j[4])+'</td><td>'+fd(j[5],true)+'</td></tr>';}).join('')
     +'</tbody></table>')+'</section>';
  }
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= 9. Performance ================= */
function viewPerformance(){
  var u=ui.perf,totRev=BOXN.reduce(function(a,b){return a+b;},0),maxN=Math.max.apply(null,BOXN);
  var avg=RATING.reduce(function(a,n,i){return a+n*(i+1);},0)/totRev;
  var rows=EMP.filter(function(e){return u.box===''?true:e.box===+u.box;});
  var size=8,pages=Math.max(1,Math.ceil(rows.length/size));if(u.page>=pages)u.page=pages-1;
  var slice=rows.slice(u.page*size,u.page*size+size);
  var h=head('Performance','Semester I 2026 review cycle · Due September 30','<button class="btn" data-toast="Prototype: export review results">'+icon('download',18)+'Export results</button>');
  h+=kpis([['Reviews completed',pct(totRev/TOTAL*100,1)+'%',fmt(totRev)+' of '+fmt(TOTAL)+' employees'],['Average score',pct(avg,2)+' / 5','From completed reviews'],['Star Talent',fmt(BOXN[2]),pct(BOXN[2]/totRev*100,1)+'% of those reviewed'],['Needs attention',fmt(BOXN[6]),pct(BOXN[6]/totRev*100,1)+'% of those reviewed']]);
  // 9 box
  var rowsL=['High','Medium','Low'],box='';
  for(var r=0;r<3;r++){
    box+='<div class="ay">'+rowsL[r]+' potential</div>';
    for(var c=0;c<3;c++){
      var b=r*3+c,t=BOXN[b]/maxN,bg='color-mix(in srgb, var(--brand) '+Math.round(10+t*55)+'%, var(--surface))',fg=t>.6?'var(--brand-ink)':'var(--ink)';
      box+='<button class="bx" data-box="'+b+'" aria-pressed="'+(u.box!==''&&+u.box===b)+'" style="background:'+bg+';color:'+fg+'"><span class="n">'+fmt(BOXN[b])+'</span><span class="l">'+BOXL[b]+'</span></button>';
    }
  }
  box+='<span></span><div class="ax">Low performance</div><div class="ax">Medium performance</div><div class="ax">High performance</div>';
  h+='<div class="grid"><section class="card c8"><div class="card-head"><div><h2>Talent Matrix (9-box)</h2><p class="hint">Employee distribution by performance and potential · click a box to filter the table</p></div></div><div class="nine">'+box+'</div></section>'
   +'<section class="card c4"><div class="card-head"><div><h2>Score Distribution</h2><p class="hint">'+fmt(totRev)+' completed reviews</p></div></div>'
   +hbars([['5 · Outstanding',RATING[4]],['4 · Very good',RATING[3]],['3 · Meets expectations',RATING[2]],['2 · Needs improvement',RATING[1]],['1 · Below expectations',RATING[0]]],Math.max.apply(null,RATING),fmt)
   +'<div class="tip-line">'+icon('info',18)+'<span>Scores cluster around 3. Cross-unit calibration is scheduled before results are locked.</span></div></section></div>';
  h+='<section class="card sp"><div class="card-head"><div><h2>Employee Review Results</h2><p class="hint">'+(u.box===''?'Sample of 96 employees':'Sample employees in the '+BOXL[+u.box])+'</p></div>'+(u.box!==''?'<button class="link-btn" data-box="">Clear filter</button>':'')+'</div>'
   +tblWrap('<table class="tbl"><thead><tr><th>Employee</th><th>Unit</th><th class="num">Score</th><th>Talent box</th><th>Review status</th></tr></thead><tbody>'
   +(slice.length?slice.map(function(e){return '<tr><td>'+who(e.name,e.pos)+'</td><td>'+esc(e.dept)+'</td><td class="num">'+(e.skor?e.skor+' / 5':'—')+'</td><td>'+(e.box>=0?chip(e.box===2?'ok':e.box===6?'bad':'mute',BOXL[e.box]):'<span class="dim-txt">—</span>')+'</td><td>'+chip(e.rev==='Completed'?'ok':e.rev==='Not started'?'mute':'warn',e.rev)+'</td></tr>';}).join(''):'<tr><td colspan="5" class="empty-note">No sample employees in this box.</td></tr>')
   +'</tbody></table>')+pager('perf',rows.length,size,u.page)+'</section>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= 10. Training ================= */
var COURSES=[
 {id:'T1',title:'Basic Safety & Emergency Response',cat:'Mandatory',fmt:'In person',date:dt(2026,9,26),hours:6,cap:60,filled:48,me:false},
 {id:'T2',title:'Anti-Corruption & Business Ethics',cat:'Mandatory',fmt:'Online',date:dt(2026,10,8),hours:3,cap:100,filled:71,me:false},
 {id:'T3',title:'Information Security for Employees',cat:'Mandatory',fmt:'Online',date:dt(2026,10,15),hours:2,cap:200,filled:134,me:true},
 {id:'T4',title:'Leadership for New Supervisors',cat:'Leadership',fmt:'In person',date:dt(2026,10,20),hours:16,cap:30,filled:24,me:false},
 {id:'T5',title:'Advanced Excel: Data Analysis',cat:'Technical',fmt:'In person',date:dt(2026,10,6),hours:8,cap:25,filled:25,me:false},
 {id:'T6',title:'Effective Communication & Negotiation',cat:'Soft Skills',fmt:'In person',date:dt(2026,10,13),hours:8,cap:40,filled:22,me:false},
 {id:'T7',title:'Cloud Computing Fundamentals (AWS)',cat:'Technical',fmt:'Online',date:dt(2026,10,27),hours:12,cap:35,filled:19,me:false},
 {id:'T8',title:'Project Management Certification Prep',cat:'Leadership',fmt:'Online',date:dt(2026,11,3),hours:24,cap:20,filled:9,me:false}
];
var COMPLY=[['Operations',92],['Technology',96],['Sales',84],['Warehouse & Logistics',89],['Finance',97],['Marketing',81],['Procurement',90],['Customer Service',78],['HR',99],['Legal & Compliance',100]];
function viewTraining(){
  var u=ui.trn,cats=['Mandatory','Leadership','Technical','Soft Skills'];
  var list=COURSES.filter(function(c){return u.cat==='all'||c.cat===u.cat;});
  var wsum=0;COMPLY.forEach(function(c,i){wsum+=c[1]*DEPTS[i][1];});
  var comply=wsum/TOTAL,mine=COURSES.filter(function(c){return c.me;}).length;
  var h=head('Training','Catalog, enrollment, and mandatory training compliance','<button class="btn" data-toast="Prototype: download training report">'+icon('download',18)+'Training report</button>');
  h+=kpis([['Average training hours','21.4 hours','Per employee, target of 24 hours'],['Active participants','312','Currently enrolled'],['Mandatory training compliance',pct(comply,1)+'%','Weighted average across all units'],['Your enrollments',mine,'Scheduled programs']]);
  h+='<div class="toolbar">'+tabs('trn','tab',u.tab,[['catalog','Program Catalog'],['comply','Mandatory Compliance']])+'</div>';
  if(u.tab==='catalog'){
    h+='<div class="toolbar" style="margin-top:0">'+tabs('trn','cat',u.cat,[['all','All']].concat(cats.map(function(c){return [c,c];})))+'</div><div class="courses">'
     +list.map(function(c){
       var p=Math.round(c.filled/c.cap*100),full=c.filled>=c.cap&&!c.me;
       return '<article class="course"><div class="cr-top">'+chip(c.cat==='Mandatory'?'warn':'mute',c.cat)+'<span class="cr-fmt">'+c.fmt+'</span></div><h3>'+esc(c.title)+'</h3>'
        +'<p class="cr-meta">'+icon('calendar',16)+fd(c.date,true)+' · '+c.hours+' hours</p>'
        +'<div><div class="cap"><span>'+c.filled+' of '+c.cap+' participants</span><span>'+p+'%</span></div><span class="hb-t" style="margin-top:8px"><i style="width:'+p+'%"></i></span></div>'
        +'<button class="btn sm'+(c.me?'':' primary')+'" data-enr="'+c.id+'"'+(full?' disabled':'')+'>'+(c.me?'Cancel enrollment':full?'Fully booked':'Enroll')+'</button></article>';
     }).join('')+'</div>';
  }else{
    h+='<div class="grid" style="margin-top:0"><section class="card c8"><div class="card-head"><div><h2>Mandatory training completion by unit</h2><p class="hint">Safety, Anti-Corruption, and Information Security · 2026</p></div></div>'
     +hbars(COMPLY,100,function(v){return v+'%';})+'</section>'
     +'<section class="card c4"><div class="card-head"><div><h2>Mandatory training deadlines</h2><p class="hint">Programs still open</p></div></div><ul class="agenda">'
     +COURSES.filter(function(c){return c.cat==='Mandatory';}).map(function(c){return '<li><span class="date"><b>'+c.date.getDate()+'</b><span>'+MON[c.date.getMonth()]+'</span></span><span><span class="a">'+esc(c.title)+'</span><span class="b">'+(c.cap-c.filled)+' spots left</span></span></li>';}).join('')
     +'</ul></section></div>';
  }
  return '<div class="page-inner">'+h+'</div>';
}

var VIEWS={employees:viewEmployees,org:viewOrg,attendance:viewAttendance,leave:viewLeave,overtime:viewOvertime,payroll:viewPayroll,claims:viewClaims,recruit:viewRecruit,performance:viewPerformance,training:viewTraining};

/* =====================================================================
   WAREHOUSE MODULE — dummy data & pages
   ===================================================================== */
I.truck='<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>';
I.alert='<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>';
I.refresh='<path d="M20 11a8 8 0 0 0-14-4L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4l2-2M20 20v-5h-5"/>';
I.clipboard='<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/>';

var WHN='Cikarang Central Warehouse';
var WZ=[
 {k:'A',name:'Finished Goods',cols:12,rows:8,bias:.82},
 {k:'B',name:'Raw Materials',cols:10,rows:6,bias:.74},
 {k:'C',name:'Spare Parts',cols:12,rows:6,bias:.66},
 {k:'D',name:'Packaging',cols:8,rows:6,bias:.58},
 {k:'E',name:'Temperature Controlled',cols:6,rows:6,bias:.86},
 {k:'F',name:'Quarantine & Returns',cols:6,rows:4,bias:.36}
];
function zname(k){return WZ.filter(function(z){return z.k===k;})[0].name;}
function olvl(v){return v<5?0:v<40?1:v<70?2:v<90?3:4;}
var BINS=(function(){
  var r=rng(9917),out=[];
  WZ.forEach(function(z){
    for(var i=0;i<z.cols*z.rows;i++){
      var v=Math.round((z.bias+(r()-.5)*.7)*100);if(r()<.06)v=0;v=clamp(v,0,100);
      out.push({z:z.k,id:z.k+'-'+pad(i%z.cols+1)+'-'+(Math.floor(i/z.cols)+1),v:v});
    }
  });
  return out;
})();
function avg(a){return a.reduce(function(x,y){return x+y;},0)/a.length;}
var OCC=avg(BINS.map(function(b){return b.v;}));

/* ---------- Stock ---------- */
var WPOOL={
 A:[['Premium Ground Coffee 200 g (ctn 24)','ctn',150,900,412000],['Jasmine Tea Bags 25ct (ctn 48)','ctn',120,800,336000],['Granulated Sugar 1 kg (bale 20)','bale',300,1500,318000],['Cooking Oil 2 L (ctn 6)','ctn',250,1400,196000],['Passion Fruit Syrup 600 ml (ctn 12)','ctn',100,600,264000],['Coconut Biscuits 120 g (ctn 40)','ctn',180,1000,248000],['Instant Fried Noodles (ctn 40)','ctn',400,2400,118000],['UHT Chocolate Milk 200 ml (ctn 24)','ctn',350,1800,152000],['Chili Sauce Bottle 275 ml (ctn 12)','ctn',90,500,204000],['Mineral Water 600 ml (ctn 24)','ctn',500,3000,44000]],
 B:[['Arabica Coffee Beans (sack 60 kg)','sack',60,400,5400000],['Medium-Protein Wheat Flour (25 kg)','bag',200,1200,285000],['White Crystal Sugar (50 kg)','bag',150,900,640000],['RBD Palm Oil (drum 200 L)','drum',20,120,3900000],['Cocoa Powder (25 kg)','bag',40,250,1650000],['Industrial Salt (25 kg)','bag',80,500,92000],['Skim Milk Powder (25 kg)','bag',50,300,2350000],['Modified Cassava Starch (25 kg)','bag',60,350,420000]],
 C:[['Bearing 6205-2RS','pcs',40,300,68000],['V-Belt B68','pcs',30,200,124000],['Compressor Oil Filter','pcs',20,120,385000],['Pump Seal 40 mm','set',15,90,540000],['PT100 Temperature Sensor','pcs',10,80,720000],['3 HP Electric Motor','unit',3,20,7400000],['Conveyor Belt 500 mm','roll',4,24,3100000],['Gearbox Lubricant ISO VG 220 (20 L)','pail',10,60,1450000],['25 A Contactor','pcs',12,80,215000],['10 A Cartridge Fuse (box of 10)','box',20,150,86000]],
 D:[['Carton Box 40×30×25','pcs',2000,12000,6800],['PET Bottle 600 ml','pcs',8000,60000,1350],['Sticker Label Roll 100 mm','roll',60,400,42000],['Industrial Stretch Wrap','roll',80,500,68000],['Aluminum Foil Pouch 200 g','pack',30,220,185000],['Wood Pallet 120×100','pcs',150,900,92000],['Clear Packing Tape 48 mm (ctn 72)','ctn',25,160,310000],['Bottle Cap 28 mm','pcs',10000,80000,320]],
 E:[['Heat-Sensitive Natural Flavoring (2 L)','bottle',20,120,1250000],['Meat Tenderizer Enzyme (1 kg)','kg',15,90,880000],['Natural Preservative (5 kg)','pail',10,70,1120000],['Vitamin Premix (10 kg)','pail',8,50,2350000],['Liquid Natural Coloring (5 L)','bottle',12,80,760000],['Yeast Culture (500 g)','pack',20,140,295000]],
 F:[['Return: Coconut Biscuits 120 g (ctn 40)','ctn',0,0,248000],['Return: UHT Chocolate Milk 200 ml','ctn',0,0,152000],['QC Hold: Wheat Flour (batch 0921)','bag',0,0,285000],['Return: Chili Sauce Bottle 275 ml','ctn',0,0,204000],['QC Hold: Cocoa Powder (batch 0918)','bag',0,0,1650000]]
};
var WPRE={A:'BJ',B:'BB',C:'SC',D:'KM',E:'ST',F:'KR'};
var WSTK=[];
(function(){
  var r=rng(3301),n=0;
  ['A','B','C','D','E','F'].forEach(function(z){
    WPOOL[z].forEach(function(p){
      n++;var q,x=r(),min=p[2],max=p[3];
      if(z==='F')q=8+Math.floor(r()*52);
      else if(x<.13)q=Math.floor(min*(.35+r()*.55));
      else if(x<.27)q=Math.ceil(min*(1.05+r()*.18));
      else if(x<.37)q=Math.ceil(max*(1.05+r()*.15));
      else q=Math.round(min*1.3+(max*.95-min*1.3)*r());
      var st=z==='F'?'Quarantine':q<min?'Below minimum':q<min*1.25?'Low':q>max?'Overstock':'Healthy';
      WSTK.push({id:'S'+n,n:n,sku:WPRE[z]+'-'+(10000+n*37),name:p[0],zone:z,cat:zname(z),unit:p[1],min:min,max:max,price:p[4],qty:q,st:st,
        loc:z+'-'+pad(1+Math.floor(r()*12))+'-'+(1+Math.floor(r()*4))});
    });
  });
})();
var WSTC={'Healthy':'ok','Low':'warn','Below minimum':'bad','Overstock':'info','Quarantine':'mute'};
function itemCell(name,sub){return '<div class="who"><span class="itile">'+icon('box',18)+'</span><span><span class="a">'+esc(name)+'</span><span class="b">'+esc(sub)+'</span></span></div>';}
function whist(i){
  var r=rng(i.n*13+7),types=['Receiving','Shipping','Shipping','Transfer','Opname'],out=[];
  for(var k=0;k<5;k++){
    var t=types[Math.floor(r()*types.length)],mag=Math.max(1,Math.round(((i.max||60)-(i.min||0))*(.04+r()*.16))),
        sign=t==='Receiving'?1:t==='Shipping'?-1:(r()<.5?-1:1);
    if(t==='Opname')mag=Math.max(1,Math.round(mag/8));
    var ref=t==='Receiving'?'GR-2609-'+(1100+Math.floor(r()*40)):t==='Shipping'?'DO-2609-'+(2200+Math.floor(r()*90)):t==='Transfer'?'TF-2609-'+(300+Math.floor(r()*40)):'OPN-Q3-'+(10+Math.floor(r()*30));
    out.push({d:new Date(2026,8,22-k*2-Math.floor(r()*2)),t:t,q:sign*mag,ref:ref});
  }
  return out;
}

/* ---------- Inbound ---------- */
var INS=['Scheduled','Arrived at dock','Unloading','QC inspection','Completed'];
var INC=['mute','info','info','warn','ok'];
var VEND=['PT Agro Prima','PT Sumber Pangan Nusantara','CV Mitra Kemasan','PT Kimia Sejahtera','PT Logam Perkasa','CV Berkah Plastik','PT Tirta Sarana','PT Teknik Mandiri','PT Cahaya Kemasindo'];
var VZ=['B','B','D','E','C','D','A','C','D'];
function mkLines(zone,seed,n,scale){
  var r=rng(seed),pool=WSTK.filter(function(i){return i.zone===zone;}),out=[],used={};
  while(out.length<Math.min(n,pool.length)){
    var it=pool[Math.floor(r()*pool.length)];if(used[it.id])continue;used[it.id]=1;
    var q=Math.max(1,Math.round(((it.max||60)-(it.min||0))*(scale||.12)*(.5+r())/5)*5);
    out.push({name:it.name,unit:it.unit,qty:q,price:it.price,short:r()<.22?Math.max(1,Math.round(q*.06)):0});
  }
  return out;
}
var INB=(function(){
  var rows=[
   ['07.30',0,'M1',4],['07.45',1,'M2',4],['08.00',2,'M3',4],['08.00',3,'M4',4],['08.15',4,'M1',4],['08.30',5,'M2',4],['08.45',6,'M3',4],['09.00',7,'M4',4],
   ['09.00',0,'M1',3],['09.15',1,'M2',2],['09.15',8,'M3',2],['09.30',3,'M4',1],
   ['09.20',4,'—',0],['09.30',7,'—',0],['10.30',0,'—',0],['11.00',5,'—',0],['13.30',6,'—',0]
  ].map(function(x){return {jam:x[0],v:x[1],dock:x[2],st:x[3],day:0};});
  [['08.00',1],['09.00',2],['10.00',3],['13.00',0],['14.00',4]].forEach(function(x){rows.push({jam:x[0],v:x[1],dock:'—',st:0,day:1});});
  return rows.map(function(r,i){
    var lines=mkLines(VZ[r.v],500+i*17,2+i%3,.12);
    return {id:'I'+i,no:'GR-2609-'+(1140+i),po:'PO-2609-'+(310+i*3),vendor:VEND[r.v],zone:VZ[r.v],jam:r.jam,dock:r.dock,st:r.st,day:r.day,pallets:4+(i*7)%19,lines:lines};
  });
})();
function inLate(r){return r.day===0&&r.st===0&&r.jam<'09.42';}

/* ---------- Outbound ---------- */
var OUSN=['Picking','Packing','Ready to ship','In transit','Delivered','Delayed'];
var OUC=['mute','info','warn','info','ok','bad'];
var CUST=[['PT Ritel Sentosa','DC Cibitung'],['CV Bintang Pangan','Bandung'],['UD Makmur Abadi','Cirebon'],['PT Mega Distribusi','Semarang'],['Toko Grosir Harapan','Bogor'],['PT Nusa Retail','Tangerang'],['CV Tani Makmur','Karawang'],['PT Sinar Logistik','Surabaya'],['Bandung Branch','Inter-warehouse transfer'],['Surabaya Branch','Inter-warehouse transfer'],['PT Kuliner Prima','Jakarta'],['Anggrek Hotel & Catering','Bekasi']];
var ARM=['Own fleet · B 9123 KCA','Cepat Nusa Courier','Lintas Jawa Courier','Own fleet · B 9187 KCA'];
var OUT=(function(){
  var rows=[
   ['06.30',0,4],['07.00',1,4],['07.30',2,4],['07.30',3,4],['08.00',4,4],['08.00',5,4],
   ['08.30',6,3],['08.45',7,3],['09.00',8,3],['09.00',9,3],['09.15',10,3],['09.15',11,3],['09.30',0,3],
   ['10.00',1,2,'K1'],['10.15',4,2,'K2'],['10.30',5,2,'K3'],
   ['10.45',6,1],['11.00',10,1],['11.30',11,0],
   ['09.30',2,5,'—','Waiting on stock (SKU below minimum)'],['10.00',3,5,'—','Fleet not yet available'],['11.00',7,5,'—','Shipping documents incomplete'],['13.00',9,5,'—','Awaiting customer credit approval'],['14.00',8,5,'—','Destination address needs confirmation']
  ];
  return rows.map(function(x,i){
    var lr=rng(900+i*11),koli=8+Math.floor(lr()*112);
    return {id:'O'+i,no:'DO-2609-'+(2210+i),so:'SO-2609-'+(1800+i*4),cust:CUST[x[1]][0],city:CUST[x[1]][1],jam:x[0],st:x[2],dock:x[3]||'—',koli:koli,kg:Math.round(koli*(8+lr()*14)),arm:ARM[i%4],why:x[4]||'',lines:mkLines('A',700+i*13,2+i%3,.1)};
  });
})();

/* ---------- Opname ---------- */
var OPZ=[
 {k:'A',dates:'21 Sep',who:'Yoga Pratama, Ayu Ningsih',prog:100,skus:1840},
 {k:'B',dates:'21–22 Sep',who:'Hesti Rahayu, Cahyo Nugroho',prog:100,skus:1120},
 {k:'C',dates:'22–24 Sep',who:'Bagas Prakoso, Farhan Alfarizi',prog:72,skus:1610},
 {k:'D',dates:'23–25 Sep',who:'Dian Kusuma, Ayu Ningsih',prog:40,skus:680},
 {k:'E',dates:'25 Sep',who:'Hesti Rahayu, Yoga Pratama',prog:0,skus:420},
 {k:'F',dates:'22 Sep',who:'Cahyo Nugroho',prog:100,skus:200}
];
var VAR=[
 {id:'V1',item:'Bearing 6205-2RS',zone:'C',unit:'pcs',sys:182,phy:176,cost:68000,cause:'Picked wrong item (similar code)',st:'Needs review'},
 {id:'V2',item:'Carton Box 40×30×25',zone:'D',unit:'pcs',sys:4820,phy:4790,cost:6800,cause:'Receiving miscount',st:'Needs review'},
 {id:'V3',item:'White Crystal Sugar (50 kg)',zone:'B',unit:'bag',sys:410,phy:404,cost:640000,cause:'Bag damaged and discarded',st:'Needs review'},
 {id:'V4',item:'PT100 Temperature Sensor',zone:'C',unit:'pcs',sys:36,phy:38,cost:720000,cause:'Not yet identified',st:'Needs review'},
 {id:'V5',item:'Cooking Oil 2 L (ctn 6)',zone:'A',unit:'ctn',sys:640,phy:632,cost:196000,cause:'Picked wrong item (similar code)',st:'Needs review'},
 {id:'V6',item:'PET Bottle 600 ml',zone:'D',unit:'pcs',sys:22400,phy:22150,cost:1350,cause:'Receiving miscount',st:'Needs review'},
 {id:'V7',item:'Cocoa Powder (25 kg)',zone:'B',unit:'bag',sys:96,phy:95,cost:1650000,cause:'Expired and disposed',st:'Approved'},
 {id:'V8',item:'Compressor Oil Filter',zone:'C',unit:'pcs',sys:44,phy:45,cost:385000,cause:'Shipping miscount',st:'Approved'},
 {id:'V9',item:'Mineral Water 600 ml (ctn 24)',zone:'A',unit:'ctn',sys:1280,phy:1274,cost:44000,cause:'Packaging damaged',st:'Approved'},
 {id:'V10',item:'Pump Seal 40 mm',zone:'C',unit:'set',sys:29,phy:24,cost:540000,cause:'Not yet identified',st:'Recount'}
];
var OPN_SKU=5870,OPN_DIFF=82;
function rps(n){return (n<0?'−':n>0?'+':'')+'Rp '+fmt(Math.abs(Math.round(n)));}
function vdiff(v){return v.phy-v.sys;}

/* ---------- Actions ---------- */
function freeDock(kind){
  var ids=kind==='in'?['M1','M2','M3','M4']:['K1','K2','K3','K4','K5'];
  return ids.filter(function(d){return kind==='in'?!INB.some(function(x){return x.day===0&&x.dock===d&&x.st>=1&&x.st<=3;}):!OUT.some(function(x){return x.dock===d&&x.st===2;});})[0];
}
function advIn(id){
  var r=INB.filter(function(x){return x.id===id;})[0];if(!r||r.st>=4)return;
  if(r.st===0){var f=freeDock('in');if(!f){toast('All inbound docks are in use. Finish one receipt first.');return;}r.dock=f;}
  r.st++;toast(r.no+' · '+r.vendor+': '+INS[r.st]+(r.st===1?' di dok '+r.dock:''));render();
}
function advOut(id){
  var r=OUT.filter(function(x){return x.id===id;})[0];if(!r||r.st===4)return;
  if(r.st===5){r.st=0;r.dock='—';r.why='';toast(r.no+' reprocessed from the picking stage');render();return;}
  if(r.st===1){var f=freeDock('out');if(!f){toast('All outbound docks are in use.');return;}r.dock=f;}
  r.st++;toast(r.no+' · '+r.cust+': '+OUSN[r.st]);render();
}
function resVar(id,ok){
  var v=VAR.filter(function(x){return x.id===id;})[0];if(!v||v.st!=='Needs review')return;
  v.st=ok?'Approved':'Recount';toast(v.item+(ok?': stock adjustment approved':': recount scheduled'));render();
}
function pendVar(){return VAR.filter(function(v){return v.st==='Needs review';});}

/* ---------- Shared bits ---------- */
function dockTiles(kind){
  var ids=kind==='in'?['M1','M2','M3','M4']:['K1','K2','K3','K4','K5'];
  return '<div class="dtiles">'+ids.map(function(d){
    var o=kind==='in'?INB.filter(function(x){return x.day===0&&x.dock===d&&x.st>=1&&x.st<=3;})[0]:OUT.filter(function(x){return x.dock===d&&x.st===2;})[0];
    return '<div class="dt'+(o?' on':'')+'"><b>Dock '+d+'</b><span class="n">'+(o?esc(kind==='in'?o.vendor:o.cust):'Empty')+'</span><span class="s">'+(o?(kind==='in'?INS[o.st]:'Ready to load'):'Available')+'</span></div>';
  }).join('')+'</div>';
}
function whHead(title,sub,act){return head(title,esc(WHN)+' · '+sub,act);}

/* ================= Dashboard ================= */
var FLOW=(function(){
  var r=rng(771),out=[];
  for(var d=10;d<=23;d++){
    var x=dt(2026,9,d),w=x.getDay(),f=(w===0||w===6)?.32:1;
    var a=Math.round((165+(r()-.5)*44)*f),b=Math.round((190+(r()-.5)*50)*f);
    if(d===23){a=92;b=88;}
    out.push({d:d,a:a,b:b});
  }
  return out;
})();
function drawFlow(){
  var el=document.getElementById('flow');if(!el)return;
  var W=Math.max(280,el.clientWidth),H=220,m={l:36,r:8,t:12,b:28},max=260,n=FLOW.length;
  var plotW=W-m.l-m.r,step=plotW/n,bw=Math.min(12,step*.34);
  var y=function(v){return m.t+(max-v)*(H-m.t-m.b)/max;};
  var s='<svg viewBox="0 0 '+W+' '+H+'" width="100%" height="'+H+'" role="img" aria-label="Bar chart of inbound and outbound pallets over the last 14 days">';
  [0,100,200].forEach(function(t){s+='<line class="ch-grid" x1="'+m.l+'" x2="'+(W-m.r)+'" y1="'+y(t)+'" y2="'+y(t)+'"/><text class="ch-txt" x="'+(m.l-8)+'" y="'+(y(t)+4)+'" text-anchor="end">'+t+'</text>';});
  FLOW.forEach(function(f,i){
    var cx=m.l+step*i+step/2;
    s+='<rect class="fb-in" x="'+(cx-bw-1)+'" y="'+y(f.a)+'" width="'+bw+'" height="'+(y(0)-y(f.a))+'" rx="2"><title>'+f.d+' Sep · inbound '+f.a+' pallets</title></rect>';
    s+='<rect class="fb-out" x="'+(cx+1)+'" y="'+y(f.b)+'" width="'+bw+'" height="'+(y(0)-y(f.b))+'" rx="2"><title>'+f.d+' Sep · outbound '+f.b+' pallets</title></rect>';
    if(i%2===0||i===n-1)s+='<text class="ch-txt" x="'+cx+'" y="'+(H-8)+'" text-anchor="middle">'+f.d+'</text>';
  });
  s+='</svg>';el.innerHTML=s;
}
function viewWhDash(){
  var u=ui.wh,full=FLOW.slice(0,-1),avIn=Math.round(avg(full.map(function(f){return f.a;}))),avOut=Math.round(avg(full.map(function(f){return f.b;})));
  var near=BINS.filter(function(b){return b.v>=90;}).length,acc=(OPN_SKU-OPN_DIFF)/OPN_SKU*100;
  var inToday=INB.filter(function(r){return r.day===0;}),outLate=OUT.filter(function(r){return r.st===5;}).length,late=INB.filter(inLate).length;
  var low=WSTK.filter(function(i){return i.st==='Below minimum';}).sort(function(a,b){return a.qty/a.min-b.qty/b.min;}).slice(0,5);
  var h=whHead('Dashboard','Wednesday, September 23, 2026 · Updated 09:42 local time','<button class="btn" data-toast="Prototype: export warehouse summary">'+icon('download',18)+'Export summary</button>');
  h+=kpis([['Active SKUs','8.412','Across 6 storage zones'],['Inventory value','Rp 48.7 B','Average cost basis'],['Warehouse occupancy',pct(OCC,1)+'%',fmt(near)+' of '+fmt(BINS.length)+' locations nearly full'],['Stock accuracy',pct(acc,1)+'%','Q3 opname result · '+fmt(OPN_DIFF)+' SKU discrepancy']]);
  var zones=WZ.map(function(z){
    var bins=BINS.filter(function(b){return b.z===z.k;}),dim=u.zone&&u.zone!==z.k;
    return '<div class="wz'+(dim?' dim':'')+'"><button class="wz-h" data-zone="'+z.k+'" aria-pressed="'+(u.zone===z.k)+'">'+z.k+' · '+esc(z.name)+' <em>'+pct(avg(bins.map(function(b){return b.v;})),0)+'%</em></button>'
      +'<div class="bins" aria-hidden="true" style="grid-template-columns:repeat('+z.cols+',12px)">'+bins.map(function(b){return '<i class="bn l'+olvl(b.v)+'" data-tip="'+b.id+' · '+b.v+'% filled"></i>';}).join('')+'</div></div>';
  }).join('');
  function dk(kind){
    var ids=kind==='in'?['M1','M2','M3','M4']:['K1','K2','K3','K4','K5'];
    return ids.map(function(d){
      var o=kind==='in'?INB.filter(function(x){return x.day===0&&x.dock===d&&x.st>=1&&x.st<=3;})[0]:OUT.filter(function(x){return x.dock===d&&x.st===2;})[0];
      return '<span class="dk'+(o?' on':'')+'" title="'+(o?esc(kind==='in'?o.vendor:o.cust):'Empty')+'"><i></i>'+d+'</span>';
    }).join('');
  }
  h+='<div class="grid"><section class="card c8" aria-labelledby="t-wmap"><div class="card-head"><div><h2 id="t-wmap">Warehouse Map</h2><p class="hint">1 square = 1 rack location. Color shows fill level. Click a zone name to highlight.</p></div>'+(u.zone?'<button class="link-btn" data-zone="">Show all</button>':'')+'</div>'
    +'<div class="plan">'+zones+'</div>'
    +'<div class="legend-o"><span><i style="background:var(--field);box-shadow:inset 0 0 0 1px var(--line)"></i>Empty</span><span><i style="background:color-mix(in srgb,var(--brand) 24%,var(--surface))"></i>Below 40%</span><span><i style="background:color-mix(in srgb,var(--brand) 52%,var(--surface))"></i>40–70%</span><span><i style="background:color-mix(in srgb,var(--brand) 84%,var(--surface))"></i>70–90%</span><span><i style="background:var(--s4)"></i>90% or more</span></div>'
    +'<div class="docks"><div class="dk-g"><span class="dk-t">Inbound docks</span>'+dk('in')+'</div><div class="dk-g"><span class="dk-t">Outbound docks</span>'+dk('out')+'</div></div></section>'
    +'<section class="card c4" aria-labelledby="t-wal"><div class="card-head"><div><h2 id="t-wal">Needs Attention</h2><p class="hint">Click to open the related list</p></div></div><ul class="alerts">'
    +'<li><button data-wgo="stock:status:Below minimum"><span class="al-ico bad">'+icon('alert',20)+'</span><span><span class="a">Below minimum stock</span><span class="b">SKUs need restocking</span></span><span class="al-n">137</span></button></li>'
    +'<li><button data-wgo="outbound:tab:late"><span class="al-ico warn">'+icon('truck',20)+'</span><span><span class="a">Delayed shipments</span><span class="b">Needs follow-up</span></span><span class="al-n">'+outLate+'</span></button></li>'
    +'<li><button data-wgo="inbound:tab:sched"><span class="al-ico warn">'+icon('clock',20)+'</span><span><span class="a">Delayed receipts</span><span class="b">Not yet arrived per schedule</span></span><span class="al-n">'+late+'</span></button></li>'
    +'<li><button data-wgo="opname:tab:Needs review"><span class="al-ico info">'+icon('clipboard',20)+'</span><span><span class="a">Opname discrepancies</span><span class="b">Awaiting review</span></span><span class="al-n">'+pendVar().length+'</span></button></li></ul></section>'
    +'<section class="card r3a" aria-labelledby="t-flow"><div class="card-head"><div><h2 id="t-flow">Goods Flow</h2><p class="hint">Pallets in and out, last 14 days</p></div></div>'
    +'<div class="legend-o" style="margin:0 0 8px"><span><i style="background:var(--brand)"></i>Inbound</span><span><i style="background:var(--s2)"></i>Outbound</span></div><div id="flow"></div>'
    +'<p class="insight">Average for a full day: '+avIn+' pallets in and '+avOut+'pallets out per day. Today is still in progress.</p></section>'
    +'<section class="card r3b" aria-labelledby="t-dock"><div class="card-head"><div><h2 id="t-dock">Dock Schedule</h2><p class="hint">Upcoming activity today</p></div></div><ul class="dkl">'
    +inToday.filter(function(r){return r.st<4;}).map(function(r){return {t:r.jam,k:'Inbound',w:r.vendor,d:r.dock,s:INS[r.st],c:INC[r.st]};})
      .concat(OUT.filter(function(r){return r.st<=2;}).map(function(r){return {t:r.jam,k:'Outbound',w:r.cust,d:r.dock,s:OUSN[r.st],c:OUC[r.st]};}))
      .sort(function(a,b){return a.t<b.t?-1:a.t>b.t?1:0;}).slice(0,6)
      .map(function(e){return '<li><span class="t">'+e.t+'</span><span><span class="a">'+esc(e.w)+'</span><span class="b">'+e.k+(e.d!=='—'?' · Dock '+e.d:'')+'</span></span>'+chip(e.c,e.s)+'</li>';}).join('')
    +'</ul></section>'
    +'<section class="card r3c" aria-labelledby="t-low"><div class="card-head"><div><h2 id="t-low">Critical Stock</h2><p class="hint">Stock-to-minimum ratio</p></div></div>'
    +(low.length?low.map(function(i){var p=Math.round(i.qty/i.min*100);return '<div class="crit"><div class="cl"><span class="cn" title="'+esc(i.name)+'">'+esc(i.name)+'</span><span class="cv">'+fmt(i.qty)+' / '+fmt(i.min)+'</span></div><span class="hb-t"><i style="width:'+p+'%;background:var(--danger)"></i></span></div>';}).join(''):'<p class="note">No SKUs below minimum in the sample.</p>')
    +'</section></div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= Stock Items ================= */
function viewStock(){
  var u=ui.stk,q=u.q.toLowerCase();
  var rows=WSTK.filter(function(i){return (!q||(i.name+' '+i.sku+' '+i.loc).toLowerCase().indexOf(q)>-1)&&(!u.cat||i.cat===u.cat)&&(!u.status||i.st===u.status);});
  var size=10,pages=Math.max(1,Math.ceil(rows.length/size));if(u.page>=pages)u.page=pages-1;
  var slice=rows.slice(u.page*size,u.page*size+size);
  var h=whHead('Stock Items','Inventory by SKU and rack location','<button class="btn" data-toast="Prototype: export stock list">'+icon('download',18)+'Export</button>');
  h+=kpis([['Active SKUs','8.412','6 categories'],['Inventory value','Rp 48.7 B','Average cost basis'],['Below minimum','137','842 more are low'],['Inventory turnover','6.2×','Per year, last 12 months']]);
  h+='<div class="toolbar"><input class="inp" type="text" data-keep="stk-q" data-f="stk.q" value="'+esc(u.q)+'" placeholder="Search item name, SKU, or location" aria-label="Search item">'
    +'<select class="sel" data-f="stk.cat" aria-label="Filter category">'+opts(WZ.map(function(z){return z.name;}),u.cat,'All categories')+'</select>'
    +'<select class="sel" data-f="stk.status" aria-label="Filter stock status">'+opts(['Healthy','Low','Below minimum','Overstock','Quarantine'],u.status,'All statuses')+'</select></div>';
  h+='<section class="card">'+tblWrap('<table class="tbl"><thead><tr><th>Item</th><th>Category</th><th>Location</th><th class="num">Stock</th><th class="num">Min – Max</th><th class="num">Value</th><th>Status</th></tr></thead><tbody>'
    +(slice.length?slice.map(function(i){return '<tr class="click" tabindex="0" data-sku="'+i.id+'"><td>'+itemCell(i.name,i.sku)+'</td><td>'+esc(i.cat)+'</td><td class="tnum muted">'+i.loc+'</td><td class="num"><b>'+fmt(i.qty)+'</b> <span class="muted">'+i.unit+'</span></td><td class="num muted">'+(i.max?fmt(i.min)+' – '+fmt(i.max):'—')+'</td><td class="num">'+rpc(i.qty*i.price)+'</td><td>'+chip(WSTC[i.st],i.st)+'</td></tr>';}).join(''):'<tr><td colspan="7" class="empty-note">No items match the filter.</td></tr>')
    +'</tbody></table>')+pager('stk',rows.length,size,u.page)+'<p class="note">Sample data: '+WSTK.length+' of 8,412 SKUs are shown in this prototype.</p></section>';
  h+='<div class="grid"><section class="card c6"><div class="card-head"><div><h2>Inventory Value by Category</h2><p class="hint">Total Rp 48.7 B</p></div></div>'
    +hbars([['Finished Goods',17.9],['Raw Materials',14.6],['Spare Parts',7.8],['Temperature Controlled',4.3],['Packaging',2.9],['Quarantine & Returns',1.2]],17.9,function(v){return 'Rp '+pct(v,1)+' M';})+'</section>'
    +'<section class="card c6"><div class="card-head"><div><h2>Stock Condition</h2><p class="hint">SKU count by status, whole warehouse</p></div></div>'
    +hbars([['Healthy',7106],['Low',842],['Overstock',244],['Below minimum',137],['Quarantine',83]],7106,fmt)+'</section></div>';
  return '<div class="page-inner">'+h+'</div>';
}
function openSku(id){
  var i=WSTK.filter(function(x){return x.id===id;})[0];if(!i)return;
  var hist=whist(i),p=i.max?clamp(i.qty/i.max*100,0,100):0,mk=i.max?clamp(i.min/i.max*100,0,100):0;
  openPanel('Item Detail','<div class="prof"><span class="big" style="border-radius:12px">'+icon('box',26)+'</span><div><h3>'+esc(i.name)+'</h3><p>'+i.sku+' · '+esc(i.cat)+'</p></div></div>'
   +'<dl class="kv"><dt>Status</dt><dd>'+chip(WSTC[i.st],i.st)+'</dd><dt>Rack location</dt><dd>'+i.loc+' (Zone '+i.zone+')</dd><dt>Current stock</dt><dd>'+fmt(i.qty)+' '+i.unit+'</dd><dt>Unit cost</dt><dd>'+rp(i.price)+' per '+i.unit+'</dd><dt>Inventory value</dt><dd>'+rp(i.qty*i.price)+'</dd></dl>'
   +(i.max?'<div class="kv-h">Stock level</div><div class="gauge"><i style="width:'+p+'%"></i><b style="left:'+mk+'%" title="Minimum stock"></b></div><div class="cap"><span>0</span><span>Min '+fmt(i.min)+' · Max '+fmt(i.max)+'</span></div>':'')
   +'<div class="kv-h">Recent movement</div>'+tblWrap('<table class="tbl"><thead><tr><th>Date</th><th>Type</th><th class="num">Amount</th><th>Reference</th></tr></thead><tbody>'
   +hist.map(function(m){return '<tr><td>'+fd(m.d)+'</td><td>'+m.t+'</td><td class="num" style="color:'+(m.q<0?'var(--danger)':'var(--ok)')+'">'+(m.q>0?'+':'−')+fmt(Math.abs(m.q))+'</td><td class="tnum muted">'+m.ref+'</td></tr>';}).join('')+'</tbody></table>')
   +'<div class="d-actions"><button class="btn primary" data-toast="Prototype: create purchase request">Create purchase request</button></div>');
}

/* ================= Receipt ================= */
function viewInbound(){
  var u=ui.inb,today=INB.filter(function(r){return r.day===0;});
  var tabF={all:function(){return true;},sched:function(r){return r.st===0;},active:function(r){return r.st>=1&&r.st<=3;},done:function(r){return r.st===4;}};
  var rows=INB.filter(tabF[u.tab]||tabF.all);
  var size=12,pages=Math.max(1,Math.ceil(rows.length/size));if(u.page>=pages)u.page=pages-1;
  var slice=rows.slice(u.page*size,u.page*size+size),act=today.filter(tabF.active).length,done=today.filter(tabF.done).length;
  var h=whHead('Receiving','Incoming goods and receiving from suppliers','<button class="btn primary" data-toast="Prototype: create a receipt without a PO">'+icon('plus',18)+'New Receipt</button>');
  h+=kpis([['Receipts today',today.length,'On the supplier schedule'],['Completed',done,pct(done/today.length*100,0)+' of today’s schedule'],['In progress',act,'Average unloading time 38 min'],['Behind schedule',INB.filter(inLate).length,'Not yet arrived as of 09:42']]);
  h+=dockTiles('in');
  h+='<div class="toolbar">'+tabs('inb','tab',u.tab,[['all','All',INB.length],['sched','Scheduled',INB.filter(tabF.sched).length],['active','In progress',INB.filter(tabF.active).length],['done','Completed',INB.filter(tabF.done).length]])+'</div>';
  h+='<section class="card">'+tblWrap('<table class="tbl"><thead><tr><th>Receipt no.</th><th>Supplier</th><th>Schedule</th><th>Dock</th><th class="num">Pallets</th><th>Status</th><th></th></tr></thead><tbody>'
   +(slice.length?slice.map(function(r){
      var btn=r.day===0&&r.st<4?'<button class="btn sm'+(r.st===3?' primary':'')+'" data-adv="in:'+r.id+'">'+['Log arrival','Start unloading','Send to QC','Complete'][r.st]+'</button>':'<span class="dim-txt">—</span>';
      return '<tr class="click" tabindex="0" data-gr="'+r.id+'"><td class="tnum"><b>'+r.no+'</b><span class="ks" style="display:block">'+r.po+'</span></td><td>'+esc(r.vendor)+'</td><td class="tnum">'+(r.day?'Tomorrow':'Today')+' '+r.jam+'</td><td>'+r.dock+'</td><td class="num">'+r.pallets+'</td><td>'+chip(INC[r.st],INS[r.st])+(inLate(r)?' '+chip('bad','Late'):'')+'</td><td>'+btn+'</td></tr>';
    }).join(''):'<tr><td colspan="7" class="empty-note">No receipts.</td></tr>')
   +'</tbody></table>')+pager('inb',rows.length,size,u.page)+'</section>';
  return '<div class="page-inner">'+h+'</div>';
}
function openGR(id){
  var r=INB.filter(function(x){return x.id===id;})[0];if(!r)return;var rec=r.st>=3,tot=0;
  openPanel('Receipt '+r.no,'<dl class="kv"><dt>Supplier</dt><dd>'+esc(r.vendor)+'</dd><dt>PO number</dt><dd>'+r.po+'</dd><dt>Schedule</dt><dd>'+(r.day?'Tomorrow':'Today')+', '+r.jam+'</dd><dt>Dock</dt><dd>'+r.dock+'</dd><dt>Pallet count</dt><dd>'+r.pallets+'</dd><dt>Status</dt><dd>'+chip(INC[r.st],INS[r.st])+'</dd></dl>'
   +'<div class="kv-h">Item details</div>'+tblWrap('<table class="tbl"><thead><tr><th>Item</th><th class="num">Ordered</th><th class="num">Take-home</th></tr></thead><tbody>'
   +r.lines.map(function(l){tot+=l.qty*l.price;var got=l.qty-l.short;return '<tr><td style="white-space:normal;min-width:150px">'+esc(l.name)+(rec&&l.short?'<span class="ks" style="display:block;color:var(--danger)">Short by '+l.short+' '+l.unit+' (damaged or mismatched)</span>':'')+'</td><td class="num">'+fmt(l.qty)+' '+l.unit+'</td><td class="num">'+(rec?fmt(got)+' '+l.unit:'—')+'</td></tr>';}).join('')+'</tbody></table>')
   +'<dl class="kv kv-total" style="margin-top:12px"><dt>PO value</dt><dd>'+rp(tot)+'</dd></dl>'
   +(r.day===0&&r.st<4?'<div class="d-actions"><button class="btn primary" data-adv="in:'+r.id+'">'+['Log arrival','Start unloading','Send to QC','Complete'][r.st]+'</button></div>':''));
}

/* ================= Shipment ================= */
function viewOutbound(){
  var u=ui.out;
  var tabF={all:function(){return true;},proc:function(r){return r.st<=2;},route:function(r){return r.st===3;},done:function(r){return r.st===4;},late:function(r){return r.st===5;}};
  var rows=OUT.filter(tabF[u.tab]||tabF.all);
  var size=12,pages=Math.max(1,Math.ceil(rows.length/size));if(u.page>=pages)u.page=pages-1;
  var slice=rows.slice(u.page*size,u.page*size+size);
  var h=whHead('Shipping','Outgoing orders, loading, and delivery to customers','<button class="btn primary" data-toast="Prototype: create a new delivery note">'+icon('plus',18)+'New Delivery Note</button>');
  h+=kpis([['Shipments today',OUT.length,fmt(OUT.reduce(function(a,r){return a+r.koli;},0))+' parcels'],['Delivered',OUT.filter(tabF.done).length,'On-time rate 94.8%'],['In transit',OUT.filter(tabF.route).length,'Own fleet and courier'],['Delayed',OUT.filter(tabF.late).length,'Needs follow-up']]);
  h+=dockTiles('out');
  h+='<div class="toolbar">'+tabs('out','tab',u.tab,[['all','All',OUT.length],['proc','In progress',OUT.filter(tabF.proc).length],['route','In transit',OUT.filter(tabF.route).length],['done','Delivered',OUT.filter(tabF.done).length],['late','Delayed',OUT.filter(tabF.late).length]])+'</div>';
  var nextL=['Move to packing','Ready to ship','Departed','Mark delivered'];
  h+='<section class="card">'+tblWrap('<table class="tbl"><thead><tr><th>Delivery note no.</th><th>Destination</th><th>Schedule</th><th class="num">Parcels</th><th class="num">Weight</th><th>Fleet</th><th>Status</th><th></th></tr></thead><tbody>'
   +(slice.length?slice.map(function(r){
      var btn=r.st===4?'<span class="dim-txt">—</span>':r.st===5?'<button class="btn sm" data-adv="out:'+r.id+'">'+icon('refresh',16)+'Reprocess</button>':'<button class="btn sm'+(r.st===2?' primary':'')+'" data-adv="out:'+r.id+'">'+nextL[r.st]+'</button>';
      return '<tr class="click" tabindex="0" data-do="'+r.id+'"><td class="tnum"><b>'+r.no+'</b><span class="ks" style="display:block">'+r.so+'</span></td><td>'+esc(r.cust)+'<span class="ks" style="display:block">'+esc(r.city)+'</span></td><td class="tnum">'+r.jam+'</td><td class="num">'+r.koli+'</td><td class="num">'+fmt(r.kg)+' kg</td><td class="muted">'+esc(r.arm)+'</td><td>'+chip(OUC[r.st],OUSN[r.st])+(r.st===5?'<span class="ks" style="display:block;white-space:normal;max-width:200px">'+esc(r.why)+'</span>':'')+'</td><td>'+btn+'</td></tr>';
    }).join(''):'<tr><td colspan="8" class="empty-note">No shipments.</td></tr>')
   +'</tbody></table>')+pager('out',rows.length,size,u.page)+'</section>';
  return '<div class="page-inner">'+h+'</div>';
}
function openDO(id){
  var r=OUT.filter(function(x){return x.id===id;})[0];if(!r)return;var tot=0;
  var steps=OUSN.slice(0,5).map(function(s,i){return '<li class="'+(r.st!==5&&i<r.st?'done':r.st!==5&&i===r.st?'now':'')+'"><span class="node">'+(r.st!==5&&i<r.st?icon('check',14,3):'')+'</span><span><span class="a">'+s+'</span></span><span></span></li>';}).join('');
  openPanel('Shipment '+r.no,'<dl class="kv"><dt>Destination</dt><dd>'+esc(r.cust)+'</dd><dt>City</dt><dd>'+esc(r.city)+'</dd><dt>SO number</dt><dd>'+r.so+'</dd><dt>Schedule</dt><dd>Today, '+r.jam+'</dd><dt>Fleet</dt><dd>'+esc(r.arm)+'</dd><dt>Load</dt><dd>'+r.koli+' parcels · '+fmt(r.kg)+' kg</dd><dt>Status</dt><dd>'+chip(OUC[r.st],OUSN[r.st])+'</dd>'+(r.st===5?'<dt>Delay reason</dt><dd>'+esc(r.why)+'</dd>':'')+'</dl>'
   +'<div class="kv-h">Item details</div>'+tblWrap('<table class="tbl"><thead><tr><th>Item</th><th class="num">Amount</th></tr></thead><tbody>'+r.lines.map(function(l){tot+=l.qty*l.price;return '<tr><td style="white-space:normal;min-width:180px">'+esc(l.name)+'</td><td class="num">'+fmt(l.qty)+' '+l.unit+'</td></tr>';}).join('')+'</tbody></table>')
   +'<dl class="kv kv-total" style="margin-top:12px"><dt>Goods value</dt><dd>'+rp(tot)+'</dd></dl>'
   +(r.st!==5?'<div class="kv-h">Progress</div><ol class="steps">'+steps+'</ol>':'')
   +(r.st!==4?'<div class="d-actions"><button class="btn primary" data-adv="out:'+r.id+'">'+(r.st===5?'Reprocess':nextL[r.st])+'</button></div>':''));
}

/* ================= Stock Opname ================= */
function viewOpname(){
  var u=ui.opn,pv=pendVar(),bins=WZ.reduce(function(a,z){return a+z.cols*z.rows;},0);
  var prog=WZ.reduce(function(a,z){var o=OPZ.filter(function(x){return x.k===z.k;})[0];return a+z.cols*z.rows*o.prog/100;},0)/bins*100;
  var acc=(OPN_SKU-OPN_DIFF)/OPN_SKU*100,net=pv.reduce(function(a,v){return a+vdiff(v)*v.cost;},0);
  var rows=VAR.filter(function(v){return u.tab==='all'||v.st===u.tab;});
  var causes={};VAR.forEach(function(v){causes[v.cause]=(causes[v.cause]||0)+1;});
  var causeRows=Object.keys(causes).map(function(k){return [k,causes[k]];}).sort(function(a,b){return b[1]-a[1];});
  var h=whHead('Stock Opname','Q3 2026 opname cycle · Due September 30','<button class="btn primary" data-toast="Prototype: schedule a new opname session">'+icon('plus',18)+'New Session</button>');
  h+=kpis([['Opname progress',pct(prog,1)+'%',WZ.length+' zones · '+fmt(OPZ.reduce(function(a,z){return a+z.skus*z.prog/100;},0))+' SKUs counted'],['Stock accuracy',pct(acc,1)+'%',fmt(OPN_DIFF)+' SKU discrepancy out of '+fmt(OPN_SKU)+' counted'],['Discrepancies awaiting review',pv.length,'From the sample discrepancy list'],['Value of pending discrepancies',rps(net),'Net, sample discrepancy list']]);
  h+='<div class="grid"><section class="card c8"><div class="card-head"><div><h2>Opname Sessions by Zone</h2><p class="hint">Physical count by two staff per zone</p></div></div>'
   +tblWrap('<table class="tbl"><thead><tr><th>Zone</th><th>Schedule</th><th>Staff</th><th style="min-width:140px">Progress</th><th>Status</th></tr></thead><tbody>'
   +OPZ.map(function(o){var st=o.prog===100?['ok','Completed']:o.prog===0?['mute','Scheduled']:['info','Counting in progress'];return '<tr><td><b>'+o.k+'</b> · '+esc(zname(o.k))+'<span class="ks" style="display:block">'+fmt(o.skus)+' SKU</span></td><td>'+o.dates+'</td><td class="muted">'+esc(o.who)+'</td><td><span class="hb-t"><i style="width:'+o.prog+'%"></i></span><span class="ks">'+o.prog+'%</span></td><td>'+chip(st[0],st[1])+'</td></tr>';}).join('')
   +'</tbody></table>')+'</section>'
   +'<section class="card c4"><div class="card-head"><div><h2>Causes of Discrepancy</h2><p class="hint">From the sample discrepancy list</p></div></div>'+hbars(causeRows,causeRows[0][1],fmt)
   +'<div class="tip-line">'+icon('info',18)+'<span>Discrepancies above Rp 5 million per SKU should get two-level approval (warehouse supervisor and Finance).</span></div></section>'
   +'<section class="card c12"><div class="card-head"><div><h2>Discrepancy List</h2><p class="hint">Approve to adjust system stock, or request a recount</p></div></div>'
   +tabs('opn','tab',u.tab,[['all','All',VAR.length],['Needs review','Needs review',pv.length],['Approved','Approved',VAR.filter(function(v){return v.st==='Approved';}).length],['Recount','Recount',VAR.filter(function(v){return v.st==='Recount';}).length]])
   +'<div class="sp">'+tblWrap('<table class="tbl"><thead><tr><th>Item</th><th>Zone</th><th class="num">System</th><th class="num">Physical</th><th class="num">Difference</th><th class="num">Discrepancy value</th><th>Cause</th><th>Status</th><th></th></tr></thead><tbody>'
   +(rows.length?rows.map(function(v){var d=vdiff(v);return '<tr><td>'+itemCell(v.item,'Zone '+v.zone)+'</td><td>'+v.zone+'</td><td class="num">'+fmt(v.sys)+'</td><td class="num">'+fmt(v.phy)+'</td><td class="num" style="color:'+(d<0?'var(--danger)':'var(--ok)')+'"><b>'+(d>0?'+':'−')+fmt(Math.abs(d))+' '+v.unit+'</b></td><td class="num">'+rps(d*v.cost)+'</td><td class="wrap">'+esc(v.cause)+'</td><td>'+chip(v.st==='Approved'?'ok':v.st==='Recount'?'info':'warn',v.st)+'</td><td>'+(v.st==='Needs review'?'<span class="acts"><button class="btn sm" data-vr="'+v.id+':re">Recount</button><button class="btn sm primary" data-vr="'+v.id+':ok">Approve</button></span>':'<span class="dim-txt">—</span>')+'</td></tr>';}).join(''):'<tr><td colspan="9" class="empty-note">No data.</td></tr>')
   +'</tbody></table>')+'</div></section></div>';
  return '<div class="page-inner">'+h+'</div>';
}

var WVIEWS={dashboard:viewWhDash,stock:viewStock,inbound:viewInbound,outbound:viewOutbound,opname:viewOpname};
var WGO={stock:['stk','status'],outbound:['out','tab'],opname:['opn','tab'],inbound:['inb','tab'],maint:['mnt','tab'],loan:['lon','tab'],audit:['aud','tab'],assets:['ast','flag'],contracts:['ctr','tab'],comply:['cmp','ctab'],docs:['doc','flag']};

/* =====================================================================
   LEARNING MODULE: dummy data and pages
   ===================================================================== */
I.award='<circle cx="12" cy="8" r="5"/><path d="M8.5 12.5L7 21l5-3 5 3-1.5-8.5"/>';
I.target='<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3"/>';
function urgDays(d){return d?diffDays(d,NOW):9999;}
function urgSort(a,b){return urgDays(a.due)-urgDays(b.due);}
function urgChip(d){if(!d)return '';var n=urgDays(d);if(n<0)return chip('bad',Math.abs(n)+'d overdue');if(n<=7)return chip('warn',n+'d left');if(n<=21)return chip('info',n+'d left');return chip('mute',n+'d left');}

/* ---------- Course catalog ---------- */
var LNCAT=['Technical','Leadership','Compliance','Soft Skills','Product & Process'];
var LNPOOL=[
 ['JavaScript Fundamentals','Technical','Internal only','Online',12,'Udemy Business','Beginner',false],
 ['Cloud Computing Fundamentals (AWS)','Technical','Internal only','Online',16,'AWS Training',       'Intermediate',false],
 ['Data Analysis with SQL','Technical','Internal only','Self-paced',10,'Internal L&D','Beginner',false],
 ['DevOps & CI/CD Practices','Technical','Internal only','Online',14,'Internal L&D','Intermediate',false],
 ['Leading High-Performing Teams','Leadership','Internal only','In person',16,'Dale Carnegie','Intermediate',false],
 ['Coaching & Feedback for Managers','Leadership','Internal only','In person',8,'Internal L&D','Intermediate',false],
 ['Strategic Decision Making','Leadership','Internal only','Online',10,'Harvard Online','Advanced',false],
 ['Basic Safety & Emergency Response (K3)','Compliance','All employees','In person',6,'Internal L&D','Beginner',true],
 ['Anti-Corruption & Business Ethics','Compliance','All employees','Online',3,'Internal L&D','Beginner',true],
 ['Information Security for Employees','Compliance','All employees','Online',2,'Internal L&D','Beginner',true],
 ['Personal Data Protection Awareness','Compliance','All employees','Online',3,'Internal L&D','Beginner',true],
 ['Effective Communication & Negotiation','Soft Skills','Internal only','In person',8,'Internal L&D','Intermediate',false],
 ['Time Management & Productivity','Soft Skills','All employees','Self-paced',4,'Internal L&D','Beginner',false],
 ['Presentation Skills','Soft Skills','Internal only','In person',6,'Internal L&D','Beginner',false],
 ['Customer Handling Excellence','Product & Process','Internal only','In person',8,'Internal L&D','Intermediate',false],
 ['Quality Control in Food Production','Product & Process','Internal only','In person',10,'Internal L&D','Intermediate',false],
 ['Warehouse Safety & Efficiency','Product & Process','Internal only','In person',6,'Internal L&D','Beginner',false],
 ['Vendor Negotiation Essentials','Product & Process','External eligible','Online',6,'Procurement Academy','Intermediate',false],
 ['Advanced Excel for Reporting','Technical','All employees','Self-paced',8,'Internal L&D','Intermediate',false],
 ['Project Management Certification Prep','Leadership','External eligible','Online',24,'PMI Indonesia','Advanced',false]
];
var LNCOURSES=LNPOOL.map(function(p,i){return {id:'LC'+(i+1),title:p[0],cat:p[1],aud:p[2],fmt:p[3],hours:p[4],provider:p[5],level:p[6],mand:p[7],
  desc:'Covers practical, job-relevant skills in '+p[1].toLowerCase()+' delivered '+p[3].toLowerCase()+' over '+p[4]+' hours.',cap:40+i*3,filled:18+(i*7)%30};});
function lncourse(id){return LNCOURSES.filter(function(c){return c.id===id;})[0];}
function courseLessons(c){
  var n=clamp(Math.round(c.hours*60/25),3,10),out=[];
  var kinds=['Video','Reading','Video','Video','Reading','Video'];
  for(var i=0;i<n;i++){
    var last=i===n-1;
    out.push({t:last?'Final Assessment':i===0?'Introduction & Objectives':'Module '+i+': Core Concepts',ty:last?'Quiz':kinds[i%kinds.length],min:Math.max(10,Math.round(c.hours*60/n))});
  }
  return out;
}
function lnLessons(cid){return courseLessons(lncourse(cid));}
function enrLessons(e){return lnLessons(e.cid);}
function enrProg(e){var n=enrLessons(e).length;return n?Math.round((e.doneN||0)/n*100):0;}
function lessonIcon(ty){return ty==='Quiz'?'clipboard':ty==='Reading'?'file':'cap';}


/* ---------- Learning paths ---------- */
var LNPATHS=[
 {id:'P1',name:'Technology Track — Software Engineer to Senior Engineer',div:'Technology',steps:['LC1','LC3','LC4','LC2'],mine:true},
 {id:'P2',name:'Sales Track — Account Manager Readiness',div:'Sales',steps:['LC12','LC18','LC15'],mine:false},
 {id:'P3',name:'Leadership Track — New People Manager',div:'Cross-division',steps:['LC5','LC6','LC7'],mine:false},
 {id:'P4',name:'Operations Track — Production Supervisor',div:'Operations',steps:['LC16','LC17','LC8'],mine:false}
];
var LNPROG={LC1:'Completed',LC3:'Completed',LC4:'In progress'};
function pathStepStatus(path,idx,cid){
  if(path.div!==PROFILE.division)return 'locked'; /* other divisions' paths cannot be taken */
  var st=LNPROG[cid];
  if(st==='Completed')return 'done';
  if(idx===0)return 'available';
  var prevDone=LNPROG[path.steps[idx-1]]==='Completed';
  return prevDone?(st==='In progress'?'active':'available'):'locked';
}

/* ---------- My Training (enrollments) ---------- */
var LNENR=[
 {id:'E1',cid:'LC8',status:'Overdue',prog:0,enrolled:null,due:dt(2026,9,10),done:null,src:'Assigned by HR'},
 {id:'E2',cid:'LC9',status:'Overdue',prog:0,enrolled:null,due:dt(2026,9,18),done:null,src:'Assigned by HR'},
 {id:'E3',cid:'LC10',status:'In progress',prog:45,enrolled:dt(2026,9,12),due:dt(2026,9,29),done:null,src:'Assigned by HR'},
 {id:'E4',cid:'LC11',status:'Not started',prog:0,enrolled:dt(2026,9,20),due:dt(2026,10,5),done:null,src:'Assigned by HR'},
 {id:'E5',cid:'LC1',status:'Completed',prog:100,enrolled:dt(2026,4,2),due:null,done:dt(2026,5,14),src:'Self-enrolled'},
 {id:'E6',cid:'LC3',status:'Completed',prog:100,enrolled:dt(2026,6,1),due:null,done:dt(2026,7,9),src:'Self-enrolled'},
 {id:'E7',cid:'LC4',status:'In progress',prog:62,enrolled:dt(2026,8,18),due:dt(2026,10,12),done:null,src:'Self-enrolled'},
 {id:'E8',cid:'LC19',status:'In progress',prog:20,enrolled:dt(2026,9,15),due:dt(2026,10,20),done:null,src:'Self-enrolled'},
 {id:'E9',cid:'LC13',status:'Pending approval',prog:0,enrolled:dt(2026,9,21),due:null,done:null,src:'Requested Sep 21'},
 {id:'E10',cid:'LC2',status:'Pending approval',prog:0,enrolled:dt(2026,9,22),due:null,done:null,src:'Requested Sep 22'},
 {id:'E11',cid:'LC7',status:'Completed',prog:100,enrolled:dt(2025,11,3),due:null,done:dt(2025,12,20),src:'Self-enrolled'}
];
function lnenr(id){return LNENR.filter(function(e){return e.id===id;})[0];}
LNENR.forEach(function(e){var n=lnLessons(e.cid).length;e.doneN=e.status==='Completed'?n:Math.round((e.prog||0)/100*n);});
var ENC={'Completed':'ok','In progress':'info','Not started':'mute','Overdue':'bad','Pending approval':'warn'};
function advEnroll(id){var e=lnenr(id);if(!e)return;if(e.status==='Not started'){e.status='In progress';toast('Started: '+lncourse(e.cid).title);}render();}

/* ---------- Certificates ---------- */
var LNCERT=[
 {id:'CT1',cid:'LC1',no:'PIDC-CERT-2026-0512',issue:dt(2026,5,14),exp:null},
 {id:'CT2',cid:'LC3',no:'PIDC-CERT-2026-0709',issue:dt(2026,7,9),exp:null},
 {id:'CT3',cid:'LC7',no:'PIDC-CERT-2025-1220',issue:dt(2025,12,20),exp:dt(2027,12,20)}
];
function lncert(id){return LNCERT.filter(function(c){return c.id===id;})[0];}

/* ---------- Post-training evaluation ---------- */
var LNEVAL=[
 {id:'V1',cid:'LC1',mgr:'Bambang Irawan',date:dt(2026,6,2),status:'Completed',areas:[['Skill application',4],['Behavior change',4],['Team impact',3]],overall:4,note:'Applies new JavaScript patterns confidently in code reviews.'},
 {id:'V2',cid:'LC3',mgr:'Bambang Irawan',date:dt(2026,7,25),status:'Completed',areas:[['Skill application',5],['Behavior change',4],['Team impact',4]],overall:4,note:'Uses SQL analysis to support sprint planning decisions.'},
 {id:'V3',cid:'LC7',mgr:'Bambang Irawan',date:null,status:'Pending',areas:[],overall:0,note:''},
 {id:'V4',cid:'LC4',mgr:'Bambang Irawan',date:null,status:'Pending',areas:[],overall:0,note:''}
];
var LNEC={'Completed':'ok','Pending':'warn'};

/* ---------- External training: my requests (7 stages) ---------- */
/* Submitted -> Asst. Manager -> Manager -> VP -> HR Admin -> Assignment Letter -> Completed.
   r.stage is the index of the current step (0-6). For a rejected request it is the step that rejected it.
   r.approvals is indexed by approver (0 = Asst. Manager ... 3 = HR Admin). */
var LNSTAGES=['Asst. Manager','Manager','VP','HR Admin'];
var RSTEPS=['Submitted','Asst. Manager','Manager','VP','HR Admin','Assignment Letter','Completed'];
function apv(s,name,date,ok){return {s:s,name:name,date:date,ok:ok};}
var LNREQ=[
 {id:'R1',no:'ETR-2026-014',title:'Advanced Data Engineering Bootcamp',purpose:'Build in-house data pipeline capability for the analytics roadmap',
  start:dt(2026,11,2),end:dt(2026,11,6),loc:'Singapore',org:'DataCamp Institute',hours:40,cert:'DataCamp Data Engineer Certificate',
  submitted:dt(2026,9,10),stage:2,rejected:false,letter:null,approvals:[apv(0,'Bambang Irawan',dt(2026,9,12),true),apv(1,'Anindya Prameswari',null,null)]},
 {id:'R2',no:'ETR-2026-011',title:'Certified ScrumMaster (CSM)',purpose:'Formalize Agile facilitation skills for the platform squad',
  start:dt(2026,10,19),end:dt(2026,10,20),loc:'Jakarta',org:'Scrum Alliance Indonesia',hours:16,cert:'Certified ScrumMaster',
  submitted:dt(2026,8,28),stage:5,rejected:false,letter:null,approvals:[apv(0,'Bambang Irawan',dt(2026,8,29),true),apv(1,'Anindya Prameswari',dt(2026,9,2),true),apv(2,'Rizky Hakim',dt(2026,9,5),true),apv(3,'Rina Kusuma',dt(2026,9,8),true)]},
 {id:'R3',no:'ETR-2026-009',title:'AWS Solutions Architect Workshop',purpose:'Prepare for infrastructure migration project',
  start:dt(2026,9,1),end:dt(2026,9,3),loc:'Jakarta',org:'AWS Training Partner',hours:24,cert:'AWS Solutions Architect Associate',
  submitted:dt(2026,7,15),stage:2,rejected:true,letter:null,approvals:[apv(0,'Bambang Irawan',dt(2026,7,16),true),apv(1,'Anindya Prameswari',dt(2026,7,20),false)]},
 {id:'R4',no:'ETR-2026-016',title:'ISO 27001 Lead Implementer',purpose:'Support the information security certification program',
  start:dt(2026,11,16),end:dt(2026,11,20),loc:'Jakarta',org:'BSI Indonesia',hours:32,cert:'ISO/IEC 27001 Lead Implementer',
  submitted:dt(2026,9,14),stage:4,rejected:false,letter:null,approvals:[apv(0,'Bambang Irawan',dt(2026,9,15),true),apv(1,'Anindya Prameswari',dt(2026,9,17),true),apv(2,'Rizky Hakim',dt(2026,9,21),true)]},
 {id:'R5',no:'ETR-2026-007',title:'Kubernetes Administration (CKA) Prep',purpose:'Strengthen container orchestration skills for the platform migration',
  start:dt(2026,8,11),end:dt(2026,8,13),loc:'Jakarta',org:'Linux Foundation Partner',hours:24,cert:'Certified Kubernetes Administrator',
  submitted:dt(2026,6,20),stage:6,rejected:false,letter:{no:'ST-2026-0731',date:dt(2026,7,10)},approvals:[apv(0,'Bambang Irawan',dt(2026,6,22),true),apv(1,'Anindya Prameswari',dt(2026,6,26),true),apv(2,'Rizky Hakim',dt(2026,7,1),true),apv(3,'Rina Kusuma',dt(2026,7,6),true)]}
];
function lnreq(id){return LNREQ.filter(function(r){return r.id===id;})[0];}
function reqActive(r){return !r.rejected&&r.stage<6;}
function reqGroup(r){return r.rejected?'Rejected':r.stage>=6?'Completed':r.stage===5?'Letter':'Approval';}
function reqStatus(r){
  if(r.rejected)return 'Rejected';
  if(r.stage>=6)return 'Completed';
  if(r.stage===5)return 'Awaiting assignment letter';
  return 'Pending '+LNSTAGES[r.stage-1];
}
function reqChipC(r){return r.rejected?'bad':r.stage>=6?'ok':r.stage===5?'info':'warn';}

/* ---------- Training assignments: proof of completion for HR ---------- */
/* Flow: Assigned -> Attendance Certificate -> Training Evaluation -> Training Report -> Completed.
   External training: the user uploads the attendance certificate.
   Internal training: the certificate is issued by the system, so the upload step is skipped. */
I.upload='<path d="M12 16V5M7 9l5-5 5 5M4 20h16"/>';
var ASTAGES=['Assigned','Attendance Certificate','Training Evaluation','Training Report','Completed'];
var ASTEP_HINT=['Assigned by HR','Proof of attendance','Your feedback on the training','What you learned','Submitted to HR'];
var ASTAGE_C=['mute','info','info','info','ok'];
var ASTAGE_S=['Assigned','Certificate','Evaluation','Report','Completed'];
var REL_OPTS=['Not relevant','Slightly relevant','Relevant','Highly relevant'];
var METHOD_OPTS=['Lecture','Case study','Group discussion','Hands-on practice','Simulation or role play','Self-study'];
function sEv(rel,rt,d){return {material:'The material was structured clearly and the examples matched real work scenarios. A few modules moved too fast for participants without prior exposure.',organizer:'Share the slides one week ahead and add a short hands-on exercise after each module.',relevance:rel,rating:rt,date:d};}
function sRep(d){return {summary:'The training covered the end-to-end workflow, prioritization techniques, and how to document decisions so that teams can review them later.',methods:['Lecture','Case study','Group discussion'],output:'A reusable checklist and a draft working template that I can apply in my team.',jobrel:'Directly supports my daily duties because I handle the same type of tasks and can apply the techniques in the next sprint.',suggest:'Allow more time for the case study and provide a follow-up session after two months.',date:d};}
var LNASSIGN=[
 {id:'A1',type:'External',title:'Secure Coding for Web Applications',provider:'Cyber Academy Indonesia',loc:'Jakarta',hours:16,start:dt(2026,9,8),end:dt(2026,9,9),by:'HR \u2014 Rina Kusuma',assigned:dt(2026,8,25),due:dt(2026,9,20),stage:1,cert:null,ev:null,rep:null,done:null},
 {id:'A2',type:'Internal',cid:'LC12',title:'Effective Communication & Negotiation',provider:'Internal L&D',loc:'Head Office, Jakarta',hours:8,start:dt(2026,9,15),end:dt(2026,9,15),by:'HR \u2014 Rina Kusuma',assigned:dt(2026,9,1),due:dt(2026,9,30),stage:2,cert:{auto:true,no:'PIDC-CERT-2026-A2',date:dt(2026,9,15)},ev:null,rep:null,done:null},
 {id:'A3',type:'External',title:'Agile Product Ownership Workshop',provider:'Agile Indonesia Community',loc:'Bandung',hours:16,start:dt(2026,9,14),end:dt(2026,9,15),by:'Manager \u2014 Bambang Irawan',assigned:dt(2026,9,5),due:dt(2026,10,2),stage:3,cert:{auto:false,file:'agile-po-attendance-certificate.pdf',size:482000,date:dt(2026,9,18)},ev:sEv('Highly relevant',4,dt(2026,9,19)),rep:null,done:null},
 {id:'A4',type:'Internal',cid:'LC14',title:'Presentation Skills',provider:'Internal L&D',loc:'Head Office, Jakarta',hours:6,start:dt(2026,9,24),end:dt(2026,9,30),by:'HR \u2014 Rina Kusuma',assigned:dt(2026,9,22),due:dt(2026,10,10),stage:0,cert:null,ev:null,rep:null,done:null},
 {id:'A5',type:'External',title:'Cloud Cost Optimization (FinOps) Workshop',provider:'Cloud Native Indonesia',loc:'Jakarta',hours:8,start:dt(2026,9,21),end:dt(2026,9,22),by:'HR \u2014 Rina Kusuma',assigned:dt(2026,9,10),due:dt(2026,10,6),stage:0,cert:null,ev:null,rep:null,done:null},
 {id:'A6',type:'External',title:'Negotiation Mastery Clinic',provider:'Dale Carnegie Indonesia',loc:'Jakarta',hours:12,start:dt(2026,10,12),end:dt(2026,10,13),by:'Manager \u2014 Bambang Irawan',assigned:dt(2026,9,20),due:dt(2026,10,27),stage:0,cert:null,ev:null,rep:null,done:null},
 {id:'A7',type:'Internal',cid:'LC6',title:'Coaching & Feedback for Managers',provider:'Internal L&D',loc:'Head Office, Jakarta',hours:8,start:dt(2026,8,10),end:dt(2026,8,10),by:'HR \u2014 Rina Kusuma',assigned:dt(2026,7,28),due:dt(2026,8,31),stage:4,cert:{auto:true,no:'PIDC-CERT-2026-A7',date:dt(2026,8,10)},ev:sEv('Relevant',5,dt(2026,8,12)),rep:sRep(dt(2026,8,14)),done:dt(2026,8,14)},
 {id:'A8',type:'External',title:'Technical Writing for Engineers',provider:'Plain Language Institute',loc:'Online',hours:12,start:dt(2026,7,6),end:dt(2026,7,8),by:'Manager \u2014 Bambang Irawan',assigned:dt(2026,6,20),due:dt(2026,7,31),stage:4,cert:{auto:false,file:'technical-writing-certificate.pdf',size:356000,date:dt(2026,7,10)},ev:sEv('Highly relevant',4,dt(2026,7,12)),rep:sRep(dt(2026,7,15)),done:dt(2026,7,15)}
];
function addInternalCert(a){
  if(a.cid&&!LNCERT.some(function(c){return c.cid===a.cid;}))LNCERT.push({id:'CT'+(LNCERT.length+1),cid:a.cid,no:a.cert.no,issue:a.cert.date,exp:null});
}
LNASSIGN.forEach(function(a){if(a.type==='Internal'&&a.cert)addInternalCert(a);});
function lnassign(id){return LNASSIGN.filter(function(a){return a.id===id;})[0];}
function asgPending(a){return a.stage<4;}
function asgOverdue(a){return a.stage<4&&urgDays(a.due)<0;}
function asgReady(a){return a.type==='External'&&a.stage===0&&a.end<=NOW;}
function asgNext(a){return a.stage===0?(a.type==='Internal'?'Complete the course':'Attend the training'):['','Upload certificate','Fill evaluation','Write report'][a.stage];}
function asgDates(a){return (a.start.getTime()===a.end.getTime())?fd(a.start,true):fd(a.start)+' \u2013 '+fd(a.end,true);}
function fmtSize(b){return b<1048576?Math.max(1,Math.round(b/1024))+' KB':(b/1048576).toFixed(1)+' MB';}
function draftOf(id){var s=ui.adraft;return s[id]||(s[id]={});}
function openAsg(id){state.item='asgdetail';state.assignId=id;render();window.scrollTo(0,0);}
function asgAdvance(id){var a=lnassign(id);if(!a||!asgReady(a))return;a.stage=1;toast('Next: upload your attendance certificate');render();window.scrollTo(0,0);}
function asgSimulate(id){
  var a=lnassign(id);if(!a||a.type!=='Internal'||a.stage!==0)return;
  a.cert={auto:true,no:'PIDC-CERT-2026-'+a.id,date:NOW};a.stage=2;addInternalCert(a);
  toast('Course completed. Certificate issued automatically, next: training evaluation');render();window.scrollTo(0,0);
}
function asgBad(key,on){var f=$('#fx_'+key);if(f)f.classList.toggle('invalid',!!on);}
function asgHideAlert(){var al=$('#asgAlert');if(al)al.hidden=true;}
function tlen(s){return (s||'').trim().length;}
function asgCheck(rules){var all=true;Object.keys(rules).forEach(function(k){asgBad(k,!rules[k]);if(!rules[k])all=false;});return all;}
function asgSubmitCert(id){
  var a=lnassign(id);if(!a||a.type!=='External'||a.stage!==1)return;var d=draftOf(id);
  if(!d.file){asgBad('file',true);formAlert('#asgAlert','Attach your attendance certificate before submitting.');return;}
  a.cert={auto:false,file:d.file.name,size:d.file.size,date:NOW};a.stage=2;d.file=null;d.fileErr='';
  toast('Certificate submitted. Next: training evaluation');render();window.scrollTo(0,0);
}
function asgSubmitEval(id){
  var a=lnassign(id);if(!a||a.stage!==2)return;var d=draftOf(id);
  if(!asgCheck({e_material:tlen(d.e_material)>=20,e_organizer:tlen(d.e_organizer)>=10,e_relevance:!!d.e_relevance,e_rating:!!d.e_rating})){formAlert('#asgAlert','Please complete the highlighted fields before submitting.');return;}
  a.ev={material:d.e_material.trim(),organizer:d.e_organizer.trim(),relevance:d.e_relevance,rating:+d.e_rating,date:NOW};a.stage=3;
  toast('Evaluation submitted. Next: training report');render();window.scrollTo(0,0);
}
function asgSubmitRep(id){
  var a=lnassign(id);if(!a||a.stage!==3)return;var d=draftOf(id);
  if(!asgCheck({r_summary:tlen(d.r_summary)>=50,r_methods:!!(d.r_methods&&d.r_methods.length),r_output:tlen(d.r_output)>=20,r_jobrel:tlen(d.r_jobrel)>=20,r_suggest:tlen(d.r_suggest)>=10})){formAlert('#asgAlert','Please complete the highlighted fields before submitting.');return;}
  a.rep={summary:d.r_summary.trim(),methods:d.r_methods.slice(),output:d.r_output.trim(),jobrel:d.r_jobrel.trim(),suggest:d.r_suggest.trim(),date:NOW};a.stage=4;a.done=NOW;
  toast('Training report submitted. Assignment completed');render();window.scrollTo(0,0);
}

/* ---------- TNA (Training Needs Analysis) ---------- */
/* A cycle is a scored assessment. One attempt per cycle; progress is saved while In progress.
   Result = overall score, per-competency level, recommended courses for weak areas, and answer review. */
var TNA_COURSES={
 'Secure Coding':['LC10'],'Cloud & DevOps':['LC2','LC4'],'Data & SQL':['LC3','LC19'],'Software Design':['LC1','LC4'],
 'Coaching & Feedback':['LC6'],'Delegation & Planning':['LC5','LC13'],'Conflict & Communication':['LC12','LC14'],'Decision Making':['LC7','LC20'],
 'Workplace Safety':['LC8'],'Data Handling':['LC3','LC19'],'Adaptability':['LC13','LC7'],'Information Security':['LC10'],
 'Business Ethics':['LC9'],'Data Protection':['LC11'],'Cybersecurity Hygiene':['LC10'],'Collaboration Tools':['LC13'],'Digital Productivity':['LC19']
};
function tq(c,q,o,a,e){return {c:c,q:q,o:o,a:a,e:e};}
var TNA_BANK={
 T1:[
  tq('Secure Coding','Which practice best prevents SQL injection in a web application?',['Escaping quotes manually in every query','Using parameterized queries (prepared statements)','Hiding database error messages only','Limiting the length of user input'],1,'Parameterized queries keep user input separate from SQL code, so input can never change the structure of the query.'),
  tq('Secure Coding','Where should database passwords and API secrets be stored?',['In a config file committed to the repository','In an environment variable bundled into the front-end','In a secrets manager, or injected at deploy time','In a shared team chat for quick access'],2,'Secrets belong in a secrets manager or are injected at deploy time. Anything in the repository or front-end bundle can leak.'),
  tq('Secure Coding','User comments are rendered on a page. Which control mainly mitigates stored XSS?',['Encoding or sanitizing the output when it is rendered','Using a longer session timeout','Compressing the HTTP response','Disabling cookies for the site'],0,'Output encoding turns user content into inert text, so injected scripts are displayed instead of executed.'),
  tq('Cloud & DevOps','In a CI/CD pipeline, why run automated tests before deployment?',['To replace code review entirely','To reduce the number of environments','To generate documentation automatically','To catch regressions early so only verified changes are released'],3,'Automated tests act as a quality gate: a failing test stops the release before it reaches users.'),
  tq('Cloud & DevOps','Which principle means granting a role only the permissions it needs?',['Shared responsibility','Least privilege','High availability','Elasticity'],1,'Least privilege limits the damage if credentials are misused or a service is compromised.'),
  tq('Cloud & DevOps','A service must stay available if one data center fails. What is the best design?',['Use a larger instance size','Take hourly backups only','Deploy across multiple availability zones behind a load balancer','Run everything on a single large database'],2,'Spreading instances across availability zones lets the load balancer route traffic around a failed zone.'),
  tq('Data & SQL','Which SQL clause filters groups after aggregation?',['HAVING','WHERE','ORDER BY','DISTINCT'],0,'WHERE filters rows before grouping, while HAVING filters the groups produced by GROUP BY.'),
  tq('Data & SQL','You need all customers, including those with no orders. Which approach returns them?',['INNER JOIN customers to orders','JOIN, then filter where orders.id IS NOT NULL','UNION ALL of the two tables','LEFT JOIN from customers to orders'],3,'A LEFT JOIN keeps every customer row and fills order columns with NULL when there is no match.'),
  tq('Software Design','Which principle says a class should have only one reason to change?',['Open/Closed Principle','Liskov Substitution Principle','Single Responsibility Principle','Dependency Inversion Principle'],2,'Single Responsibility keeps each class focused, which makes changes safer and tests simpler.'),
  tq('Software Design','What is the main benefit of loose coupling between modules?',['Faster compilation','Modules can change or be replaced with limited impact on others','Fewer lines of code overall','Tests are no longer needed'],1,'Loose coupling limits ripple effects, so teams can change one module without breaking the rest.')
 ],
 T2:[
  tq('Coaching & Feedback','An employee missed a deadline. Which feedback approach is most effective?',['Describe the specific behavior and its impact, then agree on next steps','Wait for the annual review','Compare them with a top performer in front of the team','Give general advice without examples'],0,'Specific, timely feedback focused on behavior and impact leads to clear next steps without blame.'),
  tq('Coaching & Feedback','Which question fits a coaching conversation best?',['Why did you not follow my instructions?','Do you agree with me?','What options have you considered, and what would you try first?','Can you finish this today?'],2,'Open questions help people think through options and own the solution.'),
  tq('Delegation & Planning','When delegating a task, what should you clarify first?',['Which tool to use at every step','Who else could do it','How you did it last time','The desired outcome, constraints, and deadline'],3,'Clear outcomes and constraints let the person decide how to do the work while you keep accountability.'),
  tq('Delegation & Planning','A team member is overloaded. What is the best first step?',['Add more tasks to test their capacity','Review priorities and workload with them, then rebalance','Ask them to work extra hours','Reassign the work without discussing it'],1,'Reviewing priorities together surfaces what can wait and keeps the person engaged in the solution.'),
  tq('Conflict & Communication','Two team members disagree about task ownership. As the leader, what should you do first?',['Pick the more senior person','Ignore it until it escalates','Listen to each side, then clarify roles together','Announce a new rule for everyone'],2,'Hearing both perspectives first builds trust, and clarifying roles together prevents the same conflict from returning.'),
  tq('Conflict & Communication','Which behavior shows active listening?',['Paraphrasing what you heard to confirm understanding','Preparing your reply while the other person speaks','Interrupting to correct facts','Checking messages during the conversation'],0,'Paraphrasing confirms understanding and shows the speaker that they have been heard.'),
  tq('Decision Making','Information is incomplete but a decision cannot wait. What is the sound approach?',['Delay until all data is available','Escalate it upward immediately','Always decide by majority vote','Decide with the best available data, state assumptions, and set a review point'],3,'Stating assumptions and a review point lets you act now and adjust as new information arrives.'),
  tq('Decision Making','Which tool helps compare options against weighted criteria?',['A Gantt chart','A decision matrix','An organization chart','A burndown chart'],1,'A decision matrix scores each option against weighted criteria, which makes trade-offs explicit.')
 ]
};
function sComp(n,p){return {name:n,pct:p,correct:null,total:null};}
var LNTNA=[
 {id:'T1',name:'TNA Cycle 2026 — Q3 Technical Skills',period:'Jul – Sep 2026',start:dt(2026,7,1),end:dt(2026,9,30),status:'In progress',attempt:true,score:null,late:false,
  draft:{ans:[1,2,0,3,null,null,null,null,null,null],idx:4,started:Date.now()-18*60000},result:null},
 {id:'T2',name:'TNA Cycle 2026 — Q3 Leadership Readiness',period:'Jul – Sep 2026',start:dt(2026,7,1),end:dt(2026,9,15),status:'Not started',attempt:false,score:null,draft:null,result:null},
 {id:'T3',name:'TNA Cycle 2026 — Q2 Compliance Awareness',period:'Apr – Jun 2026',start:dt(2026,4,1),end:dt(2026,6,30),status:'Completed',attempt:true,score:88,
  result:{correct:22,total:25,pct:88,date:dt(2026,6,12),mins:24,answers:null,comps:[sComp('Information Security',90),sComp('Business Ethics',100),sComp('Workplace Safety',72),sComp('Data Protection',88)]}},
 {id:'T4',name:'TNA Cycle 2026 — Q1 Digital Literacy',period:'Jan – Mar 2026',start:dt(2026,1,1),end:dt(2026,3,31),status:'Completed',attempt:true,score:79,late:true,
  result:{correct:19,total:24,pct:79,date:dt(2026,4,8),mins:31,answers:null,comps:[sComp('Collaboration Tools',90),sComp('Data Handling',64),sComp('Cybersecurity Hygiene',82),sComp('Digital Productivity',80)]}},
 {id:'T5',name:'TNA Cycle 2025 — Annual Core Competency',period:'Oct – Dec 2025',start:dt(2025,10,1),end:dt(2025,12,31),status:'Completed',attempt:true,score:91,
  result:{correct:21,total:23,pct:91,date:dt(2025,11,20),mins:27,answers:null,comps:[sComp('Decision Making',96),sComp('Collaboration Tools',100),sComp('Adaptability',78),sComp('Business Ethics',92)]}}
];
function lntna(id){return LNTNA.filter(function(t){return t.id===id;})[0];}
function tnaAnswered(t){return t.draft?t.draft.ans.filter(function(v){return v!==null&&v!==undefined;}).length:0;}
function tnaBtn(t){
  if(t.status==='Completed')return '<button class="btn sm" data-tnares="'+t.id+'">View result</button>';
  if(t.attempt)return '<button class="btn sm primary" data-tnaplay="'+t.id+'">Continue</button>';
  return '<button class="btn sm primary" data-tnas="'+t.id+'">'+(NOW>t.end?'Start Working (Late)':'Start Working')+'</button>';
}
function tnaSub(t){
  if(t.status==='Completed')return 'Score '+t.score+'%';
  if(t.attempt&&TNA_BANK[t.id])return tnaAnswered(t)+' of '+TNA_BANK[t.id].length+' answered';
  return 'One attempt per cycle';
}
function openTna(item,id){
  if(state.item==='tnacycle'||state.item==='tnahist')state.tnaFrom=state.item;
  state.item=item;state.tnaId=id;render();window.scrollTo(0,0);
}
function startTna(id){
  var t=lntna(id);if(!t||t.status==='Completed')return;
  var Q=TNA_BANK[id];if(!Q){toast('The questions for this cycle are not published yet');return;}
  if(!t.attempt){
    var over=NOW>t.end;
    t.attempt=true;t.status='In progress';t.late=over;
    t.draft={ans:Q.map(function(){return null;}),idx:0,started:Date.now()};
    toast('Started: '+t.name+(over?' (marked Late)':''));
  }
  openTna('tnaplay',id);
}
function tnaScore(t){
  var Q=TNA_BANK[t.id],d=t.draft,correct=0,by={},order=[];
  var answers=Q.map(function(q,i){
    var pick=d.ans[i],ok=pick===q.a;if(ok)correct++;
    if(!by[q.c]){by[q.c]={name:q.c,correct:0,total:0};order.push(q.c);}
    by[q.c].total++;if(ok)by[q.c].correct++;
    return {pick:pick,ok:ok};
  });
  var comps=order.map(function(n){var x=by[n];x.pct=Math.round(x.correct/x.total*100);return x;});
  return {correct:correct,total:Q.length,pct:Math.round(correct/Q.length*100),comps:comps,answers:answers,date:NOW,mins:Math.max(1,Math.round((Date.now()-d.started)/60000))};
}
function tnaSubmit(id){
  var t=lntna(id);if(!t||t.status!=='In progress')return;
  var miss=[];t.draft.ans.forEach(function(v,i){if(v===null||v===undefined)miss.push(i);});
  if(miss.length){
    var el=$('#tnaAlert');
    if(el){el.innerHTML=icon('alert',18)+'<span>Answer every question before submitting. Unanswered: '+miss.map(function(i){return '<button class="lk" data-tnago="'+i+'">'+(i+1)+'</button>';}).join(', ')+'.</span>';el.hidden=false;}
    return;
  }
  var r=tnaScore(t);
  t.result=r;t.score=r.pct;t.status='Completed';
  toast('TNA submitted. Your result is ready');
  openTna('tnaresult',id);
}
function tnaRefreshSide(t){
  var n=TNA_BANK[t.id].length,a=tnaAnswered(t);
  var c=$('#tnaCount');if(c)c.textContent=a+' of '+n+' answered';
  var b=$('#tnaBar');if(b)b.style.width=Math.round(a/n*100)+'%';
  Array.prototype.forEach.call(document.querySelectorAll('.qdot'),function(el,k){
    var v=t.draft.ans[k];el.classList.toggle('ans',v!==null&&v!==undefined);
  });
}

/* ---------- Shared bits ---------- */
function courseCell(c,sub){return '<div class="who"><span class="itile">'+icon(c.mand?'alert':'cap',18)+'</span><span><span class="a">'+esc(c.title)+'</span><span class="b">'+esc(sub||c.cat)+'</span></span></div>';}
function lnHead(title,sub,act){return head(title,sub,act);}
function openPlayer(enrId,lessonIdx){
  state.item='player';state.playId=enrId;
  var e=lnenr(enrId);
  if(e&&e.status==='Not started')e.status='In progress';
  state.lessonIdx=(lessonIdx!=null)?lessonIdx:clamp(e?e.doneN:0,0,(e?enrLessons(e).length:1)-1);
  render();window.scrollTo(0,0);
}
function markLessonDone(id){
  var e=lnenr(id);if(!e)return;var lessons=enrLessons(e);
  if(e.doneN<lessons.length)e.doneN++;
  if(e.doneN>=lessons.length){
    e.status='Completed';e.done=NOW;e.due=null;
    if(!LNCERT.some(function(c){return c.cid===e.cid;}))LNCERT.push({id:'CT'+(LNCERT.length+1),cid:e.cid,no:'PIDC-CERT-2026-'+e.id,issue:NOW,exp:null});
    state.lessonIdx=lessons.length-1;
    toast('Course completed — certificate generated.');
  }else{
    e.status='In progress';state.lessonIdx=e.doneN;
    toast('Lesson complete. Moving to the next one.');
  }
  render();window.scrollTo(0,0);
}

var LNHRS={labels:['Apr','May','Jun','Jul','Aug','Sep'],vals:[6,9,14,7,11,10]};
function drawLnHours(){
  var el=$('#lnhrs');if(!el)return;
  var W=Math.max(280,el.clientWidth),H=190,m={l:28,r:8,t:12,b:28},n=LNHRS.labels.length,hi=16;
  var step=(W-m.l-m.r)/n,bw=Math.min(28,step*.5),y=function(v){return m.t+(hi-v)*(H-m.t-m.b)/hi;},y0=y(0);
  var s='<svg viewBox="0 0 '+W+' '+H+'" width="100%" height="'+H+'" role="img" aria-label="Bar chart of learning hours logged per month, last 6 months">';
  [0,8,16].forEach(function(t){s+='<line class="ch-grid" x1="'+m.l+'" x2="'+(W-m.r)+'" y1="'+y(t)+'" y2="'+y(t)+'"/><text class="ch-txt" x="'+(m.l-8)+'" y="'+(y(t)+4)+'" text-anchor="end">'+t+'</text>';});
  LNHRS.labels.forEach(function(lb,i){
    var cx=m.l+step*i+step/2,v=LNHRS.vals[i];
    s+='<rect class="fb-in" x="'+(cx-bw/2)+'" y="'+y(v)+'" width="'+bw+'" height="'+(y0-y(v))+'" rx="2"><title>'+lb+': '+v+' hours</title></rect>';
    s+='<text class="ch-txt" x="'+cx+'" y="'+(H-8)+'" text-anchor="middle">'+lb+'</text>';
  });
  el.innerHTML=s+'</svg>';
}

/* ================= Dashboard ================= */
function viewLnDash(){
  var inprog=LNENR.filter(function(e){return e.status==='In progress';});
  var totalHrs=LNHRS.vals.reduce(function(a,b){return a+b;},0);
  var pendingMand=LNASSIGN.filter(asgPending).sort(urgSort);
  var certN=LNCERT.length;
  var h=lnHead('Dashboard','Wednesday, September 23, 2026 · Logged in as Staff','<button class="btn" data-toast="Prototype: export learning transcript">'+icon('download',18)+'Export transcript</button>');
  h+=kpis([['Courses in progress',inprog.length,'Across your enrollments'],['Learning hours this year',totalHrs,'Logged Apr – Sep 2026'],['Certificates earned',certN,'View in My Certificates'],['Assignments pending',pendingMand.length,'Proof of completion due to HR']]);
  h+='<div class="grid"><section class="card c8"><div class="card-head"><div><h2>Continue learning</h2><p class="hint">Pick up where you left off</p></div></div><div class="courses">'
   +inprog.map(function(e){var c=lncourse(e.cid);return '<article class="course"><div class="cr-top">'+chip('info','In progress')+'<span class="cr-fmt">'+c.fmt+'</span></div><h3>'+esc(c.title)+'</h3><p class="cr-meta">'+icon('clock',16)+c.hours+' hours · '+esc(c.provider)+'</p>'
     +'<div><div class="cap"><span>'+enrProg(e)+'% complete</span>'+(e.due?'<span>Due '+fd(e.due,true)+'</span>':'')+'</div><span class="hb-t" style="margin-top:8px"><i style="width:'+enrProg(e)+'%"></i></span></div>'
     +'<button class="btn sm primary" data-lnplay="'+e.id+'">Resume</button></article>';}).join('')
   +'</div></section>'
   +'<section class="card c4"><div class="card-head"><div><h2>Assignments due</h2><p class="hint">Submit proof of completion to HR</p></div></div><ul class="alerts">'
   +(pendingMand.length?pendingMand.slice(0,4).map(function(a){return '<li><button data-goln="extassign"><span class="al-ico '+(urgDays(a.due)<0?'bad':'warn')+'">'+icon('alert',20)+'</span><span><span class="a">'+esc(a.title)+'</span><span class="b">Next: '+asgNext(a)+' \u00b7 Due '+fd(a.due,true)+'</span></span></button></li>';}).join(''):'<li class="empty-note" style="display:block;border:0">All assignments are submitted.</li>')
   +'</ul></section>'
   +'<section class="card r3a"><div class="card-head"><div><h2>Learning hours</h2><p class="hint">Logged per month, last 6 months</p></div></div><div id="lnhrs"></div><p class="insight">'+totalHrs+' hours logged this year, an average of '+pct(totalHrs/6,1)+' hours per month.</p></section>'
   +'<section class="card r3b"><div class="card-head"><div><h2>Recent certificates</h2><p class="hint">Most recently issued</p></div></div><ul class="agenda">'
   +LNCERT.slice().sort(function(a,b){return b.issue-a.issue;}).map(function(ct){var c=lncourse(ct.cid);return '<li><span class="date"><b>'+ct.issue.getDate()+'</b><span>'+MON[ct.issue.getMonth()]+'</span></span><span><span class="a">'+esc(c.title)+'</span><span class="b">'+ct.no+'</span></span></li>';}).join('')
   +'</ul></section>'
   +'<section class="card r3c"><div class="card-head"><div><h2>Your active requests</h2><p class="hint">External training approvals</p></div></div>'
   +LNREQ.filter(function(r){return reqActive(r);}).map(function(r){return '<div class="crit"><div class="cl"><span class="cn" title="'+esc(r.title)+'">'+esc(r.title)+'</span><span class="cv">'+reqStatus(r)+'</span></div><span class="hb-t"><i style="width:'+(r.stage/6*100)+'%"></i></span></div>';}).join('')
   +'</section></div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= Training Catalog ================= */
function viewLnCatalog(){
  var u=ui.lcat,q=u.q.toLowerCase();
  var rows=LNCOURSES.filter(function(c){return (!q||(c.title+' '+c.provider).toLowerCase().indexOf(q)>-1)&&(!u.cat||c.cat===u.cat)&&(!u.aud||c.aud===u.aud);});
  var h=lnHead('Training Catalog','Browse individual courses open for enrollment','');
  h+=kpis([['Courses available',LNCOURSES.length,'Across '+LNCAT.length+' categories'],['Mandatory courses',LNCOURSES.filter(function(c){return c.mand;}).length,'Required for all employees'],['Open to external staff',LNCOURSES.filter(function(c){return c.aud==='External eligible';}).length,'Eligible for partner staff'],['Average duration',pct(LNCOURSES.reduce(function(a,c){return a+c.hours;},0)/LNCOURSES.length,1)+' hrs','Per course']]);
  h+='<div class="toolbar"><input class="inp" type="text" data-keep="lcat-q" data-f="lcat.q" value="'+esc(u.q)+'" placeholder="Search course title or provider" aria-label="Search training catalog">'
    +'<select class="sel" data-f="lcat.cat" aria-label="Filter category">'+opts(LNCAT,u.cat,'All categories')+'</select>'
    +'<select class="sel" data-f="lcat.aud" aria-label="Filter audience">'+opts(['All employees','Internal only','External eligible'],u.aud,'All audiences')+'</select></div>';
  h+='<div class="courses">'+(rows.length?rows.map(function(c){
    var ex=LNENR.filter(function(e){return e.cid===c.id;})[0];
    var btn=!ex?'<button class="btn sm primary" data-lnenroll="'+c.id+'">Enroll</button>':ex.status==='Completed'?'<button class="btn sm" data-lngo="certs">View certificate</button>':'<button class="btn sm primary" data-lnplay="'+ex.id+'">Continue</button>';
    return '<article class="course"><div class="cr-top">'+chip(c.mand?'warn':'mute',c.mand?'Mandatory':c.aud)+'<span class="cr-fmt">'+c.fmt+'</span></div><h3>'+esc(c.title)+'</h3><p class="cr-meta">'+icon('clock',16)+c.hours+' hours · '+esc(c.provider)+' · '+c.level+'</p>'
     +'<div><div class="cap"><span>'+c.filled+' enrolled</span><span>Category: '+c.cat+'</span></div></div>'
     +btn+'</article>';
  }).join(''):'<p class="empty-note">No courses match the filters.</p>')+'</div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= Learning Path ================= */
function pathsForMe(){return LNPATHS.filter(function(p){return p.div===PROFILE.division;});}
function pathDone(p){return p.steps.filter(function(c){return LNPROG[c]==='Completed';}).length;}
function viewLnPath(){
  var rows=pathsForMe();
  var h=lnHead('Learning Path','Sequenced courses for the '+PROFILE.division+' division. Complete each step to unlock the next.','');
  if(!rows.length){
    return '<div class="page-inner">'+h+'<section class="card"><p class="empty-note" style="border:0">No learning path has been set up for the '+esc(PROFILE.division)+' division yet. Contact your HR administrator.</p></section></div>';
  }
  var p0=rows[0],n=p0.steps.length,dn=pathDone(p0);
  h+=kpis([['Paths for your division',rows.length,PROFILE.division+' division'],['Your active path',esc(p0.name.split(' \u2014 ')[0]),dn+' of '+n+' steps completed'],['Courses in path',n,'Complete in order'],['Your progress',Math.round(dn/n*100)+'%','Of the '+esc(p0.name.split(' \u2014 ')[0])]]);
  h+='<div class="tip-line" style="margin:20px 0 24px">'+icon('info',18)+'<span>You can only see and take the learning path for your own division ('+esc(PROFILE.division)+').</span></div>';
  h+='<div class="stack">'+rows.map(function(p){
    var total=p.steps.length,done=pathDone(p);
    var steps=p.steps.map(function(cid,idx){
      var c=lncourse(cid),st=pathStepStatus(p,idx,cid),cls=st==='done'?'done':st==='active'?'now':'',
        node=st==='done'?icon('check',14,3):st==='locked'?icon('lock',12,2.5):'';
      return '<li class="'+cls+'"><span class="node">'+node+'</span><span><span class="a">'+esc(c.title)+'</span><span class="b">'+c.hours+' hours \u00b7 '+c.cat+(st==='locked'?' \u00b7 Locked until the previous step is complete':'')+'</span></span>'+(st==='done'?chip('ok','Completed'):st==='active'?chip('info','In progress'):st==='available'?'<button class="btn sm primary" data-lnenroll="'+cid+'">Start</button>':chip('mute','Locked'))+'</li>';
    }).join('');
    return '<section class="card"><div class="card-head"><div><h2>'+esc(p.name)+'</h2><p class="hint">'+esc(p.div)+' \u00b7 Your division \u00b7 '+done+' of '+total+' steps completed</p></div>'+(done===total?chip('ok','Completed'):done>0?chip('info','In progress'):chip('mute','Not started'))+'</div><ol class="steps">'+steps+'</ol></section>';
  }).join('')+'</div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= My Training ================= */
function viewLnTraining(){
  var u=ui.ltrain,rows=LNENR.filter(function(e){return (u.tab==='all'||!u.tab||e.status===u.tab);}).sort(function(a,b){return urgDays(a.due)-urgDays(b.due);});
  var h=lnHead('My Training','Courses you have enrolled in, in progress, or completed','');
  h+=kpis([['Enrolled courses',LNENR.length,'All statuses'],['In progress',LNENR.filter(function(e){return e.status==='In progress';}).length,'Keep going'],['Overdue',LNENR.filter(function(e){return e.status==='Overdue';}).length,'Past the deadline'],['Pending approval',LNENR.filter(function(e){return e.status==='Pending approval';}).length,'Awaiting enrollment approval']]);
  h+='<div class="toolbar">'+tabs('ltrain','tab',u.tab||'all',[['all','All',LNENR.length],['In progress','In progress',LNENR.filter(function(e){return e.status==='In progress';}).length],['Not started','Not started',LNENR.filter(function(e){return e.status==='Not started';}).length],['Overdue','Overdue',LNENR.filter(function(e){return e.status==='Overdue';}).length],['Pending approval','Pending approval',LNENR.filter(function(e){return e.status==='Pending approval';}).length],['Completed','Completed',LNENR.filter(function(e){return e.status==='Completed';}).length]])+'</div>';
  h+='<section class="card">'+tblWrap('<table class="tbl"><thead><tr><th>Course</th><th style="min-width:140px">Progress</th><th>Deadline</th><th>Status</th><th></th></tr></thead><tbody>'
   +(rows.length?rows.map(function(e){var c=lncourse(e.cid);
     var btn=e.status==='Not started'?'<button class="btn sm primary" data-lnplay="'+e.id+'">Start</button>':e.status==='Completed'?'<button class="btn sm" data-lngo="certs">Certificate</button>':e.status==='In progress'||e.status==='Overdue'?'<button class="btn sm primary" data-lnplay="'+e.id+'">Resume</button>':'<span class="dim-txt">—</span>';
     return '<tr class="click" tabindex="0" data-lnenr="'+e.id+'"><td>'+courseCell(c,c.cat+' · '+esc(e.src))+'</td><td><span class="hb-t"><i style="width:'+enrProg(e)+'%"></i></span><span class="ks">'+enrProg(e)+'%</span></td><td class="tnum">'+(e.due?fd(e.due,true)+' '+urgChip(e.status==='Completed'?null:e.due):(e.done?'Completed '+fd(e.done,true):'—'))+'</td><td>'+chip(ENC[e.status],e.status)+'</td><td>'+btn+'</td></tr>';
   }).join(''):'<tr><td colspan="5" class="empty-note">No courses in this view.</td></tr>')
   +'</tbody></table>')+'</section>';
  return '<div class="page-inner">'+h+'</div>';
}
function openEnr(id){
  var e=lnenr(id);if(!e)return;var c=lncourse(e.cid);
  openPanel('Course progress','<div class="prof"><span class="big" style="border-radius:12px">'+icon('cap',26)+'</span><div><h3>'+esc(c.title)+'</h3><p>'+c.cat+' · '+c.provider+'</p></div></div>'
   +'<dl class="kv"><dt>Status</dt><dd>'+chip(ENC[e.status],e.status)+'</dd><dt>Format</dt><dd>'+c.fmt+'</dd><dt>Duration</dt><dd>'+c.hours+' hours</dd><dt>Source</dt><dd>'+esc(e.src)+'</dd>'+(e.enrolled?'<dt>Enrolled</dt><dd>'+fd(e.enrolled,true)+'</dd>':'')+(e.due?'<dt>Deadline</dt><dd>'+fd(e.due,true)+'</dd>':'')+(e.done?'<dt>Completed</dt><dd>'+fd(e.done,true)+'</dd>':'')+'</dl>'
   +'<div class="kv-h">Progress</div><div class="gauge"><i style="width:'+enrProg(e)+'%"></i></div><div class="cap"><span>'+enrProg(e)+'% complete · '+(e.doneN||0)+' of '+enrLessons(e).length+' lessons</span></div>'
   +'<div class="d-actions">'+(e.status==='Not started'?'<button class="btn primary" data-lnplay="'+e.id+'" data-inpanel="1">Start</button>':e.status==='Completed'?'<button class="btn primary" data-toast="Prototype: download certificate">Download certificate</button>':'<button class="btn primary" data-lnplay="'+e.id+'" data-inpanel="1">Resume</button>')+'</div>');
}

/* ================= My Certificates ================= */
function viewLnCerts(){
  var u=ui.lcert,rows=LNCERT.filter(function(ct){var c=lncourse(ct.cid);return !u.q||c.title.toLowerCase().indexOf(u.q.toLowerCase())>-1;});
  var h=lnHead('My Certificates','Certificates earned from completed training','');
  h+=kpis([['Certificates earned',LNCERT.length,'Available to download'],['Expiring within a year',LNCERT.filter(function(ct){return ct.exp&&diffDays(ct.exp,NOW)<=365;}).length,'Renewal may be required'],['Total certified hours',LNCOURSES.filter(function(c){return LNCERT.some(function(ct){return ct.cid===c.id;});}).reduce(function(a,c){return a+c.hours;},0),'Across all certificates'],['Latest certificate',fd(LNCERT.slice().sort(function(a,b){return b.issue-a.issue;})[0].issue,true),'Most recent']]);
  h+='<div class="toolbar"><input class="inp" type="text" data-keep="lcert-q" data-f="lcert.q" value="'+esc(u.q)+'" placeholder="Search certificates" aria-label="Search certificates"></div>';
  h+='<div class="courses">'+rows.map(function(ct){var c=lncourse(ct.cid);return '<article class="course"><div class="cr-top">'+chip(ct.exp?'info':'ok',ct.exp?'Expires '+fd(ct.exp,true):'No expiry')+'<span class="cr-fmt">'+ct.no+'</span></div><h3>'+esc(c.title)+'</h3><p class="cr-meta">'+icon('award',16)+'Issued '+fd(ct.issue,true)+'</p>'
   +'<span class="acts"><button class="btn sm" data-lncert="'+ct.id+'">Preview</button><button class="btn sm primary" data-toast="Prototype: download certificate PDF">Download</button></span></article>';}).join('')+'</div>';
  return '<div class="page-inner">'+h+'</div>';
}
function openCert(id){
  var ct=lncert(id);if(!ct)return;var c=lncourse(ct.cid);
  openPanel('Certificate preview','<div class="prof"><span class="big" style="border-radius:12px">'+icon('award',26)+'</span><div><h3>'+esc(c.title)+'</h3><p>'+ct.no+'</p></div></div>'
   +'<dl class="kv"><dt>Awarded to</dt><dd>Current user</dd><dt>Provider</dt><dd>'+esc(c.provider)+'</dd><dt>Duration</dt><dd>'+c.hours+' hours</dd><dt>Issue date</dt><dd>'+fd(ct.issue,true)+'</dd><dt>Expiry</dt><dd>'+(ct.exp?fd(ct.exp,true):'No expiry')+'</dd><dt>Certificate no.</dt><dd>'+ct.no+'</dd></dl>'
   +'<div class="tip-line">'+icon('info',18)+'<span>This prototype shows certificate details only. Download produces a placeholder file.</span></div>'
   +'<div class="d-actions"><button class="btn primary" data-toast="Prototype: download certificate PDF">'+icon('download',18)+'Download PDF</button></div>');
}

/* ================= Post-Training Evaluation ================= */
function viewLnEval(){
  var u=ui.leval,rows=LNEVAL.filter(function(v){return u.tab==='all'||!u.tab||v.status===u.tab;});
  var h=lnHead('Post-Training Evaluation','Your manager\u2019s assessment of how training translated into performance','');
  h+=kpis([['Evaluations completed',LNEVAL.filter(function(v){return v.status==='Completed';}).length,'Out of '+LNEVAL.length+' eligible courses'],['Pending',LNEVAL.filter(function(v){return v.status==='Pending';}).length,'Awaiting manager input'],['Average overall score',pct(LNEVAL.filter(function(v){return v.overall;}).reduce(function(a,v){return a+v.overall;},0)/LNEVAL.filter(function(v){return v.overall;}).length,1)+' / 5','From completed evaluations'],['Evaluator','Bambang Irawan','Your direct manager']]);
  h+='<div class="toolbar">'+tabs('leval','tab',u.tab||'all',[['all','All',LNEVAL.length],['Completed','Completed',LNEVAL.filter(function(v){return v.status==='Completed';}).length],['Pending','Pending',LNEVAL.filter(function(v){return v.status==='Pending';}).length]])+'</div>';
  h+='<section class="card">'+tblWrap('<table class="tbl"><thead><tr><th>Course</th><th>Manager</th><th>Date</th><th class="num">Overall score</th><th>Status</th></tr></thead><tbody>'
   +(rows.length?rows.map(function(v){var c=lncourse(v.cid);return '<tr class="click" tabindex="0" data-lneval="'+v.id+'"><td>'+courseCell(c)+'</td><td class="muted">'+esc(v.mgr)+'</td><td class="tnum">'+(v.date?fd(v.date,true):'—')+'</td><td class="num">'+(v.overall?v.overall+' / 5':'—')+'</td><td>'+chip(LNEC[v.status],v.status)+'</td></tr>';}).join(''):'<tr><td colspan="5" class="empty-note">No evaluations in this view.</td></tr>')
   +'</tbody></table>')+'</section>';
  return '<div class="page-inner">'+h+'</div>';
}
function openEval(id){
  var v=LNEVAL.filter(function(x){return x.id===id;})[0];if(!v)return;var c=lncourse(v.cid);
  openPanel('Evaluation detail','<div class="prof"><span class="big" style="border-radius:12px">'+icon('trend',26)+'</span><div><h3>'+esc(c.title)+'</h3><p>Evaluated by '+esc(v.mgr)+'</p></div></div>'
   +'<dl class="kv"><dt>Status</dt><dd>'+chip(LNEC[v.status],v.status)+'</dd><dt>Date</dt><dd>'+(v.date?fd(v.date,true):'Not yet scheduled')+'</dd></dl>'
   +(v.status==='Completed'?'<div class="kv-h">Scores</div>'+v.areas.map(function(a){return '<div class="hb-r"><span class="hb-l">'+a[0]+'</span><span class="hb-t"><i style="width:'+(a[1]/5*100)+'%"></i></span><span class="hb-v">'+a[1]+' / 5</span></div>';}).join('')+'<div class="kv-h">Manager comments</div><p class="note" style="margin:0">'+esc(v.note)+'</p>':'<p class="note">Your manager has not yet completed this evaluation.</p>'));
}

/* ================= My Requests (external training) ================= */
function viewLnReq(){
  var u=ui.lreq,tab=u.tab||'all';
  function cnt(g){return LNREQ.filter(function(r){return reqGroup(r)===g;}).length;}
  var rows=LNREQ.filter(function(r){return tab==='all'||reqGroup(r)===tab;});
  var h=lnHead('My Requests','External training you have requested, tracked across seven stages','<button class="btn primary" data-toast="Prototype: external training request form">'+icon('plus',18)+'New request</button>');
  h+=kpis([['Requests submitted',LNREQ.length,'This year'],['In approval',cnt('Approval'),'Asst. Manager to HR Admin'],['Awaiting letter',cnt('Letter'),'Approved, assignment letter pending'],['Completed',cnt('Completed'),'Assignment letter issued']]);
  h+='<div class="toolbar">'+tabs('lreq','tab',tab,[['all','All',LNREQ.length],['Approval','In approval',cnt('Approval')],['Letter','Assignment letter',cnt('Letter')],['Completed','Completed',cnt('Completed')],['Rejected','Rejected',cnt('Rejected')]])+'</div>';
  h+='<section class="card">'+tblWrap('<table class="tbl"><thead><tr><th>Request</th><th>Schedule</th><th style="min-width:170px">Progress</th><th>Status</th></tr></thead><tbody>'
   +(rows.length?rows.map(function(r){
      var segs='';for(var i=0;i<7;i++){segs+='<i class="'+(r.rejected?(i<r.stage?'on':i===r.stage?'cur':''):(i<r.stage||r.stage>=6)?'on':i===r.stage?'cur':'')+'"></i>';}
      var cap=r.rejected?'Rejected at '+RSTEPS[r.stage]:r.stage>=6?'All 7 steps done':'Step '+(r.stage+1)+' of 7 \u00b7 '+RSTEPS[r.stage];
      return '<tr class="click" tabindex="0" data-lnreq="'+r.id+'"><td class="tt"><b>'+esc(r.title)+'</b><span class="ks" style="display:block">'+r.no+' \u00b7 '+esc(r.org)+'</span></td><td class="tnum">'+fd(r.start,true)+' \u2013 '+fd(r.end,true)+'</td>'
       +'<td><span class="seg'+(r.rejected?' bad':'')+'" aria-hidden="true">'+segs+'</span><span class="ks" style="display:block;margin-top:6px">'+cap+'</span></td><td>'+chip(reqChipC(r),reqStatus(r))+'</td></tr>';
    }).join(''):'<tr><td colspan="4" class="empty-note">No requests in this view.</td></tr>')
   +'</tbody></table>')+'</section>';
  return '<div class="page-inner">'+h+'</div>';
}
function openReq(id){
  var r=lnreq(id);if(!r)return;
  var steps=RSTEPS.map(function(s,i){
    var cls='',node='',sub='',tag='';
    if(i===0){cls='done';node=icon('check',14,3);sub='You \u00b7 '+fd(r.submitted,true);tag=chip('ok','Submitted');}
    else if(i<=4){
      var ap=r.approvals[i-1];
      cls=ap&&ap.ok===true?'done':ap&&ap.ok===false?'':(i===r.stage&&!r.rejected)?'now':'';
      node=ap&&ap.ok===true?icon('check',14,3):ap&&ap.ok===false?icon('x',12,3):'';
      sub=(ap&&ap.name?esc(ap.name):'Not yet reached')+(ap&&ap.date?' \u00b7 '+fd(ap.date,true):'');
      tag=ap&&ap.ok===false?chip('bad','Rejected'):ap&&ap.ok===true?chip('ok','Approved'):(i===r.stage&&!r.rejected)?chip('warn','Pending'):'';
    }else if(i===5){
      var iss=r.stage>=6;
      cls=iss?'done':(r.stage===5&&!r.rejected)?'now':'';node=iss?icon('check',14,3):'';
      sub=iss&&r.letter?'No. '+r.letter.no+' \u00b7 '+fd(r.letter.date,true):'Prepared by HR Admin after final approval';
      tag=iss?chip('ok','Issued'):(r.stage===5&&!r.rejected)?chip('warn','Preparing'):'';
    }else{
      var dn=r.stage>=6;cls=dn?'done':'';node=dn?icon('check',14,3):'';
      sub=dn?'Request closed':'Closed once the assignment letter is issued';tag=dn?chip('ok','Completed'):'';
    }
    return '<li class="'+cls+'"><span class="node">'+node+'</span><span><span class="a">'+s+'</span><span class="b">'+sub+'</span></span>'+tag+'</li>';
  }).join('');
  openPanel('Request '+r.no,'<dl class="kv"><dt>Title</dt><dd>'+esc(r.title)+'</dd><dt>Purpose</dt><dd style="max-width:100%">'+esc(r.purpose)+'</dd><dt>Schedule</dt><dd>'+fd(r.start,true)+' \u2013 '+fd(r.end,true)+'</dd><dt>Location</dt><dd>'+esc(r.loc)+'</dd><dt>Organizer</dt><dd>'+esc(r.org)+'</dd><dt>Learning hours</dt><dd>'+r.hours+' hours</dd><dt>Expected certification</dt><dd>'+esc(r.cert)+'</dd><dt>Submitted</dt><dd>'+fd(r.submitted,true)+'</dd><dt>Status</dt><dd>'+chip(reqChipC(r),reqStatus(r))+'</dd></dl>'
   +'<div class="kv-h">Request progress</div><ol class="steps">'+steps+'</ol>'
   +(r.letter?'<div class="d-actions"><button class="btn primary" data-toast="Prototype: download assignment letter">'+icon('download',18)+'Download assignment letter</button></div>':''));
}

/* ================= Guest home (external trainers and vendors) ================= */
function viewGuestHome(){
  var h=head('Welcome, '+esc(PROFILE.name),'Guest workspace \u00b7 '+esc(PROFILE.org),'');
  h+='<div class="grid"><div class="c8"><section class="card"><div class="card-head"><div><h2>Your guest access</h2><p class="hint">External trainer and vendor account</p></div>'+chip('ok','Active')+'</div>'
   +'<p class="note" style="margin-bottom:16px">Your Portal PID guest account is active. Workspace features for external trainers and vendors are not available yet. HR will enable them for your account when they are ready.</p>'
   +'<div class="tip-line">'+icon('info',18)+'<span>Guest accounts are separate from employee accounts, so employee training data, requests, and assessments are not visible here.</span></div></section></div>'
   +'<div class="c4"><section class="card"><div class="card-head"><div><h2>Account details</h2></div></div><dl class="kv" style="grid-template-columns:96px minmax(0,1fr)"><dt>Type</dt><dd>Guest</dd><dt>Role</dt><dd>'+esc(PROFILE.title)+'</dd><dt>Organization</dt><dd>'+esc(PROFILE.org)+'</dd><dt>Username</dt><dd>'+esc(ACCT)+'</dd><dt>Guest ID</dt><dd>'+esc(PROFILE.empId)+'</dd><dt>Access</dt><dd>Limited</dd></dl></section></div></div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= My Assignments ================= */
function asgCell(a){return '<div class="who"><span class="itile">'+icon(a.type==='Internal'?'cap':'clipboard',18)+'</span><span><span class="a">'+esc(a.title)+'</span><span class="b">'+a.type+' \u00b7 '+esc(a.provider)+'</span></span></div>';}
function viewLnAssign(){
  var u=ui.lassign,q=(u.q||'').toLowerCase(),tab=u.tab||'all';
  function cnt(s){return LNASSIGN.filter(function(a){return a.stage===s;}).length;}
  var rows=LNASSIGN.filter(function(a){return (!q||(a.title+' '+a.provider).toLowerCase().indexOf(q)>-1)&&(tab==='all'||String(a.stage)===tab);}).sort(function(a,b){
    if((a.stage===4)!==(b.stage===4))return a.stage===4?1:-1;
    return a.stage===4?b.done-a.done:urgDays(a.due)-urgDays(b.due);
  });
  var h=lnHead('My Assignments','Submit proof of training completion to HR: certificate, evaluation, and report','');
  h+=kpis([['Total assignments',LNASSIGN.length,'Assigned by HR or your manager'],['Awaiting your action',LNASSIGN.filter(function(a){return a.stage>=1&&a.stage<=3;}).length,'Certificate, evaluation, or report'],['Overdue',LNASSIGN.filter(asgOverdue).length,'Past the submission deadline'],['Completed',cnt(4),'Fully submitted to HR']]);
  h+='<div class="toolbar"><input class="inp" type="text" data-keep="lassign-q" data-f="lassign.q" value="'+esc(u.q)+'" placeholder="Search training or provider" aria-label="Search assignments">'
    +tabs('lassign','tab',tab,[['all','All',LNASSIGN.length],['0','Assigned',cnt(0)],['1','Certificate',cnt(1)],['2','Evaluation',cnt(2)],['3','Report',cnt(3)],['4','Completed',cnt(4)]])+'</div>';
  h+='<section class="card">'+tblWrap('<table class="tbl"><thead><tr><th>Training</th><th>Deadline</th><th style="min-width:130px">Progress</th><th>Status</th><th></th></tr></thead><tbody>'
   +(rows.length?rows.map(function(a){
      var segs='';for(var i=0;i<5;i++){segs+='<i class="'+((i<a.stage||a.stage===4)?'on':i===a.stage?'cur':'')+'"></i>';}
      var label=a.stage===0?(asgReady(a)?'Continue':'Open'):['','Upload certificate','Fill evaluation','Write report','View'][a.stage];
      var prim=(a.stage>=1&&a.stage<=3)||asgReady(a);
      return '<tr class="click" tabindex="0" data-asg="'+a.id+'"><td class="tt">'+asgCell(a)+'</td>'
       +'<td class="tnum">'+(a.stage===4?'<span class="dim-txt">Done '+fd(a.done,true)+'</span>':fd(a.due,true)+'<span class="ks" style="display:block;margin-top:2px">'+urgChip(a.due)+'</span>')+'</td>'
       +'<td><span class="seg" aria-hidden="true">'+segs+'</span><span class="ks" style="display:block;margin-top:6px">'+(a.stage===4?'All 5 steps done':'Step '+(a.stage+1)+' of 5')+'</span></td>'
       +'<td>'+chip(ASTAGE_C[a.stage],ASTAGE_S[a.stage])+'</td>'
       +'<td><button class="btn sm'+(prim?' primary':'')+'" data-asgopen="'+a.id+'">'+label+'</button></td></tr>';
     }).join(''):'<tr><td colspan="5" class="empty-note">No assignments in this view.</td></tr>')
   +'</tbody></table>')+'</section>';
  h+='<div class="tip-line" style="margin-top:20px">'+icon('info',18)+'<span>External training needs an attendance certificate upload. Internal training issues the certificate automatically, so it goes straight to the evaluation.</span></div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ---------- Assignment detail (5-step flow) ---------- */
function taField(key,label,hint,val,err,rows){
  return '<div class="f" id="fx_'+key+'"><label for="x_'+key+'">'+label+'</label><textarea id="x_'+key+'" rows="'+(rows||4)+'" data-dr="'+key+'">'+esc(val||'')+'</textarea>'+(hint?'<div class="h">'+hint+'</div>':'')+'<span class="errtext">'+err+'</span></div>';
}
function radioField(key,label,vals,cur,err,cls,legend){
  return '<div class="f" id="fx_'+key+'"><span class="lbl">'+label+'</span><div class="opts '+(cls||'')+'" role="radiogroup" aria-label="'+esc(label)+'">'
   +vals.map(function(v){return '<label class="opt"><input type="radio" name="'+key+'" value="'+v+'" data-dr="'+key+'"'+(String(cur)===String(v)?' checked':'')+'><span>'+v+'</span></label>';}).join('')
   +'</div>'+(legend?'<div class="rate-legend"><span>'+legend[0]+'</span><span>'+legend[1]+'</span></div>':'')+'<span class="errtext">'+err+'</span></div>';
}
function checkField(key,label,vals,cur,err){
  cur=cur||[];
  return '<div class="f" id="fx_'+key+'"><span class="lbl">'+label+'</span><div class="opts" role="group" aria-label="'+esc(label)+'">'
   +vals.map(function(v){return '<label class="opt"><input type="checkbox" value="'+esc(v)+'" data-drm="'+key+'"'+(cur.indexOf(v)>-1?' checked':'')+'><span>'+v+'</span></label>';}).join('')
   +'</div><span class="errtext">'+err+'</span></div>';
}
function asgStepHead(n,title,hint,c){return '<div class="card-head"><div><h2>Step '+n+' of 5 \u00b7 '+title+'</h2><p class="hint">'+hint+'</p></div>'+c+'</div>';}
function fileChip(name,size,btn){return '<div class="filechip"><span class="itile">'+icon('file',18)+'</span><span class="fc"><span class="a">'+esc(name)+'</span><span class="b">'+fmtSize(size)+'</span></span>'+(btn||'')+'</div>';}

function asgStepCard(a){
  var d=draftOf(a.id),ext=a.type==='External',alert='<div id="asgAlert" class="form-alert" style="margin-bottom:20px" hidden></div>';
  if(a.stage===0){
    var body;
    if(ext){
      body='<div class="tip-line">'+icon('info',18)+'<span>'+esc(a.by.split(' \u2014 ')[0])+' assigned this training to you. After you attend, upload your attendance certificate to move on to the evaluation.</span></div>'
       +'<div class="acts" style="margin-top:20px">'+(asgReady(a)?'<button class="btn primary" data-asgadv="'+a.id+'">Continue to attendance certificate</button>':'<button class="btn" disabled>Continue to attendance certificate</button><span class="ks">Available after the training ends on '+fd(a.end,true)+'.</span>')+'</div>';
    }else{
      body='<div class="tip-line">'+icon('info',18)+'<span>This is an internal training. Complete the course in PIDC Learning and your certificate is issued automatically. You then go straight to the evaluation, with no upload needed.</span></div>'
       +'<div class="acts" style="margin-top:20px"><button class="btn" data-asgsim="'+a.id+'">Simulate course completion</button><span class="ks">Prototype only</span></div>';
    }
    return '<section class="card">'+asgStepHead(1,'Assigned','Waiting for you to complete the training',chip('mute','Not started'))+body+'</section>';
  }
  if(a.stage===1){
    var inner=d.file?fileChip(d.file.name,d.file.size,'<button class="btn sm" data-asgrm="'+a.id+'">Remove</button>')
      :'<label class="drop"><input type="file" accept=".pdf,.jpg,.jpeg,.png" data-asgfile="'+a.id+'">'+icon('upload',24)+'<span class="a">Choose a file to upload</span><span class="b">PDF, JPG, or PNG \u00b7 up to 5 MB</span></label>';
    return '<section class="card">'+asgStepHead(2,'Attendance Certificate','Attach the certificate you received from '+esc(a.provider),chip('warn','Action needed'))+alert
     +'<div class="fm"><div class="f'+(d.fileErr?' invalid':'')+'" id="fx_file"><span class="lbl">Attendance certificate</span>'+inner+'<span class="errtext">'+esc(d.fileErr||'Attach your attendance certificate to continue.')+'</span></div></div>'
     +'<div class="acts" style="margin-top:24px"><button class="btn primary" data-asgcert="'+a.id+'">Submit certificate</button></div></section>';
  }
  if(a.stage===2){
    return '<section class="card">'+asgStepHead(3,'Training Evaluation','Tell us how the training went',chip('warn','Action needed'))+alert
     +'<div class="fm">'
     +taField('e_material','Quality of the training material','Comment on clarity, depth, examples, and how up to date the material was.',d.e_material,'Describe the material quality in at least 20 characters.')
     +taField('e_organizer','Suggestions for the organizer','Facilitator, schedule, venue, logistics, or anything they could improve.',d.e_organizer,'Share a suggestion in at least 10 characters.',3)
     +radioField('e_relevance','How relevant is the training to your job?',REL_OPTS,d.e_relevance,'Select how relevant the training is.')
     +radioField('e_rating','How helpful was this training for you?',[1,2,3,4,5],d.e_rating,'Select a rating from 1 to 5.','rate',['1 = Not helpful','5 = Very helpful'])
     +'</div><div class="acts" style="margin-top:24px"><button class="btn primary" data-asgeval="'+a.id+'">Submit evaluation</button></div></section>';
  }
  return '<section class="card">'+asgStepHead(4,'Training Report','Summarize what you learned and how you will apply it',chip('warn','Action needed'))+alert
   +'<div class="fm">'
   +taField('r_summary','Material summary','Key topics, concepts, and tools covered during the training.',d.r_summary,'Write a summary of at least 50 characters.',5)
   +checkField('r_methods','Learning methods',METHOD_OPTS,d.r_methods,'Select at least one learning method.')
   +taField('r_output','Learning outputs','Skills gained, documents, templates, or results you produced.',d.r_output,'Describe the outputs in at least 20 characters.',3)
   +taField('r_jobrel','Relevance to your job duties','How you will apply this in your current role.',d.r_jobrel,'Explain the relevance in at least 20 characters.',3)
   +taField('r_suggest','Suggestions and criticism','Constructive input for HR and the organizer.',d.r_suggest,'Share your input in at least 10 characters.',3)
   +'</div><div class="tip-line" style="margin-top:24px">'+icon('info',18)+'<span>Submitting the report completes this assignment. You cannot edit it afterwards.</span></div>'
   +'<div class="acts" style="margin-top:20px"><button class="btn primary" data-asgrep="'+a.id+'">Submit report</button></div></section>';
}
function roBlock(label,text){return '<div class="kv-h">'+label+'</div><p class="ro">'+esc(text)+'</p>';}
function asgSumCert(a){
  var c=a.cert;
  return '<section class="card"><div class="card-head"><div><h2>Attendance certificate</h2><p class="hint">'+(c.auto?'Issued automatically by PIDC Learning':'Uploaded by you')+' \u00b7 '+fd(c.date,true)+'</p></div>'+chip('ok',c.auto?'Auto-issued':'Submitted')+'</div>'
   +(c.auto?'<dl class="kv"><dt>Certificate no.</dt><dd>'+c.no+'</dd></dl>':fileChip(c.file,c.size))+'</section>';
}
function asgSumEval(a){
  var v=a.ev;
  return '<section class="card"><div class="card-head"><div><h2>Training evaluation</h2><p class="hint">Submitted '+fd(v.date,true)+'</p></div>'+chip('ok','Submitted')+'</div>'
   +'<dl class="kv"><dt>Relevance to job</dt><dd>'+esc(v.relevance)+'</dd><dt>Helpfulness</dt><dd>'+v.rating+' / 5</dd></dl>'
   +roBlock('Quality of the training material',v.material)+roBlock('Suggestions for the organizer',v.organizer)+'</section>';
}
function asgSumRep(a){
  var r=a.rep;
  return '<section class="card"><div class="card-head"><div><h2>Training report</h2><p class="hint">Submitted '+fd(r.date,true)+'</p></div>'+chip('ok','Submitted')+'</div>'
   +roBlock('Material summary',r.summary)+roBlock('Learning methods',r.methods.join(', '))+roBlock('Learning outputs',r.output)+roBlock('Relevance to your job duties',r.jobrel)+roBlock('Suggestions and criticism',r.suggest)+'</section>';
}
function asgInfoCard(a){
  var ext=a.type==='External';
  return '<section class="card"><div class="card-head"><div><h2>Training details</h2><p class="hint">'+a.type+' training</p></div></div>'
   +'<dl class="kv" style="grid-template-columns:104px minmax(0,1fr)"><dt>Status</dt><dd>'+chip(ASTAGE_C[a.stage],ASTAGE_S[a.stage])+'</dd><dt>Provider</dt><dd>'+esc(a.provider)+'</dd><dt>Location</dt><dd>'+esc(a.loc)+'</dd><dt>Duration</dt><dd>'+a.hours+' hours</dd><dt>'+(ext?'Schedule':'Period')+'</dt><dd>'+asgDates(a)+'</dd><dt>Assigned by</dt><dd>'+esc(a.by)+'</dd><dt>Assigned</dt><dd>'+fd(a.assigned,true)+'</dd><dt>Deadline</dt><dd>'+fd(a.due,true)+(a.stage<4?' '+urgChip(a.due):'')+'</dd></dl>'
   +(ext?'':'<div class="tip-line" style="margin-top:20px">'+icon('info',18)+'<span>Internal training: the attendance certificate is issued automatically.</span></div>')+'</section>';
}
function viewAsgDetail(){
  var a=lnassign(state.assignId);
  if(!a)return '<div class="page-inner">'+head('Assignment not found','','<button class="btn" data-lngo="extassign">Back to My Assignments</button>')+'</div>';
  var ext=a.type==='External';
  var h=head(esc(a.title),a.type+' training \u00b7 '+esc(a.provider),'<button class="btn" data-lngo="extassign">'+icon('left',16)+'Back to My Assignments</button>');
  h+='<section class="card"><ol class="hsteps" aria-label="Assignment progress">'+ASTAGES.map(function(s,i){
    var done=i<a.stage||a.stage===4,now=i===a.stage&&a.stage<4,sub=(i===1&&!ext)?'Auto-issued':ASTEP_HINT[i];
    return '<li class="'+(done?'done':now?'now':'todo')+'"'+(now?' aria-current="step"':'')+'><span class="node">'+(done?icon('check',14,3):'')+'</span><span class="a">'+s+'</span><span class="b">'+sub+'</span></li>';
  }).join('')+'</ol></section>';
  var main='';
  if(a.stage<4)main+=asgStepCard(a);
  else main+='<div class="tip-line" style="background:var(--brand-tint);color:var(--brand-text)">'+icon('award',20)+'<span>Assignment completed on '+fd(a.done,true)+'. Your certificate, evaluation, and report have been submitted to HR.</span></div>';
  if(a.cert)main+=asgSumCert(a);
  if(a.ev)main+=asgSumEval(a);
  if(a.rep)main+=asgSumRep(a);
  h+='<div class="grid"><div class="c8 col">'+main+'</div><div class="c4 col">'+asgInfoCard(a)+'</div></div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= TNA: My Cycles ================= */
function viewLnTnaCycle(){
  var u=ui.ltna,rows=LNTNA.filter(function(t){return !u.tab||u.tab==='all'||t.status===u.tab;}).slice().sort(function(a,b){
    var ca=a.status==='Completed',cb=b.status==='Completed';
    if(ca!==cb)return ca?1:-1;
    return ca?b.end-a.end:a.end-b.end;
  });
  var done=LNTNA.filter(function(t){return t.score;});
  var h=lnHead('My TNA Cycles','Training Needs Analysis cycles you are enrolled in','');
  h+=kpis([['Active cycles',LNTNA.filter(function(t){return t.status!=='Completed';}).length,'Open for you to complete'],['Completed',LNTNA.filter(function(t){return t.status==='Completed';}).length,'Result available'],['Completed late',LNTNA.filter(function(t){return t.late&&t.status==='Completed';}).length,'Finished after the cycle ended'],['Average score',done.length?Math.round(done.reduce(function(a,t){return a+t.score;},0)/done.length)+'%':'\u2014','From completed cycles']]);
  h+='<div class="toolbar">'+tabs('ltna','tab',u.tab||'all',[['all','All',LNTNA.length],['Not started','Not started',LNTNA.filter(function(t){return t.status==='Not started';}).length],['In progress','In progress',LNTNA.filter(function(t){return t.status==='In progress';}).length],['Completed','Completed',LNTNA.filter(function(t){return t.status==='Completed';}).length]])+'</div>';
  h+='<section class="card">'+tblWrap('<table class="tbl"><thead><tr><th>Cycle</th><th>Period</th><th>Ends</th><th>Status</th><th></th></tr></thead><tbody>'
   +(rows.length?rows.map(function(t){
     return '<tr><td class="tt"><div class="who"><span class="itile">'+icon('target',18)+'</span><span><span class="a">'+esc(t.name)+'</span><span class="b">'+tnaSub(t)+'</span></span></div></td><td class="muted">'+t.period+'</td><td class="tnum">'+fd(t.end,true)+(t.status!=='Completed'?'<span class="ks" style="display:block">'+urgChip(t.end)+'</span>':'')+'</td><td>'+chip(t.status==='Completed'?'ok':t.status==='In progress'?'info':'mute',t.late&&t.status==='Completed'?'Completed (Late)':t.status)+'</td><td>'+tnaBtn(t)+'</td></tr>';
   }).join(''):'<tr><td colspan="5" class="empty-note">No cycles in this view.</td></tr>')
   +'</tbody></table>')+'</section>'
   +'<div class="tip-line" style="margin-top:20px">'+icon('info',18)+'<span>Start Working is enabled while a cycle is open, or after it ends if you have not attempted it yet; late attempts are marked accordingly. Each cycle allows one attempt, progress is saved, and your result appears as soon as you submit.</span></div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= TNA: History ================= */
function viewLnTnaHist(){
  var u=ui.lhist,rows=LNTNA.filter(function(t){return (!u.q||t.name.toLowerCase().indexOf(u.q.toLowerCase())>-1)&&(u.tab==='all'||!u.tab||t.status===u.tab);}).slice().sort(function(a,b){return urgDays(a.end)-urgDays(b.end);});
  var h=lnHead('TNA History','Every Training Needs Analysis cycle, past and present','');
  h+=kpis([['Total cycles',LNTNA.length,'Since 2025'],['Completed on time',LNTNA.filter(function(t){return t.status==='Completed'&&!t.late;}).length,'Within the cycle window'],['Completed late',LNTNA.filter(function(t){return t.late&&t.status==='Completed';}).length,'After the deadline'],['Not yet completed',LNTNA.filter(function(t){return t.status!=='Completed';}).length,'Still open or overdue']]);
  h+='<div class="toolbar"><input class="inp" type="text" data-keep="lhist-q" data-f="lhist.q" value="'+esc(u.q)+'" placeholder="Search TNA cycle" aria-label="Search TNA history">'
    +tabs('lhist','tab',u.tab||'all',[['all','All'],['Not started','Not started'],['In progress','In progress'],['Completed','Completed']])+'</div>';
  h+='<section class="card">'+tblWrap('<table class="tbl"><thead><tr><th>Cycle</th><th>Period</th><th class="num">Score</th><th>Status</th><th>Urgency / result</th></tr></thead><tbody>'
   +(rows.length?rows.map(function(t){return '<tr><td class="tt"><div class="who"><span class="itile">'+icon('target',18)+'</span><span><span class="a">'+esc(t.name)+'</span></span></div></td><td class="muted">'+t.period+'</td><td class="num">'+(t.score?t.score+'%':'\u2014')+'</td><td>'+chip(t.status==='Completed'?'ok':t.status==='In progress'?'info':'mute',t.late&&t.status==='Completed'?'Completed (Late)':t.status)+'</td><td>'+(t.status==='Completed'?'<button class="btn sm" data-tnares="'+t.id+'">View result</button>':urgChip(t.end))+'</td></tr>';}).join(''):'<tr><td colspan="5" class="empty-note">No cycles match the filters.</td></tr>')
   +'</tbody></table>')+'</section>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= TNA: Assessment player ================= */
function viewTnaPlay(){
  var t=lntna(state.tnaId),Q=t&&TNA_BANK[t.id];
  if(!t||!Q||t.status!=='In progress')return '<div class="page-inner">'+head('Assessment not available','This cycle is not open for answering.','<button class="btn" data-lngo="tnacycle">Back to My TNA Cycles</button>')+'</div>';
  var d=t.draft,i=d.idx,q=Q[i],n=Q.length,a=tnaAnswered(t),last=i===n-1,back=state.tnaFrom||'tnacycle';
  var h=head(esc(t.name),'Training Needs Analysis \u00b7 '+n+' questions \u00b7 one attempt, progress is saved','<button class="btn" data-tnaexit="1">'+icon('left',16)+'Save and exit</button>');
  var opts=q.o.map(function(o,k){return '<label class="choice"><input type="radio" name="tq'+i+'" value="'+k+'" data-tnaopt="1"'+(d.ans[i]===k?' checked':'')+'><span class="k">'+'ABCD'.charAt(k)+'</span><span class="tx">'+esc(o)+'</span></label>';}).join('');
  var qcard='<section class="card"><div class="q-top"><span class="ks">Question '+(i+1)+' of '+n+'</span>'+chip('info',esc(q.c))+'</div>'
    +'<span class="hb-t" style="margin:12px 0 22px"><i style="width:'+Math.round((i+1)/n*100)+'%"></i></span>'
    +'<h2 class="q-text">'+esc(q.q)+'</h2><div class="choices" role="radiogroup" aria-label="Answer options">'+opts+'</div>'
    +'<div id="tnaAlert" class="form-alert" style="margin-top:20px" hidden></div>'
    +'<div class="acts q-nav"><button class="btn" data-tnaprev="1"'+(i===0?' disabled':'')+'>Previous</button>'+(last?'<button class="btn primary" data-tnasubmit="'+t.id+'">Submit answers</button>':'<button class="btn primary" data-tnanext="1">Next</button>')+'</div></section>';
  var dots=Q.map(function(_,k){var v=d.ans[k];return '<button class="qdot'+((v!==null&&v!==undefined)?' ans':'')+(k===i?' cur':'')+'" data-tnago="'+k+'" aria-label="Go to question '+(k+1)+'">'+(k+1)+'</button>';}).join('');
  var side='<section class="card"><h2>Progress</h2><p class="hint" id="tnaCount" style="margin:2px 0 12px">'+a+' of '+n+' answered</p><span class="hb-t"><i id="tnaBar" style="width:'+Math.round(a/n*100)+'%"></i></span>'
    +'<div class="qdots">'+dots+'</div>'
    +'<div class="tip-line" style="margin-top:20px">'+icon('info',18)+'<span>You can leave and continue later; answers are saved. All questions must be answered before you submit.'+(t.late?' This attempt is marked Late.':'')+'</span></div></section>';
  return '<div class="page-inner">'+h+'<div class="grid"><div class="c8">'+qcard+'</div><div class="c4">'+side+'</div></div></div>';
}

/* ================= TNA: Result ================= */
function tnaBand(p){return p>=80?{k:'Strong',c:'ok',col:'var(--ok-solid)'}:p>=60?{k:'Developing',c:'info',col:'var(--accent)'}:{k:'Needs development',c:'warn',col:'var(--warn-solid)'};}
function tnaLevel(p){return p>=80?{k:'Proficient',c:'ok',bar:'ok'}:p>=50?{k:'Developing',c:'info',bar:'dev'}:{k:'Priority gap',c:'warn',bar:'gap'};}
function tnaDonut(p,col){
  var R=54,C=2*Math.PI*R,off=C*(1-p/100);
  return '<svg viewBox="0 0 140 140" width="148" height="148" role="img" aria-label="Overall score '+p+' percent"><circle cx="70" cy="70" r="'+R+'" fill="none" stroke="var(--field)" stroke-width="12"/><circle cx="70" cy="70" r="'+R+'" fill="none" stroke="'+col+'" stroke-width="12" stroke-linecap="round" stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="'+off.toFixed(1)+'" transform="rotate(-90 70 70)"/><text x="70" y="78" text-anchor="middle" class="dn-v">'+p+'%</text></svg>';
}
function viewTnaResult(){
  var t=lntna(state.tnaId),r=t&&t.result,back=state.tnaFrom||'tnacycle';
  if(!t||!r)return '<div class="page-inner">'+head('Result not available','Complete this cycle to see your result.','<button class="btn" data-lngo="tnacycle">Back to My TNA Cycles</button>')+'</div>';
  var band=tnaBand(r.pct),comps=r.comps.slice(),
      best=comps.slice().sort(function(a,b){return b.pct-a.pct;})[0],worst=comps.slice().sort(function(a,b){return a.pct-b.pct;})[0];
  var h=head(esc(t.name),'Your Training Needs Analysis result','<button class="btn" data-lngo="'+back+'">'+icon('left',16)+'Back to '+(back==='tnahist'?'TNA History':'My TNA Cycles')+'</button>');
  h+='<section class="card tna-hero"><div class="donut">'+tnaDonut(r.pct,band.col)+'</div><div class="hero-tx"><div class="hero-chips">'+chip(band.c,band.k)+(t.late?chip('warn','Completed late'):'')+'</div>'
    +'<h2>You scored '+r.pct+'%</h2><p class="note" style="margin:4px 0 16px">'+r.correct+' of '+r.total+' questions answered correctly in '+r.mins+' minutes.</p>'
    +'<dl class="kv"><dt>Completed</dt><dd>'+fd(r.date,true)+'</dd><dt>Strongest area</dt><dd>'+esc(best.name)+' ('+best.pct+'%)</dd><dt>Priority area</dt><dd>'+(worst.pct<80?esc(worst.name)+' ('+worst.pct+'%)':'None, all areas are proficient')+'</dd></dl></div></section>';
  h+='<div class="grid" style="margin-top:24px"><div class="c6"><section class="card"><div class="card-head"><div><h2>Competency breakdown</h2><p class="hint">Proficient at 80% or above</p></div></div><div class="crows">'
    +comps.map(function(c){var lv=tnaLevel(c.pct);return '<div class="crow"><div class="cn"><span class="a">'+esc(c.name)+'</span><span class="b">'+(c.total?c.correct+' of '+c.total+' correct':'Archived cycle')+'</span></div>'+chip(lv.c,lv.k)+'<span class="hb-t cbar"><i class="'+lv.bar+'" style="width:'+c.pct+'%"></i></span><span class="cp tnum">'+c.pct+'%</span></div>';}).join('')
    +'</div></section></div>';
  var seen={},recs=[];
  comps.filter(function(c){return c.pct<80;}).sort(function(a,b){return a.pct-b.pct;}).forEach(function(c){
    (TNA_COURSES[c.name]||[]).forEach(function(cid){if(!seen[cid]&&lncourse(cid)){seen[cid]=1;recs.push({cid:cid,why:c.name});}});
  });
  h+='<div class="c6"><section class="card"><div class="card-head"><div><h2>Recommended training</h2><p class="hint">Based on your priority areas</p></div></div>';
  if(recs.length){
    h+='<ul class="reclist">'+recs.map(function(x){
      var c=lncourse(x.cid),enr=LNENR.filter(function(e){return e.cid===x.cid;})[0];
      return '<li><span class="itile">'+icon('cap',18)+'</span><span class="rt"><span class="a">'+esc(c.title)+'</span><span class="b">For '+esc(x.why)+' \u00b7 '+c.hours+' hours \u00b7 '+c.cat+'</span></span>'+(enr?'<button class="btn sm" data-lngo="mytraining">In My Training</button>':'<button class="btn sm primary" data-lnenroll="'+c.id+'">Enroll</button>')+'</li>';
    }).join('')+'</ul>';
  }else h+='<p class="empty-note" style="padding:20px 0">No priority gaps found. Keep your skills current with an advanced course from the catalog.</p>';
  h+='</section></div></div>';
  if(r.answers){
    var Q=TNA_BANK[t.id];
    h+='<details class="card rv" style="margin-top:24px"><summary><span><b>Answer review</b><span class="b"> \u00b7 '+r.correct+' of '+r.total+' correct</span></span></summary><div class="rvlist">'
      +Q.map(function(q,i){var a=r.answers[i];return '<div class="rvi"><div class="rvh"><span class="ks">Question '+(i+1)+' \u00b7 '+esc(q.c)+'</span>'+chip(a.ok?'ok':'bad',a.ok?'Correct':'Incorrect')+'</div><p class="rq">'+esc(q.q)+'</p>'
        +'<p class="ra">Your answer: <b>'+esc(q.o[a.pick])+'</b></p>'+(a.ok?'':'<p class="ra">Correct answer: <b>'+esc(q.o[q.a])+'</b></p>')+'<p class="re">'+esc(q.e)+'</p></div>';}).join('')
      +'</div></details>';
  }else{
    h+='<div class="tip-line" style="margin-top:24px">'+icon('info',18)+'<span>Question-level review is not stored for archived cycles. Only your score and competency breakdown are kept.</span></div>';
  }
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= My Profile ================= */
var EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function field(id,label,val,opts){
  opts=opts||{};
  return '<div class="field" id="f'+id+'"><label for="pf'+id+'">'+label+'</label><div class="inp-w"><input id="pf'+id+'" type="'+(opts.type||'text')+'" value="'+esc(val||'')+'" placeholder="'+(opts.ph||'')+'"'+(opts.ro?' disabled':'')+'></div><span class="errtext">'+(opts.err||'This field looks off.')+'</span></div>';
}
var PORTAL_PROFILE={username:"",email:"",firstName:"",lastName:"",bio:""};
var PORTAL_PROFILE_ERROR="";
var PROFILE_SAVING=false;
function viewProfile(){
  var p=PORTAL_PROFILE,fullName=(p.firstName+' '+p.lastName).trim()||p.username||PROFILE.name;
  var initialsText=(p.firstName.charAt(0)+p.lastName.charAt(0)).toUpperCase()||initials(fullName);
  var h=head('My profile','Kelola informasi profil dan keamanan akun Portal PID Anda.','<button class="btn" data-lngo="dashboard">'+icon('left',16)+'Kembali ke Dashboard</button>');
  h+='<div class="grid">'
   +'<section class="card c4"><div style="text-align:center;padding:8px 0 20px"><span class="prof-big" style="width:72px;height:72px;border-radius:50%;background:var(--brand);color:var(--brand-ink);display:inline-grid;place-items:center;font-size:22px;font-weight:700;margin-bottom:14px">'+esc(initialsText)+'</span>'
   +'<h2 style="margin-bottom:2px">'+esc(fullName)+'</h2><p class="note" style="margin:0">'+esc(p.email||'Email belum ditambahkan')+'</p></div>'
   +'<dl class="kv" style="grid-template-columns:96px minmax(0,1fr)"><dt>Username</dt><dd>'+esc(p.username||'—')+'</dd><dt>Email</dt><dd>'+esc(p.email||'—')+'</dd><dt>Sesi</dt><dd>Portal PID / Keycloak</dd></dl>'
   +'<p class="note">Informasi akun ini tersimpan di Keycloak dan digunakan oleh aplikasi SSO.</p></section>'
   +'<section class="card c8"><div class="card-head"><div><h2>Informasi pribadi</h2><p class="hint">Perubahan disimpan ke akun SSO Keycloak Anda.</p></div></div>'
   +'<div id="profAlert" class="form-alert" style="margin-bottom:20px"'+(PORTAL_PROFILE_ERROR?'':' hidden')+'>'+(PORTAL_PROFILE_ERROR?icon('alert',18)+'<span>'+esc(PORTAL_PROFILE_ERROR)+'</span>':'')+'</div>'
   +'<form id="profForm" novalidate>'
   +field('Username','Username',p.username,{ro:true,err:'Username dikelola oleh SSO.'})
   +field('Email','Email',p.email,{type:'email',ro:true,err:'Email dikelola oleh SSO.'})
   +field('FirstName','Nama depan',p.firstName,{err:'Nama depan wajib diisi.'})
   +field('LastName','Nama belakang',p.lastName,{err:'Nama belakang wajib diisi.'})
   +'<div class="field bio-profile-field"><label for="pfBio">Bio</label><div class="inp-w"><textarea id="pfBio" rows="4" maxlength="160" placeholder="Tuliskan bio singkat (maks. 160 karakter)">'+esc(p.bio||'')+'</textarea></div><div class="profile-bio-meta"><span>Ringkasan singkat tentang Anda</span><span id="pfBioCount">'+(p.bio||'').length+'/160</span></div></div>'
   +'<div class="acts"><button class="btn primary" type="submit"'+(PROFILE_SAVING?' disabled aria-busy="true"':'')+'>'+(PROFILE_SAVING?'<span class="spin profile-save-spin" aria-hidden="true"></span>Menyimpan…':'Simpan perubahan')+'</button><button class="btn" type="button" data-lnprofreset="1"'+(PROFILE_SAVING?' disabled':'')+'>Reset</button></div>'
   +'</form></section>'
   +'<section class="card c8"><div class="card-head"><div><h2>Keamanan akun</h2><p class="hint">Password tetap dikelola Keycloak. Setelah diperbarui, Anda akan kembali ke halaman ini.</p></div></div>'
   +'<button class="btn primary" type="button" data-profile-password="1">'+icon('lock',16)+'Ubah password</button></section>'
   +'</div>';
  return '<div class="page-inner">'+h+'</div>';
}

var LRVIEWS={guesthome:viewGuestHome,dashboard:viewLnDash,catalog:viewLnCatalog,path:viewLnPath,mytraining:viewLnTraining,certs:viewLnCerts,eval:viewLnEval,extreq:viewLnReq,extassign:viewLnAssign,asgdetail:viewAsgDetail,tnaplay:viewTnaPlay,tnaresult:viewTnaResult,tnacycle:viewLnTnaCycle,tnahist:viewLnTnaHist};

/* ================= Course Player ================= */
function viewLnPlayer(){
  var e=lnenr(state.playId);
  if(!e)return '<div class="page-inner">'+head('Course not found','','<button class="btn" data-lngo="mytraining">Back to My Training</button>')+'</div>';
  var c=lncourse(e.cid);
  if(e.status==='Pending approval'){
    return '<div class="page-inner">'+head(c.title,c.cat+' · '+c.provider,'<button class="btn" data-lngo="mytraining">'+icon('left',16)+'Back to My Training</button>')
     +'<section class="card" style="text-align:center;padding:48px 24px"><div style="display:flex;justify-content:center;margin-bottom:16px;color:var(--warn)">'+icon('clock',32,1.5)+'</div><h2 style="margin-bottom:8px">Awaiting enrollment approval</h2><p class="note" style="max-width:48ch;margin:0 auto">This course requires sign-off before you can start. You will get a notification as soon as it is approved.</p></section></div>';
  }
  var lessons=enrLessons(e),idx=clamp(state.lessonIdx||0,0,lessons.length-1),cur=lessons[idx],prog=enrProg(e);
  var frontier=idx===e.doneN&&e.status!=='Completed';
  var list=lessons.map(function(l,i){
    var done=i<e.doneN,locked=i>e.doneN,now=i===idx;
    return '<li class="'+(done?'done':now?'now':'')+'"><span class="node">'+(done?icon('check',14,3):locked?icon('lock',12,2.5):'')+'</span>'
     +'<span><span class="a">'+(locked?'<span class="dim-txt">'+esc(l.t)+'</span>':'<button data-lnjump="'+i+'" style="font:inherit;color:inherit;background:none;border:0;padding:0;text-align:left;cursor:pointer;font-weight:'+(now?700:600)+'">'+esc(l.t)+'</button>')+'</span><span class="b">'+l.ty+' · '+l.min+' min</span></span></li>';
  }).join('');
  var nextBtn=e.status==='Completed'?'':
    frontier?'<button class="btn primary" data-lndone="'+e.id+'">'+(idx===lessons.length-1?'Mark complete & finish course':'Mark complete & continue')+'</button>'
    :(idx<lessons.length-1?'<button class="btn primary" data-lnjump="'+(idx+1)+'">Next lesson</button>':'');
  var prevBtn=idx>0?'<button class="btn" data-lnjump="'+(idx-1)+'">Previous</button>':'';
  var h=head(c.title,c.cat+' · '+esc(c.provider)+' · '+c.hours+' hours','<button class="btn" data-lngo="mytraining">'+icon('left',16)+'Back to My Training</button>');
  h+='<section class="card" style="margin-bottom:24px"><div class="cap"><span>'+prog+'% complete</span><span>'+e.doneN+' of '+lessons.length+' lessons</span></div><span class="hb-t" style="margin-top:6px"><i style="width:'+prog+'%"></i></span></section>';
  if(e.status==='Completed'&&idx===lessons.length-1){
    h+='<div class="tip-line" style="margin-bottom:24px;background:var(--brand-tint);color:var(--brand-text)">'+icon('award',20)+'<span>Course completed on '+fd(e.done,true)+'. Your certificate is ready in <button data-lngo="certs" style="font:inherit;color:inherit;text-decoration:underline;background:none;border:0;padding:0;cursor:pointer">My Certificates</button>.</span></div>';
  }
  h+='<div class="grid"><section class="card c8"><div class="cr-top" style="margin-bottom:4px">'+chip('info',cur.ty)+'<span class="cr-fmt">'+cur.min+' min</span></div><h2 style="margin-bottom:12px">'+esc(cur.t)+'</h2>'
   +'<p class="note" style="margin-bottom:24px">This prototype lesson stands in for real '+cur.ty.toLowerCase()+' content on <b>'+esc(c.title)+'</b>. In production this area would hold the video player, reading material, or quiz for this step.</p>'
   +'<div class="acts">'+prevBtn+nextBtn+'</div></section>'
   +'<section class="card c4"><div class="card-head"><div><h2>Lessons</h2><p class="hint">'+lessons.length+' steps in this course</p></div></div><ol class="steps">'+list+'</ol></section></div>';
  return '<div class="page-inner">'+h+'</div>';
}





/* =====================================================================
   LEGAL & COMPLIANCE MODULE: dummy data and pages
   ===================================================================== */
I.leaf='<path d="M11 21c8-1 11-8 11-17-9 0-16 3-17 11-.5 4 1 6 1 6z"/><path d="M5 21c3-4 6-8 13-15"/>';
I.flame='<path d="M12 22c4 0 7-2.7 7-6.5 0-3-2-5-3-7.5-.5 2-1.5 3-2.5 3C14 8 14 4 11 2c.5 3-1 5-2.5 7S6 12.5 6 15.5C6 19.3 8 22 12 22z"/>';

/* ---------- Contract classes (company-wide figures) ---------- */
var LCLS=[
 {k:'VEN',name:'Vendor & Supply',ico:'truck',count:142,st:{'Active':100,'Expiring soon':8,'Expired':6,'Under review':20,'Terminated':8}},
 {k:'CUS',name:'Customer & Distribution',ico:'cart',count:88,st:{'Active':62,'Expiring soon':6,'Expired':3,'Under review':12,'Terminated':5}},
 {k:'LEASE',name:'Lease & Property',ico:'bank',count:34,st:{'Active':22,'Expiring soon':4,'Expired':1,'Under review':5,'Terminated':2}},
 {k:'EMP',name:'Employment & HR',ico:'users',count:64,st:{'Active':50,'Expiring soon':1,'Expired':1,'Under review':8,'Terminated':4}},
 {k:'NDA',name:'NDA & Confidentiality',ico:'lock',count:41,st:{'Active':30,'Expiring soon':1,'Expired':1,'Under review':7,'Terminated':2}},
 {k:'PART',name:'Partnership & JV',ico:'network',count:12,st:{'Active':6,'Expiring soon':1,'Expired':0,'Under review':4,'Terminated':1}},
 {k:'FIN',name:'Financing & Loan',ico:'wallet',count:8,st:{'Active':2,'Expiring soon':0,'Expired':0,'Under review':2,'Terminated':4}}
];
var CST_ORDER=['Active','Expiring soon','Under review','Expired','Terminated'];
var CST_COLOR={'Active':'var(--s0)','Expiring soon':'var(--s4)','Under review':'var(--s2)','Expired':'var(--s3)','Terminated':'var(--s5)'};
var CST_CHIP={'Active':'ok','Expiring soon':'warn','Under review':'info','Expired':'bad','Terminated':'mute'};
function lcls(k){return LCLS.filter(function(c){return c.k===k;})[0];}
var LC_TOT={count:0,val:0};LCLS.forEach(function(c){LC_TOT.count+=c.count;});
var LC_SUM={};CST_ORDER.forEach(function(s){LC_SUM[s]=LCLS.reduce(function(a,c){return a+c.st[s];},0);});

/* ---------- Contract register (sample) ---------- */
var BANKS=['Bank Mandiri','Bank BCA','Bank BNI','Bank Permata'];
var CPOOL={
 VEN:['Supply Agreement','Raw Material Purchase Agreement','Packaging Supply Agreement','Equipment Maintenance Agreement','Logistics Services Agreement'],
 CUS:['Distribution Agreement','Reseller Agreement','Framework Sales Agreement'],
 LEASE:['Warehouse Lease — Cikarang Warehouse','Office Lease — Head Office, Jakarta','Branch Lease — Bandung Branch','Branch Lease — Surabaya Branch','Vehicle Lease — Delivery Fleet','Equipment Lease — Forklift Fleet'],
 EMP:['Fixed-term Employment Contract','Non-Compete Agreement — Senior Management','Outsourcing Agreement — Security Services','Outsourcing Agreement — Cleaning Services'],
 NDA:['Non-Disclosure Agreement'],
 PART:['Distribution Partnership Agreement','Co-Marketing Agreement','Joint Venture Agreement'],
 FIN:['Working Capital Loan Agreement','Invoice Financing Agreement']
};
var CTERM={VEN:24,CUS:18,LEASE:48,EMP:24,NDA:36,PART:30,FIN:60};
var COWN={VEN:'Procurement',CUS:'Sales',LEASE:'Legal & Compliance',EMP:'HR',NDA:'Legal & Compliance',PART:'Legal & Compliance',FIN:'Finance'};
var CVALR={VEN:[80e6,1.2e9],CUS:[120e6,2.1e9],LEASE:[400e6,3.5e9],EMP:[0,0],NDA:[0,0],PART:[200e6,1.8e9],FIN:[500e6,6e9]};
var CONTRACTS=[];
(function(){
  var r=rng(5521),n=0,plan=[['VEN',26],['CUS',16],['LEASE',6],['EMP',12],['NDA',7],['PART',2],['FIN',1]];
  plan.forEach(function(pl){
    var pool=CPOOL[pl[0]],term=CTERM[pl[0]],vr=CVALR[pl[0]];
    for(var i=0;i<pl[1];i++){
      n++;
      var title=pool[i%pool.length],cp;
      if(pl[0]==='VEN')cp=VEND[Math.floor(r()*VEND.length)];
      else if(pl[0]==='CUS'||pl[0]==='PART')cp=CUST[Math.floor(r()*CUST.length)][0];
      else if(pl[0]==='FIN')cp=BANKS[Math.floor(r()*BANKS.length)];
      else if(pl[0]==='LEASE')cp=(r()<.5?VEND:CUST.map(function(c){return c[0];}))[Math.floor(r()*(r()<.5?VEND.length:CUST.length))]||'PT Properti Nusantara';
      else if(pl[0]==='NDA')cp=(r()<.5?VEND[Math.floor(r()*VEND.length)]:CUST[Math.floor(r()*CUST.length)][0]);
      else cp='Internal — '+DEPTS[Math.floor(r()*DEPTS.length)][0];
      var kr=r(),status,start,end;
      if(kr<.07){status='Terminated';start=dt(2022+Math.floor(r()*3),1+Math.floor(r()*12),1+Math.floor(r()*27));end=new Date(start.getFullYear(),start.getMonth()-1+Math.round(term*(.3+r()*.5)),start.getDate());}
      else if(kr<.15){status='Under review';start=new Date(NOW.getFullYear(),NOW.getMonth()-Math.floor(r()*2),NOW.getDate()-Math.floor(r()*20));end=new Date(start.getFullYear(),start.getMonth()-1+term,start.getDate());}
      else if(kr<.19){status='Expired';end=new Date(NOW.getFullYear(),NOW.getMonth(),NOW.getDate()-(20+Math.floor(r()*150)));start=new Date(end.getFullYear(),end.getMonth()-term,end.getDate());}
      else if(kr<.25){status='Expiring soon';end=new Date(NOW.getFullYear(),NOW.getMonth(),NOW.getDate()+5+Math.floor(r()*55));start=new Date(end.getFullYear(),end.getMonth()-term,end.getDate());}
      else{status='Active';end=new Date(NOW.getFullYear(),NOW.getMonth(),NOW.getDate()+90+Math.floor(r()*640));start=new Date(end.getFullYear(),end.getMonth()-term,end.getDate());}
      var val=vr[1]?Math.round((vr[0]+r()*(vr[1]-vr[0]))/1e5)*1e5:0;
      var renew=pl[0]==='VEN'||pl[0]==='CUS'?(r()<.6?'Auto-renew':'Manual renewal'):pl[0]==='LEASE'||pl[0]==='FIN'?'Manual renewal':'No renewal';
      CONTRACTS.push({id:'C'+n,no:'CTR-2026-'+pad(400+n*3,4),title:title+' — '+cp,cp:cp,type:pl[0],typeName:lcls(pl[0]).name,dept:COWN[pl[0]],owner:HEAD[COWN[pl[0]]],
        start:start,end:end,status:status,val:val,renew:renew});
    }
  });
})();
function contract(id){return CONTRACTS.filter(function(c){return c.id===id;})[0];}
function advContract(id,act){
  var c=contract(id);if(!c)return;
  if(act==='approve'&&c.status==='Under review'){c.status='Active';c.end=new Date(NOW.getFullYear(),NOW.getMonth()-1+CTERM[c.type],NOW.getDate());toast(c.no+' approved and now active');}
  else if(act==='renew'&&c.status==='Expiring soon'){c.status='Active';c.end=new Date(c.end.getFullYear(),c.end.getMonth()-1+CTERM[c.type],c.end.getDate());toast(c.no+' renewed to '+fd(c.end,true));}
  render();
}

/* ---------- Compliance requirements ---------- */
var AREAS=[
 {k:'labor',name:'Labor & Manpower',ico:'users',reg:'Manpower Law (UU Ketenagakerjaan) & Wage Regulations',scope:'All sites',status:'Compliant',last:dt(2026,7,10),next:dt(2027,1,10),owner:'HR'},
 {k:'ohs',name:'Occupational Health & Safety',ico:'alert',reg:'Ministry of Manpower K3 Regulations',scope:'Cikarang Plant & Warehouse',status:'Action needed',last:dt(2026,6,2),next:dt(2026,10,2),owner:'Operations'},
 {k:'env',name:'Environmental Management',ico:'leaf',reg:'Environmental Permit (UKL-UPL)',scope:'Cikarang Plant',status:'Compliant',last:dt(2026,3,18),next:dt(2027,3,18),owner:'Operations'},
 {k:'halal',name:'Halal Certification',ico:'tag',reg:'BPJPH Halal Certification',scope:'Food & beverage products',status:'Compliant',last:dt(2026,1,20),next:dt(2027,1,20),owner:'Legal & Compliance'},
 {k:'pdp',name:'Personal Data Protection',ico:'lock',reg:'Personal Data Protection Law (UU PDP)',scope:'All sites',status:'Action needed',last:dt(2026,5,14),next:dt(2026,11,14),owner:'Technology'},
 {k:'tax',name:'Tax Compliance',ico:'wallet',reg:'Corporate income tax & VAT reporting',scope:'Company-wide',status:'Compliant',last:dt(2026,8,1),next:dt(2026,11,1),owner:'Finance'},
 {k:'abc',name:'Anti-Bribery & Corruption',ico:'scale',reg:'Anti-Corruption Law & internal Code of Conduct',scope:'All sites',status:'Compliant',last:dt(2026,4,9),next:dt(2027,4,9),owner:'Legal & Compliance'},
 {k:'lic',name:'Business Licensing',ico:'file',reg:'Business Identification Number (NIB) & OSS Permits',scope:'All sites',status:'Overdue',last:dt(2025,9,30),next:dt(2026,9,30),owner:'Legal & Compliance'},
 {k:'fire',name:'Fire Safety',ico:'flame',reg:'Fire Safety Certification (Damkar)',scope:'Cikarang Plant & Warehouse',status:'Action needed',last:dt(2026,2,11),next:dt(2026,10,11),owner:'Operations'},
 {k:'food',name:'Food Safety',ico:'shield',reg:'BPOM Food Safety Registration',scope:'Food & beverage products',status:'Compliant',last:dt(2026,6,25),next:dt(2027,6,25),owner:'Operations'}
];
var CMPSCORE={'Compliant':100,'Action needed':60,'Overdue':20};
var CMPC={'Compliant':'ok','Action needed':'warn','Overdue':'bad','Not applicable':'mute'};
function complyScore(){var t=0;AREAS.forEach(function(a){t+=CMPSCORE[a.status];});return t/AREAS.length;}

/* ---------- Compliance findings ---------- */
var FINDS=[
 {id:'F1',area:'ohs',site:'Cikarang Plant',sev:'High',desc:'Missing fire extinguisher inspection tags in Zone C',due:dt(2026,10,5),st:'Open',owner:'Operations'},
 {id:'F2',area:'fire',site:'Cikarang Warehouse',sev:'Critical',desc:'Blocked emergency exit in Zone D',due:dt(2026,9,28),st:'Open',owner:'Operations'},
 {id:'F3',area:'pdp',site:'Head Office, Jakarta',sev:'Medium',desc:'Customer data retention policy not yet documented',due:dt(2026,10,20),st:'Open',owner:'Technology'},
 {id:'F4',area:'lic',site:'Bandung Branch',sev:'High',desc:'Branch operating permit renewal overdue',due:dt(2026,9,30),st:'Open',owner:'Legal & Compliance'},
 {id:'F5',area:'ohs',site:'Cikarang Plant',sev:'Medium',desc:'Incomplete PPE usage records for Line 2',due:dt(2026,10,12),st:'Open',owner:'Operations'},
 {id:'F6',area:'labor',site:'All sites',sev:'Low',desc:'Overtime approval records incomplete for August',due:dt(2026,10,15),st:'Open',owner:'HR'},
 {id:'F7',area:'env',site:'Cikarang Plant',sev:'Medium',desc:'Wastewater test report delayed',due:dt(2026,9,20),st:'In remediation',owner:'Operations'},
 {id:'F8',area:'tax',site:'Company-wide',sev:'Low',desc:'VAT invoice numbering discrepancy',due:dt(2026,9,10),st:'Closed',owner:'Finance'},
 {id:'F9',area:'abc',site:'All sites',sev:'Low',desc:'Gift and entertainment log missing signatures',due:dt(2026,8,30),st:'Closed',owner:'Legal & Compliance'},
 {id:'F10',area:'halal',site:'Cikarang Plant',sev:'Medium',desc:'Halal logo usage on updated packaging pending review',due:dt(2026,9,5),st:'Closed',owner:'Operations'}
];
var FSEV={'Critical':'bad','High':'warn','Medium':'info','Low':'mute'};
var FSTC={'Open':'warn','In remediation':'info','Closed':'ok'};
function pendFind(){return FINDS.filter(function(f){return f.st==='Open';});}
function resFind(id,ok){
  var f=FINDS.filter(function(x){return x.id===id;})[0];if(!f||f.st==='Closed')return;
  f.st=ok?'Closed':'In remediation';toast(f.desc.slice(0,40)+'…'+(ok?': marked resolved':': remediation started'));render();
}

/* ---------- Legal documents (archive) ---------- */
var DPOOL={
 Policy:['Code of Conduct','Anti-Bribery & Corruption Policy','Data Privacy Policy','Whistleblower Policy','Conflict of Interest Policy','Procurement Policy','Travel & Expense Policy','Information Security Policy'],
 SOP:['Contract Review SOP','Vendor Onboarding SOP','Incident Reporting SOP','Document Retention SOP','Litigation Hold SOP'],
 'Legal Opinion':['Legal Opinion — Data Localization Requirements','Legal Opinion — Employment Termination Risk','Legal Opinion — Distributor Exclusivity Clause','Legal Opinion — Import Licensing Change','Legal Opinion — Environmental Liability'],
 'Board Resolution':['Board Resolution — Annual Budget Approval 2026','Board Resolution — Bank Facility Renewal','Board Resolution — New Branch Establishment','Board Resolution — Director Appointment'],
 'Contract Template':['Standard Supply Agreement Template','Standard NDA Template','Standard Distribution Agreement Template','Standard Employment Contract Template']
};
var LICPOOL=[['Business Identification Number (NIB)','OSS (Online Single Submission)',dt(2026,10,15)],['Industrial Business License (IUI)','Ministry of Industry',dt(2027,4,2)],
 ['Environmental Permit (UKL-UPL)','Local Environmental Agency',dt(2027,3,18)],['Halal Certificate','BPJPH',dt(2027,1,20)],['Food Safety Registration (BPOM)','BPOM',dt(2027,6,25)],
 ['Fire Safety Certificate','Local Fire Department',dt(2026,10,11)],['Building Function Certificate (SLF)','Local Government',dt(2028,2,9)],['Warehouse Operating Permit','Ministry of Trade',dt(2026,11,30)]];
var DOCS=[],dn=0;
Object.keys(DPOOL).forEach(function(ty){DPOOL[ty].forEach(function(title,i){
  dn++;var r=rng(dn*31);var st=r()<.75?'Current':r()<.9?'Under review':'Draft';
  DOCS.push({id:'D'+dn,title:title,type:ty,owner:ty==='Board Resolution'?'Board of Directors':ty==='SOP'?'Legal & Compliance':'Legal & Compliance',
    updated:dt(2026,1+Math.floor(r()*9),1+Math.floor(r()*27)),status:st,ver:'v'+(1+Math.floor(r()*3))+'.'+Math.floor(r()*10),exp:null,issuer:null});
});});
LICPOOL.forEach(function(l){dn++;DOCS.push({id:'D'+dn,title:l[0],type:'License/Permit',owner:'Legal & Compliance',updated:dt(2026,1+Math.floor(rng(dn)()*9),3),status:'Current',ver:'—',exp:l[2],issuer:l[1]});});
function licSoon(d){return d.exp&&diffDays(d.exp,NOW)>=0&&diffDays(d.exp,NOW)<=60;}
function doc(id){return DOCS.filter(function(d){return d.id===id;})[0];}

/* ---------- Active legal matters ---------- */
var MATTERS=[
 {id:'M1',title:'Wage Dispute — Former Employee',type:'Litigation',cp:'Former employee (Operations)',status:'In progress',filed:dt(2026,5,12),next:dt(2026,10,14),counsel:'Hutapea & Partners'},
 {id:'M2',title:'Contract Breach Claim — Distribution Partner',type:'Arbitration',cp:'CV Tani Makmur',status:'In progress',filed:dt(2026,7,2),next:dt(2026,11,3),counsel:'Santoso Law Office'},
 {id:'M3',title:'Tax Assessment Objection',type:'Regulatory inquiry',cp:'Directorate General of Taxes',status:'Open',filed:dt(2026,8,20),next:dt(2026,10,1),counsel:'Internal Legal Team'},
 {id:'M4',title:'Trademark Opposition — Packaging Design',type:'Regulatory inquiry',cp:'Directorate General of IP',status:'Open',filed:dt(2026,6,15),next:dt(2026,12,1),counsel:'Wijaya IP Consultants'},
 {id:'M5',title:'Insurance Claim — Warehouse Fire Damage',type:'Litigation',cp:'Insurance Provider',status:'Settled',filed:dt(2026,2,1),next:null,counsel:'Internal Legal Team'}
];
var MSTC={'Open':'warn','In progress':'info','Settled':'ok','Closed':'mute'};

/* ---------- Shared bits ---------- */
var LCELL=function(c){return '<div class="who"><span class="itile">'+icon(lcls(c.type).ico,18)+'</span><span><span class="a">'+esc(c.title)+'</span><span class="b">'+c.no+'</span></span></div>';};
var RENF={labels:['Oct','Nov','Dec','Jan','Feb','Mar'],ren:[9,7,12,10,6,11],exp:[3,2,5,4,2,3]};
function drawRenewals(){
  var el=$('#renf');if(!el)return;
  var W=Math.max(280,el.clientWidth),H=210,m={l:28,r:8,t:12,b:28},n=RENF.labels.length,hi=16;
  var step=(W-m.l-m.r)/n,gw=Math.min(20,step*.3),y=function(v){return m.t+(hi-v)*(H-m.t-m.b)/hi;},y0=y(0);
  var s='<svg viewBox="0 0 '+W+' '+H+'" width="100%" height="'+H+'" role="img" aria-label="Bar chart of contracts up for renewal versus expiring without renewal, next 6 months">';
  [0,8,16].forEach(function(t){s+='<line class="ch-grid" x1="'+m.l+'" x2="'+(W-m.r)+'" y1="'+y(t)+'" y2="'+y(t)+'"/><text class="ch-txt" x="'+(m.l-8)+'" y="'+(y(t)+4)+'" text-anchor="end">'+t+'</text>';});
  RENF.labels.forEach(function(lb,i){
    var cx=m.l+step*i+step/2;
    s+='<rect class="fb-in" x="'+(cx-gw-1)+'" y="'+y(RENF.ren[i])+'" width="'+gw+'" height="'+(y0-y(RENF.ren[i]))+'" rx="2"><title>'+lb+' · Renewing: '+RENF.ren[i]+'</title></rect>';
    s+='<rect class="fb-out" x="'+(cx+1)+'" y="'+y(RENF.exp[i])+'" width="'+gw+'" height="'+(y0-y(RENF.exp[i]))+'" rx="2"><title>'+lb+' · Expiring, no renewal: '+RENF.exp[i]+'</title></rect>';
    s+='<text class="ch-txt" x="'+cx+'" y="'+(H-8)+'" text-anchor="middle">'+lb+'</text>';
  });
  el.innerHTML=s+'</svg>';
  var tr=RENF.ren.reduce(function(a,b){return a+b;},0),te=RENF.exp.reduce(function(a,b){return a+b;},0);
  $('#renfNote').textContent=(tr+te)+' contracts are up for review over the next 6 months — '+te+' are expected to expire without renewal.';
}

/* ================= Dashboard ================= */
function viewLegalDash(){
  var u=ui.ldb,score=complyScore(),openF=pendFind().length,expSoon=LC_SUM['Expiring soon'];
  var licSoonN=DOCS.filter(licSoon).length;
  var h=head('Dashboard','Wednesday, September 23, 2026 · Updated 09:42 local time','<button class="btn" data-toast="Prototype: export legal summary">'+icon('download',18)+'Export summary</button>');
  h+=kpis([['Contracts under management',fmt(LC_TOT.count),'Across '+LCLS.length+' contract types'],['Expiring within 60 days',expSoon,'Needs a renewal decision'],['Compliance score',pct(score,0)+'%','Weighted across '+AREAS.length+' areas'],['Open findings',openF,'From compliance audits']]);
  var legend=CST_ORDER.map(function(s){return '<button class="chip" data-cst="'+s+'" aria-pressed="'+(u.status===s)+'" style="--c:'+CST_COLOR[s]+'"><i></i>'+s+' <em>'+fmt(LC_SUM[s])+'</em></button>';}).join('');
  var blocks=LCLS.slice().sort(function(a,b){return b.count-a.count;}).map(function(c){
    var cells=[];CST_ORDER.forEach(function(s){for(var j=0;j<c.st[s];j++)cells.push(s);});
    var cols=Math.max(6,Math.round(Math.sqrt(c.count)*1.3));
    var html=cells.map(function(s){var dim=(u.cls&&u.cls!==c.k)||(u.status&&u.status!==s);return '<i class="ld'+(dim?' dim':'')+'" style="--c:'+CST_COLOR[s]+'" data-tip="'+esc(c.name)+' · '+s+'"></i>';}).join('');
    return '<div class="lcb"><button class="lch" data-lccc="'+c.k+'" aria-pressed="'+(u.cls===c.k)+'">'+esc(c.name)+' <em>'+fmt(c.count)+'</em></button><div class="lgrid" aria-hidden="true" style="grid-template-columns:repeat('+cols+',9px)">'+html+'</div></div>';
  }).join('');
  var sel=0;LCLS.forEach(function(c){if(u.cls&&u.cls!==c.k)return;CST_ORDER.forEach(function(s){if(!u.status||u.status===s)sel+=c.st[s];});});
  var read=(u.cls||u.status)?'<span><b>'+fmt(sel)+'</b> contracts · '+esc([u.cls?lcls(u.cls).name:'',u.status||''].filter(Boolean).join(' · '))+'</span><button class="link-btn" data-lcr2="1">Show all</button>':'<span><b>'+fmt(LC_SUM['Active'])+'</b> of '+fmt(LC_TOT.count)+' contracts are currently active</span>';
  var scoreRows=AREAS.slice().sort(function(a,b){return CMPSCORE[a.status]-CMPSCORE[b.status];}).map(function(a){return [a.name,CMPSCORE[a.status]];});
  var agenda=[];
  AREAS.forEach(function(a){agenda.push({d:a.next,a:a.name,b:'Compliance review due · '+esc(a.owner)});});
  CONTRACTS.filter(function(c){return c.status==='Expiring soon';}).forEach(function(c){agenda.push({d:c.end,a:c.title,b:'Contract expires · '+esc(c.owner)});});
  MATTERS.filter(function(m){return m.next;}).forEach(function(m){agenda.push({d:m.next,a:m.title,b:'Next action · '+esc(m.counsel)});});
  agenda=agenda.filter(function(x){return diffDays(x.d,NOW)>=0;}).sort(function(x,y){return x.d-y.d;}).slice(0,5);
  h+='<div class="grid"><section class="card c8" aria-labelledby="t-lc"><div class="card-head"><div><h2 id="t-lc">Contract portfolio</h2><p class="hint">1 square = 1 contract, grouped by type. Click a status or type name to highlight.</p></div></div>'
    +'<div class="legend">'+legend+'</div><div class="readout" aria-live="polite">'+read+'</div><div class="lmap">'+blocks+'</div></section>'
    +'<section class="card c4" aria-labelledby="t-lal"><div class="card-head"><div><h2 id="t-lal">Needs attention</h2><p class="hint">Click to open the related list</p></div></div><ul class="alerts">'
    +'<li><button data-wgo="contracts:tab:Under review"><span class="al-ico info">'+icon('file',20)+'</span><span><span class="a">Contracts pending review</span><span class="b">Awaiting legal sign-off</span></span><span class="al-n">'+CONTRACTS.filter(function(c){return c.status==='Under review';}).length+'</span></button></li>'
    +'<li><button data-wgo="contracts:tab:Expiring soon"><span class="al-ico warn">'+icon('clock',20)+'</span><span><span class="a">Contracts expiring soon</span><span class="b">Needs a renewal decision</span></span><span class="al-n">'+CONTRACTS.filter(function(c){return c.status==='Expiring soon';}).length+'</span></button></li>'
    +'<li><button data-wgo="comply:ctab:Overdue"><span class="al-ico bad">'+icon('alert',20)+'</span><span><span class="a">Compliance gaps</span><span class="b">Action needed or overdue</span></span><span class="al-n">'+AREAS.filter(function(a){return a.status!=='Compliant';}).length+'</span></button></li>'
    +'<li><button data-wgo="comply:ctab:all"><span class="al-ico warn">'+icon('clipboard',20)+'</span><span><span class="a">Open findings</span><span class="b">Waiting for remediation</span></span><span class="al-n">'+openF+'</span></button></li>'
    +'<li><button data-wgo="docs:flag:expiring"><span class="al-ico warn">'+icon('tag',20)+'</span><span><span class="a">Licenses expiring</span><span class="b">Within 60 days</span></span><span class="al-n">'+licSoonN+'</span></button></li></ul></section>'
    +'<section class="card r3a" aria-labelledby="t-rf"><div class="card-head"><div><h2 id="t-rf">Renewal forecast</h2><p class="hint">Contracts due for review, next 6 months</p></div></div>'
    +'<div class="legend-o" style="margin:0 0 8px"><span><i style="background:var(--brand)"></i>Renewing</span><span><i style="background:var(--s2)"></i>Expiring, no renewal</span></div><div id="renf"></div><p class="insight" id="renfNote"></p></section>'
    +'<section class="card r3b" aria-labelledby="t-dl"><div class="card-head"><div><h2 id="t-dl">Upcoming deadlines</h2><p class="hint">Compliance reviews, renewals, and case actions</p></div></div><ul class="agenda">'
    +agenda.map(function(x){return '<li><span class="date"><b>'+x.d.getDate()+'</b><span>'+MON[x.d.getMonth()]+'</span></span><span><span class="a">'+esc(x.a)+'</span><span class="b">'+x.b+'</span></span></li>';}).join('')
    +'</ul></section>'
    +'<section class="card r3c" aria-labelledby="t-cs"><div class="card-head"><div><h2 id="t-cs">Compliance score by area</h2><p class="hint">Worst first</p></div></div>'
    +hbars(scoreRows,100,function(v){return v+'%';})+'</section></div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= Contracts ================= */
function viewContracts(){
  var u=ui.ctr,q=u.q.toLowerCase();
  var rows=CONTRACTS.filter(function(c){return (!q||(c.title+' '+c.no+' '+c.cp).toLowerCase().indexOf(q)>-1)&&(!u.type||c.type===u.type)&&(!u.tab||u.tab==='all'||c.status===u.tab);});
  var size=10,pages=Math.max(1,Math.ceil(rows.length/size));if(u.page>=pages)u.page=pages-1;
  var slice=rows.slice(u.page*size,u.page*size+size);
  var h=head('Contracts','Every contract under management, its counterparty, and renewal status','<button class="btn primary" data-toast="Prototype: new contract intake form">'+icon('plus',18)+'New contract</button>');
  h+=kpis([['Contracts under management',fmt(LC_TOT.count),'Across '+LCLS.length+' contract types'],['Active',fmt(LC_SUM['Active']),pct(LC_SUM['Active']/LC_TOT.count*100,1)+'% of total'],['Expiring within 60 days',LC_SUM['Expiring soon'],'Needs a renewal decision'],['Pending review',LC_SUM['Under review'],'Awaiting legal sign-off']]);
  h+='<div class="toolbar"><input class="inp" type="text" data-keep="ctr-q" data-f="ctr.q" value="'+esc(u.q)+'" placeholder="Search title, contract no., or counterparty" aria-label="Search contracts">'
    +'<select class="sel" data-f="ctr.type" aria-label="Filter contract type">'+opts(LCLS.map(function(c){return c.k;}).map(function(k){return lcls(k).name;}),u.type,'All types')+'</select>'
    +'<span class="spacer"></span><button class="btn" data-toast="Prototype: export contract register">'+icon('download',18)+'Export</button></div>';
  h+='<div class="toolbar" style="margin-top:0">'+tabs('ctr','tab',u.tab||'all',[['all','All',CONTRACTS.length]].concat(CST_ORDER.map(function(s){return [s,s,CONTRACTS.filter(function(c){return c.status===s;}).length];})))+'</div>';
  h+='<section class="card">'+tblWrap('<table class="tbl"><thead><tr><th>Contract</th><th>Counterparty</th><th class="num">Value</th><th>Status</th><th></th></tr></thead><tbody>'
    +(slice.length?slice.map(function(c){
      var btn=c.status==='Under review'?'<button class="btn sm primary" data-ctra="'+c.id+':approve">Approve</button>':c.status==='Expiring soon'?'<button class="btn sm" data-ctra="'+c.id+':renew">Renew</button>':'<span class="dim-txt">—</span>';
      return '<tr class="click" tabindex="0" data-ctr="'+c.id+'"><td>'+LCELL(c)+'</td><td>'+esc(c.cp)+'<span class="ks" style="display:block">'+esc(c.dept)+' · '+fd(c.start,true)+' – '+fd(c.end,true)+'</span></td><td class="num">'+(c.val?rpc(c.val):'—')+'</td><td>'+chip(CST_CHIP[c.status],c.status)+'</td><td>'+btn+'</td></tr>';
    }).join(''):'<tr><td colspan="5" class="empty-note">No contracts match the filters.</td></tr>')
    +'</tbody></table>')+pager('ctr',rows.length,size,u.page)+'<p class="note">Sample data: '+CONTRACTS.length+' of '+fmt(LC_TOT.count)+' contracts are shown in this prototype.</p></section>';
  h+='<div class="grid"><section class="card c6"><div class="card-head"><div><h2>Contracts by type</h2><p class="hint">Number under management</p></div></div>'+hbars(LCLS.slice().sort(function(a,b){return b.count-a.count;}).map(function(c){return [c.name,c.count];}),142,fmt)+'</section>'
    +'<section class="card c6"><div class="card-head"><div><h2>Renewal terms</h2><p class="hint">Across all contract types</p></div></div>'+hbars([['Auto-renew',LCLS.reduce(function(a,c){return a+Math.round(c.count*.32);},0)],['Manual renewal',LCLS.reduce(function(a,c){return a+Math.round(c.count*.44);},0)],['No renewal',LCLS.reduce(function(a,c){return a+Math.round(c.count*.24);},0)]],180,fmt)+'</section></div>';
  return '<div class="page-inner">'+h+'</div>';
}
function openContract(id){
  var c=contract(id);if(!c)return;var days=diffDays(c.end,NOW);
  openPanel('Contract detail','<div class="prof"><span class="big" style="border-radius:12px">'+icon(lcls(c.type).ico,26)+'</span><div><h3>'+esc(c.title)+'</h3><p>'+c.no+' · '+esc(c.typeName)+'</p></div></div>'
   +'<dl class="kv"><dt>Status</dt><dd>'+chip(CST_CHIP[c.status],c.status)+'</dd><dt>Counterparty</dt><dd>'+esc(c.cp)+'</dd><dt>Owning unit</dt><dd>'+esc(c.dept)+'</dd><dt>Contract owner</dt><dd>'+esc(c.owner)+'</dd><dt>Renewal terms</dt><dd>'+c.renew+'</dd></dl>'
   +'<div class="kv-h">Term</div><dl class="kv"><dt>Start date</dt><dd>'+fd(c.start,true)+'</dd><dt>End date</dt><dd>'+fd(c.end,true)+(days<0?' (expired)':days<=60?' ('+days+' days left)':'')+'</dd>'+(c.val?'<dt>Contract value</dt><dd>'+rp(c.val)+'</dd>':'')+'</dl>'
   +(c.status==='Under review'?'<div class="d-actions"><button class="btn primary" data-ctra="'+c.id+':approve" data-inpanel="1">Approve</button></div>':c.status==='Expiring soon'?'<div class="d-actions"><button class="btn primary" data-ctra="'+c.id+':renew" data-inpanel="1">Renew</button></div>':''));
}

/* ================= Compliance ================= */
function viewCompliance(){
  var u=ui.cmp,rows=AREAS.filter(function(a){return !u.ctab||u.ctab==='all'||a.status===u.ctab;});
  var frows=FINDS.filter(function(f){return !u.ftab||u.ftab==='all'||f.st===u.ftab;});
  var score=complyScore();
  var h=head('Compliance','Regulatory areas, review status, and open findings','<button class="btn" data-toast="Prototype: export compliance report">'+icon('download',18)+'Export report</button>');
  h+=kpis([['Compliance score',pct(score,0)+'%','Weighted across '+AREAS.length+' areas'],['Compliant',AREAS.filter(function(a){return a.status==='Compliant';}).length+' / '+AREAS.length,'Areas with no open gap'],['Action needed',AREAS.filter(function(a){return a.status==='Action needed';}).length,'Review due soon'],['Overdue',AREAS.filter(function(a){return a.status==='Overdue';}).length,'Past the review deadline']]);
  h+='<section class="card"><div class="card-head"><div><h2>Compliance areas</h2><p class="hint">Regulatory scope and next review date</p></div></div>'
   +tabs('cmp','ctab',u.ctab||'all',[['all','All',AREAS.length],['Compliant','Compliant',AREAS.filter(function(a){return a.status==='Compliant';}).length],['Action needed','Action needed',AREAS.filter(function(a){return a.status==='Action needed';}).length],['Overdue','Overdue',AREAS.filter(function(a){return a.status==='Overdue';}).length]])
   +'<div class="sp">'+tblWrap('<table class="tbl"><thead><tr><th>Area</th><th>Regulation</th><th>Scope</th><th>Last reviewed</th><th>Next due</th><th>Status</th></tr></thead><tbody>'
   +(rows.length?rows.map(function(a){return '<tr><td><div class="who"><span class="itile">'+icon(a.ico,18)+'</span><span><span class="a">'+esc(a.name)+'</span><span class="b">'+esc(a.owner)+'</span></span></div></td><td class="wrap">'+esc(a.reg)+'</td><td class="muted">'+esc(a.scope)+'</td><td class="tnum">'+fd(a.last,true)+'</td><td class="tnum">'+fd(a.next,true)+'</td><td>'+chip(CMPC[a.status],a.status)+'</td></tr>';}).join(''):'<tr><td colspan="6" class="empty-note">No areas match the filter.</td></tr>')
   +'</tbody></table>')+'</div></section>';
  h+='<div class="grid"><section class="card c8"><div class="card-head"><div><h2>Findings</h2><p class="hint">Approve to close, or start remediation</p></div></div>'
   +tabs('cmp','ftab',u.ftab||'all',[['all','All',FINDS.length],['Open','Open',FINDS.filter(function(f){return f.st==='Open';}).length],['In remediation','In remediation',FINDS.filter(function(f){return f.st==='In remediation';}).length],['Closed','Closed',FINDS.filter(function(f){return f.st==='Closed';}).length]])
   +'<div class="sp">'+tblWrap('<table class="tbl"><thead><tr><th>Finding</th><th>Severity</th><th>Status</th><th></th></tr></thead><tbody>'
   +(frows.length?frows.map(function(f){var a=AREAS.filter(function(x){return x.k===f.area;})[0];return '<tr><td><div class="who"><span class="itile">'+icon(a?a.ico:'alert',18)+'</span><span><span class="a">'+esc(a?a.name:'')+'</span><span class="b" style="white-space:normal;max-width:300px;display:block">'+esc(f.desc)+'</span><span class="b">'+esc(f.site)+' · Due '+fd(f.due,true)+'</span></span></div></td><td>'+chip(FSEV[f.sev],f.sev)+'</td><td>'+chip(FSTC[f.st],f.st)+'</td><td>'+(f.st==='Open'?'<span class="acts"><button class="round" data-find="'+f.id+':no" aria-label="Start remediation" title="Investigate">'+icon('refresh',16,2)+'</button><button class="round go" data-find="'+f.id+':ok" aria-label="Mark resolved" title="Resolve">'+icon('check',16,2.25)+'</button></span>':'<span class="dim-txt">—</span>')+'</td></tr>';}).join(''):'<tr><td colspan="4" class="empty-note">No findings match the filter.</td></tr>')
   +'</tbody></table>')+'</div></section>'
   +'<section class="card c4"><div class="card-head"><div><h2>Score by area</h2><p class="hint">Worst first</p></div></div>'+hbars(AREAS.slice().sort(function(a,b){return CMPSCORE[a.status]-CMPSCORE[b.status];}).map(function(a){return [a.name,CMPSCORE[a.status]];}),100,function(v){return v+'%';})
   +'<div class="tip-line">'+icon('info',18)+'<span>Business Licensing is overdue for renewal. See the Business Identification Number (NIB) entry in Legal Documents.</span></div></section></div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= Legal Documents ================= */
function viewDocs(){
  var u=ui.doc,q=u.q.toLowerCase();
  var rows=DOCS.filter(function(d){return (!q||(d.title+' '+(d.issuer||'')).toLowerCase().indexOf(q)>-1)&&(!u.type||d.type===u.type)&&(!u.status||d.status===u.status)&&(u.flag!=='expiring'||licSoon(d));});
  var size=10,pages=Math.max(1,Math.ceil(rows.length/size));if(u.page>=pages)u.page=pages-1;
  var slice=rows.slice(u.page*size,u.page*size+size),types=Object.keys(DPOOL).concat(['License/Permit']);
  var h=head('Legal Documents','Policies, SOPs, opinions, licenses, and active legal matters','<button class="btn primary" data-toast="Prototype: upload document form">'+icon('plus',18)+'Upload document</button>');
  h+=kpis([['Documents on file',fmt(DOCS.length),'Across '+types.length+' document types'],['Licenses & permits',DOCS.filter(function(d){return d.type==='License/Permit';}).length,'Regulatory registrations'],['Expiring within 60 days',DOCS.filter(licSoon).length,'Needs renewal filing'],['Under review',DOCS.filter(function(d){return d.status==='Under review';}).length,'Awaiting sign-off']]);
  h+='<div class="toolbar"><input class="inp" type="text" data-keep="doc-q" data-f="doc.q" value="'+esc(u.q)+'" placeholder="Search title or issuing authority" aria-label="Search legal documents">'
    +'<select class="sel" data-f="doc.type" aria-label="Filter document type">'+opts(types,u.type,'All types')+'</select>'
    +'<select class="sel" data-f="doc.status" aria-label="Filter status">'+opts(['Current','Under review','Draft'],u.status,'All statuses')+'</select>'
    +(u.flag?'<button class="btn sm" data-clrdflag="1">Expiring soon '+icon('x',14,2.25)+'</button>':'')
    +'<span class="spacer"></span><button class="btn" data-toast="Prototype: export document index">'+icon('download',18)+'Export</button></div>';
  h+='<section class="card">'+tblWrap('<table class="tbl"><thead><tr><th>Document</th><th>Owner</th><th>Updated</th><th>Expiry</th><th>Status</th></tr></thead><tbody>'
    +(slice.length?slice.map(function(d){return '<tr class="click" tabindex="0" data-doc="'+d.id+'"><td><div class="who"><span class="itile">'+icon(d.type==='License/Permit'?'tag':'file',18)+'</span><span><span class="a">'+esc(d.title)+'</span><span class="b">'+d.type+(d.ver!=='—'?' · '+d.ver:'')+'</span></span></div></td><td class="muted">'+esc(d.owner)+'</td><td class="tnum">'+fd(d.updated,true)+'</td><td class="tnum">'+(d.exp?fd(d.exp,true)+(licSoon(d)?' '+chip('warn','Soon'):''):'—')+'</td><td>'+chip(d.status==='Current'?'ok':d.status==='Under review'?'info':'mute',d.status)+'</td></tr>';}).join(''):'<tr><td colspan="5" class="empty-note">No documents match the filters.</td></tr>')
    +'</tbody></table>')+pager('doc',rows.length,size,u.page)+'</section>';
  h+='<section class="card sp"><div class="card-head"><div><h2>Active legal matters</h2><p class="hint">Litigation, arbitration, and regulatory inquiries</p></div></div>'
   +tblWrap('<table class="tbl"><thead><tr><th>Matter</th><th>Counterparty</th><th>Next action</th><th>External counsel</th><th>Status</th></tr></thead><tbody>'
   +MATTERS.map(function(m){return '<tr><td><b>'+esc(m.title)+'</b><span class="ks" style="display:block">'+m.type+'</span></td><td>'+esc(m.cp)+'</td><td class="tnum">'+(m.next?fd(m.next,true):'—')+'</td><td class="muted">'+esc(m.counsel)+'</td><td>'+chip(MSTC[m.status],m.status)+'</td></tr>';}).join('')
   +'</tbody></table>')+'</section>'
   +'<div class="grid"><section class="card c12"><div class="card-head"><div><h2>Documents by type</h2><p class="hint">Policies, SOPs, and more</p></div></div>'+hbars(types.map(function(t){return [t,DOCS.filter(function(d){return d.type===t;}).length];}).sort(function(a,b){return b[1]-a[1];}),8,fmt)+'</section></div>';
  return '<div class="page-inner">'+h+'</div>';
}
function openDoc(id){
  var d=doc(id);if(!d)return;
  openPanel('Document detail','<div class="prof"><span class="big" style="border-radius:12px">'+icon(d.type==='License/Permit'?'tag':'file',26)+'</span><div><h3>'+esc(d.title)+'</h3><p>'+d.type+'</p></div></div>'
   +'<dl class="kv"><dt>Status</dt><dd>'+chip(d.status==='Current'?'ok':d.status==='Under review'?'info':'mute',d.status)+'</dd><dt>Owner</dt><dd>'+esc(d.owner)+'</dd><dt>Last updated</dt><dd>'+fd(d.updated,true)+'</dd>'+(d.ver!=='—'?'<dt>Version</dt><dd>'+d.ver+'</dd>':'')+(d.issuer?'<dt>Issuing authority</dt><dd>'+esc(d.issuer)+'</dd>':'')+(d.exp?'<dt>Expiry date</dt><dd>'+fd(d.exp,true)+(licSoon(d)?' '+chip('warn','Expiring soon'):'')+'</dd>':'')+'</dl>'
   +'<div class="d-actions"><button class="btn primary" data-toast="Prototype: download document">'+icon('download',18)+'Download</button>'+(d.type==='License/Permit'?'<button class="btn" data-toast="Prototype: start renewal filing">Start renewal</button>':'')+'</div>');
}

var LVIEWS={dashboard:viewLegalDash,contracts:viewContracts,comply:viewCompliance,docs:viewDocs};



/* =====================================================================
   ASSET MANAGEMENT MODULE: dummy data and pages
   ===================================================================== */
I.wrench='<path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7V21h3.3l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>';
I.tag='<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.3"/>';

/* ---------- Asset classes (company-wide figures) ---------- */
var ACL=[
 {k:'IT',name:'IT Equipment',ico:'server',life:48,count:2860,cost:71.4e9,nbv:24.3e9,st:[24,32,25,11,8]},
 {k:'VEH',name:'Vehicles',ico:'truck',life:96,count:96,cost:38.2e9,nbv:19.9e9,st:[18,44,30,7,1]},
 {k:'MCH',name:'Machinery & Equipment',ico:'wrench',life:120,count:1240,cost:268.5e9,nbv:169.2e9,st:[12,38,38,10,2]},
 {k:'FUR',name:'Furniture & Fixtures',ico:'box',life:96,count:1980,cost:22.1e9,nbv:9.1e9,st:[14,28,34,16,8]},
 {k:'OFC',name:'Office Equipment',ico:'clipboard',life:60,count:690,cost:14.3e9,nbv:5.4e9,st:[20,30,28,14,8]},
 {k:'BLD',name:'Buildings & Improvements',ico:'bank',life:240,count:64,cost:71.8e9,nbv:56.0e9,st:[8,32,52,8,0]}
];
function acl(k){return ACL.filter(function(c){return c.k===k;})[0];}
var A_TOT={count:0,cost:0,nbv:0,fd:0,mon:0};
ACL.forEach(function(c){
  c.lc=c.st.map(function(p){return Math.round(c.count*p/100);});
  c.lc[1]+=c.count-c.lc.reduce(function(a,b){return a+b;},0);
  c.fd=c.lc[4];
  c.mon=c.cost/c.life*(1-c.st[4]/100);
  A_TOT.count+=c.count;A_TOT.cost+=c.cost;A_TOT.nbv+=c.nbv;A_TOT.fd+=c.fd;A_TOT.mon+=c.mon;
});
var LCS=['New','Mid-life','Mature','End of life','Fully depreciated'];
var LCD=['Under 25% of useful life used','25–60% used','60–90% used','90–100% used','Past useful life'];
var LCC=['var(--s0)','var(--s1)','var(--s2)','var(--s4)','var(--s3)'];
function stageOf(p){return p<.25?0:p<.6?1:p<.9?2:p<1?3:4;}
var ALOC=['Head Office, Jakarta','Cikarang Plant','Cikarang Warehouse','Bandung Branch','Surabaya Branch'];
var ALOCN=[2140,2660,1120,540,470];
var AST_C={'In use':'ok','In storage':'mute','Under maintenance':'warn','On loan':'info','Retired':'mute'};

/* ---------- Register sample ---------- */
var APOOL={
 IT:[['Dell Latitude 5440 Laptop',18.5e6],['Lenovo ThinkPad T14 Laptop',21e6],['MacBook Pro 14 inch M3',38e6],['HP EliteDesk 800 Desktop',14.2e6],['Dell PowerEdge R750 Server',185e6],['Cisco Catalyst 9200 Switch',42e6],['FortiGate 100F Firewall',68e6],['Dell U2723QE 27 inch Monitor',8.9e6],['Ubiquiti U6 Pro Access Point',3.6e6],['Synology RS1221+ NAS',31e6]],
 VEH:[['Toyota Avanza 1.5 G',265e6],['Mitsubishi L300 Pickup',285e6],['Isuzu Elf NLR Truck',420e6],['Honda PCX 160',34e6],['Toyota Hiace Commuter',585e6],['Daihatsu Gran Max Box',245e6]],
 MCH:[['Packaging Line Conveyor',480e6],['Industrial Mixer 500 L',315e6],['Toyota 3T Forklift',380e6],['Diesel Generator 250 kVA',640e6],['Air Compressor 15 HP',92e6],['Bottle Filling Machine',720e6],['Electric Pallet Jack',62e6],['Labeling Machine',210e6]],
 FUR:[['Executive Desk',6.5e6],['Ergonomic Office Chair',3.2e6],['12-Seat Meeting Table',18e6],['Steel Filing Cabinet',2.4e6],['Lounge Sofa Set',14e6],['Workstation Cluster (4 seats)',22e6]],
 OFC:[['Epson EB-L200 Projector',21e6],['HP LaserJet MFP M430',9.8e6],['CCTV Set 16-Channel',36e6],['Daikin 2 PK Air Conditioner',7.4e6],['Interactive Whiteboard 75 inch',48e6]],
 BLD:[['Warehouse Roof Renovation',1.2e9],['Office Fit-out, Floor 3',2.8e9],['Loading Dock Extension',950e6]]
};
var ASSETS=[];
(function(){
  var r=rng(6113),n=0,plan=[['IT',24],['VEH',8],['MCH',16],['FUR',10],['OFC',10],['BLD',4]];
  var DEPT_FOR={VEH:'Warehouse & Logistics',MCH:'Operations',BLD:'Operations'};
  var SUP=['PT Cahaya Mitra Teknologi','PT Sinar Mas Equipment','PT Astra Auto Supply','PT Mega Office Solusi','PT Indotek Prima','CV Karya Sarana'];
  plan.forEach(function(pl){
    var c=acl(pl[0]),pool=APOOL[pl[0]];
    for(var i=0;i<pl[1];i++){
      n++;
      var t=pool[i%pool.length],acq=dt(2019+Math.floor(r()*7.9),1+Math.floor(r()*12),1+Math.floor(r()*27));
      if(acq>NOW)acq=dt(2026,8,10);
      var cost=Math.round(t[1]*(0.92+r()*0.16)/1e5)*1e5,rr=r(),status=rr<.74?'In use':rr<.9?'In storage':'Retired';
      var emp=null;
      if(pl[0]==='IT'||pl[0]==='FUR'||pl[0]==='OFC'){emp=EMP[Math.floor(r()*EMP.length)];}
      var cust=(emp&&status==='In use')?emp.name:null;
      var loc=emp?emp.loc:pl[0]==='MCH'?'Cikarang Plant':pl[0]==='BLD'?(r()<.5?'Cikarang Plant':'Cikarang Warehouse'):(r()<.5?'Cikarang Warehouse':'Head Office, Jakarta');
      var dept=emp?emp.dept:DEPT_FOR[pl[0]];
      var m=(NOW.getFullYear()-acq.getFullYear())*12+NOW.getMonth()-acq.getMonth();
      var acc=Math.min(cost,cost/c.life*m),pct=acc/cost;
      var wm=pl[0]==='IT'||pl[0]==='VEH'||pl[0]==='MCH'?36:pl[0]==='OFC'?24:0;
      var war=wm?new Date(acq.getFullYear(),acq.getMonth()+wm,acq.getDate()):null;
      var cond=status==='Retired'?'Poor':pct>=1?(r()<.5?'Poor':'Fair'):pct>.7?(r()<.6?'Fair':'Good'):'Good';
      ASSETS.push({id:'A'+n,n:n,tag:'PIDC-'+pl[0]+'-'+pad(1000+n*37,5),name:t[0],cls:pl[0],loc:loc,dept:dept,cust:cust,acq:acq,cost:cost,life:c.life,status:status,cond:cond,
        serial:'SN-'+(Math.floor(r()*1e9)).toString(36).toUpperCase(),war:war,sup:SUP[Math.floor(r()*SUP.length)],acc:acc,nbv:cost-acc,pct:pct,stage:stageOf(pct)});
    }
  });
})();
function asset(id){return ASSETS.filter(function(a){return a.id===id;})[0];}
function warSoon(a){return a.war&&diffDays(a.war,NOW)>=0&&diffDays(a.war,NOW)<=60;}
var ACELL=function(a){return '<div class="who"><span class="itile">'+icon(acl(a.cls).ico,18)+'</span><span><span class="a">'+esc(a.name)+'</span><span class="b">'+a.tag+' · '+esc(acl(a.cls).name)+'</span></span></div>';};

/* ---------- Work orders ---------- */
var WOSN=['Scheduled','In progress','Completed'],WOSC=['mute','info','ok'];
var PRC={Low:'mute',Medium:'info',High:'warn',Critical:'bad'};
var WDESC={
 IT:{Preventive:['Firmware update and health check','Quarterly cleaning and thermal check'],Corrective:['Hardware fault diagnosis and part replacement','Replace failed component'],Inspection:['Security and configuration audit']},
 VEH:{Preventive:['10,000 km service','Periodic service and tire rotation'],Corrective:['Brake pad and rotor replacement'],Inspection:['Roadworthiness inspection']},
 MCH:{Preventive:['Quarterly lubrication and belt check','Filter and coolant replacement'],Corrective:['Motor overheating repair','Hydraulic leak repair','Bearing replacement'],Inspection:['Electrical safety inspection']},
 FUR:{Preventive:['Cleaning and hardware check'],Corrective:['Repair and refinishing'],Inspection:['Condition check']},
 OFC:{Preventive:['Cleaning and calibration'],Corrective:['Component replacement'],Inspection:['Functional check']},
 BLD:{Preventive:['Waterproofing and paint touch-up'],Corrective:['Leak repair'],Inspection:['Structural and leak inspection']}
};
var WOS=[];
(function(){
  var TECH=['Internal IT Team','Internal Facilities Team','PT Teknik Mandiri','PT Logam Perkasa','Auto2000 Service','Dell Authorized Service','Daikin Service','PT Konstruksi Andal'];
  var spec=[
   [33,'Preventive','Medium',-6,1,2,4.5],[35,'Corrective','Critical',-2,1,3,18.5],[36,'Preventive','High',3,0,2,6.2],[38,'Corrective','High',1,1,1,3.1],
   [40,'Preventive','Medium',8,0,2,5.4],[44,'Inspection','Low',12,0,1,.8],[46,'Preventive','High',5,0,3,7.9],[25,'Preventive','Medium',2,0,4,2.3],
   [27,'Corrective','High',-4,0,4,6.8],[29,'Preventive','Low',15,0,4,3.6],[3,'Corrective','Medium',-3,0,5,2.6],[5,'Corrective','High',0,1,0,1.2],
   [9,'Preventive','Medium',6,0,0,.6],[14,'Preventive','Low',18,0,0,.4],[59,'Corrective','Low',4,0,0,2.1],[61,'Preventive','Medium',10,0,6,1.4],
   [64,'Inspection','Medium',20,0,1,.5],[69,'Inspection','High',14,0,7,9.5],[50,'Corrective','Low',-1,0,1,.7],
   [32,'Preventive','Medium',-20,2,2,4.2],[34,'Corrective','High',-14,2,3,12.6],[37,'Preventive','Medium',-11,2,2,5],[26,'Preventive','Low',-9,2,4,2.1],
   [8,'Corrective','Medium',-16,2,5,1.8],[10,'Preventive','Low',-7,2,0,.5],[60,'Corrective','Medium',-5,2,0,1.6]
  ];
  spec.forEach(function(s,i){
    var a=ASSETS[s[0]],list=WDESC[a.cls][s[1]];
    WOS.push({id:'W'+i,no:'WO-2609-'+(401+i),aid:a.id,type:s[1],prio:s[2],due:new Date(NOW.getFullYear(),NOW.getMonth(),NOW.getDate()+s[3]),st:s[4],tech:TECH[s[5]],cost:s[6]*1e6,desc:list[i%list.length]});
    if(s[4]===1&&a.status!=='Retired')a.status='Under maintenance';
  });
})();
function woLate(w){return w.st<2&&diffDays(w.due,NOW)<0;}
function advWO(id){
  var w=WOS.filter(function(x){return x.id===id;})[0];if(!w||w.st>=2)return;
  var a=asset(w.aid);w.st++;
  if(w.st===1&&a.status!=='Retired')a.status='Under maintenance';
  if(w.st===2){if(a.status==='Under maintenance')a.status='In use';w.due=NOW;}
  toast(w.no+' · '+a.name+': '+WOSN[w.st]);render();
}

/* ---------- Loans & assignments ---------- */
var LNSN={requested:'Awaiting approval',active:'Active',returned:'Returned',rejected:'Rejected'};
var LNC={requested:'warn',active:'info',returned:'ok',rejected:'bad'};
var LOANS=[];
(function(){
  var PUR=['Project fieldwork','Temporary replacement during repair','Client presentation','Remote work trial','Training workshop','Town hall event','Site visit, Bandung','Supplier audit','Temporary dual-monitor setup'];
  var spec=[
   [10,3,-9,-5,'active',1],[11,8,-6,4,'active',0],[20,14,-3,7,'active',3],[21,21,-12,-2,'active',2],[58,30,-1,3,'active',4],[24,40,-2,2,'active',6],[7,52,-4,10,'active',8],[63,60,-14,-8,'active',5],
   [12,5,-25,-18,'returned',0],[22,17,-30,-20,'returned',2],[17,27,-16,-9,'returned',8],[27,44,-11,-8,'returned',6],[23,9,-21,-14,'returned',1],[1,33,-19,-12,'returned',3],
   [0,71,0,7,'requested',0],[2,80,0,5,'requested',2],[30,12,0,3,'requested',7],[1,66,0,10,'requested',3]
  ];
  spec.forEach(function(s,i){
    var a=ASSETS[s[0]],e=EMP[s[1]];
    LOANS.push({id:'N'+i,no:'LN-2609-'+(201+i),aid:a.id,who:e.name,dept:e.dept,out:new Date(NOW.getFullYear(),NOW.getMonth(),NOW.getDate()+s[2]),due:new Date(NOW.getFullYear(),NOW.getMonth(),NOW.getDate()+s[3]),status:s[4],pur:PUR[s[5]]});
    if(s[4]==='active')a.status='On loan';
  });
})();
function lnLate(l){return l.status==='active'&&diffDays(l.due,NOW)<0;}
function actLoan(id,what){
  var l=LOANS.filter(function(x){return x.id===id;})[0];if(!l)return;
  var a=asset(l.aid);
  if(what==='ok'&&l.status==='requested'){l.status='active';l.out=NOW;l.due=new Date(NOW.getFullYear(),NOW.getMonth(),NOW.getDate()+7);a.status='On loan';toast(l.no+' approved: '+a.name+' lent to '+l.who);}
  else if(what==='no'&&l.status==='requested'){l.status='rejected';toast(l.no+' rejected');}
  else if(what==='ret'&&l.status==='active'){l.status='returned';a.status='In storage';toast(a.name+' returned by '+l.who);}
  render();
}

/* ---------- Audit ---------- */
var AUDL=[
 {loc:'Head Office, Jakarta',dates:'Sep 14–16',who:'Siska Amelia, Rudi Hartono',prog:100,n:2140},
 {loc:'Cikarang Plant',dates:'Sep 21–25',who:'Yoga Pratama, Farhan Alfarizi',prog:68,n:2660},
 {loc:'Cikarang Warehouse',dates:'Sep 23–24',who:'Ayu Ningsih, Cahyo Nugroho',prog:35,n:1120},
 {loc:'Bandung Branch',dates:'Sep 28',who:'Nadia Safitri, Bagas Prakoso',prog:0,n:540},
 {loc:'Surabaya Branch',dates:'Sep 30',who:'Sari Wulandari, Andika Nugraha',prog:0,n:470}
];
var AVAR=[
 {id:'V1',ai:14,type:'Location mismatch',found:'Bandung Branch',st:'Needs review'},
 {id:'V2',ai:4,type:'Not found',found:'Not located',st:'Needs review'},
 {id:'V3',ai:36,type:'Condition changed',found:'Poor, visible corrosion',st:'Needs review'},
 {id:'V4',name:'Laptop, no asset tag',cls:'IT',tag:'No tag',loc:'Head Office, Jakarta',val:9.5e6,type:'Unregistered asset',found:'Found in Finance storage',st:'Needs review'},
 {id:'V5',ai:30,type:'Location mismatch',found:'Head Office, Jakarta',st:'Needs review'},
 {id:'V6',ai:13,type:'Not found',found:'Not located',st:'Investigating'},
 {id:'V7',ai:52,type:'Condition changed',found:'Fair, worn upholstery',st:'Approved'},
 {id:'V8',ai:42,type:'Duplicate tag',found:'Tag also on another asset',st:'Investigating'},
 {id:'V9',ai:66,type:'Location mismatch',found:'Cikarang Plant',st:'Approved'}
];
AVAR.forEach(function(v){
  if(v.ai!==undefined){var a=ASSETS[v.ai];v.name=a.name;v.cls=a.cls;v.tag=a.tag;v.loc=a.loc;v.val=a.nbv;}
});
function pendAud(){return AVAR.filter(function(v){return v.st==='Needs review';});}
function resAud(id,ok){
  var v=AVAR.filter(function(x){return x.id===id;})[0];if(!v||v.st==='Approved')return;
  v.st=ok?'Approved':'Investigating';
  toast(v.name+(ok?': register updated':': investigation opened'));render();
}
var AUC={'Needs review':'warn','Investigating':'info','Approved':'ok'};

/* ---------- Shared bits ---------- */
var MC={labels:['Apr','May','Jun','Jul','Aug','Sep'],prev:[38,42,45,41,47,36],corr:[22,31,18,27,24,19]};
function drawMaint(){
  var el=$('#mcost');if(!el)return;
  var W=Math.max(280,el.clientWidth),H=210,m={l:36,r:8,t:12,b:28},n=MC.labels.length,hi=60;
  var step=(W-m.l-m.r)/n,gw=Math.min(20,step*.3),y=function(v){return m.t+(hi-v)*(H-m.t-m.b)/hi;},y0=y(0);
  var s='<svg viewBox="0 0 '+W+' '+H+'" width="100%" height="'+H+'" role="img" aria-label="Bar chart of preventive and corrective maintenance cost per month, last 6 months">';
  [0,30,60].forEach(function(t){s+='<line class="ch-grid" x1="'+m.l+'" x2="'+(W-m.r)+'" y1="'+y(t)+'" y2="'+y(t)+'"/><text class="ch-txt" x="'+(m.l-8)+'" y="'+(y(t)+4)+'" text-anchor="end">'+t+'</text>';});
  MC.labels.forEach(function(lb,i){
    var cx=m.l+step*i+step/2;
    s+='<rect class="fb-in" x="'+(cx-gw-1)+'" y="'+y(MC.prev[i])+'" width="'+gw+'" height="'+(y0-y(MC.prev[i]))+'" rx="2"><title>'+lb+' · Preventive: Rp '+MC.prev[i]+'M</title></rect>';
    s+='<rect class="fb-out" x="'+(cx+1)+'" y="'+y(MC.corr[i])+'" width="'+gw+'" height="'+(y0-y(MC.corr[i]))+'" rx="2"><title>'+lb+' · Corrective: Rp '+MC.corr[i]+'M</title></rect>';
    s+='<text class="ch-txt" x="'+cx+'" y="'+(H-8)+'" text-anchor="middle">'+lb+'</text>';
  });
  el.innerHTML=s+'</svg>';
  var tp=MC.prev.reduce(function(a,b){return a+b;},0),tc=MC.corr.reduce(function(a,b){return a+b;},0);
  $('#mcNote').textContent='Corrective work is '+pct(tc/(tp+tc)*100,0)+'% of maintenance spend over 6 months (Rp '+fmt(tp+tc)+'M in total). September is still in progress.';
}
function aHead(title,sub,act){return head(title,sub,act);}
function ACELLS(v,sub){return '<div class="who"><span class="itile">'+icon(acl(v.cls).ico,18)+'</span><span><span class="a">'+esc(v.name)+'</span><span class="b">'+esc(sub)+'</span></span></div>';}

/* ================= Dashboard ================= */
function viewAsDash(){
  var u=ui.adb,owo=WOS.filter(function(w){return w.st<2;}),due30=owo.filter(function(w){return diffDays(w.due,NOW)<=30;}).length;
  var actL=LOANS.filter(function(l){return l.status==='active';}),odW=owo.filter(woLate).length,odL=actL.filter(lnLate).length,pv=pendAud().length;
  var nearEnd=ACL.reduce(function(a,c){return a+c.lc[3]+c.lc[4];},0);
  var h=aHead('Dashboard','Wednesday, September 23, 2026 · Updated 09:42 local time','<button class="btn" data-toast="Prototype: export asset summary">'+icon('download',18)+'Export summary</button>');
  h+=kpis([['Registered assets',fmt(A_TOT.count),'Across '+ACL.length+' asset classes'],['Net book value',rpc(A_TOT.nbv),'Of '+rpc(A_TOT.cost)+' acquisition cost'],['Open work orders',owo.length,due30+' due within 30 days'],['Active loans',actL.length,odL+' overdue']]);
  var legend=LCS.map(function(nm,i){var n=ACL.reduce(function(a,c){return a+c.lc[i];},0);return '<button class="chip" data-lc="'+i+'" aria-pressed="'+(u.stage===i)+'" style="--c:'+LCC[i]+'" title="'+LCD[i]+'"><i></i>'+nm+' <em>'+fmt(n)+'</em></button>';}).join('');
  var blocks=ACL.slice().sort(function(a,b){return b.count-a.count;}).map(function(c){
    var cells=Math.ceil(c.count/10),cols=Math.max(6,Math.round(Math.sqrt(cells)*1.5)),cum=[],acc=0,html='';
    c.lc.forEach(function(n){acc+=n;cum.push(acc);});
    for(var j=0;j<cells;j++){
      var idx=Math.min(c.count-1,j*10+5),s=0;while(idx>=cum[s])s++;
      var dim=(u.cls&&u.cls!==c.k)||(u.stage!==null&&u.stage!==s);
      html+='<i class="ld'+(dim?' dim':'')+'" style="--c:'+LCC[s]+'" data-tip="'+esc(c.name)+' · '+LCS[s]+'"></i>';
    }
    return '<div class="lcb"><button class="lch" data-lcc="'+c.k+'" aria-pressed="'+(u.cls===c.k)+'">'+esc(c.name)+' <em>'+fmt(c.count)+'</em></button><div class="lgrid" aria-hidden="true" style="grid-template-columns:repeat('+cols+',9px)">'+html+'</div></div>';
  }).join('');
  var sel=0;ACL.forEach(function(c){if(u.cls&&u.cls!==c.k)return;c.lc.forEach(function(n,i){if(u.stage===null||u.stage===i)sel+=n;});});
  var read=(u.cls||u.stage!==null)?'<span><b>'+fmt(sel)+'</b> assets · '+esc([u.cls?acl(u.cls).name:'',u.stage!==null?LCS[u.stage]:''].filter(Boolean).join(' · '))+'</span><button class="link-btn" data-lcreset="1">Show all</button>':'<span><b>'+fmt(nearEnd)+'</b> of '+fmt(A_TOT.count)+' assets are at end of life or fully depreciated</span>';
  var upcoming=owo.filter(function(w){return !woLate(w);}).sort(function(a,b){return a.due-b.due;}).slice(0,5);
  h+='<div class="grid"><section class="card c8" aria-labelledby="t-lc"><div class="card-head"><div><h2 id="t-lc">Asset lifecycle map</h2><p class="hint">1 square = 10 assets, ordered from newest to oldest within each class. Click a stage or class name to highlight.</p></div></div>'
    +'<div class="legend">'+legend+'</div><div class="readout" aria-live="polite">'+read+'</div><div class="lmap">'+blocks+'</div></section>'
    +'<section class="card c4" aria-labelledby="t-aal"><div class="card-head"><div><h2 id="t-aal">Needs attention</h2><p class="hint">Click to open the related list</p></div></div><ul class="alerts">'
    +'<li><button data-wgo="maint:tab:overdue"><span class="al-ico bad">'+icon('alert',20)+'</span><span><span class="a">Overdue maintenance</span><span class="b">Work orders past due date</span></span><span class="al-n">'+odW+'</span></button></li>'
    +'<li><button data-wgo="loan:tab:overdue"><span class="al-ico warn">'+icon('clock',20)+'</span><span><span class="a">Overdue loans</span><span class="b">Not returned by due date</span></span><span class="al-n">'+odL+'</span></button></li>'
    +'<li><button data-wgo="assets:flag:warranty"><span class="al-ico warn">'+icon('tag',20)+'</span><span><span class="a">Warranty expiring</span><span class="b">Within 60 days</span></span><span class="al-n">87</span></button></li>'
    +'<li><button data-wgo="assets:flag:fulldep"><span class="al-ico info">'+icon('trend',20)+'</span><span><span class="a">Fully depreciated</span><span class="b">Still on the register</span></span><span class="al-n">'+fmt(A_TOT.fd)+'</span></button></li>'
    +'<li><button data-wgo="audit:tab:Needs review"><span class="al-ico info">'+icon('clipboard',20)+'</span><span><span class="a">Audit discrepancies</span><span class="b">Waiting for review</span></span><span class="al-n">'+pv+'</span></button></li></ul></section>'
    +'<section class="card r3a" aria-labelledby="t-mc"><div class="card-head"><div><h2 id="t-mc">Maintenance cost</h2><p class="hint">Rp millions per month, last 6 months</p></div></div>'
    +'<div class="legend-o" style="margin:0 0 8px"><span><i style="background:var(--brand)"></i>Preventive</span><span><i style="background:var(--s2)"></i>Corrective</span></div><div id="mcost"></div><p class="insight" id="mcNote"></p></section>'
    +'<section class="card r3b" aria-labelledby="t-up"><div class="card-head"><div><h2 id="t-up">Upcoming service</h2><p class="hint">Next open work orders</p></div></div><ul class="agenda">'
    +upcoming.map(function(w){var a=asset(w.aid),late=woLate(w);return '<li><span class="date"><b>'+w.due.getDate()+'</b><span>'+MON[w.due.getMonth()]+'</span></span><span><span class="a">'+esc(a.name)+'</span><span class="b">'+w.type+' · '+esc(w.tech)+'</span></span>'+(late?chip('bad','Overdue'):chip(WOSC[w.st],WOSN[w.st]))+'</li>';}).join('')
    +'</ul></section>'
    +'<section class="card r3c" aria-labelledby="t-vc"><div class="card-head"><div><h2 id="t-vc">Book value by class</h2><p class="hint">Net book value, Rp billions</p></div></div>'
    +hbars(ACL.slice().sort(function(a,b){return b.nbv-a.nbv;}).map(function(c){return [c.name,c.nbv/1e9];}),ACL.reduce(function(a,c){return Math.max(a,c.nbv/1e9);},0),function(v){return pct(v,1);})+'</section></div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= Asset Register ================= */
function viewAssets(){
  var u=ui.ast,q=u.q.toLowerCase();
  var rows=ASSETS.filter(function(a){
    return (!q||(a.name+' '+a.tag+' '+a.serial+' '+(a.cust||'')).toLowerCase().indexOf(q)>-1)&&(!u.cls||acl(a.cls).name===u.cls)&&(!u.status||a.status===u.status)&&(!u.loc||a.loc===u.loc)
      &&(u.flag!=='warranty'||warSoon(a))&&(u.flag!=='fulldep'||a.pct>=1);
  });
  var size=10,pages=Math.max(1,Math.ceil(rows.length/size));if(u.page>=pages)u.page=pages-1;
  var slice=rows.slice(u.page*size,u.page*size+size);
  var h=aHead('Asset Register','Every registered asset, its owner, location, and book value','<button class="btn primary" data-toast="Prototype: register new asset form">'+icon('plus',18)+'Register asset</button>');
  h+=kpis([['Registered assets',fmt(A_TOT.count),'Across '+ACL.length+' asset classes'],['Acquisition cost',rpc(A_TOT.cost),'Original purchase value'],['Net book value',rpc(A_TOT.nbv),pct(A_TOT.nbv/A_TOT.cost*100,1)+'% of cost remaining'],['Fully depreciated',fmt(A_TOT.fd),'Past their useful life']]);
  h+='<div class="toolbar"><input class="inp" type="text" data-keep="ast-q" data-f="ast.q" value="'+esc(u.q)+'" placeholder="Search name, tag, or serial" aria-label="Search assets">'
    +'<select class="sel" data-f="ast.cls" aria-label="Filter asset class">'+opts(ACL.map(function(c){return c.name;}),u.cls,'All classes')+'</select>'
    +'<select class="sel" data-f="ast.status" aria-label="Filter status">'+opts(['In use','In storage','Under maintenance','On loan','Retired'],u.status,'All statuses')+'</select>'
    +'<select class="sel" data-f="ast.loc" aria-label="Filter location">'+opts(ALOC,u.loc,'All locations')+'</select>'
    +(u.flag?'<button class="btn sm" data-clrflag="1">'+(u.flag==='warranty'?'Warranty expiring':'Fully depreciated')+' '+icon('x',14,2.25)+'</button>':'')
    +'<span class="spacer"></span><button class="btn" data-toast="Prototype: export asset register">'+icon('download',18)+'Export</button></div>';
  h+='<section class="card">'+tblWrap('<table class="tbl"><thead><tr><th>Asset</th><th>Custodian</th><th>Acquired</th><th class="num">Book value</th><th>Status</th></tr></thead><tbody>'
    +(slice.length?slice.map(function(a){return '<tr class="click" tabindex="0" data-ast="'+a.id+'"><td>'+ACELL(a)+'</td><td>'+(a.cust?esc(a.cust):'<span class="dim-txt">'+esc(a.dept)+' (unit)</span>')+'<span class="ks" style="display:block">'+esc(a.loc)+'</span></td><td>'+fd(a.acq,true)+'</td><td class="num"><b>'+rpc(a.nbv)+'</b><span class="ks" style="display:block">of '+rpc(a.cost)+'</span></td><td>'+chip(AST_C[a.status],a.status)+'</td></tr>';}).join(''):'<tr><td colspan="5" class="empty-note">No assets match the filters.</td></tr>')
    +'</tbody></table>')+pager('ast',rows.length,size,u.page)+'<p class="note">Sample data: '+ASSETS.length+' of '+fmt(A_TOT.count)+' registered assets are shown in this prototype.</p></section>';
  h+='<div class="grid"><section class="card c6"><div class="card-head"><div><h2>Assets by class</h2><p class="hint">Number of registered assets</p></div></div>'+hbars(ACL.slice().sort(function(a,b){return b.count-a.count;}).map(function(c){return [c.name,c.count];}),2860,fmt)+'</section>'
    +'<section class="card c6"><div class="card-head"><div><h2>Assets by location</h2><p class="hint">Where the assets are held</p></div></div>'+hbars(ALOC.map(function(l,i){return [l,ALOCN[i]];}).sort(function(a,b){return b[1]-a[1];}),2660,fmt)+'</section></div>';
  return '<div class="page-inner">'+h+'</div>';
}
function openAsset(id){
  var a=asset(id);if(!a)return;var c=acl(a.cls),p=Math.min(a.pct,1)*100,hist=[];
  WOS.forEach(function(w){if(w.aid===a.id)hist.push({d:w.due,t:'Maintenance',x:w.no+' · '+w.type+' · '+WOSN[w.st]});});
  LOANS.forEach(function(l){if(l.aid===a.id&&l.status!=='rejected')hist.push({d:l.out,t:'Loan',x:l.no+' · '+LNSN[l.status]});});
  hist.sort(function(x,y){return y.d-x.d;});
  openPanel('Asset detail','<div class="prof"><span class="big" style="border-radius:12px">'+icon(c.ico,26)+'</span><div><h3>'+esc(a.name)+'</h3><p>'+a.tag+' · '+esc(c.name)+'</p></div></div>'
   +'<dl class="kv"><dt>Status</dt><dd>'+chip(AST_C[a.status],a.status)+'</dd><dt>Condition</dt><dd>'+a.cond+'</dd><dt>Location</dt><dd>'+esc(a.loc)+'</dd><dt>Custodian</dt><dd>'+(a.cust?esc(a.cust)+' · '+esc(a.dept):esc(a.dept)+' (unit-held)')+'</dd><dt>Serial number</dt><dd>'+a.serial+'</dd><dt>Supplier</dt><dd>'+esc(a.sup)+'</dd><dt>Warranty</dt><dd>'+(a.war?fd(a.war,true)+(diffDays(a.war,NOW)<0?' (expired)':''):'None')+'</dd></dl>'
   +'<div class="kv-h">Value</div><dl class="kv"><dt>Acquired</dt><dd>'+fd(a.acq,true)+'</dd><dt>Acquisition cost</dt><dd>'+rp(a.cost)+'</dd><dt>Useful life</dt><dd>'+(a.life/12)+' years (straight-line)</dd><dt>Accumulated depreciation</dt><dd>'+rp(a.acc)+'</dd></dl><dl class="kv kv-total" style="margin-top:12px"><dt>Book value</dt><dd>'+rp(a.nbv)+'</dd></dl>'
   +'<div class="kv-h">Useful life used</div><div class="gauge"><i style="width:'+p+'%"></i></div><div class="cap"><span>'+pct(p,0)+'% used</span><span>'+LCS[a.stage]+'</span></div>'
   +'<div class="kv-h">History</div>'+(hist.length?tblWrap('<table class="tbl"><thead><tr><th>Date</th><th>Type</th><th>Reference</th></tr></thead><tbody>'+hist.map(function(x){return '<tr><td>'+fd(x.d,true)+'</td><td>'+x.t+'</td><td class="tnum muted">'+x.x+'</td></tr>';}).join('')+'</tbody></table>'):'<p class="note" style="margin:0">No maintenance or loan records this cycle.</p>')
   +'<div class="d-actions"><button class="btn primary" data-toast="Prototype: schedule maintenance form">Schedule maintenance</button><button class="btn" data-toast="Prototype: print asset tag">Print tag</button></div>');
}

/* ================= Depreciation ================= */
function viewDepr(){
  var u=ui.dep,acc=A_TOT.cost-A_TOT.nbv,c=acl(u.cls)||ACL[0];
  var h=aHead('Depreciation','Straight-line method, no residual value · Book values as of September 2026','<button class="btn" data-toast="Prototype: export depreciation schedule">'+icon('download',18)+'Export schedule</button>');
  h+=kpis([['Monthly depreciation',rpc(A_TOT.mon),'Charged to the current period'],['Accumulated depreciation',rpc(acc),pct(acc/A_TOT.cost*100,1)+'% of acquisition cost'],['Net book value',rpc(A_TOT.nbv),'Of '+rpc(A_TOT.cost)+' acquisition cost'],['Fully depreciated',fmt(A_TOT.fd),'No further expense']]);
  h+='<section class="card sp"><div class="card-head"><div><h2>Depreciation by asset class</h2><p class="hint">Company-wide, all registered assets</p></div></div>'
   +tblWrap('<table class="tbl"><thead><tr><th>Class</th><th class="num">Assets</th><th class="num">Useful life</th><th class="num">Acquisition cost</th><th class="num">Accumulated</th><th class="num">Book value</th><th style="min-width:130px">Depreciated</th><th class="num">Monthly expense</th></tr></thead><tbody>'
   +ACL.map(function(k){var d=(k.cost-k.nbv)/k.cost*100;return '<tr><td><b>'+esc(k.name)+'</b></td><td class="num">'+fmt(k.count)+'</td><td class="num">'+(k.life/12)+' yrs</td><td class="num">'+rpc(k.cost)+'</td><td class="num">'+rpc(k.cost-k.nbv)+'</td><td class="num"><b>'+rpc(k.nbv)+'</b></td><td><span class="hb-t"><i style="width:'+d+'%"></i></span><span class="ks">'+pct(d,0)+'%</span></td><td class="num">'+rpc(k.mon)+'</td></tr>';}).join('')
   +'<tr><td><b>Total</b></td><td class="num"><b>'+fmt(A_TOT.count)+'</b></td><td></td><td class="num"><b>'+rpc(A_TOT.cost)+'</b></td><td class="num"><b>'+rpc(acc)+'</b></td><td class="num"><b>'+rpc(A_TOT.nbv)+'</b></td><td></td><td class="num"><b>'+rpc(A_TOT.mon)+'</b></td></tr>'
   +'</tbody></table>')+'</section>';
  var open=c.nbv,cum=0,rowsS='';
  for(var m=0;m<12;m++){
    var ex=Math.min(open,c.mon),cl=open-ex;cum+=ex;
    var mi=(9+m)%12,yr=2026+Math.floor((9+m)/12);
    rowsS+='<tr><td>'+MON[mi]+' '+yr+'</td><td class="num">'+rpc(open)+'</td><td class="num">'+rpc(ex)+'</td><td class="num">'+rpc(cum)+'</td><td class="num"><b>'+rpc(cl)+'</b></td></tr>';
    open=cl;
  }
  h+='<div class="grid"><section class="card c8"><div class="card-head"><div><h2>12-month schedule</h2><p class="hint">Projected expense for '+esc(c.name)+', October 2026 onward</p></div></div>'
   +tabs('dep','cls',c.k,ACL.map(function(k){return [k.k,k.name];}))
   +'<div class="sp">'+tblWrap('<table class="tbl"><thead><tr><th>Month</th><th class="num">Opening book value</th><th class="num">Expense</th><th class="num">Cumulative</th><th class="num">Closing book value</th></tr></thead><tbody>'+rowsS+'</tbody></table>')+'</div></section>'
   +'<section class="card c4"><div class="card-head"><div><h2>Accumulated by class</h2><p class="hint">Recorded to date, Rp billions</p></div></div>'
   +hbars(ACL.slice().sort(function(a,b){return (b.cost-b.nbv)-(a.cost-a.nbv);}).map(function(k){return [k.name,(k.cost-k.nbv)/1e9];}),ACL.reduce(function(a,k){return Math.max(a,(k.cost-k.nbv)/1e9);},0),function(v){return pct(v,1);})
   +'<div class="tip-line">'+icon('info',18)+'<span>Fully depreciated assets that are still in use may need a revaluation or replacement plan. See the lifecycle map on the dashboard.</span></div></section></div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= Maintenance ================= */
function viewMaint(){
  var u=ui.mnt,F={all:function(){return true;},sched:function(w){return w.st===0;},prog:function(w){return w.st===1;},overdue:woLate,done:function(w){return w.st===2;}};
  var rows=WOS.filter(F[u.tab]||F.all).sort(function(a,b){return a.st===2&&b.st!==2?1:b.st===2&&a.st!==2?-1:a.due-b.due;});
  var open=WOS.filter(function(w){return w.st<2;}),done=WOS.filter(F.done),spent=done.reduce(function(a,w){return a+w.cost;},0);
  var h=aHead('Maintenance','Preventive, corrective, and inspection work orders','<button class="btn primary" data-toast="Prototype: new work order form">'+icon('plus',18)+'New work order</button>');
  h+=kpis([['Open work orders',open.length,WOS.filter(F.prog).length+' in progress'],['Overdue',WOS.filter(woLate).length,'Past their due date'],['Completed this month',done.length,'Since September 1'],['Cost this month',rpc(spent),'Completed work orders']]);
  h+='<div class="toolbar">'+tabs('mnt','tab',u.tab,[['all','All',WOS.length],['sched','Scheduled',WOS.filter(F.sched).length],['prog','In progress',WOS.filter(F.prog).length],['overdue','Overdue',WOS.filter(woLate).length],['done','Completed',done.length]])+'</div>';
  h+='<section class="card">'+tblWrap('<table class="tbl"><thead><tr><th>Work order</th><th>Asset</th><th>Priority</th><th>Due</th><th>Status</th><th></th></tr></thead><tbody>'
   +(rows.length?rows.map(function(w){
      var a=asset(w.aid),late=woLate(w),btn=w.st===0?'<button class="btn sm" data-wo="'+w.id+'">Start work</button>':w.st===1?'<button class="btn sm primary" data-wo="'+w.id+'">Complete</button>':'<span class="dim-txt">—</span>';
      return '<tr class="click" tabindex="0" data-wod="'+w.id+'"><td class="tnum"><b>'+w.no+'</b><span class="ks" style="display:block;white-space:normal;max-width:240px">'+w.type+' · '+esc(w.desc)+'</span></td><td>'+ACELL(a)+'</td><td>'+chip(PRC[w.prio],w.prio)+'</td><td class="tnum">'+fd(w.due,true)+(late?'<span style="display:block;margin-top:4px">'+chip('bad','Overdue')+'</span>':'')+'</td><td>'+chip(WOSC[w.st],WOSN[w.st])+'<span class="ks" style="display:block">'+esc(w.tech)+'</span></td><td>'+btn+'</td></tr>';
    }).join(''):'<tr><td colspan="6" class="empty-note">No work orders.</td></tr>')
   +'</tbody></table>')+'</section>';
  return '<div class="page-inner">'+h+'</div>';
}
function openWO(id){
  var w=WOS.filter(function(x){return x.id===id;})[0];if(!w)return;var a=asset(w.aid);
  var steps=WOSN.map(function(s,i){return '<li class="'+(i<w.st||w.st===2?'done':i===w.st?'now':'')+'"><span class="node">'+((i<w.st||w.st===2)?icon('check',14,3):'')+'</span><span><span class="a">'+s+'</span></span><span></span></li>';}).join('');
  openPanel('Work order '+w.no,'<dl class="kv"><dt>Asset</dt><dd>'+esc(a.name)+'</dd><dt>Asset tag</dt><dd>'+a.tag+'</dd><dt>Location</dt><dd>'+esc(a.loc)+'</dd><dt>Type</dt><dd>'+w.type+'</dd><dt>Work</dt><dd>'+esc(w.desc)+'</dd><dt>Priority</dt><dd>'+chip(PRC[w.prio],w.prio)+'</dd><dt>Due</dt><dd>'+fd(w.due,true)+'</dd><dt>Assigned to</dt><dd>'+esc(w.tech)+'</dd><dt>'+(w.st===2?'Actual cost':'Estimated cost')+'</dt><dd>'+rp(w.cost)+'</dd></dl>'
   +'<div class="kv-h">Progress</div><ol class="steps">'+steps+'</ol>'
   +(w.st<2?'<div class="d-actions"><button class="btn primary" data-wo="'+w.id+'" data-inpanel="1">'+(w.st===0?'Start work':'Complete')+'</button></div>':''));
}

/* ================= Loans & Assignments ================= */
function viewLoans(){
  var u=ui.lon,F={all:function(){return true;},requested:function(l){return l.status==='requested';},active:function(l){return l.status==='active';},overdue:lnLate,returned:function(l){return l.status==='returned';}};
  var rows=LOANS.filter(F[u.tab]||F.all).sort(function(a,b){return (a.status==='returned'?1:0)-(b.status==='returned'?1:0)||a.due-b.due;});
  var act=LOANS.filter(F.active);
  var h=aHead('Loans & Assignments','Temporary loans and returns of shared assets','<button class="btn primary" data-toast="Prototype: new loan request form">'+icon('plus',18)+'New loan request</button>');
  h+=kpis([['Active loans',act.length,'Assets currently out'],['Overdue',act.filter(lnLate).length,'Past their return date'],['Awaiting approval',LOANS.filter(F.requested).length,'Needs your action'],['Returned this month',LOANS.filter(F.returned).length,'Back in storage']]);
  h+='<div class="toolbar">'+tabs('lon','tab',u.tab,[['all','All',LOANS.length],['requested','Requests',LOANS.filter(F.requested).length],['active','Active',act.length],['overdue','Overdue',act.filter(lnLate).length],['returned','Returned',LOANS.filter(F.returned).length]])+'</div>';
  h+='<section class="card">'+tblWrap('<table class="tbl"><thead><tr><th>Loan</th><th>Asset</th><th>Borrower</th><th>Due</th><th>Status</th><th></th></tr></thead><tbody>'
   +(rows.length?rows.map(function(l){
      var a=asset(l.aid),late=lnLate(l),act2=l.status==='requested'?'<span class="acts"><button class="round" data-ln="'+l.id+':no" aria-label="Reject loan '+l.no+'" title="Reject">'+icon('x',16,2)+'</button><button class="round go" data-ln="'+l.id+':ok" aria-label="Approve loan '+l.no+'" title="Approve">'+icon('check',16,2.25)+'</button></span>':l.status==='active'?'<button class="btn sm" data-ln="'+l.id+':ret">Mark returned</button>':'<span class="dim-txt">—</span>';
      return '<tr><td class="tnum"><b>'+l.no+'</b><span class="ks" style="display:block;white-space:normal;max-width:200px">'+esc(l.pur)+'</span></td><td>'+ACELL(a)+'</td><td>'+who(l.who,l.dept)+'</td><td class="tnum">'+fd(l.due)+'<span class="ks" style="display:block">'+(l.status==='requested'?'Requested':'Out '+fd(l.out))+'</span></td><td>'+chip(LNC[l.status],LNSN[l.status])+(late?'<span style="display:block;margin-top:4px">'+chip('bad','Overdue')+'</span>':'')+'</td><td>'+act2+'</td></tr>';
    }).join(''):'<tr><td colspan="6" class="empty-note">No loans.</td></tr>')
   +'</tbody></table>')+'</section>';
  var byType=[['Laptops',5],['Projectors',2],['Vehicles',2],['Monitors',1]];
  h+='<div class="grid"><section class="card c6"><div class="card-head"><div><h2>Active loans by asset type</h2><p class="hint">Assets that are currently out</p></div></div>'+hbars(byType,5,fmt)+'</section>'
   +'<section class="card c6"><div class="card-head"><div><h2>Loan policy</h2><p class="hint">Default rules for shared assets</p></div></div><dl class="kv"><dt>Standard period</dt><dd>7 days, one extension allowed</dd><dt>Approval</dt><dd>Asset owner unit, then HR for vehicles</dd><dt>Late return</dt><dd>Reminder after 1 day, escalation after 3</dd><dt>Damage or loss</dt><dd>Reported within 24 hours</dd></dl></section></div>';
  return '<div class="page-inner">'+h+'</div>';
}

/* ================= Asset Audit ================= */
function viewAudit(){
  var u=ui.aud,pv=pendAud(),total=A_TOT.count;
  var done=AUDL.reduce(function(a,s){return a+s.n*s.prog/100;},0),risk=AVAR.filter(function(v){return v.type==='Not found'&&v.st!=='Approved';}).reduce(function(a,v){return a+v.val;},0);
  var rows=AVAR.filter(function(v){return u.tab==='all'||v.st===u.tab;});
  var h=aHead('Asset Audit','Q3 2026 physical verification · Due September 30','<button class="btn primary" data-toast="Prototype: schedule audit session">'+icon('plus',18)+'New session</button>');
  h+=kpis([['Audit progress',pct(done/total*100,1)+'%',fmt(Math.round(done))+' of '+fmt(total)+' assets verified'],['Register accuracy',pct((1-9/Math.max(1,done))*100,1)+'%','Based on verified assets so far'],['Discrepancies waiting',pv.length,'Needs your review'],['Value at risk',rpc(risk),'Book value of assets not found']]);
  h+='<div class="grid"><section class="card c8"><div class="card-head"><div><h2>Audit sessions by location</h2><p class="hint">Two auditors per site, scanning asset tags</p></div></div>'
   +tblWrap('<table class="tbl"><thead><tr><th>Location</th><th>Schedule</th><th>Auditors</th><th style="min-width:120px">Progress</th><th>Status</th></tr></thead><tbody>'
   +AUDL.map(function(s){var st=s.prog===100?['ok','Completed']:s.prog===0?['mute','Scheduled']:['info','Scanning'];return '<tr><td><b>'+esc(s.loc)+'</b><span class="ks" style="display:block">'+fmt(s.n)+' assets</span></td><td>'+s.dates+'</td><td class="wrap">'+esc(s.who)+'</td><td><span class="hb-t"><i style="width:'+s.prog+'%"></i></span><span class="ks">'+s.prog+'%</span></td><td>'+chip(st[0],st[1])+'</td></tr>';}).join('')
   +'</tbody></table>')+'</section>'
   +'<section class="card c4"><div class="card-head"><div><h2>Discrepancy types</h2><p class="hint">From the current findings</p></div></div>'+hbars(['Location mismatch','Not found','Condition changed','Unregistered asset','Duplicate tag'].map(function(t){return [t,AVAR.filter(function(v){return v.type===t;}).length];}),3,fmt)
   +'<div class="tip-line">'+icon('info',18)+'<span>Assets marked Not found stay on the register until the investigation closes, so their value remains visible as risk.</span></div></section>'
   +'<section class="card c12"><div class="card-head"><div><h2>Findings</h2><p class="hint">Approve to update the register, or open an investigation</p></div></div>'
   +tabs('aud','tab',u.tab,[['all','All',AVAR.length],['Needs review','Needs review',pv.length],['Investigating','Investigating',AVAR.filter(function(v){return v.st==='Investigating';}).length],['Approved','Approved',AVAR.filter(function(v){return v.st==='Approved';}).length]])
   +'<div class="sp">'+tblWrap('<table class="tbl"><thead><tr><th>Asset</th><th>Finding</th><th class="num">Book value</th><th>Status</th><th></th></tr></thead><tbody>'
   +(rows.length?rows.map(function(v){return '<tr><td>'+ACELLS(v,v.tag+' · Recorded at '+v.loc)+'</td><td>'+v.type+'<span class="ks" style="display:block;white-space:normal;max-width:200px">'+esc(v.found)+'</span></td><td class="num">'+rpc(v.val)+'</td><td>'+chip(AUC[v.st],v.st)+'</td><td>'+(v.st==='Approved'?'<span class="dim-txt">—</span>':'<span class="acts">'+(v.st==='Needs review'?'<button class="btn sm" data-au="'+v.id+':inv">Investigate</button>':'')+'<button class="btn sm primary" data-au="'+v.id+':ok">Approve</button></span>')+'</td></tr>';}).join(''):'<tr><td colspan="5" class="empty-note">No findings.</td></tr>')
   +'</tbody></table>')+'</div></section></div>';
  return '<div class="page-inner">'+h+'</div>';
}

var AVIEWS={dashboard:viewAsDash,assets:viewAssets,depr:viewDepr,maint:viewMaint,loan:viewLoans,audit:viewAudit};




/* ---------- Render controller ---------- */
function render(){
  if(IS_GUEST){state.mod='learn';if(state.item!=='guesthome')state.item='guesthome';} /* guests only see their own workspace */
  if(!(state.mod==='it'&&state.item==='ticketdetail')&&itTicketDetailPollTimer){window.clearInterval(itTicketDetailPollTimer);itTicketDetailPollTimer=null;}
  if(!(state.mod==='it'&&state.item==='mytickets')&&itMyTicketsPollTimer){window.clearInterval(itMyTicketsPollTimer);itMyTicketsPollTimer=null;}
  var m=curMod();
  document.title='Portal PID — '+(state.item==='profile'?'My Profile':state.item==='player'?'Course Player':state.item==='asgdetail'?'Assignment Detail':state.item==='tnaplay'?'TNA Assessment':state.item==='tnaresult'?'TNA Result':IS_GUEST?'Guest Home':itemLabel()+' · '+m.name);
  renderSwitcher();renderNav();
  var page=$('#page'),ae=document.activeElement,keep=(ae&&ae.dataset&&ae.dataset.keep)?{k:ae.dataset.keep,a:ae.selectionStart,b:ae.selectionEnd}:null;
  if(!IS_GUEST&&state.mod==='hr'&&state.item==='dashboard'){
    page.innerHTML=viewHR();initMosaic();renderApprovals();drawTrend();
    return;
  }
  var fn=state.item==='player'?viewLnPlayer:state.item==='profile'?viewProfile:state.mod==='it'?ITVIEWS[state.item]:state.mod==='hr'?VIEWS[state.item]:state.mod==='wh'?WVIEWS[state.item]:state.mod==='asset'?AVIEWS[state.item]:state.mod==='legal'?LVIEWS[state.item]:state.mod==='learn'?LRVIEWS[state.item]:null;
  if(fn){
    page.innerHTML=fn();
    if(state.mod==='it'&&state.item==='mytickets'){loadITMyTickets();startITMyTicketsPolling();}
    if(state.mod==='it'&&state.item==='ticketdetail'){loadITTicketDetail();startITTicketDetailPolling();}
    if(state.mod==='it'&&state.item==='kb')loadITKnowledge('');
    if(state.mod==='it'&&state.item==='newticket')loadITDevices();
    if(state.mod==='wh'&&state.item==='dashboard')drawFlow();
    if(state.mod==='asset'&&state.item==='dashboard')drawMaint();
    if(state.mod==='legal'&&state.item==='dashboard')drawRenewals();
    if(state.mod==='learn'&&state.item==='dashboard')drawLnHours();
    if(keep){var n=page.querySelector('[data-keep="'+keep.k+'"]');if(n){n.focus();try{n.setSelectionRange(keep.a,keep.b);}catch(_){}}}
  }else{
    if(itTicketDetailPollTimer){window.clearInterval(itTicketDetailPollTimer);itTicketDetailPollTimer=null;}
    page.innerHTML=viewGeneric();
  }
  if(!(state.mod==='it'&&state.item==='ticketdetail')&&itTicketDetailPollTimer){window.clearInterval(itTicketDetailPollTimer);itTicketDetailPollTimer=null;}
  if(!(state.mod==='it'&&state.item==='mytickets')&&itMyTicketsPollTimer){window.clearInterval(itMyTicketsPollTimer);itMyTicketsPollTimer=null;}
}

/* ---------- Popovers ---------- */
function closePops(except){
  Array.prototype.forEach.call(document.querySelectorAll('[data-pop]'),function(p){
    if(p!==except&&!p.hidden){p.hidden=true;var b=document.querySelector('[aria-controls="'+p.id+'"]');if(b)b.setAttribute('aria-expanded','false');}
  });
}
function bindPop(btnId,panelId){
  var b=$(btnId),p=$(panelId);
  b.addEventListener('click',function(e){
    e.stopPropagation();
    var open=p.hidden;closePops(open?p:null);
    p.hidden=!open;b.setAttribute('aria-expanded',String(open));
  });
}
bindPop('#swBtn','#swPanel');bindPop('#bellBtn','#npPanel');bindPop('#infoBtn','#infoPanel');bindPop('#userBtn','#umPanel');
$('#swClose').addEventListener('click',function(){closePops(null);$('#swBtn').focus();});
$('#npPanel').addEventListener('click',function(e){
  var readAll=e.target.closest('#notifReadAll');if(readAll){writePortalNotifications(readPortalNotifications().map(function(item){return Object.assign({},item,{read:true});}));return;}
  var notice=e.target.closest('[data-notification-ticket]');if(!notice)return;
  var id=notice.dataset.notificationId;writePortalNotifications(readPortalNotifications().map(function(item){return item.id===id?Object.assign({},item,{read:true}):item;}));
  itCurrentTicketId=notice.dataset.notificationTicket;itTicketDetailSnapshot=null;state.mod='it';state.appName='IT Service Mgmt';state.item='ticketdetail';closePops(null);render();window.scrollTo(0,0);
});
$('#npPanel').addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-notification-ticket]')){e.preventDefault();e.target.click();}});

/* ---------- Preferences (theme, density) ---------- */
var prefs={theme:'auto',density:'comfy'};
try{var sv=JSON.parse(localStorage.getItem('pidc-prefs')||'null');if(sv){prefs.theme=sv.theme||'auto';prefs.density=sv.density||'comfy';}var savedTheme=localStorage.getItem('portal-theme');if(savedTheme==='light'||savedTheme==='dark')prefs.theme=savedTheme;}catch(e){}
function applyPrefs(){
  var r=document.documentElement;
  if(prefs.theme==='auto'){r.removeAttribute('data-theme');}else{r.setAttribute('data-theme',prefs.theme);}
  r.setAttribute('data-density',prefs.density);
  Array.prototype.forEach.call(document.querySelectorAll('[data-theme-mode]'),function(b){b.setAttribute('aria-pressed',String(prefs.theme===b.dataset.themeMode));});
}
$('.portal-theme').addEventListener('click',function(e){
  var b=e.target.closest('[data-theme-mode]');if(!b)return;
  prefs.theme=b.dataset.themeMode;applyPrefs();
  try{localStorage.setItem('pidc-prefs',JSON.stringify(prefs));if(prefs.theme==='auto')localStorage.removeItem('portal-theme');else localStorage.setItem('portal-theme',prefs.theme);}catch(e2){}
});
applyPrefs();

/* ---------- Sidebar rail (icon-only, click to expand) ---------- */
var railOn=true;
try{var rv=localStorage.getItem('pidc-rail');if(rv==='0')railOn=false;}catch(e){}
function applyRail(){
  $('.app').setAttribute('data-nav',railOn?'rail':'full');
  $('#railBtn').setAttribute('aria-expanded',String(!railOn));
  $('#railLbl').textContent=railOn?'Expand menu':'Collapse menu';
}
$('#railBtn').addEventListener('click',function(){
  railOn=!railOn;applyRail();
  try{localStorage.setItem('pidc-rail',railOn?'1':'0');}catch(e){}
});
applyRail();

document.addEventListener('click',function(e){if(!e.target.closest('[data-pop]'))closePops(null);});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    var any=document.querySelector('[data-pop]:not([hidden])');
    closePops(null);
    if(any){var b=document.querySelector('[aria-controls="'+any.id+'"]');if(b)b.focus();}
    closeDrawer();
  }
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#q').focus();}
});

/* ---------- Drawer (mobile) ---------- */
function closeDrawer(){$('#sidebar').classList.remove('open');$('#scrim').classList.remove('on');}
$('#burger').addEventListener('click',function(){$('#sidebar').classList.add('open');$('#scrim').classList.add('on');});
$('#scrim').addEventListener('click',closeDrawer);

/* ---------- Events ---------- */
$('#swGrid').addEventListener('click',function(e){
  var b=e.target.closest('[data-app]');if(!b)return;
  if(b.dataset.url){window.open(b.dataset.url,'_blank','noopener,noreferrer');closePops(null);return;}
  if(!b.dataset.mod)return;
  state.mod=b.dataset.mod;state.appName=b.dataset.app||curMod().name;state.item='dashboard';
  closePops(null);render();window.scrollTo(0,0);
  toast('Switched to '+curMod().name+' · your session stays signed in');
});
$('#nav').addEventListener('click',function(e){
  var b=e.target.closest('[data-item]');if(!b)return;
  state.item=b.dataset.item;render();closeDrawer();window.scrollTo(0,0);
});
$('#page').addEventListener('click',function(e){
  var catalogGroup=e.target.closest('[data-it-group]');if(catalogGroup){var groups=['Perangkat dan Jaringan','Akses & Akun','Aplikasi','Layanan IT Lainnya'];itSelectedGroup=groups[Number(catalogGroup.dataset.itGroup)]||null;render();window.scrollTo(0,0);return;}
  var catalogService=e.target.closest('[data-it-service]');if(catalogService){itSelectedService=IT_SERVICE_CATALOG[Number(catalogService.dataset.itService)]||null;render();window.scrollTo(0,0);return;}
  if(e.target.closest('[data-it-catalog]')){itSelectedService=null;render();window.scrollTo(0,0);return;}
  if(e.target.closest('[data-it-back-group]')){itSelectedGroup=null;itSelectedService=null;render();window.scrollTo(0,0);return;}
  var closeTicket=e.target.closest('[data-it-close-ticket]');if(closeTicket){if(!window.confirm('Tutup tiket #'+itCurrentTicketId+'? Status tiket akan menjadi Ditutup.'))return;closeTicket.disabled=true;closeTicket.textContent='Menutup tiket…';fetch('/api/glpi-portal',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+PORTAL_AUTH_TOKEN},body:JSON.stringify({action:'close-ticket',ticketId:itCurrentTicketId})}).then(function(response){return response.json().then(function(data){if(!response.ok)throw new Error(data&&data.error||'Tiket belum dapat ditutup.');return data;});}).then(function(){toast('Tiket #'+itCurrentTicketId+' ditutup');loadITTicketDetail();}).catch(function(error){toast(error instanceof Error?error.message:'Tiket belum dapat ditutup.');closeTicket.disabled=false;closeTicket.textContent='Tutup tiket';});return;}
  if(e.target.closest('[data-it-create]')){state.item='newticket';render();window.scrollTo(0,0);return;}
  if(e.target.closest('[data-it-mytickets]')){state.item='mytickets';render();window.scrollTo(0,0);return;}
  if(e.target.closest('[data-it-refresh]')){loadITMyTickets();return;}
  if(e.target.closest('[data-it-ticket]')){itCurrentTicketId=e.target.closest('[data-it-ticket]').dataset.itTicket;itTicketDetailSnapshot=null;state.item='ticketdetail';render();window.scrollTo(0,0);return;}
  if(e.target.closest('[data-it-back-list]')){state.item='mytickets';render();window.scrollTo(0,0);return;}
  if(e.target.closest('[data-it-refresh-detail]')){loadITTicketDetail();return;}
  if(e.target.closest('[data-it-kb-retry]')){loadITKnowledge('');return;}
  if(e.target.closest('[data-it-back]')){state.item='dashboard';render();window.scrollTo(0,0);return;}
  var chip=e.target.closest('#legend .chip');
  if(chip){var s=+chip.dataset.status;mstate.status=mstate.status===s?null:s;applyMosaic();return;}
  var bh=e.target.closest('.blk-h');
  if(bh){var d=+bh.dataset.dept;mstate.dept=mstate.dept===d?null:d;applyMosaic();return;}
  if(e.target.closest('#resetMap')){mstate={dept:null,status:null};applyMosaic();return;}
  var act=e.target.closest('[data-act]');
  if(act){resolve(act.dataset.rid,act.dataset.act==='ok');return;}
  if(e.target.closest('#exportBtn')){toast('Dashboard summary exported');}
  if(e.target.closest('[data-myattend]')){myAttendToggle();return;}
});
$('#page').addEventListener('submit',async function(e){
  var kbForm=e.target.closest('#glpiKnowledgeSearch');
  if(kbForm){e.preventDefault();loadITKnowledge(String(new FormData(kbForm).get('q')||''));return;}
  var followupForm=e.target.closest('#glpiFollowupForm');
  if(followupForm){
    e.preventDefault();
    var followupFeedback=$('#glpiFollowupFeedback'),followupButton=followupForm.querySelector('button[type="submit"]');
    function showFollowupFeedback(message,success){if(!followupFeedback)return;followupFeedback.hidden=false;followupFeedback.className='glpi-ticket-feedback '+(success?'success':'error');followupFeedback.textContent=message;}
    if(!PORTAL_AUTH_TOKEN){showFollowupFeedback('Sesi SSO belum siap. Muat ulang portal dan coba kembali.',false);return;}
    var followupData=new FormData(followupForm),attachment=followupData.get('file'),message=String(followupData.get('message')||''),payload={action:'followup',ticketId:itCurrentTicketId,message:message};
    if(attachment instanceof File&&attachment.size){
      if(attachment.size>2500000){showFollowupFeedback('Ukuran gambar maksimal 2,5 MB.',false);return;}
      try{payload.file={name:attachment.name,type:attachment.type,base64:await new Promise(function(resolve,reject){var reader=new FileReader();reader.onload=function(){resolve(String(reader.result||'').split(',')[1]||'');};reader.onerror=function(){reject(new Error('Gambar tidak dapat dibaca.'));};reader.readAsDataURL(attachment);})};}catch(error){showFollowupFeedback(error instanceof Error?error.message:'Gambar tidak dapat dibaca.',false);return;}
    }
    if(followupButton){followupButton.disabled=true;followupButton.textContent='Mengirim balasan…';}
    if(followupFeedback){followupFeedback.hidden=true;followupFeedback.textContent='';}
    try{
      var followupResponse=await fetch('/api/glpi-portal',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+PORTAL_AUTH_TOKEN},body:JSON.stringify(payload)}),followupResult=await followupResponse.json().catch(function(){return null;});
      if(!followupResponse.ok)throw new Error(followupResult&&followupResult.error||'Balasan belum dapat dikirim.');
      followupForm.reset();showFollowupFeedback(followupResult&&followupResult.warning||'Balasan terkirim ke GLPI.',true);toast('Balasan dikirim ke helpdesk');loadITTicketDetail();
    }catch(error){showFollowupFeedback(error instanceof Error?error.message:'Balasan belum dapat dikirim.',false);}
    finally{if(followupButton){followupButton.disabled=false;followupButton.textContent='Kirim balasan';}}
    return;
  }
  var form=e.target.closest('#glpiTicketForm');if(!form)return;
  e.preventDefault();
  var feedback=$('#glpiTicketFeedback'),button=form.querySelector('button[type="submit"]');
  function showFeedback(message,success){
    if(!feedback)return;
    feedback.hidden=false;feedback.className='glpi-ticket-feedback '+(success?'success':'error');feedback.textContent=message;
  }
  if(!PORTAL_AUTH_TOKEN){showFeedback('Sesi SSO belum siap. Muat ulang portal dan coba kembali.',false);return;}
  var formData=new FormData(form);
  var ticketDetails={};formData.forEach(function(value,key){if(key.indexOf('detail_')===0&&typeof value==='string')ticketDetails[key.slice(7)]=value.trim();});
  var payload={title:String(formData.get('title')||''),description:String(formData.get('description')||''),type:Number(formData.get('type')),urgency:Number(formData.get('urgency')),category:String(formData.get('category')||''),service:String(formData.get('service')||''),issueArea:String(formData.get('issueArea')||formData.get('application')||formData.get('service')||''),location:String(formData.get('location')||''),glpiCategoryId:Number(formData.get('glpiCategoryId')),details:ticketDetails};
  var selectedDevice=String(formData.get('device')||'');if(selectedDevice){var deviceParts=selectedDevice.split(':');payload.itemtype=deviceParts[0];payload.items_id=Number(deviceParts[1]);}
  var ticketImage=formData.get('file');
  if(ticketImage instanceof File&&ticketImage.size){
    if(ticketImage.size>2500000){showFeedback('Ukuran gambar maksimal 2,5 MB.',false);return;}
    if(!['image/jpeg','image/png','image/webp','image/gif'].includes(ticketImage.type)){showFeedback('Lampiran harus JPG, PNG, WEBP, atau GIF.',false);return;}
    try{payload.file={name:ticketImage.name,type:ticketImage.type,base64:await new Promise(function(resolve,reject){var reader=new FileReader();reader.onload=function(){resolve(String(reader.result||'').split(',')[1]||'');};reader.onerror=function(){reject(new Error('Gambar tidak dapat dibaca.'));};reader.readAsDataURL(ticketImage);})};}catch(error){showFeedback(error instanceof Error?error.message:'Gambar tidak dapat dibaca.',false);return;}
  }
  if(button){button.disabled=true;button.textContent='Mengirim tiket…';}
  if(feedback){feedback.hidden=true;feedback.textContent='';}
  try{
    var response=await fetch('/api/glpi-tickets',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+PORTAL_AUTH_TOKEN},body:JSON.stringify(payload)});
    var result=await response.json().catch(function(){return null;});
    if(!response.ok)throw new Error(result&&typeof result.error==='string'?result.error:'Endpoint helpdesk merespons HTTP '+response.status+'.');
    if(!result||result.ok!==true)throw new Error('Respons endpoint helpdesk tidak valid (HTTP '+response.status+').');
    if(!result.ticketId)throw new Error('Tiket terkirim, tetapi GLPI tidak mengembalikan nomor tiket.');
    itCurrentTicketId=String(result.ticketId);itTicketDetailSnapshot=null;itSelectedService=null;itSelectedGroup=null;state.item='ticketdetail';render();window.scrollTo(0,0);
    toast(result.warning?'Tiket #'+result.ticketId+' dibuat. '+result.warning:'Tiket #'+result.ticketId+' berhasil dibuat');
  }catch(error){
    showFeedback(error instanceof Error?error.message:'Tiket belum dapat dikirim. Coba lagi.',false);
  }finally{
    if(button){button.disabled=false;button.innerHTML=icon('check',16)+' Kirim tiket';}
  }
});
$('#page').addEventListener('change',function(e){
  var application=e.target.closest('#glpiTicketApplication'),categoryInput=$('#glpiCategoryId');if(application&&categoryInput){categoryInput.value=application.value||String(itSelectedService&&itSelectedService.glpiCategoryId||12);}
  var input=e.target.closest('#glpiTicketFile'),preview=$('#glpiTicketImagePreview');if(!input||!preview)return;
  var file=input.files&&input.files[0];if(!file){preview.hidden=true;preview.innerHTML='';return;}
  if(file.size>2500000){preview.hidden=false;preview.textContent='Ukuran gambar maksimal 2,5 MB.';input.value='';return;}
  var reader=new FileReader();reader.onload=function(){preview.hidden=false;preview.innerHTML='<img src="'+String(reader.result||'')+'" alt="Pratinjau lampiran"><span>'+esc(file.name)+'</span>';};reader.readAsDataURL(file);
});
var tip=$('#tip');
$('#page').addEventListener('mouseover',function(e){
  var d=e.target.closest('.d');if(!d){tip.hidden=true;return;}
  tip.textContent=DEPTS[+d.dataset.d][0]+' · '+STATUS[+d.dataset.s].l;tip.hidden=false;
});
$('#page').addEventListener('mousemove',function(e){
  if(tip.hidden)return;tip.style.left=(e.clientX+12)+'px';tip.style.top=(e.clientY-34)+'px';
});
$('#page').addEventListener('mouseout',function(e){if(e.target.closest('.d'))tip.hidden=true;});
$('#page').addEventListener('click',function(e){var b=e.target.closest('[data-profile-password]');if(!b)return;if(window.parent!==window)window.parent.postMessage('PID_CHANGE_PROFILE_PASSWORD',window.location.origin);});
$('#miProfile').addEventListener('click',function(){
  closePops(null);
  state.item='profile';render();window.scrollTo(0,0);
});
$('#miSso').addEventListener('click',function(){
  closePops(null);
  var profileUrl=window.frameElement&&window.frameElement.getAttribute('data-sso-profile-url');
  if(profileUrl)window.open(profileUrl,'_blank','noopener,noreferrer');
  else if(window.parent!==window)window.parent.postMessage('PID_OPEN_SSO_PROFILE',window.location.origin);
});
$('#miOut').addEventListener('click',function(){
  closePops(null);
  try{['pidc_lms_auth','pidc_lms_user','pidc_lms_acct'].forEach(function(k){localStorage.removeItem(k);sessionStorage.removeItem(k);});}catch(e){}
  goLogin();
});

window.addEventListener('message',function(event){
  if(event.origin!==window.location.origin||!event.data||typeof event.data!=='object')return;
  var msg=event.data;
  if(msg.type==='PID_PROFILE_DATA'&&msg.profile){PORTAL_PROFILE=msg.profile;if(state.item==='profile')render();}
  if(msg.type==='PID_SHOW_MY_PROFILE'){state.item='profile';render();window.scrollTo(0,0);}
  if(msg.type==='PID_PROFILE_SAVE_RESULT'){
    PROFILE_SAVING=false;
    if(msg.ok&&msg.profile){PORTAL_PROFILE=msg.profile;PORTAL_PROFILE_ERROR='';render();formAlert('#profAlert','Perubahan tersimpan di Keycloak. GLPI akan menyelaraskan nama melalui sinkronisasi otomatis.',true);toast('Profil tersimpan');}
    else{PORTAL_PROFILE_ERROR=(typeof msg.error==='string'?msg.error:(msg.error&&typeof msg.error==='object'?(msg.error.message||msg.error.detail||JSON.stringify(msg.error)):'Keycloak menolak perubahan profil.'));render();}
  }
});

var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){drawTrend();drawFlow();drawMaint();drawRenewals();drawLnHours();},120);});

/* ---------- Extended events ---------- */
function setF(el){
  var f=el.dataset&&el.dataset.f;if(!f)return;
  var p=f.split('.');if(ui[p[0]][p[1]]===el.value)return;
  ui[p[0]][p[1]]=el.value;if(ui[p[0]].page!==undefined)ui[p[0]].page=0;render();
}
$('#page').addEventListener('input',function(e){setF(e.target);});
$('#page').addEventListener('input',function(e){if(e.target&&e.target.id==='pfBio'){var count=$('#pfBioCount');if(count)count.textContent=e.target.value.length+'/160';}});
$('#page').addEventListener('change',function(e){setF(e.target);});
$('#page').addEventListener('input',function(e){
  var t=e.target;
  if(t.dataset&&t.dataset.dr&&t.type!=='radio'){draftOf(state.assignId)[t.dataset.dr]=t.value;asgBad(t.dataset.dr,false);asgHideAlert();}
});
$('#page').addEventListener('change',function(e){
  var t=e.target,d;if(!t.dataset)return;
  if(t.dataset.tnaopt){var tt=lntna(state.tnaId);if(tt&&tt.draft){tt.draft.ans[tt.draft.idx]=+t.value;tnaRefreshSide(tt);var al=$('#tnaAlert');if(al)al.hidden=true;}return;}
  if(t.dataset.dr||t.dataset.drm)asgHideAlert();
  if(t.dataset.dr&&t.type==='radio'){draftOf(state.assignId)[t.dataset.dr]=t.value;asgBad(t.dataset.dr,false);return;}
  if(t.dataset.drm){
    var key=t.dataset.drm,boxes=document.querySelectorAll('[data-drm="'+key+'"]:checked');
    draftOf(state.assignId)[key]=Array.prototype.map.call(boxes,function(b){return b.value;});asgBad(key,false);return;
  }
  if(t.dataset.photo){var pf=t.files&&t.files[0];t.value='';if(pf)handlePhoto(pf);return;}
  if(t.dataset.asgfile){
    var f=t.files&&t.files[0];if(!f)return;d=draftOf(t.dataset.asgfile);
    var okType=/\.(pdf|jpe?g|png)$/i.test(f.name),okSize=f.size<=5*1024*1024;
    if(!okType||!okSize){d.file=null;d.fileErr=!okType?'Unsupported file type. Use PDF, JPG, or PNG.':'The file is larger than 5 MB.';}
    else{d.file={name:f.name,size:f.size};d.fileErr='';}
    render();
  }
});

/* ---------- Profile page: forms ---------- */
function setPhoto(dataUrl){
  PROFILE.photo=dataUrl;
  try{if(dataUrl)localStorage.setItem('pidc_lms_photo_'+ACCT,dataUrl);else localStorage.removeItem('pidc_lms_photo_'+ACCT);}catch(e){}
  renderHeaderUser();render();
}
function handlePhoto(f){
  if(!/^image\/(jpeg|png|webp)$/.test(f.type)){toast('Unsupported file. Use a JPG, PNG, or WebP image.');return;}
  if(f.size>5*1024*1024){toast('The image is larger than 5 MB.');return;}
  var url=URL.createObjectURL(f),img=new Image();
  img.onload=function(){
    var n=256,c=document.createElement('canvas'),m=Math.min(img.width,img.height);
    c.width=c.height=n;
    c.getContext('2d').drawImage(img,(img.width-m)/2,(img.height-m)/2,m,m,0,0,n,n);
    URL.revokeObjectURL(url);
    setPhoto(c.toDataURL('image/jpeg',0.88));toast('Profile photo updated');
  };
  img.onerror=function(){URL.revokeObjectURL(url);toast('This image could not be read. Try another file.');};
  img.src=url;
}
function setFieldErr(id,on){var f=$('#f'+id);if(f)f.classList.toggle('invalid',!!on);}
function formAlert(sel,msg,ok){var a=$(sel);if(!msg){a.hidden=true;return;}if(typeof msg!=='string'){if(msg&&typeof msg==='object'){msg=msg.message||msg.error_description||msg.detail||msg.error||JSON.stringify(msg);}else{msg=String(msg);}}a.classList.toggle('ok',!!ok);a.innerHTML=icon(ok?'check':'alert',18)+'<span>'+esc(msg)+'</span>';a.hidden=false;}
function profileSaving(on){
  PROFILE_SAVING=!!on;
  var form=$('#profForm');if(!form)return;
  form.setAttribute('aria-busy',PROFILE_SAVING?'true':'false');
  form.querySelectorAll('input,textarea,button').forEach(function(el){el.disabled=PROFILE_SAVING||el.id==='pfUsername'||el.id==='pfEmail';});
  var alert=$('#profAlert');
  if(PROFILE_SAVING&&alert){alert.classList.add('ok');alert.setAttribute('role','status');alert.setAttribute('aria-live','polite');alert.innerHTML='<span class="spin profile-save-spin" aria-hidden="true"></span><span>Menyimpan perubahan ke Keycloak. Mohon tunggu dan jangan tutup halaman ini.</span>';alert.hidden=false;}
}
$('#page').addEventListener('submit',function(e){
  if(e.target.id==='profForm'){
    e.preventDefault();
    var profile={username:$('#pfUsername').value.trim(),email:$('#pfEmail').value.trim(),firstName:$('#pfFirstName').value.trim(),lastName:$('#pfLastName').value.trim(),bio:$('#pfBio').value.trim()};
    var usernameOk=profile.username.length>0,emailOk=EMAIL_RE.test(profile.email),firstOk=profile.firstName.length>0,lastOk=profile.lastName.length>0;
    setFieldErr('Username',!usernameOk);setFieldErr('Email',!emailOk);setFieldErr('FirstName',!firstOk);setFieldErr('LastName',!lastOk);
    if(!(usernameOk&&emailOk&&firstOk&&lastOk)){formAlert('#profAlert','Lengkapi semua kolom wajib dengan format yang benar.');return;}
    if(window.parent!==window){if(PROFILE_SAVING)return;PORTAL_PROFILE_ERROR='';profileSaving(true);window.parent.postMessage({type:'PID_PROFILE_SAVE',profile:profile},window.location.origin);}
    else {PORTAL_PROFILE=profile;formAlert('#profAlert','Profil diperbarui.',true);}
  }
});
document.addEventListener('click',function(e){
  var t=e.target;
  if((t=e.target.closest('[data-toast]'))){toast(t.dataset.toast);return;}
  if((t=e.target.closest('#dClose'))||e.target.id==='dscrim'){closePanel();return;}
  if((t=e.target.closest('[data-tab]'))){
    var s=t.dataset.tab,i=s.indexOf(':'),k=s.slice(0,i).split('.'),v=s.slice(i+1);
    ui[k[0]][k[1]]=v;if(ui[k[0]].page!==undefined)ui[k[0]].page=0;render();return;
  }
  if((t=e.target.closest('[data-pg]'))){var q=t.dataset.pg.split(':');ui[q[0]].page+=+q[1];render();return;}
  if((t=e.target.closest('[data-box]'))){var b=t.dataset.box;ui.perf.box=(b===''||ui.perf.box===b)?'':b;ui.perf.page=0;render();return;}
  if((t=e.target.closest('[data-mv]'))){
    if(t.disabled)return;
    var m=t.dataset.mv.split(':'),c=CAND.filter(function(x){return x.id===m[0];})[0],ns=c.stage+ +m[1];
    if(ns<0||ns>4)return;c.stage=ns;render();
    toast(c.name+' moved to the '+STAGES[ns]);return;
  }
  if((t=e.target.closest('[data-enr]'))){
    var co=COURSES.filter(function(x){return x.id===t.dataset.enr;})[0];
    co.me=!co.me;co.filled+=co.me?1:-1;render();
    toast(co.me?'Enrolled: '+co.title:'Enrollment canceled: '+co.title);return;
  }
  if((t=e.target.closest('[data-goto]'))){
    var g=t.dataset.goto.split(':'),emp=EMP.filter(function(x){return x.id===g[1];})[0];
    closePanel();state.item=g[0];ui.pay.q=emp?emp.name:'';ui.pay.page=0;render();window.scrollTo(0,0);return;
  }
  if((t=e.target.closest('[data-emp]'))&&!e.target.closest('[data-act]')){openEmp(t.dataset.emp);return;}
  if((t=e.target.closest('[data-slip]'))){openSlip(t.dataset.slip);return;}
  if((t=e.target.closest('[data-unit]'))){openUnit(t.dataset.unit);return;}
});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape')closePanel();
  if(e.key==='Enter'&&e.target.matches&&e.target.matches('tr.click'))e.target.click();
});
$('#nav').addEventListener('click',closePanel);
$('#swGrid').addEventListener('click',closePanel);

/* ---------- Warehouse events ---------- */
document.addEventListener('click',function(e){
  var t;
  if((t=e.target.closest('[data-zone]'))){ui.wh.zone=(ui.wh.zone===t.dataset.zone)?'':t.dataset.zone;render();return;}
  if((t=e.target.closest('[data-wgo]'))){
    var p=t.dataset.wgo.split(':'),m=WGO[p[0]];
    ui[m[0]][m[1]]=p.slice(2).join(':');if(ui[m[0]].page!==undefined)ui[m[0]].page=0;
    state.item=p[0];render();window.scrollTo(0,0);return;
  }
  if((t=e.target.closest('[data-adv]'))){
    var a=t.dataset.adv.split(':'),inPanel=!!t.closest('#drawer');
    if(inPanel)closePanel();
    if(a[0]==='in')advIn(a[1]);else advOut(a[1]);return;
  }
  if((t=e.target.closest('[data-vr]'))){var v=t.dataset.vr.split(':');resVar(v[0],v[1]==='ok');return;}
  if(e.target.closest('button'))return;
  if((t=e.target.closest('[data-sku]'))){openSku(t.dataset.sku);return;}
  if((t=e.target.closest('[data-gr]'))){openGR(t.dataset.gr);return;}
  if((t=e.target.closest('[data-do]'))){openDO(t.dataset.do);return;}
});
$('#page').addEventListener('mouseover',function(e){var b=e.target.closest('.bn');if(!b)return;tip.textContent=b.dataset.tip;tip.hidden=false;});
$('#page').addEventListener('mouseout',function(e){if(e.target.closest('.bn'))tip.hidden=true;});


/* ---------- Asset Management events ---------- */
document.addEventListener('click',function(e){
  var t;
  if((t=e.target.closest('[data-lc]'))){var n=+t.dataset.lc;ui.adb.stage=ui.adb.stage===n?null:n;render();return;}
  if((t=e.target.closest('[data-lcc]'))){ui.adb.cls=ui.adb.cls===t.dataset.lcc?'':t.dataset.lcc;render();return;}
  if(e.target.closest('[data-lcreset]')){ui.adb.cls='';ui.adb.stage=null;render();return;}
  if(e.target.closest('[data-clrflag]')){ui.ast.flag='';ui.ast.page=0;render();return;}
  if((t=e.target.closest('[data-wo]'))){if(t.closest('#drawer'))closePanel();advWO(t.dataset.wo);return;}
  if((t=e.target.closest('[data-ln]'))){var l=t.dataset.ln.split(':');actLoan(l[0],l[1]);return;}
  if((t=e.target.closest('[data-au]'))){var a=t.dataset.au.split(':');resAud(a[0],a[1]==='ok');return;}
  if(e.target.closest('button'))return;
  if((t=e.target.closest('[data-ast]'))){openAsset(t.dataset.ast);return;}
  if((t=e.target.closest('[data-wod]'))){openWO(t.dataset.wod);return;}
});
$('#page').addEventListener('mouseover',function(e){var b=e.target.closest('.ld');if(!b)return;tip.textContent=b.dataset.tip;tip.hidden=false;});
$('#page').addEventListener('mouseout',function(e){if(e.target.closest('.ld'))tip.hidden=true;});


/* ---------- Legal & Compliance events ---------- */
document.addEventListener('click',function(e){
  var t;
  if((t=e.target.closest('[data-cst]'))){ui.ldb.status=ui.ldb.status===t.dataset.cst?'':t.dataset.cst;render();return;}
  if((t=e.target.closest('[data-lccc]'))){ui.ldb.cls=ui.ldb.cls===t.dataset.lccc?'':t.dataset.lccc;render();return;}
  if(e.target.closest('[data-lcr2]')){ui.ldb.cls='';ui.ldb.status='';render();return;}
  if(e.target.closest('[data-clrdflag]')){ui.doc.flag='';ui.doc.page=0;render();return;}
  if((t=e.target.closest('[data-ctra]'))){if(t.closest('#drawer'))closePanel();var a=t.dataset.ctra.split(':');advContract(a[0],a[1]);return;}
  if((t=e.target.closest('[data-find]'))){var f=t.dataset.find.split(':');resFind(f[0],f[1]==='ok');return;}
  if(e.target.closest('button'))return;
  if((t=e.target.closest('[data-ctr]'))){openContract(t.dataset.ctr);return;}
  if((t=e.target.closest('[data-doc]'))){openDoc(t.dataset.doc);return;}
});


/* ---------- Learning module events ---------- */
document.addEventListener('click',function(e){
  var t;
  if((t=e.target.closest('[data-lngo]'))){state.item=t.dataset.lngo;render();window.scrollTo(0,0);return;}
  if((t=e.target.closest('[data-goln]'))){state.item=t.dataset.goln;render();window.scrollTo(0,0);return;}
  if((t=e.target.closest('[data-lnenroll]'))){
    if(t.disabled)return;var cid=t.dataset.lnenroll,c=lncourse(cid);if(!c)return;
    if(t.closest('#drawer'))closePanel();
    var nid='E'+(LNENR.length+1);
    LNENR.push({id:nid,cid:cid,status:'Not started',doneN:0,enrolled:NOW,due:null,done:null,src:'Self-enrolled'});
    toast('Enrolled: '+c.title);
    openPlayer(nid);return;
  }
  if((t=e.target.closest('[data-lnplay]'))){if(t.closest('#drawer'))closePanel();openPlayer(t.dataset.lnplay);return;}
  if((t=e.target.closest('[data-asgopen]'))){openAsg(t.dataset.asgopen);return;}
  if((t=e.target.closest('[data-asgadv]'))){asgAdvance(t.dataset.asgadv);return;}
  if((t=e.target.closest('[data-asgsim]'))){asgSimulate(t.dataset.asgsim);return;}
  if((t=e.target.closest('[data-asgcert]'))){asgSubmitCert(t.dataset.asgcert);return;}
  if((t=e.target.closest('[data-asgeval]'))){asgSubmitEval(t.dataset.asgeval);return;}
  if((t=e.target.closest('[data-asgrep]'))){asgSubmitRep(t.dataset.asgrep);return;}
  if((t=e.target.closest('[data-asgrm]'))){var dr=draftOf(t.dataset.asgrm);dr.file=null;dr.fileErr='';render();return;}
  if((t=e.target.closest('[data-lndone]'))){markLessonDone(t.dataset.lndone);return;}
  if((t=e.target.closest('[data-photorm]'))){setPhoto(null);toast('Profile photo removed');return;}
  if((t=e.target.closest('[data-lnprofreset]'))){render();toast('Changes discarded');return;}
  if((t=e.target.closest('[data-lnprofnotif]'))){
    document.querySelectorAll('[data-notif]').forEach(function(c){NOTIF[c.dataset.notif]=c.checked;});
    toast('Notification preferences saved');return;
  }
  if((t=e.target.closest('[data-lnjump]'))){state.lessonIdx=+t.dataset.lnjump;render();window.scrollTo(0,0);return;}
  if((t=e.target.closest('[data-tnas]'))){startTna(t.dataset.tnas);return;}
  if((t=e.target.closest('[data-tnaplay]'))){startTna(t.dataset.tnaplay);return;}
  if((t=e.target.closest('[data-tnares]'))){openTna('tnaresult',t.dataset.tnares);return;}
  if(e.target.closest('[data-tnaexit]')){state.item=state.tnaFrom||'tnacycle';toast('Progress saved');render();window.scrollTo(0,0);return;}
  if(e.target.closest('[data-tnaprev]')){tnaMove(-1);return;}
  if(e.target.closest('[data-tnanext]')){tnaMove(1);return;}
  if((t=e.target.closest('[data-tnago]'))){tnaGo(+t.dataset.tnago);return;}
  if((t=e.target.closest('[data-tnasubmit]'))){tnaSubmit(t.dataset.tnasubmit);return;}
  if((t=e.target.closest('[data-lncert]'))){openCert(t.dataset.lncert);return;}
  if(e.target.closest('button'))return;
  if((t=e.target.closest('[data-asg]'))){openAsg(t.dataset.asg);return;}
  if((t=e.target.closest('[data-lnenr]'))){openEnr(t.dataset.lnenr);return;}
  if((t=e.target.closest('[data-lneval]'))){openEval(t.dataset.lneval);return;}
  if((t=e.target.closest('[data-lnreq]'))){openReq(t.dataset.lnreq);return;}
});

renderHeaderUser();
if(IS_GUEST){
  document.body.classList.add('is-guest');
  $('#miProfile').parentNode.hidden=true;
  $('#bellBtn').parentNode.hidden=true;
  $('#swBtn').disabled=true;
  $('#swBtn').style.opacity='.5';
  $('#swBtn').style.pointerEvents='none';
}
render();
})();
