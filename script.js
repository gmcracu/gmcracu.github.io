const state = { lang: localStorage.getItem('lang') || 'ro', theme: localStorage.getItem('theme') || 'light', data: {} };

const i18n = {
  ro: {
    nav_about:'Despre', nav_research:'Cercetare', nav_publications:'Publicații', nav_projects:'Proiecte', nav_fieldwork:'Teren', nav_contact:'Contact',
    hero_eyebrow:'Geografie • GIS • Turism • Analiză spațială', hero_role:'Lector universitar | Cercetător GIS | Geograf al turismului', hero_tagline:'Explorarea peisajelor prin GIS, analiză spațială și cercetare de teren.',
    btn_publications:'Vezi publicațiile', btn_map:'Explorează harta', photo_caption:'Geografie aplicată, hărți, teren și date spațiale.',
    about_eyebrow:'Profil academic', about_title:'Un geograf între teren, laborator și hartă',
    about_p1:'Sunt lector universitar la Universitatea Ovidius din Constanța, unde predau discipline din zona Geografiei turismului, GIS, teledetecției, montanologiei și evaluării spațiilor montane.',
    about_p2:'Activitatea mea combină cercetarea aplicată, analiza spațială, practica de teren și formarea studenților. Mă interesează modul în care orașele, litoralul, spațiile verzi și peisajele turistice se transformă sub presiunea dezvoltării, mobilității și schimbărilor de mediu.',
    tl_2008:'Master în Climatologie aplicată', tl_2015:'Doctor în Geografie, Universitatea din București', tl_2016:'Lector universitar, Universitatea Ovidius din Constanța', tl_2024:'Cercetare, proiecte, GIS, teren și dezvoltare academică',
    research_eyebrow:'Research explorer', research_title:'Direcții de cercetare', research_subtitle:'Un portofoliu construit la intersecția dintre GIS, turism, urbanizare, litoral și cercetare de teren.',
    map_eyebrow:'Geografia activității', map_title:'Harta cercetărilor și practicii de teren', map_subtitle:'Locuri, proiecte, articole și experiențe de teren, organizate spațial.',
    pub_eyebrow:'Publicații', pub_title:'Lucrări selectate', projects_eyebrow:'Granturi & colaborări', projects_title:'Proiecte de cercetare',
    teach_eyebrow:'Teaching', teach_title:'Cursuri, laboratoare și practică', course_tourism:'Geografia turismului', course_mountains:'Montanologie și turism montan', course_remote:'Teledetecție', course_geotourism:'Geoturism', course_eval:'Evaluarea și valorificarea turistică a spațiilor montane', teach_note:'Secțiunea va fi extinsă cu fișe de disciplină, resurse GIS, teme de licență/disertație și materiale pentru studenți.',
    contact_eyebrow:'Contact', contact_title:'Hai să cartografiem următoarea idee', contact_text:'Pentru colaborări, proiecte, activități cu studenții sau discuții academice, mă poți contacta prin e-mail sau prin profilurile academice.', footer_text:'Construit ca portofoliu academic digital.'
  },
  en: {
    nav_about:'About', nav_research:'Research', nav_publications:'Publications', nav_projects:'Projects', nav_fieldwork:'Fieldwork', nav_contact:'Contact',
    hero_eyebrow:'Geography • GIS • Tourism • Spatial Analysis', hero_role:'Lecturer | GIS Researcher | Tourism Geographer', hero_tagline:'Exploring landscapes through GIS, spatial analysis and field research.',
    btn_publications:'View publications', btn_map:'Explore the map', photo_caption:'Applied geography, maps, fieldwork and spatial data.',
    about_eyebrow:'Academic profile', about_title:'A geographer between fieldwork, lab and map',
    about_p1:'I am a Lecturer at Ovidius University of Constanța, teaching courses related to Tourism Geography, GIS, Remote Sensing, Mountain Geography and the evaluation of mountain areas.',
    about_p2:'My work combines applied research, spatial analysis, field practice and student training. I am interested in how cities, coastal areas, green spaces and tourism landscapes transform under the pressure of development, mobility and environmental change.',
    tl_2008:'MSc in Applied Climatology', tl_2015:'PhD in Geography, University of Bucharest', tl_2016:'Lecturer, Ovidius University of Constanța', tl_2024:'Research, projects, GIS, fieldwork and academic development',
    research_eyebrow:'Research explorer', research_title:'Research directions', research_subtitle:'A portfolio built at the intersection of GIS, tourism, urbanisation, coastal change and field research.',
    map_eyebrow:'Geography of work', map_title:'Research and fieldwork map', map_subtitle:'Places, projects, papers and field experiences, organised spatially.',
    pub_eyebrow:'Publications', pub_title:'Selected works', projects_eyebrow:'Grants & collaborations', projects_title:'Research projects',
    teach_eyebrow:'Teaching', teach_title:'Courses, laboratories and field practice', course_tourism:'Tourism Geography', course_mountains:'Mountain Geography and Mountain Tourism', course_remote:'Remote Sensing', course_geotourism:'Geotourism', course_eval:'Evaluation and tourism valorisation of mountain areas', teach_note:'This section will be expanded with course sheets, GIS resources, thesis topics and materials for students.',
    contact_eyebrow:'Contact', contact_title:'Let’s map the next idea', contact_text:'For collaborations, projects, student activities or academic conversations, you can contact me by e-mail or through academic profiles.', footer_text:'Built as an academic digital portfolio.'
  }
};

async function loadData(){
  const files = ['site','research','publications','projects','fieldwork'];
  const responses = await Promise.all(files.map(f => fetch(`data/${f}.json`).then(r => r.json())));
  files.forEach((f,i)=> state.data[f]=responses[i]);
}

function applyLanguage(){
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if(i18n[state.lang][key]) el.textContent = i18n[state.lang][key];
  });
  const search = document.getElementById('publicationSearch');
  if(search) search.placeholder = search.dataset[`placeholder${state.lang === 'ro' ? 'Ro' : 'En'}`];
  document.getElementById('langToggle').textContent = state.lang === 'ro' ? 'EN' : 'RO';
  renderDynamic();
}

function applyTheme(){
  document.documentElement.dataset.theme = state.theme;
  document.getElementById('themeToggle').textContent = state.theme === 'light' ? '☾' : '☼';
}

function renderDynamic(){
  const site = state.data.site;
  if(!site) return;
  document.getElementById('metricsGrid').innerHTML = site.metrics.map(m => `<article class="metric"><strong>${m.value}</strong><span>${state.lang==='ro'?m.label_ro:m.label_en}</span></article>`).join('');
  const links = [
    ['Google Scholar', site.profile.scholar], ['ORCID', site.profile.orcid], ['ResearchGate', site.profile.researchgate], ['Email', `mailto:${site.profile.email}`]
  ];
  const linkHtml = links.map(([label,url]) => `<a class="mini-link" href="${url}" target="_blank" rel="noopener">${label}</a>`).join('');
  document.getElementById('profileLinks').innerHTML = linkHtml;
  document.getElementById('contactLinks').innerHTML = links.map(([label,url]) => `<a class="btn" href="${url}" target="_blank" rel="noopener">${label}</a>`).join('');
  renderResearch(); renderProjects(); renderPublications();
  if(window.researchMap) renderMapMarkers();
}

function renderResearch(){
  const items = state.data.research || [];
  document.getElementById('researchGrid').innerHTML = items.map(item => `<article class="research-card reveal visible"><div class="icon">${item.icon}</div><h3>${state.lang==='ro'?item.title_ro:item.title_en}</h3><p>${state.lang==='ro'?item.text_ro:item.text_en}</p></article>`).join('');
}

function renderProjects(){
  const items = state.data.projects || [];
  document.getElementById('projectGrid').innerHTML = items.map(p => `<article class="project-card reveal visible"><div class="period">${p.period}</div><h3>${p.title}</h3><p><strong>${state.lang==='ro'?p.role_ro:p.role_en}</strong></p><p>${state.lang==='ro'?p.text_ro:p.text_en}</p><div>${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div></article>`).join('');
}

function renderPublications(){
  const q = (document.getElementById('publicationSearch')?.value || '').toLowerCase();
  const filter = document.getElementById('publicationFilter')?.value || 'all';
  const items = (state.data.publications || []).filter(p => {
    const hay = `${p.title} ${p.authors} ${p.journal} ${p.tags.join(' ')}`.toLowerCase();
    return hay.includes(q) && (filter === 'all' || p.type === filter);
  });
  document.getElementById('publicationList').innerHTML = items.map(p => `<article class="pub-card reveal visible"><div><div class="pub-year">${p.year}</div><span class="pub-type">${p.type}</span></div><div><h3>${p.title}</h3><p>${p.authors}</p><p><em>${p.journal}</em></p><div>${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>${p.doi ? `<a class="doi" href="${p.doi}" target="_blank" rel="noopener">DOI / Link</a>` : ''}</div></article>`).join('');
}

function initMap(){
  window.researchMap = L.map('researchMap', { scrollWheelZoom:false }).setView([45.5, 26.4], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'&copy; OpenStreetMap contributors' }).addTo(window.researchMap);
  renderMapMarkers();
}

let markerLayer;
function renderMapMarkers(){
  if(!window.researchMap) return;
  if(markerLayer) markerLayer.remove();
  markerLayer = L.layerGroup().addTo(window.researchMap);
  (state.data.fieldwork || []).forEach(p => {
    const html = `<strong>${p.name}</strong><br><span>${state.lang==='ro'?p.type_ro:p.type_en}</span><p style="margin:.5rem 0 0">${state.lang==='ro'?p.text_ro:p.text_en}</p>`;
    L.marker([p.lat,p.lng]).addTo(markerLayer).bindPopup(html);
  });
}

function initReveal(){
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function bindEvents(){
  document.getElementById('langToggle').addEventListener('click', () => { state.lang = state.lang === 'ro' ? 'en' : 'ro'; localStorage.setItem('lang', state.lang); applyLanguage(); });
  document.getElementById('themeToggle').addEventListener('click', () => { state.theme = state.theme === 'light' ? 'dark' : 'light'; localStorage.setItem('theme', state.theme); applyTheme(); });
  document.getElementById('publicationSearch').addEventListener('input', renderPublications);
  document.getElementById('publicationFilter').addEventListener('change', renderPublications);
  document.getElementById('year').textContent = new Date().getFullYear();
}

(async function(){
  applyTheme(); bindEvents(); initReveal(); await loadData(); applyLanguage(); initMap();
})();
