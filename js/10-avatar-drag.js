(()=>{const a=document.querySelector('.avwrap');if(!a)return;const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
let sx,sy,ox=0,oy=0,x=0,y=0,drag=false,vx=0,vy=0,lt=0,lx=0,ly=0,raf=0;
const put=()=>{a.style.setProperty('--dx',x+'px');a.style.setProperty('--dy',y+'px')};
a.addEventListener('pointerdown',e=>{if(e.button)return;cancelAnimationFrame(raf);drag=true;a.setPointerCapture(e.pointerId);sx=e.clientX;sy=e.clientY;ox=x;oy=y;lx=e.clientX;ly=e.clientY;lt=performance.now();vx=vy=0;a.classList.remove('back');a.classList.add('dragging')});
a.addEventListener('pointermove',e=>{if(!drag)return;const t=performance.now(),dt=Math.max(1,t-lt);vx=.7*vx+.3*(e.clientX-lx)/dt*16;vy=.7*vy+.3*(e.clientY-ly)/dt*16;lx=e.clientX;ly=e.clientY;lt=t;
 x=ox+e.clientX-sx;y=oy+e.clientY-sy;put();a.style.rotate=(-3+Math.max(-15,Math.min(15,vx*1.2)))+'deg';if(Math.hypot(x,y)>8)a.classList.add('moved')});
function fly(){vx*=.95;vy*=.95;x+=vx;y+=vy;const r=a.getBoundingClientRect(),top=64;
 if(r.left<0&&vx<0){vx=-vx*.6;x-=r.left}if(r.right>innerWidth&&vx>0){vx=-vx*.6;x-=r.right-innerWidth}
 if(r.top<top&&vy<0){vy=-vy*.6;y+=top-r.top}if(r.bottom>innerHeight&&vy>0){vy=-vy*.6;y-=r.bottom-innerHeight}
 put();a.style.rotate=(-3+vx*.8)+'deg';if(Math.hypot(vx,vy)>.3)raf=requestAnimationFrame(fly);else a.style.rotate=''}
const end=()=>{if(!drag)return;drag=false;a.classList.remove('dragging');if(!RM&&performance.now()-lt<80&&Math.hypot(vx,vy)>2)raf=requestAnimationFrame(fly);else a.style.rotate=''};
a.addEventListener('pointerup',end);a.addEventListener('pointercancel',end);
a.addEventListener('dblclick',()=>{cancelAnimationFrame(raf);x=y=0;a.classList.add('back');put();a.style.rotate='';a.classList.remove('moved')});
/* 3D parallax tilt from header */
const hero=document.querySelector('.hero'),img=a.querySelector('.avatar');
if(!RM&&matchMedia('(pointer:fine)').matches)hero.addEventListener('pointermove',e=>{if(drag||a.classList.contains('moved'))return;const r=hero.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
 img.style.transform=`perspective(800px) rotateY(${(px*14).toFixed(2)}deg) rotateX(${(-py*12).toFixed(2)}deg)`});
hero.addEventListener('pointerleave',()=>{img.style.transform=''});
})();
