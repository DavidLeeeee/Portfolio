const canvas = document.getElementById("ArtCanvas");
const ctx = canvas.getContext("2d");

canvas.style.backgroundColor = "black";

let shots = []; // Shot 객체들을 저장할 배열
let firework = [];
const types = ["circle", "umbrella", "splash"];
const colors = ["red", "yellow", "green", "blue", "orange", "pink", "white"];

class Shot {
  constructor(x, y, color, type, scale) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.type = type;
    this.scale = scale;
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 5, 5);
  }
  animate() {
    if (this.y > innerHeight / this.scale) {
      this.y -= randomBetween(0, 3);
    } else {
      deleteShot(this);
    }
    this.draw();
  }
}
function deleteShot(shot) {
  switch (shot.type) {
    case "circle":
      setTimeout(() => {
        firework.push(new Circle(shot.x, shot.y, shot.color, shot.scale - 1));
      }, 500);
      firework.push(new Circle(shot.x, shot.y, shot.color, shot.scale));
      break;
    case "umbrella":
      const delays = [200, 400, 600];
      delays.forEach((delay) => {
        setTimeout(() => {
          firework.push(
            new Umbrella(
              shot.x,
              shot.y,
              `rgba(${Math.random() * 255},${Math.random() * 255},${
                Math.random() * 255
              })`,
              shot.scale - 1
            )
          );
        }, delay);
      });
      firework.push(new Umbrella(shot.x, shot.y, shot.color, shot.scale));
      break;

    case "splash":
      firework.push(new Splash(shot.x, shot.y, shot.color, shot.scale));
      break;
    default:
      console.error("Invalid type");
  }
  const index = shots.indexOf(shot); // shot 객체의 인덱스를 찾습니다.
  if (index !== -1) {
    shots.splice(index, 1); // 해당 인덱스의 요소를 배열에서 제거합니다.
  }
}

//불꽃놀이 생성자
class Firework {
  constructor(x, y, color, scale) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.scale = scale;
    this.sparks = [];
  }
}

class Circle extends Firework {
  constructor(x, y, color, scale) {
    super(x, y, color, scale);
    this.radius = 0;
    this.speed = 1;
    this.maxRadius = scale * 50;
    this.gravity = 0.3;
  }
  draw() {
    const { x, y, color } = this;
    const numSparks = this.scale * 4; // 불꽃 개수
    const angleIncrement = (Math.PI * 2) / numSparks; // 각도 증가량 계산
    for (let i = 0; i < numSparks; i++) {
      const angle = angleIncrement * i; // 현재 각도 계산
      const sparkX = x + Math.cos(angle) * this.radius; // 원의 x 좌표
      const sparkY = y + Math.sin(angle) * this.radius; // 원의 y 좌표
      // 원 그리기
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, 2, 0, Math.PI * 2); // 반지름이 5인 원 그리기
      ctx.fillStyle = color;
      ctx.fill(); // 원 내부를 채우기
    }
  }

  animate() {
    this.y += this.gravity; // 원의 중심을 y방향으로 내리기
    this.radius += this.speed; // 반지름 증가
    if (this.radius >= this.maxRadius) {
      //opacity를 2초에 걸쳐 점점 1에서 0으로 줄여도 좋을듯
      return;
    }
    this.draw(); // 그리기
  }
}
class Umbrella extends Firework {
  constructor(x, y, color, scale) {
    super(x, y, color, scale);
    this.radius = 0;
    this.speed = 1;
    this.maxRadius = scale * 30;
    this.gravity = 0.8;
  }
  draw() {
    const { x, y, color } = this;
    const numSparks = this.scale * 4; // 불꽃 개수
    const angleIncrement = (Math.PI * 2) / numSparks; // 각도 증가량 계산
    for (let i = 0; i < numSparks; i++) {
      const angle = angleIncrement * i; // 현재 각도 계산
      const sparkX = x + Math.cos(angle) * this.radius; // 원의 x 좌표
      const sparkY = y + Math.sin(angle) * this.radius; // 원의 y 좌표
      // 원 그리기
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, 1, 0, Math.PI * 2); // 반지름이 5인 원 그리기
      ctx.fillStyle = color;
      ctx.fill(); // 원 내부를 채우기
    }
  }

  animate() {
    this.y += this.gravity; // 원의 중심을 y방향으로 내리기
    this.radius += this.speed; // 반지름 증가
    if (this.radius >= this.maxRadius) {
      return;
    }
    this.draw(); // 그리기
  }
}
class Splash extends Firework {
  constructor(x, y, color, scale) {
    super(x, y, color, scale);
    this.lineLengths = 1;
    this.maxLineLength = 300; // 최대 직선 길이
    this.speed = 1; // 선 그리는 속도
  }

  drawLine(startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  draw() {
    const { x, y } = this;
    const ranx = randomBetween(-15, 15);
    const rany = randomBetween(-15, 15);
    for (let i = 0; i < this.lineLengths; i++) {
      this.drawLine(x, y, x + ranx, y + rany); // 오른쪽으로 뻗어나가는 직선
    }
  }
  animate() {
    this.draw();
    setTimeout(() => {
      removeFirework(this);
    }, 500);
  }
}
function removeFirework(fireworkToRemove) {
  const index = firework.indexOf(fireworkToRemove);
  if (index !== -1) {
    firework.splice(index, 1);
  }
}

function randomBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
}
//불꽃탄 발사
const createfirework = () => {
  const x = randomBetween(0, innerWidth);
  const y = randomBetween(innerHeight, innerHeight);
  //const color = colors[Math.floor(Math.random() * colors.length)]; // 랜덤으로 color 선택
  const type = types[Math.floor(Math.random() * types.length)]; // 랜덤으로 type 선택
  //const type = "circle";
  const color =
    "rgba(" +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    ")";
  const scale = randomBetween(2, 5);
  const newShot = new Shot(x, y, color, type, scale);
  shots.push(newShot);
};
setInterval(createfirework, 200);

function init() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  //createfirework();
}

function render() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  //캔버스를 초기화하지 않고, 화면에 반투명막을 쌓으면서 잔상처럼 보이도록
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  shots.forEach((shot) => {
    shot.animate(); // 저장된 Shot 객체들을 화면에 그림
  });
  firework.forEach((firework) => {
    firework.animate();
  });
  window.requestAnimationFrame(render);
}

window.addEventListener("resize", () => init());
init();
render();
