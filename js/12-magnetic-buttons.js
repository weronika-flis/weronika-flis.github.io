(()=>{const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* magnetic buttons */
if(!RM&&matchMedia('(pointer:fine)').matches){const bs=[...document.querySelectorAll('.btn')];
 addEventListener('pointermove',e=>{bs.forEach(b=>{const r=b.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=e.clientX-cx,dy=e.clientY-cy,d=Math.hypot(dx,dy),R=Math.max(r.width,r.height)*.9;
  if(d<R){const k=(1-d/R)*.35;b.style.setProperty('--mx',(dx*k).toFixed(1)+'px');b.style.setProperty('--my',(dy*k).toFixed(1)+'px')}else if(b.style.getPropertyValue('--mx')){b.style.removeProperty('--mx');b.style.removeProperty('--my')}})},{passive:true})}
})();
