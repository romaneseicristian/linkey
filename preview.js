// Load saved data from localStorage
const headerImg = localStorage.getItem('linkey_header');
const links = JSON.parse(localStorage.getItem('linkey_links') || '[]');
const previewContainer = document.getElementById('previewContent');

// Add header image if available
if (headerImg) {
  const header = document.createElement('img');
  header.src = headerImg;
  header.className = 'header-image';
  previewContainer.appendChild(header);
}

// Loop through links and create cards
links.forEach(link => {
  const card = document.createElement('div');
  card.className = 'link-card';

  if (link.thumbnail) {
    const thumb = document.createElement('img');
    thumb.src = link.thumbnail;
    thumb.className = 'link-thumbnail';
    card.appendChild(thumb);
  }

  const info = document.createElement('div');
  info.className = 'link-info';

  const type = document.createElement('span');
  type.textContent = `Type: ${link.type}`;
  type.className = 'link-type';

  const url = document.createElement('a');
  url.href = link.url;
  url.textContent = link.url;
  url.target = '_blank';
  url.className = 'link-url';

  info.appendChild(type);
  info.appendChild(url);
  card.appendChild(info);
  previewContainer.appendChild(card);
});
