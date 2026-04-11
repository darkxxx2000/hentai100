/* ================= SCRIPT COMPLETO MEJORADO ================= */

const container = document.getElementById('postsContainer');
const input = document.getElementById('searchInput');

// ===== OVERLAY ZOOM UNIVERSAL =====
function openImageOverlay(src){
  let overlay = document.getElementById('imgOverlay');

  if(!overlay){
    overlay = document.createElement('div');
    overlay.id = 'imgOverlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(0,0,0,0.88)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '3000';
    overlay.style.cursor = 'pointer';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', ()=> overlay.remove());

    document.addEventListener('keydown', function esc(e){
      if(e.key === 'Escape'){
        overlay.remove();
        document.removeEventListener('keydown', esc);
      }
    });
  }

  overlay.innerHTML = `
    <img src="${src}" referrerpolicy="no-referrer"
         style="max-width:92%; max-height:92%; border-radius:12px;">
  `;
}

/* ========= SLUG ========= */
function slugify(text){
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/(^-|-$)/g,'');
}

/* ================= RENDER INICIO ================= */
function renderPosts(list){
  container.innerHTML = '';

  list.forEach(post=>{
    const card = document.createElement('div');
    card.className = 'post-card';

    card.innerHTML = `
      <img loading="lazy"
           src="${post.image}"
           referrerpolicy="no-referrer"
           onerror="this.src='https://via.placeholder.com/400x600?text=No+Image'">
      <h3>${post.title}</h3>
      <span>${post.tags[0] || ''}</span>
    `;

    card.addEventListener('click', ()=> openDetail(post));
    container.appendChild(card);
  });
}

/* ================= ABRIR DETALLE + URL ================= */
function openDetail(post){
  const slug = slugify(post.title);
  history.pushState({slug}, '', slug);
  showOvaDetail(post);
}

/* ================= DETALLE ================= */
function showOvaDetail(post){
  document.body.style.overflow = 'hidden';
  container.style.display = 'none';

  const detailSection = document.getElementById('ovaDetail');

  // Imagen principal
  const mainImage = document.getElementById('detailMainImage');
  mainImage.src = post.image;
  mainImage.referrerPolicy = "no-referrer";
  mainImage.onclick = ()=> openImageOverlay(mainImage.src);

  // Título
  document.getElementById('detailTitle').innerText = post.title;

  // Thumbnails (9)
  const thumbs = document.getElementById('detailThumbnails');
  thumbs.innerHTML = '';

  if(post.thumbnails){
    post.thumbnails.slice(0,9).forEach(url=>{
      const img = document.createElement('img');
      img.src = url;
      img.referrerPolicy = "no-referrer";

      img.onclick = ()=> openImageOverlay(url);

      thumbs.appendChild(img);
    });
  }

  // Descripción
  document.getElementById('detailDescription').innerText =
    post.description || "No description available.";

  // Botones
  document.getElementById('detailButtons').innerHTML = `
    <button class="sub-en" onclick="window.open('${post.links.english}','_blank')">Sub ENGLISH</button>
    <button class="sub-es" onclick="window.open('${post.links.spanish}','_blank')">Sub ESPAÑOL</button>
  `;

  detailSection.style.display = 'block';
}

/* ================= VOLVER ================= */
function goHome(){
  history.pushState({}, '', '/hentai100/');
  document.getElementById('ovaDetail').style.display = 'none';
  container.style.display = 'grid';
  document.body.style.overflow = 'auto';
}

document.getElementById('closeDetail').addEventListener('click', goHome);

/* ================= DETECTAR URL AL ENTRAR ================= */
function checkUrlOnLoad(){
  const path = window.location.pathname.split('/').pop();

  if(path && path !== ''){
    const found = posts.find(p => slugify(p.title) === path);
    if(found){
      showOvaDetail(found);
      return;
    }
  }

  renderPosts(posts);
}

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

/* ================= HISTORIAL ATRÁS ================= */
window.onpopstate = function(){
  checkUrlOnLoad();
};

/* ================= CARGA INICIAL ================= */
checkUrlOnLoad();
