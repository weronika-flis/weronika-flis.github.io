/* Contact unseal — drag the bone tiles off the contact details to reveal them. */
(()=>{
  const panel=document.querySelector('#contact .collab > div:first-child');
  if(!panel)return;

  const toast=document.getElementById('toast');
  const say=m=>{if(!toast)return;toast.textContent=m;toast.classList.add('show');clearTimeout(say.t);say.t=setTimeout(()=>toast.classList.remove('show'),2400)};

  const ICON='<svg viewBox="0 0 40 16" aria-hidden="true" fill="currentColor"><circle cx="7" cy="4" r="4"/><circle cx="7" cy="12" r="4"/><circle cx="33" cy="4" r="4"/><circle cx="33" cy="12" r="4"/><rect x="7" y="5" width="26" height="6"/></svg>';
  const COUNT=8;
  let left=COUNT;

  panel.style.position='relative';
  const lock=document.createElement('div');
  lock.className='bone-lock';
  lock.setAttribute('role','group');
  lock.setAttribute('aria-label','Drag the bones away to reveal the contact details');

  const skip=document.createElement('button');
  skip.type='button';
  skip.className='bone-skip';
  skip.textContent='reveal contact';
  skip.setAttribute('aria-label','Reveal contact details without playing');
  lock.appendChild(skip);

  const bones=[];
  function unseal(){
    document.body.classList.add('contact-unsealed');
    lock.classList.add('cleared');
    say('Contact unsealed — thanks for playing!');
    setTimeout(()=>lock.remove(),450);
  }
  function clear(b){
    if(b.classList.contains('gone'))return;
    b.classList.add('gone');
    b.style.transform='translate(110px,-170px) rotate(45deg)';
    left--;
    if(left===0){unseal()}
    else{say((COUNT-left)+' / '+COUNT+' bones cleared')}
  }

  for(let i=0;i<COUNT;i++){
    const b=document.createElement('button');
    b.type='button';
    b.className='lock-bone';
    b.setAttribute('aria-label','Bone '+(i+1)+' of '+COUNT+' — drag away or press Enter');
    b.style.setProperty('--n',i);
    b.innerHTML=ICON;
    lock.appendChild(b);
    bones.push(b);

    let drag=null;
    b.addEventListener('pointerdown',e=>{
      if(b.classList.contains('gone'))return;
      drag={x:e.clientX,y:e.clientY,dx:0,dy:0};
      try{b.setPointerCapture(e.pointerId)}catch(_){}
      b.classList.add('drag');
    });
    b.addEventListener('pointermove',e=>{
      if(!drag)return;
      drag.dx=e.clientX-drag.x;
      drag.dy=e.clientY-drag.y;
      b.style.transform='translate('+drag.dx+'px,'+drag.dy+'px) rotate('+(drag.dx*.12)+'deg)';
    });
    b.addEventListener('pointerup',()=>{
      if(!drag)return;
      const far=Math.hypot(drag.dx,drag.dy)>55;
      drag=null;
      b.classList.remove('drag');
      if(far){clear(b)}else{b.style.transform=''}
    });
    b.addEventListener('pointercancel',()=>{
      drag=null;
      b.classList.remove('drag');
      b.style.transform='';
    });
    b.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();clear(b)}
    });
  }

  skip.addEventListener('click',()=>bones.forEach((b,i)=>setTimeout(()=>clear(b),i*45)));
  panel.appendChild(lock);
})();
