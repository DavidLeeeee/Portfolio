const OptionText = [
  {
    title: "Profile",
    description: "석희의 프로필",
    state: "available",
    link: "../profile/profile.html",
  },
  {
    title: "Works",
    description: "포트폴리오",
    state: "unavailable",
    link: "../works/works.html",
  },
  {
    title: "Artwork",
    description: "개인 아트워크",
    state: "available",
    link: "../artwork/artwork.html",
  },
];

const RandomText = [
  "삐비빅... 삐빅...",
  "접속중입니다...",
  "안녕하세요. 반가워요.",
  "하단 버튼을 클릭하여 이동하세요..",
  "치..ㅊ.지직..ㅊ.. 신호를 연결합니다.",
  "현재 Works는 이용이 불가합니다.",
];

// 1초 후에 너비를 점차 펼쳐지도록 함
const overlay = document.getElementById("overlay");
const initialWidth = 0; // 초기 너비
const targetWidth = 440; // 목표 너비
const duration = 1000; // 애니메이션 지속 시간 (ms)
// x^2 그래프에 따른 가중치 계산
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
setTimeout(() => {
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const ratio = Math.min(progress / duration, 1); // 비율 계산 (0에서 1까지)
    const easedRatio = easeInOutQuad(ratio); // x^2 그래프에 따른 가중치 적용
    const width = initialWidth + (targetWidth - initialWidth) * easedRatio;
    overlay.style.width = `${width}px`;
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}, 2000);

function promptImporter(RandomText) {
  popupsounds();
  const promptBox = document.getElementById("promptBox");
  const randomIndex = Math.floor(Math.random() * RandomText.length);
  const randomText = RandomText[randomIndex];
  promptBox.textContent = "";
  typeWriter(randomText, promptBox, 100); // 지연 시간은 50ms로 설정했으나 필요에 따라 조절 가능
}
setInterval(() => {
  promptImporter(RandomText);
}, 5000);

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
function popupsounds() {
  const popup = document.getElementById("popup");
  popup.volume = 0.05;
  popup.play();
}

// OptionText 배열을 기반으로 동적으로 아이템 추가
const optionList = document.getElementById("optionList");
OptionText.forEach((OptionText) => {
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  const titlePara = document.createElement("p");
  const descriptionSpan = document.createElement("span");
  const stateSpan = document.createElement("span");

  link.href = OptionText.link;
  //link.textContent = OptionText.title;
  titlePara.textContent = OptionText.title;
  descriptionSpan.textContent = OptionText.description;
  descriptionSpan.id = "description";
  stateSpan.textContent = "•"; // 상태에 따른 점
  stateSpan.style.color = OptionText.state === "available" ? "lime" : "red";
  stateSpan.id = "state";
  //Li에 Link(a)와 하위요소 담기
  listItem.appendChild(link);
  link.appendChild(titlePara);
  link.appendChild(descriptionSpan);
  link.appendChild(stateSpan);
  //Ul에 Li아이템 삽입하기
  optionList.appendChild(listItem);
});
