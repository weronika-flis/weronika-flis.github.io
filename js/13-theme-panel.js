(()=>{const R=document.documentElement,$=q=>document.querySelector(q),bt=$('#tbtn'),pn=$('#tpanel'),rg=$('#tk'),ov=$('#tkv');
function save(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function sync(){const m=R.dataset.theme,k=parseInt(R.style.getPropertyValue('--k'))||0;rg.value=k;ov.textContent=k+'%';
 pn.querySelectorAll('.seg button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.m===m));
 $('#tlo').textContent=m==='dark'?'soft dim':'warm paper';$('#thi').textContent=m==='dark'?'pure black':'bright white';
 bt.innerHTML=m==='dark'?'&#9790;':'&#9728;';window.__applyTheme&&window.__applyTheme()}
bt.onclick=e=>{e.stopPropagation();const o=pn.classList.toggle('open');bt.setAttribute('aria-expanded',o)};
document.addEventListener('click',e=>{if(!pn.contains(e.target)&&e.target!==bt){pn.classList.remove('open');bt.setAttribute('aria-expanded',false)}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')pn.classList.remove('open')});
pn.querySelectorAll('.seg button').forEach(x=>x.onclick=()=>{R.dataset.theme=x.dataset.m;save('theme',x.dataset.m);sync()});
rg.oninput=()=>{R.style.setProperty('--k',rg.value+'%');save('themeK',rg.value);sync()};
const t=document.createElement('button');t.id='theme';t.hidden=true;t.onclick=()=>{R.dataset.theme=R.dataset.theme==='dark'?'light':'dark';save('theme',R.dataset.theme);sync()};document.body.appendChild(t);
sync()})();
