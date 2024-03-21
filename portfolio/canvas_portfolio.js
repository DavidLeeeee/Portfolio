const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
console.log("zzz");
let holoCount = 0;
let holoMax = 70;
let holograms = [];
let hologramCrash = [];

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

class HologramCrash {}

function randomBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
}

const holoColors = [
  "rgba(64, 224, 208, 0.3)",
  "rgba(255, 192, 203, 0.3)",
  "rgba(170, 255, 195, 0.3)",
  "rgba(135, 206, 235, 0.3)",
  "rgba(238, 130, 238, 0.3)",
  "rgba(255, 215, 0, 0.3)",
  "rgba(192, 192, 192, 0.3)",
];
function init() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  holograms = [];
  //   for (let i = 0; i < 10; i++)
  while (holoCount < holoMax) {
    console.log(holoCount);
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
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  holograms.forEach((holograms) => holograms.animate());
  window.requestAnimationFrame(render);
}
window.addEventListener("resize", () => {
  holoCount = 0;
  init();
});

init();
render();
