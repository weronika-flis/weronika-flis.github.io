/* Hidden bone hunt — seven bones tucked into the sections. Find them all. */
(()=>{
  const SPOTS=[
    {id:'research',x:.06,y:.16},
    {id:'publications',x:.92,y:.74},
    {id:'talks',x:.90,y:.30},
    {id:'background',x:.05,y:.58},
    {id:'skills',x:.93,y:.22},
    {id:'projects',x:.08,y:.82},
    {id:'contact',x:.92,y:.12}
  ];
  const BONE='<svg viewBox="0 0 40 16" aria-hidden="true" fill="currentColor"><circle cx="7" cy="4" r="4"/><circle cx="7" cy="12" r="4"/><circle cx="33" cy="4" r="4"/><circle cx="33" cy="12" r="4"/><rect x="7" y="5" width="26" height="6"/></svg>';
  const toast=document.getElementById('toast');
  const total=SPOTS.length;
  let found=0;

  const say=m=>{if(!toast)return;toast.textContent=m;toast.classList.add('show');clearTimeout(say.t);say.t=setTimeout(()=>toast.classList.remove('show'),2600)};

  const dialog=document.createElement('dialog');
  dialog.className='dlg bone-dialog';
  dialog.id='boneSecret';
  dialog.innerHTML='<h3>&#129658; Skeleton key found</h3>'+
    '<p>All seven bones recovered. You clearly know your way around a skeleton — even the ones hiding in plain sight.</p>'+
    '<p class="bone-code">SECRET UNLOCKED &middot; <b>OSTEOLOGY</b></p>'+
    '<div class="btns"><button class="btn" type="button" data-reset>Hide them again</button>'+
    '<button class="btn primary" type="button" data-close>Close</button></div>';
  document.body.appendChild(dialog);
  dialog.querySelector('[data-close]').onclick=()=>dialog.close();
  dialog.querySelector('[data-reset]').onclick=()=>{dialog.close();reset()};

  function reset(){
    found=0;
    document.body.classList.remove('hunt-won');
    document.querySelectorAll('.bone').forEach(b=>b.classList.remove('found'));
    say('Bones hidden again. Good luck.');
  }

  SPOTS.forEach((spot,i)=>{
    const sec=document.getElementById(spot.id);
    if(!sec)return;
    sec.style.position='relative';
    const b=document.createElement('button');
    b.type='button';
    b.className='bone';
    b.dataset.bone=i;
    b.setAttribute('aria-label','Hidden bone '+(i+1)+' of '+total);
    b.style.setProperty('--x',spot.x);
    b.style.setProperty('--y',(spot.y*100)+'%');
    b.style.setProperty('--i',i);
    b.innerHTML=BONE;
    b.addEventListener('click',()=>{
      if(b.classList.contains('found'))return;
      b.classList.add('found');
      found++;
      if(found<total){say('Hidden bone '+found+' / '+total+' · keep looking')}
      else{
        document.body.classList.add('hunt-won');
        say('All '+total+' bones found!');
        setTimeout(()=>{if(!dialog.open)dialog.showModal()},600);
      }
    });
    sec.appendChild(b);
  });

  console.log('%cPsst — 7 bones are hiding in the sections.','font:12px "DM Mono",monospace;color:#3fbf9a');
})();
