/* Background scene: phylogenetic/evolutionary tree growing on scroll +
   full-body skeleton cut-out (forensic anthropology & osteology motif) */
(()=>{const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,NS='http://www.w3.org/2000/svg';
const host=document.createElement('div');host.id='scene';host.setAttribute('aria-hidden','true');
const el=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};

/* ---------- tree (right side, grows on scroll) ---------- */
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

/* ---------- full-body skeleton cut-out (skeleton_with_no_bg.png) ---------- */
const skeleton=document.createElement('img');
skeleton.className='skeleton';
skeleton.src='skeleton_with_no_bg.png';
skeleton.alt='';
skeleton.decoding='async';
skeleton.draggable=false;
host.appendChild(skeleton);

document.body.prepend(host);

/* grow tree on scroll */
let raf=0;function grow(){raf=0;
  const max=document.documentElement.scrollHeight-innerHeight,p=RM?1:Math.min(1,.12+.95*scrollY/Math.max(1,max));
  for(const q of parts){const k=Math.max(0,Math.min(1,(p-q.s)/(q.e-q.s)));
    if(q.type==='br')q.n.style.strokeDashoffset=1-k;else q.n.style.transform=`scale(${k})`}}
addEventListener('scroll',()=>{raf||(raf=requestAnimationFrame(grow))},{passive:true});
addEventListener('resize',grow);grow();
})();
