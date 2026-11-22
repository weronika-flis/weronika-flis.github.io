(()=>{const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,$=q=>document.querySelector(q),mail='weronika.flis@doctoral.uj.edu.pl';
const toast=$('#toast');function say(m){toast.textContent=m;toast.classList.add('show');clearTimeout(say.t);say.t=setTimeout(()=>toast.classList.remove('show'),2200)}
function copy(){(navigator.clipboard?navigator.clipboard.writeText(mail):Promise.reject()).then(()=>say('Email copied to clipboard'),()=>say(mail))}
const copyBtn=$('#copymail');if(copyBtn)copyBtn.onclick=copy;
/* Human biological dynamics counter: ~1.2 heartbeats/s, ~2.5 million erythrocyte turnover/s in bone marrow */
const t0=performance.now(),k=$('#k40'),q=$('#pos');
if(k&&q){setInterval(()=>{const s=(performance.now()-t0)/1000;k.textContent=Math.round(s*1.2).toLocaleString();q.textContent=(s*2.5).toFixed(1)},250)}
/* cursor trail in hero */
const cv=$('#trail'),hero=$('.hero');if(!RM&&cv&&hero&&matchMedia('(pointer:fine)').matches){const c=cv.getContext('2d');let W,H,pts=[],run=false,col='#3fbf9a';
 const upCol=()=>{col=getComputedStyle(document.body).getPropertyValue('--accent').trim()||col};upCol();setInterval(upCol,600);
 function size(){const d=Math.min(devicePixelRatio||1,2);W=hero.clientWidth;H=hero.clientHeight;cv.width=W*d;cv.height=H*d;c.setTransform(d,0,0,d,0,0)}size();addEventListener('resize',size);
 hero.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();pts.push({x:e.clientX-r.left,y:e.clientY-r.top,a:1});if(pts.length>18)pts.shift();if(!run){run=true;requestAnimationFrame(draw)}},{passive:true});
 function draw(){c.clearRect(0,0,W,H);c.strokeStyle=col;c.lineCap='round';c.lineWidth=1.6;
  for(let i=1;i<pts.length;i++){const p=pts[i],q=pts[i-1];c.globalAlpha=p.a*.6;c.beginPath();c.moveTo(q.x,q.y);c.lineTo(p.x,p.y);c.stroke()}
  c.globalAlpha=1;pts.forEach(p=>p.a*=.8);pts=pts.filter(p=>p.a>.05);
  if(pts.length>1)requestAnimationFrame(draw);else{run=false;pts=[];c.clearRect(0,0,W,H)}}}
/* shortcuts */
const dlg=$('#keys'),ids=['research','publications','talks','background','skills','projects','contact'];
addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey||/input|textarea/i.test(e.target.tagName))return;
 if(e.key==='?'){if(dlg){dlg.open?dlg.close():dlg.showModal()}return}if(dlg&&dlg.open)return;
 if(/^[1-7]$/.test(e.key)){const target=document.getElementById(ids[e.key-1]);if(target)target.scrollIntoView({behavior:RM?'auto':'smooth'})}
 else if(e.key==='t'){const tb=$('#theme');if(tb)tb.click()}else if(e.key==='e')copy();else if(e.key==='c')open('cv.pdf','_blank')});
/* console easter egg */
console.log('%cHello, curious researcher.','font:600 16px "DM Sans",sans-serif;color:#3fbf9a');
console.log('%cLooking for a collaborator in biological anthropology, 3D facial reconstruction, or forensic osteology?\nWrite to '+mail+' (or press ? on the page for keyboard shortcuts)','font:13px "DM Sans",sans-serif');
})();
