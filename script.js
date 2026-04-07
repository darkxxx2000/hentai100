const container = document.getElementById('postsContainer');
const input = document.getElementById('searchInput');

function renderPosts(list) {
  container.innerHTML = '';
  list.forEach(post => {
    const tagClass = 'border-' + post.tags[0];

    container.innerHTML += `
      <div class="card ${tagClass}">
        <img src="${post.image}">
        <div class="card-content">
          <h2>${post.title}</h2>
          <p>${post.description}</p>
        </div>
      </div>
    `;
  });
}

function filterTag(tag) {
  const filtered = posts.filter(p => p.tags.includes(tag));
  renderPosts(filtered);
}

input.addEventListener('keyup', e => {
  const val = e.target.value.toLowerCase();
  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(val) ||
    p.tags.join().toLowerCase().includes(val)
  );
  renderPosts(filtered);
});

renderPosts(posts);

// Contador simple
let count = localStorage.getItem('visits') || 0;
count++;
localStorage.setItem('visits', count);
document.getElementById('visitCount').innerText = count;
