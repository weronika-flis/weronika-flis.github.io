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

/* ---------- anatomical human skeleton: skull, jaw, cervical spine & thorax ---------- */
const skull=el('svg',{class:'skull',viewBox:'-130 -170 260 445'},host);

/* bone wash + a very soft halo */
const defs=el('defs',{},skull);
const bone=el('linearGradient',{id:'skBone',x1:'0',y1:'0',x2:'0.9',y2:'1'},defs);
el('stop',{offset:'0','class':'sk-g0'},bone);
el('stop',{offset:'.55','class':'sk-g1'},bone);
el('stop',{offset:'1','class':'sk-g2'},bone);
el('ellipse',{cx:'0',cy:'-58',rx:'114',ry:'124',class:'sk-halo'},skull);

/* neurocranium — rounded vault tapering into the temples */
el('path',{d:'M0,-150 C46,-150 82,-124 96,-80 C106,-48 102,-14 86,4 C78,13 68,17 56,19 L-56,19 C-68,17 -78,13 -86,4 C-102,-14 -106,-48 -96,-80 C-82,-124 -46,-150 0,-150 Z',class:'sk-plate'},skull);

/* ---- left half of the face; mirrored for perfect anatomical symmetry ---- */
const half=el('g',{id:'skHalf'},skull);

// supraorbital ridge + notch (heavy brow, not an owl's "ears")
el('path',{d:'M-84,-45 C-66,-59 -32,-59 -12,-46',class:'sk-line brow'},half);
el('path',{d:'M-48,-54 q5,-7 11,-1',class:'sk-fine'},half);

// orbit: angular quadrilateral with a sloping roof
el('path',{d:'M-20,-42 C-36,-50 -60,-48 -72,-36 C-77,-28 -73,-15 -66,-8 C-54,-2 -34,-2 -24,-7 C-18,-12 -16,-32 -20,-42 Z',class:'sk-plate orbit'},half);
el('path',{d:'M-69,-34 C-57,-44 -36,-45 -23,-38',class:'sk-fine'},half);

// zygomatic bone + arch swept backwards and down
el('path',{d:'M-72,-36 C-84,-28 -88,-8 -79,8 C-71,21 -56,22 -46,14 L-52,-2 Z',class:'sk-plate'},half);
el('path',{d:'M-82,2 C-96,4 -104,-4 -104,-16',class:'sk-line'},half);
el('path',{d:'M-67,10 C-60,15 -54,15 -48,10',class:'sk-fine'},half);

// infraorbital foramen and canal
el('circle',{cx:-40,cy:2,r:2.6,class:'sk-dot'},half);
el('path',{d:'M-40,5 l0,8',class:'sk-fine'},half);

// maxilla / upper alveolar process
el('path',{d:'M-56,19 C-58,38 -52,60 -42,74 C-34,84 -18,90 0,90 L0,19 Z',class:'sk-plate'},half);

// facial sutures and quiet shading hatch
el('path',{d:'M-86,-72 C-74,-78 -62,-78 -52,-71',class:'sk-suture'},half);
el('path',{d:'M-77,-9 C-71,4 -64,12 -56,19',class:'sk-suture'},half);
for(let i=0;i<6;i++){const y=-102+i*13;el('line',{x1:-94+i,y1:y,x2:-85+i,y2:y+6,class:'sk-fine'},half)}

// upper dentition — 16 individually shaped teeth following the arch
const upX=[6,16,25,33,40,46,51,55],upW=[11,10,9,9,8,8,7,7],upH=[15,16,16,15,14,13,13,12];
for(let i=0;i<8;i++){
  const cx=-upX[i],w=upW[i],h=upH[i],yb=90-0.006*cx*cx;
  el('path',{d:`M${cx-w/2},${yb-h} Q${cx},${yb-h-2} ${cx+w/2},${yb-h} L${cx+w/2-1},${yb} Q${cx},${yb+2} ${cx-w/2+1},${yb} Z`,class:'sk-tooth'},half);
  el('line',{x1:cx,y1:yb-h+4,x2:cx,y2:yb-3,class:'sk-fine'},half);
}

// mandible half — condyle, ramus, angle, body and chin
el('path',{d:'M0,110 C-14,110 -30,104 -44,92 C-60,78 -70,58 -73,36 L-77,4 C-79,-6 -76,-12 -70,-10 C-65,-8 -64,-2 -64,6 L-61,36 C-59,56 -50,72 -36,82 C-24,91 -12,95 0,95 Z',class:'sk-plate'},half);
el('path',{d:'M-64,-2 C-60,-12 -52,-14 -48,-8 L-56,14 Z',class:'sk-plate'},half); // coronoid process
el('circle',{cx:-38,cy:84,r:2.4,class:'sk-dot'},half); // mental foramen
const loX=[6,16,25,33,40,46,51,55],loW=[10,10,9,9,8,8,7,7],loH=[14,15,15,14,13,13,12,12];
for(let i=0;i<8;i++){
  const cx=-loX[i],w=loW[i],h=loH[i],yt=95-0.006*cx*cx;
  el('path',{d:`M${cx-w/2},${yt} Q${cx},${yt-2} ${cx+w/2},${yt} L${cx+w/2-1},${yt+h} Q${cx},${yt+h+2} ${cx-w/2+1},${yt+h} Z`,class:'sk-tooth'},half);
}

el('use',{href:'#skHalf',transform:'scale(-1,1)'},skull);

/* central anatomy */
el('path',{d:'M-7,-16 C-10,-6 -13,8 -16,20 C-14,26 -8,28 0,28 C8,28 14,26 16,20 C13,8 10,-6 7,-16 C4,-20 -4,-20 -7,-16 Z',class:'sk-socket'},skull);
el('path',{d:'M0,-16 L0,27',class:'sk-fine'},skull);
el('path',{d:'M-8,4 C-12,8 -12,14 -9,18 M8,4 C12,8 12,14 9,18',class:'sk-fine'},skull);
el('path',{d:'M0,-149 L0,-96 M0,-95 L0,-58',class:'sk-suture'},skull);
el('path',{d:'M-90,-90 L-76,-98 L-62,-92 L-46,-100 L-30,-94 L-14,-101 L0,-95 L14,-101 L30,-94 L46,-100 L62,-92 L76,-98 L90,-90',class:'sk-suture'},skull);
el('path',{d:'M-9,108 L0,102 L9,108',class:'sk-fine'},skull); // mental protuberance

/* cervical vertebrae */
for(let i=0;i<3;i++){
  const y=124+i*13;
  el('path',{d:`M-13,${y} C-19,${y+3} -18,${y+10} -11,${y+12} C-4,${y+14} 4,${y+14} 11,${y+12} C18,${y+10} 19,${y+3} 13,${y} C6,${y-3} -6,${y-3} -13,${y} Z`,class:'sk-plate'},skull);
}

/* clavicles and upper rib cage, fading into the page */
const torso=el('g',{id:'skTorso'},skull);
el('path',{d:'M-6,150 C-30,140 -60,142 -84,154 C-92,158 -98,166 -100,174',class:'sk-line'},torso);
for(let i=0;i<4;i++){
  const y=164+i*18;
  el('path',{d:`M-12,${y} C-42,${y-10} -72,${y-2} -80,${y+16} C-70,${y+28} -40,${y+26} -10,${y+18}`,class:'sk-rib'},torso);
}
el('use',{href:'#skTorso',transform:'scale(-1,1)'},skull);
el('path',{d:'M0,158 C-7,158 -9,166 -8,176 L-6,208 C-5,214 5,214 6,208 L8,176 C9,166 7,158 0,158 Z',class:'sk-plate'},skull);

document.body.prepend(host);

/* grow tree on scroll */
let raf=0;function grow(){raf=0;
  const max=document.documentElement.scrollHeight-innerHeight,p=RM?1:Math.min(1,.12+.95*scrollY/Math.max(1,max));
  for(const q of parts){const k=Math.max(0,Math.min(1,(p-q.s)/(q.e-q.s)));
    if(q.type==='br')q.n.style.strokeDashoffset=1-k;else q.n.style.transform=`scale(${k})`}}
addEventListener('scroll',()=>{raf||(raf=requestAnimationFrame(grow))},{passive:true});
addEventListener('resize',grow);grow();
})();
