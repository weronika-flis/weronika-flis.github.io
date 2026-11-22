(()=>{const el=document.getElementById('worldmap');if(!el)return;
const P=[
[50.0647,19.9450,'h','Kraków, Poland','Doctoral School of Exact and Natural Sciences, Jagiellonian University<br>PhD in Biological Anthropology · Faculty of Biology'],
[53.4084,-2.9916,'s','Liverpool, United Kingdom','Face Lab, Liverpool John Moores University (LJMU)<br>Research and Training Fellowship in 3D Forensic Facial Reconstruction (2026)'],
[40.2033,-8.4103,'s','Coimbra, Portugal','University of Coimbra<br>Erasmus+ Research Internship: Human skeletal biology & comparative osteology (2025)'],
[37.9838,23.7275,'s','Athens, Greece','National and Kapodistrian University of Athens<br>Modern documented skeletal collection analysis & Erasmus+ (2023 & 2025)'],
[42.4411,19.2636,'s','Montenegro','Archaeological Project: Early Bronze Age Prince\'s Graves<br>Field excavation, skeletal recovery & in-situ bioarchaeology (2024 & 2025)'],
[44.7866,20.4489,'s','Belgrade, Serbia','AITA Bioarchaeology<br>Osteological Course in human skeletal anatomy & pathology (2025)'],
[41.3879,2.1699,'s','Barcelona, Spain','AITA Bioarchaeology<br>Specialized Training & Certificate in Bioarchaeology (2025)'],
[47.4979,19.0402,'c','Budapest, Hungary','24th European Association of Anthropologists (EAA) Congress<br>Poster: Cranial Sexual Dimorphism in Two Contemporary European Populations (2026)'],
[51.1079,17.0385,'c','Wrocław, Poland','18th National Student Anthropological Conference (2025) & Facial Reconstruction Workshop (2024)'],
[52.4064,16.9252,'c','Poznań, Poland','100th Anniversary Conference of the Polish Anthropological Society (2025) & Faces of Criminology (2022)'],
[52.2297,21.0122,'c','Warsaw, Poland','1st Student Conference on Human Biology, UKSW (2022)'],
[53.4285,14.5528,'s','Szczecin, Poland','Pomeranian Medical University<br>Anatomy for Anthropologists Workshop (2024)']];
function init(){const css=document.createElement('link');css.rel='stylesheet';css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(css);
 const sc=document.createElement('script');sc.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';sc.onload=()=>{
  const m=L.map(el,{scrollWheelZoom:false,worldCopyJump:true,zoomControl:true,attributionControl:true});
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:12}).addTo(m);
  const home=[P[0][0],P[0][1]];
  P.forEach(([la,lo,k,t,d],i)=>{if(i)L.polyline([home,[la,lo]],{color:k==='c'?'#3fbf9a':'#8aa8ff',weight:1.2,opacity:.4,dashArray:'3 5'}).addTo(m);
   L.marker([la,lo],{icon:L.divIcon({className:'',html:`<div class="pin ${k==='c'?'':k}"></div>`,iconSize:[14,14]}),title:t,keyboard:true}).bindPopup(`<b>${t}</b><br>${d}`).addTo(m)});
  m.fitBounds(P.map(p=>[p[0],p[1]]),{padding:[30,30]})};document.body.appendChild(sc)}
const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){io.disconnect();init()}},{rootMargin:'300px'});io.observe(el)})();
