const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //2D그래픽 컨텍스트 할당

let TOTAL;
let stars = [];
let rocks = [];

function randomBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
}

// 별 클래스
class Star {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.size = 1; // 크기조절
    this.opacity = 1; // 초기 투명도
  }

  draw() {
    const { x, y, velocity, size, opacity } = this;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + velocity.x * 1 * size, y + velocity.y * 1 * size);
    ctx.strokeStyle = `rgba(255, 238, 0, ${opacity})`;
    ctx.lineWidth = 0.5 * size;
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

    //중심으로부터의 거리
    const distanceFromCenter = Math.sqrt(
      (this.x - innerWidth / 2) ** 2 + (this.y - innerHeight / 2) ** 2
    );
    this.size = 1 + distanceFromCenter / 100;
    // this.opacity = Math.max(0.5, 1 - distanceFromCenter / 100); //FadeOut
    this.opacity = Math.min(0.6, distanceFromCenter / 20); //FadeIn

    this.draw();
  }
}

//돌 클래스
class Rock {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.size = 1;
    this.opacity = 1;
    this.colors = ["rgba(30, 30, 230, ", "rgba(30, 230, 30, "];
  }
  draw() {
    const { x, y, velocity, size, opacity, colors } = this;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + velocity.x + 10 + size, y + velocity.y + 0);
    ctx.strokeStyle = randomColor + `${opacity})`;
    ctx.lineWidth = 10 + size;
    ctx.stroke();
  }
  animate() {
    if (this.y > innerHeight || this.y < 0) {
      this.x = innerWidth / 2;
      this.y = innerHeight / 2;
      this.velocity = {
        x: randomBetween(-4, 4),
        y: randomBetween(-2, 2),
      };
    } else if (this.x > innerWidth || this.x < 0) {
      this.x = innerWidth / 2;
      this.y = innerHeight / 2;
      this.velocity = {
        x: randomBetween(-4, 4),
        y: randomBetween(-2, 2),
      };
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    const distanceFromCenter = Math.sqrt(
      (this.x - innerWidth / 2) ** 2 + (this.y - innerHeight / 2) ** 2
    );
    this.size = 1 + distanceFromCenter / 20;
    this.opacity = Math.min(0.2, distanceFromCenter / 1000);
    this.draw();
  }
}

class Platform {
  constructor(opacity) {
    this.opacity = opacity;
  }
  draw() {
    // 검정색 사각형 그리기
    ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`; // 검정색, 지정된 투명도
    ctx.fillRect(0, 0, canvas.width, canvas.height); // 캔버스의 크기에 맞는 사각형 그리기
  }
  animate() {}
}

function init() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  TOTAL = Math.floor((innerWidth * innerHeight) / 10000); //별 전체 개수 컨트롤
  stars = [];
  rocks = [];
  // STAR 생성
  for (let i = 0; i < TOTAL; i++) {
    const x = randomBetween(innerWidth / 2 - 20, innerWidth / 2 + 20);
    const y = randomBetween(innerHeight / 2 - 20, innerHeight / 2 + 20);
    const velocity = {
      x: randomBetween(-4, 4),
      y: randomBetween(-2, 2),
    };
    stars.push(new Star(x, y, velocity));
  }
  // ROCK 생성
  for (let j = 0; j < 4; j++) {
    const x = randomBetween(innerWidth / 2 - 20, innerWidth / 2 + 20);
    const y = randomBetween(innerHeight / 2 - 20, innerHeight / 2 + 20);
    const velocity = {
      x: randomBetween(-2, 2),
      y: randomBetween(-2, 2),
    };
    rocks.push(new Rock(x, y, velocity));
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((stars) => stars.animate());
  rocks.forEach((rocks) => rocks.animate());
  const platform = new Platform(0.3); // 투명도를 조절하여 Platform 생성
  platform.draw(); // Platform 그리기
  window.requestAnimationFrame(render);
}
window.addEventListener("resize", () => init());

init();
render();

// init에서 시작 좌표값, 속도를 부여하고 객체를 생성한다.
// 각각의 객체의 기능을 구현한다.
// render에서 그린다
