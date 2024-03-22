const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //2D그래픽 컨텍스트 할당

let TOTAL;
let stars = [];

function randomBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
}

// 홀로그램 스플래시 클래스
const splashRange = 200;
class HologramCrash {
  constructor(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
  }
  draw() {
    const { x, y, color, size } = this;
    let squareSize = size.x * size.y; // 사각형의 넓이 계산
    for (let i = 0; i < squareSize; i++) {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillRect(
        x + randomBetween(-splashRange, splashRange),
        y + randomBetween(-splashRange, splashRange),
        randomBetween(0, 1),
        randomBetween(0, 1)
      );
    }
  }
  animate() {
    this.draw();
  }
}

function init() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  holograms = [];
  hologramCrash = [];
  while (holoCount < holoMax) {
    holoCount++;
    const x = randomBetween(0, innerWidth);
    const y = randomBetween(0, innerHeight);
    const velocity = {
      x: randomBetween(0, 0),
      y: randomBetween(0.2, 2),
    };
    const size = {
      x: randomBetween(5, 15),
      y: randomBetween(10, 30),
    };
    const randomIndex = Math.floor(Math.random() * holoColors.length);
    const randomColor = holoColors[randomIndex];
    holograms.push(new Hologram(x, y, velocity, randomColor, size));
  }
  let size = {
    x: 130,
    y: 130,
  };
  for (i = 0; i < 5; i++) {
    hologramCrash.push(new HologramCrash(100, 100, "red", size));
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  holograms.forEach((holograms) => holograms.animate());
  hologramCrash.forEach((hologramCrash) => hologramCrash.animate());
  window.requestAnimationFrame(render);
}
window.addEventListener("resize", () => {
  holoCount = 0;
  init();
});

init();
render();
