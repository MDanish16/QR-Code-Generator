document.addEventListener('DOMContentLoaded', () => {
  // Welcome overlay logic
  const welcome = document.getElementById('welcome-overlay');
  setTimeout(() => {
    welcome.classList.add('hide');
    setTimeout(() => {
      welcome.style.display = 'none';
    }, 1300); // match transition duration
  }, 5000);

  const form = document.getElementById('qr-form');
  const urlInput = document.getElementById('url-input');
  const qrResult = document.getElementById('qr-result');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    qrResult.classList.remove('show');
    qrResult.innerHTML = '';
    if (!url) return;
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (data.qr) {
        qrResult.innerHTML = `<img src="${data.qr}" alt="QR Code" style="max-width: 320px; border-radius: 16px; box-shadow: 0 4px 16px rgba(44,62,80,0.12); animation: fadeIn 1.2s;" />`;
        qrResult.classList.add('show');
      } else {
        qrResult.innerHTML = `<span style="color: #e25555;">${data.error || 'Failed to generate QR code.'}</span>`;
        qrResult.classList.add('show');
      }
    } catch (err) {
      qrResult.innerHTML = `<span style="color: #e25555;">Error: Could not connect to server.</span>`;
      qrResult.classList.add('show');
    }
  });
}); 