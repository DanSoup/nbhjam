const alpha = document.getElementById('alpha');

alpha.style.transitionDuration = '1s, 1s'

const move = (el, x, y) => {
  if (el.classList.contains('walk')) return;
  const currentX = parseInt(el.style.left.slice(0, -2));
  const currentY = parseInt(el.style.top.slice(0, -2));
  const d = Math.sqrt((currentX - x) ** 2 + (currentY - y) ** 2)
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  if (currentX - x < 0) {
    el.classList.remove('left');
  } else {
    el.classList.add('left');
  }
  el.classList.add('walk');
  el.style.transitionDuration = `${d / 100}s, ${d / 100}s`;
  el.ontransitionend = () => {
    el.classList.remove('walk');
  }
}

move(alpha, 1, 0);

const frame = () => {
  move(alpha, Math.floor(Math.random() * 500), Math.floor(Math.random() * 500));
  setTimeout(frame, 2000 + Math.random() * 3000);
}

frame();