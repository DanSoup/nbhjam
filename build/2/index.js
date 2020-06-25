const alpha = document.getElementById('alpha');

alpha.style.transitionDuration = '1s, 1s'

const move = (el, x, y) => {
  if (el.classList.contains('walk')) return;
  const currentX = parseInt(el.style.left.slice(0, -2));
  const currentY = parseInt(el.style.top.slice(0, -2));
  const d = Math.sqrt((currentX - x) ** 2 + (currentY - y) ** 2);
  if (d < 1) return;
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
};

const tileMove = (el, tileX, tileY) => {
  const xyOffset = 173.205
  const tileWidth = 250;
  const tileHeight = 100;
  const screenXStart = 10;
  const screenYStart = 400 + 10 + (4 * tileHeight);
  // const screenYStart = 210;
  let screenX = screenXStart + (tileX * tileWidth) + (tileY * xyOffset) + xyOffset / 2;
  let screenY = screenYStart - tileY * tileHeight - 30;

  // adjust for character size
  screenX -= ((320 - 250) / 2);
  screenY -= 320;

  move(el, screenX, screenY)
};

// move(alpha, 1, 0);
// move(alpha, 2, 0);

tileMove(alpha, 0, 0);

const frame = () => {
  tileMove(alpha, Math.floor(Math.random() * 4), Math.floor(Math.random() * 4))
  setTimeout(frame, 2000 + Math.random() * 3000);
}

frame();