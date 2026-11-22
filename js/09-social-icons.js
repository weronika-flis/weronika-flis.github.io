(()=>{const mail='<svg class="mailico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>';
document.querySelectorAll('.flinks a, a.ext').forEach(a=>{
 if(a.querySelector('.fav,.mailico'))return;
 if(a.href.startsWith('mailto:')){a.insertAdjacentHTML('afterbegin',mail);return}
 let h;try{h=new URL(a.href).hostname}catch(e){return}
 const i=new Image();i.className='fav';i.alt='';i.width=16;i.height=16;i.loading='lazy';i.decoding='async';
 i.src='https://www.google.com/s2/favicons?domain='+h+'&sz=64';i.onerror=()=>i.remove();a.prepend(i)});})();
