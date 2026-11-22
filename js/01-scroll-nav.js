(()=>{const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,$$=q=>[...document.querySelectorAll(q)],bar=document.getElementById('progress'),links=$$('nav ul a'),hero=document.querySelector('.hero .wrap');
function f(){const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h>0?y/h*100:0)+'%';
 if(!RM&&y<innerHeight){const k=y/innerHeight;hero.style.opacity=1-k*1.1;hero.style.transform=`translateY(${y*.25}px) scale(${1-k*.04})`}
 let c='';$$('section[id]').forEach(s=>{if(s.getBoundingClientRect().top<innerHeight*.4)c=s.id});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+c))}
addEventListener('scroll',f,{passive:true});f();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add('in');io.unobserve(t);
 if(t.classList.contains('reveal'))t.querySelectorAll('.stat').forEach(el=>{const n=+el.textContent;if(!n||RM)return;let t0;const g=x=>{t0??=x;const k=Math.min(1,(x-t0)/1100);el.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(g)};el.textContent=0;requestAnimationFrame(g)})}),{threshold:.1,rootMargin:'0px 0px -40px 0px'});
$$('section > .wrap').forEach(w=>{w.classList.add('reveal');io.observe(w)});
})();
