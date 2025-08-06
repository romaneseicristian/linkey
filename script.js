 const modal = document.getElementById('linkModal');
  const tryBtn = document.querySelector('.cta-button');
  const closeBtn = document.getElementById('closeModal');

  tryBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

// Close modal when clicking outside the modal content
window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
});


  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

// Converts uploaded file (like an image) into a Base64 string for storage in localStorage. need to explore this more, first time i heard about it 

function fileToBase64(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

// Now this is a lot of code for me and hopefully i'll remember how it works the next day lol. I'll have to revise my js knowledge 

  document.getElementById('generateBtn').addEventListener('click', () => {
  const headerFile = document.getElementById('headerImage').files[0];

  if (headerFile) {
    fileToBase64(headerFile, (base64Header) => {
      localStorage.setItem('linkey_header', base64Header);
    });
  }

  const linkBlocks = document.querySelectorAll('.link-block');
  const linksData = [];

  linkBlocks.forEach((block, index) => {
    const url = block.querySelector('.link-url').value;
    const type = block.querySelector('.link-type').value;
    const thumbFile = block.querySelector('.link-thumbnail').files[0];

    if (thumbFile) {
      fileToBase64(thumbFile, (base64Thumb) => {
        linksData.push({ url, type, thumbnail: base64Thumb });

        // Save once all thumbnails are processed
        if (linksData.length === linkBlocks.length) {
          localStorage.setItem('linkey_links', JSON.stringify(linksData));
        }
      });
    } else {
      linksData.push({ url, type, thumbnail: null });
      if (linksData.length === linkBlocks.length) {
        localStorage.setItem('linkey_links', JSON.stringify(linksData));
      }
    }
  });

  alert('Your data has been saved temporarily!');
   window.location.href = 'preview.html';
});

window.addEventListener('DOMContentLoaded', () => {
  const savedHeader = localStorage.getItem('linkey_header');
  const savedLinks = JSON.parse(localStorage.getItem('linkey_links') || '[]');

  if (savedHeader) {
    const imgPreview = document.createElement('img');
    imgPreview.src = savedHeader;
    imgPreview.style.maxWidth = '100px';
    document.getElementById('headerImage').insertAdjacentElement('afterend', imgPreview);
  }

  savedLinks.forEach((link, i) => {
    const block = document.querySelectorAll('.link-block')[i];
    if (block) {
      block.querySelector('.link-url').value = link.url;
      block.querySelector('.link-type').value = link.type;

      if (link.thumbnail) {
        const thumbPreview = document.createElement('img');
        thumbPreview.src = link.thumbnail;
        thumbPreview.style.maxWidth = '50px';
        block.querySelector('.link-thumbnail').insertAdjacentElement('afterend', thumbPreview);
      }
    }
  });
});

document.getElementById('closeModal').addEventListener('click', () => {
  localStorage.removeItem('linkey_header');
  localStorage.removeItem('linkey_links');
});
