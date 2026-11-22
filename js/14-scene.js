/* Background scene: phylogenetic/evolutionary tree growing on scroll +
   anthropometric & cranial geometric morphometrics landmark coordinate ring */
(()=>{const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,NS='http://www.w3.org/2000/svg';
const host=document.createElement('div');host.id='scene';host.setAttribute('aria-hidden','true');
const el=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};

/* ---------- tree ---------- */
const tree=el('svg',{class:'tree',viewBox:'0 0 600 1000',preserveAspectRatio:'xMidYMax meet'},host);
let seed=19;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
const parts=[];
function branch(x,y,ang,len,w,d,t0){
  const x2=x+Math.cos(ang)*len,y2=y-Math.sin(ang)*len,bx=(x+x2)/2+(rnd()-.5)*len*.25,by=(y+y2)/2;
  const t1=t0+.11;
  const p=el('path',{d:`M${x} ${y} Q${bx} ${by} ${x2} ${y2}`,'stroke-width':w,pathLength:1,class:'br'},tree);
  parts.push({n:p,s:t0,e:t1,type:'br'});
  if(d===0||len<14){
    const c=el('circle',{cx:x2,cy:y2,r:7+rnd()*9,class:rnd()<.3?'bud':'lf'},tree);
    parts.push({n:c,s:t1,e:t1+.06,type:'lf'});return}
  const n=d>4?2:2+(rnd()<.4);
  for(let i=0;i<n;i++){const spread=.35+rnd()*.35,a=ang+(i-(n-1)/2)*spread*1.4+(rnd()-.5)*.2;
    branch(x2,y2,a,len*(.68+rnd()*.12),w*.68,d-1,t1-.02)}
}
branch(300,1000,Math.PI/2,165,20,7,0);
const maxE=Math.max(...parts.map(p=>p.e));parts.forEach(p=>{p.s/=maxE;p.e/=maxE});

/* ---------- anthropometric coordinate & morphometric landmark ring ---------- */
const ring=el('svg',{class:'pet',viewBox:'-110 -110 220 220'},host);
const rot=el('g',{class:'rot'},ring);
for(let i=0;i<36;i++){const a=i/36*360;el('rect',{x:-2,y:-95,width:4,height:i%3===0?14:8,rx:1,transform:`rotate(${a})`,class:'det'},rot)}
el('circle',{r:78,class:'bore'},ring);
el('circle',{r:52,class:'bore',style:'opacity:0.35;stroke-dasharray:3 4'},ring);
const lors=el('g',{},ring);
function fire(){
  const a=Math.random()*Math.PI*2,r1=22+Math.random()*48,r2=22+Math.random()*48;
  const x1=Math.cos(a)*r1,y1=Math.sin(a)*r1;
  const a2=a+Math.PI*(0.55+Math.random()*0.9);
  const x2=Math.cos(a2)*r2,y2=Math.sin(a2)*r2;
  const l=el('line',{x1,y1,x2,y2,class:'lor'},lors);
  el('circle',{cx:x1,cy:y1,r:2.4,class:'ann'},lors);
  el('circle',{cx:x2,cy:y2,r:2.4,class:'ann'},lors);
  setTimeout(()=>{
    for(let i=0;i<3;i++){if(lors.firstChild)lors.removeChild(lors.firstChild)}
  },1800);
}

document.body.prepend(host);

/* grow on scroll */
let raf=0;function grow(){raf=0;
  const max=document.documentElement.scrollHeight-innerHeight,p=RM?1:Math.min(1,.12+.95*scrollY/Math.max(1,max));
  for(const q of parts){const k=Math.max(0,Math.min(1,(p-q.s)/(q.e-q.s)));
    if(q.type==='br')q.n.style.strokeDashoffset=1-k;else q.n.style.transform=`scale(${k})`}}
addEventListener('scroll',()=>{raf||(raf=requestAnimationFrame(grow))},{passive:true});
addEventListener('resize',grow);grow();
if(!RM){fire();setInterval(()=>{if(!document.hidden)fire()},1100)}else{for(let i=0;i<5;i++)fire()}
})();
