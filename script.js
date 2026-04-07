const container = document.getElementById('postsContainer');
const input = document.getElementById('searchInput');

/* RENDER TARJETAS - Grid inicial sin tocar nada */
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
      </div>
    `;

    // CLICK EN IMAGEN -> MUESTRA DETALLE
    card.querySelector('img').addEventListener('click', () => {
      showOvaDetail(post);
    });

    container.appendChild(card);
  });
}

/* MOSTRAR DETALLE PANTALLA COMPLETA */
function showOvaDetail(post) {
  const detailSection = document.getElementById('ovaDetail');
  const detailTitle = document.getElementById('detailTitle');
  const detailImages = document.getElementById('detailImages');
  const detailButtons = document.getElementById('detailButtons');

  // Título grande
  detailTitle.innerText = post.title;

  // Imágenes (puedes agregar más en el array si quieres)
  detailImages.innerHTML = `<img src="${post.image}" style="width:100%; max-width:500px; margin-bottom:20px; border-radius:10px;">`;

  // VIEW EPISODES
  detailButtons.innerHTML = `
    <h3 style="margin-bottom:15px;">VIEW EPISODES</h3>
    <a href="${post.links.english}" class="btn red" target="_blank">Sub ENGLISH</a>
    <a href="${post.links.spanish}" class="btn blue" target="_blank">Sub ESPAÑOL</a>
    <div style="height:60px;"></div> <!-- franja vacía abajo -->
  `;

  detailSection.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' }); // asegura que la sección se vea completa
}

/* CERRAR DETALLE */
document.getElementById('closeDetail').addEventListener('click', () => {
  document.getElementById('ovaDetail').style.display = 'none';
});

/* FILTRO POR BOTONES */
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
