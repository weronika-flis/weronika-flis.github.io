(()=>{const $=q=>document.querySelector(q),RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const say=m=>{const t=$('#toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(say.t);say.t=setTimeout(()=>t.classList.remove('show'),2200)};

/* DOIs: citations + cite buttons */
const items=[...document.querySelectorAll('#publications .pub, #publications .pub-list li, #publications .clist li')].map(el=>{
  const a=el.querySelector('a[href*="doi.org/"]');
  if(!a)return null;
  return{el,a,doi:a.href.split('doi.org/')[1].toLowerCase()}
}).filter(Boolean);

items.forEach(it=>{
  const b=document.createElement('button');
  b.type='button';
  b.className='cite-btn';
  b.textContent='Cite';
  b.setAttribute('aria-label','Copy BibTeX citation');
  it.a.after(b);
  b.onclick=async()=>{
    b.textContent='…';
    let bib='';
    try{
      const r=await fetch('https://api.crossref.org/works/'+encodeURIComponent(it.doi)+'/transform/application/x-bibtex');
      if(r.ok)bib=await r.text()
    }catch(e){}
    if(!bib){
      try{
        const r=await fetch('https://doi.org/'+it.doi,{headers:{Accept:'application/x-bibtex'}});
        if(r.ok)bib=await r.text()
      }catch(e){}
    }
    if(!bib)bib='@article{'+it.doi.replace(/\W/g,'_')+',\n  doi = {'+it.doi+'},\n  url = {https://doi.org/'+it.doi+'}\n}';
    try{
      await navigator.clipboard.writeText(bib.trim());
      say('BibTeX copied to clipboard')
    }catch(e){
      say('Could not copy citation')
    }
    b.textContent='Cite'
  }
});

(async()=>{
  try{
    const d=items.map(i=>i.doi).filter(x=>!x.startsWith('10.48550')&&!x.startsWith('10.5281'));
    if(!d.length)return;
    const r=await fetch('https://api.openalex.org/works?filter=doi:'+d.join('|')+'&select=doi,cited_by_count&per-page=50&mailto=weronika.flis@doctoral.uj.edu.pl');
    const j=await r.json();
    const m={};
    if(j&&j.results){
      j.results.forEach(w=>m[w.doi.replace('https://doi.org/','').toLowerCase()]=w.cited_by_count);
      items.forEach(it=>{
        const c=m[it.doi];
        if(c>0){
          const s=document.createElement('span');
          s.className='cites';
          s.textContent=c+(c===1?' citation':' citations');
          it.a.after(s)
        }
      })
    }
  }catch(e){}
})();

})();
