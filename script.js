const container = document.getElementById('postsContainer');
const input = document.getElementById('searchInput');

/* RENDER DE TARJETAS */
function renderPosts(list) {
  container.innerHTML = '';
  list.forEach(post => {
    const tagClass = 'border-' + post.color;

    const card = document.createElement('div');
    card.className = `card ${tagClass}`;

    card.innerHTML = `
      <img loading="lazy" src="${post.image}"
           onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
      <div class="card-content">
        <h2>${post.title}</h2>
        <div class="subtitle">${post.tags.join(' • ')}</div>
        <div class="buttons">
          <a href="${post.links.english}" class="btn red" target="_blank">Sub ENGLISH</a>
          <a href="${post.links.spanish}" class="btn blue" target="_blank">Sub ESPAÑOL</a>
        </div>
      </div>
    `;

    // CLICK EN IMAGEN -> DETALLE
    card.querySelector('img').addEventListener('click', () => showOvaDetail(post));

    container.appendChild(card);
  });
}

/* FUNCION MOSTRAR DETALLE */
function showOvaDetail(post) {
  const detailSection = document.getElementById('ovaDetail');
  const detailTitle = document.getElementById('detailTitle');
  const detailImages = document.getElementById('detailImages');
  const detailButtons = document.getElementById('detailButtons');

  detailTitle.innerText = post.title;

  // Imagen principal (puedes añadir más imágenes si quieres)
  detailImages.innerHTML = `<img src="${post.image}" style="max-width:100%; margin-bottom:20px; border-radius:10px;">`;

  // VIEW EPISODES + botones al final + espacio debajo
  detailButtons.innerHTML = `
    <h3>VIEW EPISODES</h3>
    <a href="${post.links.english}" class="btn red" target="_blank">Sub ENGLISH</a>
    <a href="${post.links.spanish}" class="btn blue" target="_blank">Sub ESPAÑOL</a>
    <div style="height: 60px;"></div>
  `;

  detailSection.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* CERRAR DETALLE */
document.getElementById('closeDetail').addEventListener('click', () => {
  document.getElementById('ovaDetail').style.display = 'none';
});

/* FILTRO POR TAG */
function filterTag(tag) {
  const filtered = posts.filter(p => p.tags.includes(tag));
  renderPosts(filtered);
}

/* BUSCADOR */
input.addEventListener('keyup', e => {
  const val = e.target.value.toLowerCase();
  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(val) ||
    p.tags.join(' ').toLowerCase().includes(val)
  );
  renderPosts(filtered);
});

/* CONTADOR DE VISITAS */
let count = localStorage.getItem('visits') || 0;
count++;
localStorage.setItem('visits', count);
document.getElementById('visitCount').innerText = count;

/* CARGA INICIAL */
renderPosts(posts);
