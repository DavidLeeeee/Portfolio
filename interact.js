// Define the texts for different stages
const texts = [
  {
    headline: "안녕하세요! 확박사님님.",
    description: "오늘도 여전히 딸딸이를 치시는군요.",
    skip: "Enter !",
  },
  {
    headline: "오늘은 무엇을 보고 치셨나요?",
    description: "사쿠라 모모..? 아 이건 한박사님의 소유물이죠",
    skip: "Enter !",
  },
  {
    headline: "자... 싸러 갑시다",
    description: "당신의 정자를 분출하러",
    skip: "Enter !",
  },
  {
    headline: "황종민의 정자 : 아 태어난지 1일 됐는데",
    description: "오늘도 또 휴지에 싸여 죽겠네",
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
          window.location.href = "_portfolio/portfolio.html";
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
