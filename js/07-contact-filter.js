(()=>{const L=document.getElementById('clist');if(!L)return;
const M=document.getElementById('cmore'),items=[...L.children];let f='all',open=false;
function draw(){let n=0;items.forEach(li=>{const ok=f==='all'||li.dataset.f===f;const show=ok&&(open||n<8);li.classList.toggle('hide',!show);if(ok)n++});
 const vis=items.filter(li=>!li.classList.contains('hide'));items.forEach(li=>li.classList.remove('last'));if(vis.length)vis[vis.length-1].classList.add('last');
 if(M){M.hidden=n<=8;M.textContent=open?'Show fewer':'Show all '+n}}
document.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x===c));f=c.dataset.f;draw()});
if(M)M.onclick=()=>{open=!open;draw();if(!open)L.scrollIntoView({block:'nearest'})};
draw()})();
