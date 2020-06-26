const map = [];

for (let i = 0; i < 4; i++) {
  map[i] = [];
  for (let k = 0; k < 4; k++) {
    map[i][k] = Math.floor(Math.random() * 2)
  };
};

const tileHeightRatio = 5;
const tileWidthRatio = 12;
const xyOffsetRatio = 8;
const scale = 20;

const tileWidth = tileWidthRatio * scale;
const tileHeight = tileHeightRatio * scale;
const xyOffset = xyOffsetRatio * scale;

const generateMap = () => {

  // map drawn visually in an array
  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile === 1) {
        const div = document.createElement('div');
        div.style.height = tileHeight + 'px';
        div.style.width = tileWidth + xyOffset + 'px';
        div.style.left = x * tileWidth + (map.length - 1 - y) * xyOffset + 'px';
        div.style.bottom = (map.length - 1 - y) * tileHeight + 'px';
        const body = document.getElementsByTagName('body')[0];
        div.classList.add('grey-tile');
        body.appendChild(div);
      }
    });
  });

}

generateMap();

const alpha = document.getElementById('alpha');

alpha.style.transitionDuration = '1s, 1s'

const move = (el, x, y) => {
  if (el.classList.contains('walk')) return;
  const currentX = parseInt(el.style.left.slice(0, -2));
  const currentY = parseInt(el.style.bottom.slice(0, -2));
  const d = Math.sqrt((currentX - x) ** 2 + (currentY - y) ** 2);
  if (d < 1) return;
  el.style.left = `${x}px`;
  el.style.bottom = `${y}px`;
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

  let screenX = (tileX * tileWidth) + (tileY * xyOffset) + xyOffset / 2;
  let screenY = tileY * tileHeight + 30;

  // adjust for character size
  screenX -= ((320 - 250) / 2);
  // screenY -= 320;

  move(el, screenX, screenY)
};

tileMove(alpha, 0, 0);

const frame = () => {
  const potentialMoves = [];
  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile === 1) potentialMoves.push({x, y: map.length - 1 - y});
    });
  });
  const chosenTile = potentialMoves[Math.floor(Math.random() * potentialMoves.length)]
  tileMove(alpha, chosenTile.x, chosenTile.y)
  setTimeout(frame, 2000 + Math.random() * 3000);
}

frame();