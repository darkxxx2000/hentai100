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
      <img loading="lazy"
           src="${post.image}"
           onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
      <div class="card-content">
        <h2>${post.title}</h2>
        <div class="subtitle">${post.tags.join(' • ')}</div>
        <div class="view-episodes">${post.subtitle}</div>
        <div class="buttons">
          <a href="${post.links.english}" class="btn red" target="_blank">Sub ENGLISH</a>
          <a href="${post.links.spanish}" class="btn blue" target="_blank">Sub ESPAÑOL</a>
        </div>
      </div>
    `;

    // CLICK PARA MOSTRAR SECCIÓN DETALLE
    card.addEventListener('click', ()=>{
      const detailSection = document.getElementById('detailSection');
      document.getElementById('detailTitle').innerText = post.title;
      document.getElementById('detailImage').src = post.image;
      document.getElementById('detailSubtitle').innerText = post.subtitle;
      document.getElementById('detailEnglish').href = post.links.english;
      document.getElementById('detailSpanish').href = post.links.spanish;

      detailSection.style.display = 'block';
      detailSection.scrollIntoView({ behavior: 'smooth' });
    });

    container.appendChild(card);
  });
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
