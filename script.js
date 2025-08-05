 const modal = document.getElementById('linkModal');
  const tryBtn = document.querySelector('.cta-button');
  const closeBtn = document.getElementById('closeModal');

  tryBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  document.getElementById('generateBtn').addEventListener('click', () => {
    // Placeholder: gather data and redirect
    alert('Generating your link page...');
    // Later: store data in localStorage and redirect
    window.location.href = 'your-links.html';
  });
