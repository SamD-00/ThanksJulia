document.getElementById("clc").onclick = function() {
  window.location.href = "nextpage1.html";
;
};
const colors = ['#ff3b3b', '#ffc93c', '#75d5fd', '#b983ff', '#f72585'];
const maxConfetti = 100;
const trail = [];

// Mouse support
window.addEventListener('mousemove', e => {
  addConfetti(e.clientX, e.clientY);
});

// Touch support
window.addEventListener('touchmove', e => {
  // Prevent scrolling while touching
  e.preventDefault();

  // Use the first touch point
  const touch = e.touches[0];
  if (touch) {
    addConfetti(touch.clientX, touch.clientY);
  }
}, { passive: false }); // passive: false is required to call preventDefault

function addConfetti(x, y) {
  if (trail.length >= maxConfetti) {
    const old = trail.shift();
    old.el.remove();
  }

  const el = document.createElement('div');
  el.className = 'confetti';
  el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  el.style.left = (x - 4) + 'px';
  el.style.top = (y - 4) + 'px';
  el.style.position = 'absolute';
  el.style.width = '1.2vh';
  el.style.height = '1.2vh';
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
    if (o.opacity <= 0) {
      o.el.remove();
      trail.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animateTrail);
}

animateTrail();
