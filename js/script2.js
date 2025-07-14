const colors = ['#ff3b3b', '#ffc93c', '#75d5fd', '#b983ff', '#f72585'];
const maxConfetti = 100;
const trail = [];

let scrollX = window.scrollX;
let scrollY = window.scrollY;

// Update scroll position on scroll
window.addEventListener('scroll', () => {
  scrollX = window.scrollX;
  scrollY = window.scrollY;
});

// Mouse support
window.addEventListener('mousemove', e => {
  addConfetti(e.clientX, e.clientY);
});

// Touch support with vertical scrolling allowed
let lastTouchY = null;
window.addEventListener('touchstart', e => {
  const touch = e.touches[0];
  if (!touch) return;
  addConfetti(touch.clientX, touch.clientY);
});

window.addEventListener('touchmove', e => {
  const touch = e.touches[0];
  if (!touch) return;

  // Always allow scroll
  addConfetti(touch.clientX, touch.clientY);
  lastTouchY = touch.clientY;
}, { passive: true });


window.addEventListener('touchend', () => {
  lastTouchY = null;
});

function addConfetti(clientX, clientY) {
  if (trail.length >= maxConfetti) {
    const old = trail.shift();
    old.el.remove();
  }

  const el = document.createElement('div');
  el.className = 'confetti';
  el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  el.style.left = (scrollX + clientX - 4) + 'px';
  el.style.top = (scrollY + clientY - 4) + 'px';
  el.style.position = 'absolute';
  el.style.width = '10px';
  el.style.height = '10px';
  el.style.borderRadius = '40%';
  el.style.pointerEvents = 'none';
  document.body.appendChild(el);

  const obj = {
    el: el,
    vx: (Math.random() - 0.5) * 2,
    vy: Math.random() * 2 + 1,
    opacity: 1
  };
  trail.push(obj);
}
const scrollableHeight = document.documentElement.scrollHeight;
function animateTrail() {
  for (let i = 0; i < trail.length; i++) {
    const o = trail[i];
    const x = parseFloat(o.el.style.left);
    const y = parseFloat(o.el.style.top);
    o.vy += 0.1; // gravity
    o.el.style.left = (x + o.vx) + 'px';
    o.el.style.top = (y + o.vy) + 'px';
    o.opacity -= 0.01;
    o.el.style.opacity = o.opacity;
    if (o.opacity <= 0 || y + 20 >= (scrollableHeight)) {
      o.el.remove();
      trail.splice(i, 1);
      i--;
    }
    

  }
  requestAnimationFrame(animateTrail);
}

animateTrail();


