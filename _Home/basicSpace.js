const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //2D그래픽 컨텍스트 할당

let TOTAL;
let stars = [];

function randomBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
}

// 별 클래스
class Star {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
  }
  draw() {
    const { x, y, velocity } = this;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + velocity.x * 2, y + velocity.y * 2);
    ctx.strokeStyle = "#eeee33";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  animate() {
    if (this.y > innerHeight || this.y < 0) {
      this.x = innerWidth / 2;
      this.y = innerHeight / 2;
    } else if (this.x > innerWidth || this.x < 0) {
      this.x = innerWidth / 2;
      this.y = innerHeight / 2;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }
}

function init() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  TOTAL = Math.floor((innerWidth * innerHeight) / 45000); //별 전체 개수 컨트롤
  stars = [];

  for (let i = 0; i < TOTAL; i++) {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    const velocity = {
      x: randomBetween(-4, 4),
      y: randomBetween(-2, 2),
    };
    stars.push(new Star(x, y, velocity));
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((stars) => stars.animate());

  window.requestAnimationFrame(render);
}

window.addEventListener("resize", () => init());
init();
render();
