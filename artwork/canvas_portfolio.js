const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let holoCount = 0; //init() 홀로그램 수 카운팅
let holoMax = 300; //init() 홀로그램 최대 개수
let holograms = [];
let hologramCrash = [];
let mouseX = 0;
let mouseY = 0;
const holoColors = [
  //green
  "rgba(0, 5, 0, 0.9)",
  "rgba(0, 55, 0, 0.9)",
  //blue
  "rgba(30, 55, 180, 0.9)",
  "rgba(0, 0, 120, 0.9)",
  "rgba(0, 0, 80, 0.9)",
  //etc
  "rgba(0, 0, 10, 0.9)",
  "rgba(50, 0,20, 0.9)",
];
function randomBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
}
canvas.addEventListener("mousemove", function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// 홀로그램상자 클래스
class Hologram {
  constructor(x, y, velocity, color, size) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.color = color;
    this.size = size;
  }
  draw() {
    const { x, y, color, size } = this;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size.x, size.y);
  }
  animate() {
    this.y += this.velocity.y;
    if (this.y > innerHeight) {
      this.x = randomBetween(0, innerWidth);
      this.y = 0;
    }
    this.draw();
  }
}

// 홀로그램 스플래시 클래스
const splashRange = 2; //홀로그램 잔상이 생기는 거리 배수
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
    //for (let i = 0; i < squareSize / 50; i++) {
    ctx.beginPath();
    //홀로그램잔상그리기
    ctx.fillStyle = color;
    ctx.fillRect(
      x + randomBetween(-size.x * splashRange, size.x * splashRange),
      y + randomBetween(-size.y * splashRange, size.y * splashRange),
      randomBetween(5, 10),
      randomBetween(5, 10)
    );
    //}
  }
  animate() {
    this.draw();
  }
}
function hologramSplashing() {
  holograms.forEach((hologram) => {
    hologram.animate();
    if (
      mouseX >= hologram.x &&
      mouseX <= hologram.x + hologram.size.x &&
      mouseY >= hologram.y &&
      mouseY <= hologram.y + hologram.size.y
    ) {
      hologram.x = randomBetween(0, innerWidth);
      hologram.y = 0;
      // 홀로그램 잔상 생성
      const size = { x: hologram.size.x, y: hologram.size.y }; // 잔상 크기 설정
      hologramCrash.push(
        new HologramCrash(mouseX, mouseY, hologram.color, size)
      );
    }
  });
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
      x: randomBetween(5, 20),
      y: randomBetween(10, 40),
    };
    const randomIndex = Math.floor(Math.random() * holoColors.length);
    const randomColor = holoColors[randomIndex];
    holograms.push(new Hologram(x, y, velocity, randomColor, size));
  }
}

function render() {
  hologramSplashing();
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

//init에서 한번 초기화해주는 이유는?
//=>resize에 대하여 생성할 때에 초기화
