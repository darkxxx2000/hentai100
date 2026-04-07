function renderPosts(list){
  container.innerHTML='';

  list.forEach(post=>{
    const tagClass='border-'+post.tags[0];

    const card=document.createElement('div');
    card.className=`card ${tagClass}`;

    card.innerHTML=`
      <img loading="lazy" src="${post.image}" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
      <div class="card-content">
        <h2>${post.title}</h2>
        <div class="subtitle">${post.tags.join(' • ')}</div>
      </div>
    `;

    container.appendChild(card);
  });
}
