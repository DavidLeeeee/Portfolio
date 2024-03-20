// Define the texts for different stages
const texts = [
  {
    headline: "안녕하세요! 방문자님.",
    description: "저의 `포트폴리오 유니버스`에 오신것을 환영합니다.",
    skip: "Enter !",
  },
  {
    headline: "좀 더 알아보고 싶으신가요?",
    description: "그렇다면 속도를 좀 더 올려보도록 하죠.",
    skip: "Enter !",
  },
  {
    headline: "자... 갑니다!",
    description: "잘 잡으셔야해요!!",
    skip: "Enter !",
  },
  {
    headline: "거의 도착했어요!!!",
    description: "마지막 스퍼트를 올려보도록 하죠!",
    skip: "Enter !",
  },
  {
    headline: "목적지가 보입니다!",
    description: "여기까지 오시느라 고생하셨습니다!",
    skip: "Enter !",
  },
  {},
];

// DOM elements
const headlineElement = document.getElementById("headline");
const descriptionElement = document.getElementById("description");
const skipElement = document.getElementById("skip");
const overlay = document.getElementById("overlay");
const delay = 100;
// 타이핑 애니메이션
function typeWriter(text, element, delay) {
  let index = 0;
  const typing = setInterval(() => {
    element.textContent += text[index];
    index++;
    if (index === text.length) {
      clearInterval(typing);
    }
  }, delay);
}
let textIndex = 0;
function textImporter() {
  const beep = document.getElementById("beep");
  beep.play();
  const text = texts[textIndex];
  headlineElement.textContent = ""; // Clear existing text
  descriptionElement.textContent = ""; // Clear existing text
  skipElement.textContent = ""; // Clear existing text
  overlay.style.display = "block";
  // Start typing animation for headline
  typeWriter(text.headline, headlineElement, delay);
  // Start typing animation for description after a delay
  setTimeout(() => {
    typeWriter(text.description, descriptionElement, delay);
  }, text.headline.length * delay); // Wait until headline typing animation is finished
  setTimeout(() => {
    typeWriter(text.skip, skipElement, 10);
  }, text.headline.length * delay + text.description.length * delay);

  textIndex++;
}

// Process
function Start() {
  if (textIndex < 2) {
    overlay.style.display = "none";
    setTimeout(textImporter, 2000);
  } else if (textIndex >= 2 && textIndex < 4) {
    overlay.style.display = "none";
    speedweight *= 2;
    speed = 4;
    createstarsandrock(10000, 10);
    setTimeout(textImporter, 2000);
  } else if (textIndex == 4) {
    overlay.style.display = "none";
    createstarsandrock(10000, 20);
    setTimeout(textImporter, 4000);
  } else if (textIndex > 4) {
    overlay.style.display = "none";
    let counter = 0;
    const interval = setInterval(() => {
      createstarsandrock(5000, 120);
      counter++;
      if (counter >= 10) {
        clearInterval(interval); // Stop the interval

        setTimeout(() => {
          window.location.href = "./_portfolio/portfolio.html";
        }, 2000); //페이지 이동
      }
    }, 1000);
  }
}
// Show the first text after a delay
setTimeout(Start, 2000);

//다음 요소로 이동
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    Start();
  }
  //마지막 텍스트가 나오면 스킵하도록
  if (skipElement.textContent.length >= texts[textIndex].skip.length) {
  }
});

//skipElement.addEventListener("click", Start);
// function popupText(headline, description, skip) {
//   headlineElement.textContent = headline;
//   descriptionElement.textContent = description;
//   skip.textContent = description;
//   overlay.style.display = "block";
//   typeWriter(text.headline, headlineElement);
//   // Start typing animation for description after a delay
//   setTimeout(() => {
//     typeWriter(text.description, descriptionElement);
//   }, text.headline.length * 100); // Wait until headline typing animation is finished
//   setTimeout(() => {
//     typeWriter(text.skip, skipElement, 0);
//   }, text.headline.length * 100 + text.description.length * 100);
// }
