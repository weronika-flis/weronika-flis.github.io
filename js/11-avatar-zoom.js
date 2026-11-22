(()=>{const a=document.querySelector('.avwrap');if(!a)return;let z=1;const set=v=>{z=Math.min(3,Math.max(.6,v));a.style.setProperty('--z',z.toFixed(3));a.classList.toggle('moved',z!==1||a.classList.contains('moved'))};
a.addEventListener('wheel',e=>{e.preventDefault();a.classList.add('zooming');set(z*Math.exp(-e.deltaY*.0015));clearTimeout(a._zt);a._zt=setTimeout(()=>a.classList.remove('zooming'),150)},{passive:false});
const pts=new Map();let d0=0,z0=1;
a.addEventListener('pointerdown',e=>{pts.set(e.pointerId,e);if(pts.size===2){const[p,q]=[...pts.values()];d0=Math.hypot(p.clientX-q.clientX,p.clientY-q.clientY);z0=z}});
a.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;pts.set(e.pointerId,e);if(pts.size===2&&d0){const[p,q]=[...pts.values()];set(z0*Math.hypot(p.clientX-q.clientX,p.clientY-q.clientY)/d0)}});
const up=e=>{pts.delete(e.pointerId);if(pts.size<2)d0=0};a.addEventListener('pointerup',up);a.addEventListener('pointercancel',up);
a.addEventListener('dblclick',()=>{z=1;a.style.setProperty('--z','1')});})();
