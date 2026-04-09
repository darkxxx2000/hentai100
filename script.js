function showOvaDetail(post){
  document.body.style.overflow = 'hidden';
  container.style.display = 'none';

  const detailSection = document.getElementById('ovaDetail');

  // Imagen principal
  const mainImage = document.getElementById('detailMainImage');
  mainImage.src = post.image;

  // Overlay al click en imagen principal
  const openOverlay = (src)=>{
    let overlay = document.getElementById('thumbOverlay');
    if (!overlay){
      overlay = document.createElement('div');
      overlay.id = 'thumbOverlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.background = 'rgba(0,0,0,0.85)';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = '2000';
      overlay.style.cursor = 'pointer';
      document.body.appendChild(overlay);

      // Cerrar al click o Escape
      overlay.addEventListener('click', ()=> overlay.remove());
      document.addEventListener('keydown', function escHandler(e){
        if(e.key === 'Escape'){
          overlay.remove();
          document.removeEventListener('keydown', escHandler);
        }
      });
    }

    // Carga la imagen solo cuando termina de cargar
    const img = new Image();
    img.src = src;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.borderRadius = '10px';
    img.onload = ()=> {
      overlay.innerHTML = '';
      overlay.appendChild(img);
    };
  };

  mainImage.addEventListener('click', ()=> openOverlay(mainImage.src));

  // Título
  document.getElementById('detailTitle').innerText = post.title;

  // Thumbnails
  const thumbs = document.getElementById('detailThumbnails');
  thumbs.innerHTML = '';

  if(post.thumbnails){
    post.thumbnails.slice(0,9).forEach(url=>{
      const img = document.createElement('img');
      img.src = url;

      // Al click en thumbnail reemplaza la imagen principal
      img.addEventListener('click', ()=>{
        mainImage.src = url;
      });

      // Doble click o ctrl+click abre overlay del thumbnail
      img.addEventListener('dblclick', ()=> openOverlay(url));
      img.addEventListener('keydown', e=>{
        if(e.key === 'Enter') openOverlay(url);
      });

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
