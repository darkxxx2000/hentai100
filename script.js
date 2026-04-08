const container = document.getElementById('postsContainer');
const input = document.getElementById('searchInput');

/* ================= RENDER INICIO LIMPIO ================= */
function renderPosts(list){
  container.innerHTML = '';

  list.forEach(post=>{
    const card = document.createElement('div');
    card.className = 'post-card';

    card.innerHTML = `
      <img loading="lazy" src="${post.image}"
           onerror="this.src='https://via.placeholder.com/400x600?text=No+Image'">
      <h3>${post.title}</h3>
      <span>${post.tags[0] || ''}</span>
    `;

    card.querySelector('img').addEventListener('click', ()=> showOvaDetail(post));
    container.appendChild(card);
  });
}

/* ================= DETALLE ================= */
function showOvaDetail(post){
  document.getElementById('postsContainer').style.display = 'none';
  const detailSection = document.getElementById('ovaDetail');

  document.getElementById('detailTitle').innerText = post.title;
  document.getElementById('detailMainImage').src = post.image;

  // MINIATURAS
  const thumbs = document.getElementById('detailThumbnails');
  thumbs.innerHTML = '';
  if(post.thumbnails){
    post.thumbnails.forEach(url=>{
      const img = document.createElement('img');
      img.src = url;
      img.addEventListener('click', ()=> {
        document.getElementById('detailMainImage').src = url;
      });
      thumbs.appendChild(img);
    });
  }

  // DESCRIPCIÓN
  document.getElementById('detailDescription').innerText =
    post.description || "No description available.";

  // BOTONES CORRECTOS
  document.getElementById('detailButtons').innerHTML = `
    <button class="sub-en" onclick="window.open('${post.links.english}','_blank')">Sub ENGLISH</button>
    <button class="sub-es" onclick="window.open('${post.links.spanish}','_blank')">Sub ESPAÑOL</button>
  `;

  detailSection.style.display = 'block';
}

/* ================= VOLVER ================= */
function goHome(){
  document.getElementById('ovaDetail').style.display = 'none';
  document.getElementById('postsContainer').style.display = 'grid';
}

document.getElementById('closeDetail').addEventListener('click', goHome);

/* ================= FILTRO ================= */
function filterTag(tag){
  const filtered = posts.filter(p => p.tags.includes(tag));
  renderPosts(filtered);
}

/* ================= BUSCADOR ================= */
input.addEventListener('keyup', e=>{
  const val = e.target.value.toLowerCase();
  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(val) ||
    p.tags.join(' ').toLowerCase().includes(val)
  );
  renderPosts(filtered);
});

/* ================= CONTADOR ================= */
let count = localStorage.getItem('visits') || 0;
count++;
localStorage.setItem('visits', count);
document.getElementById('visitCount').innerText = count;

/* ================= CARGA INICIAL ================= */
renderPosts(posts);
