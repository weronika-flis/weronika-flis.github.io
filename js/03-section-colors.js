(()=>{const D={top:['#6ee7c8','rgba(110,231,200,.07)','#0a0a0b'],research:['#6ee7c8','rgba(110,231,200,.09)','#090c0d'],publications:['#a99bff','rgba(150,130,255,.09)','#0b0a10'],talks:['#7cc4ff','rgba(110,180,255,.09)','#090b10'],map:['#7cc4ff','rgba(110,180,255,.06)','#09090c'],background:['#ffb86b','rgba(255,170,90,.08)','#0f0b09'],skills:['#a99bff','rgba(150,130,255,.07)','#0b0a0f'],projects:['#ff8fb1','rgba(255,130,170,.08)','#0f090c'],contact:['#6ee7c8','rgba(110,231,200,.10)','#090d0c']};
const L={top:['#0e8f74','rgba(14,143,116,.18)','#fbf7f1'],research:['#0e8f74','rgba(110,210,190,.20)','#f6faf6'],publications:['#0e8f74','rgba(170,150,255,.18)','#f8f6fc'],talks:['#0e8f74','rgba(120,180,255,.18)','#f5f8fc'],map:['#0e8f74','rgba(120,180,255,.12)','#f7f7f8'],background:['#0e8f74','rgba(255,200,90,.22)','#fdf8ee'],skills:['#0e8f74','rgba(170,150,255,.15)','#f8f6fc'],projects:['#0e8f74','rgba(255,140,170,.18)','#fcf5f7'],contact:['#0e8f74','rgba(14,143,116,.20)','#fbf6f0']};
const b=document.body,R=document.documentElement,btn=document.getElementById('theme')||document.createElement('button');let cur='top';window.__applyTheme=()=>apply();
function apply(){const lt=R.dataset.theme==='light',P=lt?L:D,[a,g,c]=P[cur]||P.top;
 b.style.setProperty('--accent',lt?'#0e8f74':'#6ee7c8');b.style.setProperty('--glow',g);b.style.setProperty('--bgc','color-mix(in srgb,'+c+' 30%,var(--bg))');
 btn.textContent=lt?'☾':'☀';btn.setAttribute('aria-label',lt?'Switch to dark theme':'Switch to light theme');
 const mc=document.querySelector('meta[name=theme-color]');if(mc)mc.content=lt?'#fafaf9':'#0a0a0b'}
function f(){let id='top';document.querySelectorAll('section[id]').forEach(x=>{if(x.getBoundingClientRect().top<innerHeight*.55)id=x.id});if(id!==cur){cur=id;apply()}}
btn.onclick=()=>{R.dataset.theme=R.dataset.theme==='light'?'dark':'light';try{localStorage.setItem('theme',R.dataset.theme)}catch(e){}apply()};
addEventListener('scroll',f,{passive:true});apply();f();})();
