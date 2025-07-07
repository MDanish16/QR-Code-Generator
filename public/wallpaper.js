// Animated dark-themed moving particles wallpaper
const canvas = document.getElementById('wallpaper-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 60;
const COLORS = ['#764ba2', '#667eea', '#23273a', '#e25555', '#fff'];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 2 + Math.random() * 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
      alpha: 0.3 + Math.random() * 0.5
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.restore();
  }
  // Draw lines between close particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 120) {
        ctx.save();
        ctx.globalAlpha = 0.08;
        ctx.strokeStyle = a.color;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function updateParticles() {
  for (let p of particles) {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
}

function animate() {
  drawParticles();
  updateParticles();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
animate(); 