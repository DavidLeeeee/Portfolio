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
  "하단에서 선택하여 이동하세요..",
  "치..ㅊ.지직..ㅊ.. 신호를 연결합니다.",
  "현재 Works는 이용이 불가합니다.",
];

const optionList = document.getElementById("optionList");
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

// OptionText 배열을 기반으로 동적으로 아이템 추가
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
