const container = document.getElementById('postsContainer');
const input = document.getElementById('searchInput');

/* RENDER TARJETAS PRINCIPAL */
function renderPosts(list){
  container.innerHTML = '';
  list.forEach(post=>{
    const tagClass = 'border-' + post.color;
    const card = document.createElement('div');
    card.className = `card ${tagClass}`;
    card.innerHTML = `
      <img loading="lazy" src="${post.image}" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
      <div class="card-content">
        <h2>${post.title}</h2>
        <div class="subtitle">${post.tags.join(' • ')}</div>
        <div class="buttons">
          <a href="${post.links.english}" class="btn red" target="_blank">Sub ENGLISH</a>
          <a href="${post.links.spanish}" class="btn blue" target="_blank">Sub ESPAÑOL</a>
        </div>
      </div>
    `;
    // CLICK EN IMAGEN -> MOSTRAR DETALLE
    card.querySelector('img').addEventListener('click', ()=> showOvaDetail(post));
    container.appendChild(card);
  });
}

/* FUNCION DETALLE */
function showOvaDetail(post){
  const detailSection = document.getElementById('ovaDetail');
  document.getElementById('detailTitle').innerText = post.title;
  document.getElementById('detailImages').innerHTML = `<img src="${post.image}" style="width:300px; border-radius:10px;">`;
  document.getElementById('detailButtons').innerHTML = `
    <a href="${post.links.english}" class="btn red" target="_blank">Sub ENGLISH</a>
    <a href="${post.links.spanish}" class="btn blue" target="_blank">Sub ESPAÑOL</a>
  `;
  detailSection.style.display = 'block';
}

/* CERRAR DETALLE */
document.getElementById('closeDetail').addEventListener('click', ()=> {
  document.getElementById('ovaDetail').style.display = 'none';
});

/* FILTRO */
function filterTag(tag){
  renderPosts(posts.filter(p => p.tags.includes(tag)));
}

/* BUSCADOR */
input.addEventListener('keyup', e=>{
  const val = e.target.value.toLowerCase();
  renderPosts(posts.filter(p=> p.title.toLowerCase().includes(val) || p.tags.join(' ').toLowerCase().includes(val)));
});

/* CONTADOR DE VISITAS */
let count = localStorage.getItem('visits') || 0;
count++;
localStorage.setItem('visits', count);
document.getElementById('visitCount').innerText = count;

/* CARGA INICIAL */
renderPosts(posts);
