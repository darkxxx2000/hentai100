const container = document.getElementById('postsContainer');
const input = document.getElementById('searchInput');

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
      </div>
    `;

    // Al hacer click en la imagen, mostrar detalle en otra sección
    card.querySelector('img').addEventListener('click', ()=>{
      showOvaDetail(post);
    });

    container.appendChild(card);
  });
}

/* FUNCION PARA MOSTRAR DETALLE DEL OVA */
function showOvaDetail(post){
  const detailSection = document.getElementById('ovaDetail');
  const detailTitle = document.getElementById('detailTitle');
  const detailImages = document.getElementById('detailImages');
  const detailButtons = document.getElementById('detailButtons');

  detailTitle.innerText = post.title;

  // Ejemplo: si quieres mostrar más imágenes, aquí puedes agregar un array post.images
  detailImages.innerHTML = `<img src="${post.image}" style="width:300px; border-radius:10px;">`;

  detailButtons.innerHTML = `
    <a href="${post.links.english}" class="btn red" target="_blank">Sub ENGLISH</a>
    <a href="${post.links.spanish}" class="btn blue" target="_blank">Sub ESPAÑOL</a>
  `;

  detailSection.style.display = 'block';

  // Scroll suave hacia la sección de detalle
  detailSection.scrollIntoView({behavior:'smooth'});
}

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
