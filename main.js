const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //2D그래픽 컨텍스트 할당

//svg파일 올리기
const spaceshipImg = document.getElementById("spaceship");
const aimImg = document.getElementById("aim");
//SVG 가로세로비율 최적화

function drawSpaceship() {
  const canvasAspectRatio = canvas.width / canvas.height;
  const svgAspectRatio = spaceshipImg.width / spaceshipImg.height;
  let drawWidth, drawHeight;
  if (canvasAspectRatio > svgAspectRatio) {
    drawWidth = canvas.width;
    drawHeight = canvas.width / svgAspectRatio;
  } else {
    drawWidth = canvas.height * svgAspectRatio;
    drawHeight = canvas.height;
  }
  const drawX = (canvas.width - drawWidth) / 2;
  const drawY = (canvas.height - drawHeight) / 2;
  ctx.drawImage(spaceshipImg, drawX, drawY, drawWidth, drawHeight);
}
let aimAngle = 0;

function drawAim() {
  aimAngle += 1;
  if (aimAngle >= 360) {
    aimAngle = 0;
  }

  ctx.save(); // 현재 캔버스 상태 저장
  ctx.translate(innerWidth / 2, innerHeight / 2); // 캔버스의 원점을 이미지 중심으로 이동
  ctx.rotate((aimAngle * Math.PI) / 180);
  ctx.drawImage(
    aimImg,
    -innerWidth / 2,
    -innerHeight / 2,
    innerWidth,
    innerHeight
  );
  ctx.restore(); // 캔버스 상태 복원
}

// Update mouse position on mousemove event
const mouse = document.getElementById("mouse");
let mouseX = 0;
let mouseY = 0;
canvas.addEventListener("mousemove", function (e) {
  var rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left - 30;
  mouseY = e.clientY - rect.top - 30;
});

//별, 돌, 뿌연 효과를 위한 변수
let TOTAL;
let stars = [];
let rocks = [];
let platform;
let speedweight = 1;
let speed = 2;

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
    ctx.lineTo(
      x + velocity.x * speedweight * size,
      y + velocity.y * speedweight * size
    );
    ctx.strokeStyle = `rgba(205, 158, 40, ${opacity})`;
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
    this.size = 1 + distanceFromCenter / 50;
    // this.opacity = Math.max(0.5, 1 - distanceFromCenter / 100); //FadeOut
    this.opacity = Math.min(0.7, distanceFromCenter / 700); //FadeIn

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

const createstarsandrock = (starcount, rockcount) => {
  TOTAL = Math.floor((innerWidth * innerHeight) / starcount); //별 전체 개수 컨트롤
  for (let i = 0; i < TOTAL; i++) {
    const x = randomBetween(innerWidth / 2 - 20, innerWidth / 2 + 20);
    const y = randomBetween(innerHeight / 2 - 20, innerHeight / 2 + 20);
    const velocity = {
      x: randomBetween(-speed, speed),
      y: randomBetween(-speed + 1, speed - 1),
    };
    stars.push(new Star(x, y, velocity));
  }
  // ROCK 생성
  for (let j = 0; j < rockcount; j++) {
    const x = randomBetween(innerWidth / 2 - 20, innerWidth / 2 + 20);
    const y = randomBetween(innerHeight / 2 - 20, innerHeight / 2 + 20);
    const velocity = {
      x: randomBetween(-4, 4),
      y: randomBetween(-2, 2),
    };
    rocks.push(new Rock(x, y, velocity));
  }
};

class Platform {
  constructor(opacity, toOpacity) {
    this.opacity = opacity;
    this.toOpacity = toOpacity;
    this.currentFrame = 0; // 현재 프레임
    this.totalFrames = 10000; // 총 필요한 프레임 수
  }
  easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  } // 이징 함수 적용 => Robert Penner's Easing Functions

  draw() {
    ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  animate() {
    if (this.currentFrame < this.totalFrames) {
      let progress = this.currentFrame / this.totalFrames; // 진행률 (0에서 1 사이)
      let easeProgress = this.easeInOutQuad(progress);

      // 이징 진행률을 사용하여 현재 opacity 계산
      this.opacity =
        (1 - easeProgress) * this.opacity + easeProgress * this.toOpacity;

      this.currentFrame++; // 다음 프레임으로
    }
  }
}

function init() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  stars = [];
  rocks = [];
  platform = new Platform(1.0, 0.3);
  createstarsandrock(100000, 5);
  // STAR 생성
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSpaceship();
  drawAim();
  stars.forEach((stars) => stars.animate());
  rocks.forEach((rocks) => rocks.animate());
  // Platform 인스턴스를 루프 밖으로 이동하고, 한 번만 생성하도록 수정해야 합니다.
  platform.animate(); // 투명도를 조절
  platform.draw(); // 변경된 투명도로 그리기
  ctx.drawImage(mouse, mouseX, mouseY, 50, 50);
  window.requestAnimationFrame(render);
}
window.addEventListener("resize", () => init());

init();
render();
