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
    card.querySelector('img').addEventListener('click', ()=> showOvaDetail(post));
    container.appendChild(card);
  });
}

/* MOSTRAR DETALLE */
function showOvaDetail(post){
  const detailSection = document.getElementById('ovaDetail');
  document.getElementById('detailMainImage').src = post.image;

  // thumbnails
  const thumbs = document.getElementById('detailThumbnails');
  thumbs.innerHTML = '';
  if(post.thumbnails){
    post.thumbnails.forEach(url=>{
      const img = document.createElement('img');
      img.src = url;
      img.addEventListener('click', ()=> document.getElementById('detailMainImage').src = url);
      thumbs.appendChild(img);
    });
  }

  // descripción
  document.getElementById('detailDescription').innerText = post.description || "No description available.";

  // botones
  document.getElementById('detailButtons').innerHTML = `
    <a href="${post.links.english}" class="btn red" target="_blank">Sub ENGLISH</a>
    <a href="${post.links.spanish}" class="btn blue" target="_blank">Sub ESPAÑOL</a>
  `;

  detailSection.style.display = 'block';
}

/* CERRAR DETALLE */
document.getElementById('closeDetail').addEventListener('click', ()=> document.getElementById('ovaDetail').style.display='none');

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

/* LOGO AL INICIO */
function goHome(){
  document.getElementById('ovaDetail').style.display='none';
  window.scrollTo({top:0, behavior:'smooth'});
}

/* CONTADOR VISITAS */
let count = localStorage.getItem('visits') || 0;
count++;
localStorage.setItem('visits', count);
document.getElementById('visitCount').innerText = count;

/* CARGA INICIAL */
renderPosts(posts);
