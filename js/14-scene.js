/* Background scene: phylogenetic/evolutionary tree growing on scroll +
   anatomical skull (forensic anthropology & osteology motif) */
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

/* ---------- anatomical skull (left side) ---------- */
const skull=el('svg',{class:'skull',viewBox:'-115 -145 230 270'},host);

// cranium outline
el('ellipse',{cx:'0',cy:'-50',rx:'100',ry:'92',class:'sk-bone','stroke-width':'3'},skull);

// zygomatic arch hints (cheekbones)
el('path',{d:'M-100,-20 Q-115,10 -95,38 Q-80,20 -72,5',class:'sk-bone','stroke-width':'2'},skull);
el('path',{d:'M100,-20 Q115,10 95,38 Q80,20 72,5',class:'sk-bone','stroke-width':'2'},skull);

// lower face / maxilla region
el('path',{d:'M-72,5 Q-68,55 -50,80 Q-25,100 0,102 Q25,100 50,80 Q68,55 72,5',class:'sk-bone','stroke-width':'2.5'},skull);

// left orbit (eye socket)
el('ellipse',{cx:'-38',cy:'-38',rx:'30',ry:'24',class:'sk-socket'},skull);
// right orbit
el('ellipse',{cx:'38',cy:'-38',rx:'30',ry:'24',class:'sk-socket'},skull);

// nasal aperture (pyriform)
el('path',{d:'M-15,-5 Q-18,16 -12,30 Q-6,38 0,40 Q6,38 12,30 Q18,16 15,-5 Q8,-14 0,-16 Q-8,-14 -15,-5Z',class:'sk-socket'},skull);

// coronal suture
el('path',{d:'M-78,-105 Q-50,-118 -20,-120 Q0,-122 20,-120 Q50,-118 78,-105',class:'sk-suture','stroke-width':'1.5'},skull);
// sagittal suture
el('path',{d:'M0,-122 Q4,-85 2,-55 Q-2,-30 0,-16',class:'sk-suture','stroke-width':'1.5'},skull);
// lambdoid suture hint
el('path',{d:'M-78,-105 Q-95,-75 -88,-50',class:'sk-suture','stroke-width':'1.2'},skull);
el('path',{d:'M78,-105 Q95,-75 88,-50',class:'sk-suture','stroke-width':'1.2'},skull);
// squamosal suture
el('path',{d:'M-100,-20 Q-96,-50 -84,-70',class:'sk-suture','stroke-width':'1.2'},skull);
el('path',{d:'M100,-20 Q96,-50 84,-70',class:'sk-suture','stroke-width':'1.2'},skull);

// teeth — upper row (5 teeth)
const toothData=[
  {x:-46,y:84,w:14,h:17},
  {x:-30,y:86,w:16,h:19},
  {x:-11,y:88,w:22,h:21},
  {x:14, y:86,w:16,h:19},
  {x:32, y:84,w:14,h:17}
];
toothData.forEach(t=>{el('rect',{x:t.x,y:t.y,width:t.w,height:t.h,rx:'4',class:'sk-tooth'},skull)});

// inter-tooth lines
[-15,-0].forEach(x=>el('line',{x1:x,y1:86,x2:x,y2:106,class:'sk-bone','stroke-width':'1'},skull));

document.body.prepend(host);

/* grow tree on scroll */
let raf=0;function grow(){raf=0;
  const max=document.documentElement.scrollHeight-innerHeight,p=RM?1:Math.min(1,.12+.95*scrollY/Math.max(1,max));
  for(const q of parts){const k=Math.max(0,Math.min(1,(p-q.s)/(q.e-q.s)));
    if(q.type==='br')q.n.style.strokeDashoffset=1-k;else q.n.style.transform=`scale(${k})`}}
addEventListener('scroll',()=>{raf||(raf=requestAnimationFrame(grow))},{passive:true});
addEventListener('resize',grow);grow();
})();
