const container = document.getElementById('postsContainer');
const input = document.getElementById('searchInput');

/* RENDER TARJETAS */
function renderPosts(list){
  container.innerHTML = '';

  list.forEach(post=>{
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

    // CLICK EN IMAGEN -> DETALLE PANTALLA COMPLETA
    card.querySelector('img').addEventListener('click', ()=>{
      showOvaDetail(post);
    });

    container.appendChild(card);
  });
}

/* FUNCION MOSTRAR DETALLE */
function showOvaDetail(post){
  const detailSection = document.getElementById('ovaDetail');
  const detailTitle = document.getElementById('detailTitle');
  const detailImages = document.getElementById('detailImages');
  const detailDescription = document.getElementById('detailDescription');
  const detailButtons = document.getElementById('detailButtons');

  // Título grande
  detailTitle.innerText = post.title;

  // Contenedor de imágenes
  detailImages.innerHTML = '';
  if(Array.isArray(post.images) && post.images.length > 0){
    post.images.forEach(imgUrl=>{
      const img = document.createElement('img');
      img.src = imgUrl;
      img.style.width = "300px";
      img.style.borderRadius = "10px";
      img.style.marginRight = "10px";
      detailImages.appendChild(img);
    });
  } else {
    // Solo la imagen principal si no hay más
    detailImages.innerHTML = `<img src="${post.image}" style="width:300px; border-radius:10px;">`;
  }

  // Descripción
  detailDescription.innerHTML = post.description || '';

  // Botones English/Spanish
  detailButtons.innerHTML = `
    <h3>VIEW EPISODES</h3>
    <a href="${post.links.english}" class="btn red" target="_blank">Sub ENGLISH</a>
    <a href="${post.links.spanish}" class="btn blue" target="_blank">Sub ESPAÑOL</a>
  `;

  // Mostrar sección detalle a pantalla completa
  detailSection.style.display = 'block';
  detailSection.scrollIntoView({ behavior: 'smooth' });
}

/* CERRAR DETALLE */
document.getElementById('closeDetail').addEventListener('click', ()=>{
  document.getElementById('ovaDetail').style.display = 'none';
});

/* FILTRO POR BOTONES */
function filterTag(tag){
  const filtered = posts.filter(p => p.tags.includes(tag));
  renderPosts(filtered);
}

/* BUSCADOR */
input.addEventListener('keyup', e=>{
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
