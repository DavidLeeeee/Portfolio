const OptionText = [
  {
    title: "Artistic",
    description: "",
    state: "available",
    link: "ArtisticOptions",
  },
  {
    title: "Science",
    description: "",
    state: "unavailable",
    link: "ScienceOptions",
  },
  {
    title: "Philosophy",
    description: "",
    state: "available",
    link: "PhilosophyOptions",
  },
  {
    title: "Anime",
    description: "",
    state: "available",
    link: "AnimeOptions",
  },
];
const ArtisticOptions = [
  {
    title: "Firework",
    description: "불꽃놀이",
    state: "available",
    link: "artistic/firework/firework.html",
  },
  {
    title: "Pointillism",
    description: "점묘",
    state: "available",
    link: "artistic/pointillism/pointillism.html",
  },
  {
    title: "Ink",
    description: "잉크 넣기",
    state: "available",
    link: "../ink/ink.html",
  },
  {
    title: "Curve's majestic",
    description: "곡선의 미학",
    state: "available",
    link: "artistic/firework/firework.html",
  },
];
const ScienceOptions = [
  {
    title: "Gravity",
    description: "중력",
    state: "available",
    link: "../profile/profile.html",
  },
  {
    title: "Solar System",
    description: "태양계",
    state: "available",
    link: "../profile/profile.html",
  },
  {
    title: "Magnetic Field",
    description: "자기장",
    state: "available",
    link: "../profile/profile.html",
  },
];
const PhilosophyOptions = [
  {
    title: "Death",
    description: "죽음",
    state: "available",
    link: "../profile/profile.html",
  },
  {
    title: "Life",
    description: "인생",
    state: "available",
    link: "../profile/profile.html",
  },
  {
    title: "God's mean",
    description: "신의 뜻",
    state: "available",
    link: "../profile/profile.html",
  },
];
const AnimeOptions = [
  {
    title: "Dragonball",
    description: "에네르기파",
    state: "available",
    link: "../profile/profile.html",
  },
  {
    title: "Life",
    description: "인생",
    state: "available",
    link: "../profile/profile.html",
  },
  {
    title: "God's mean",
    description: "신의 뜻",
    state: "available",
    link: "../profile/profile.html",
  },
];
const RandomText = [
  "삐비빅... 삐빅...",
  "구경하다 가세요!",
  "재밌는 것들을 더욱 채워나갈거에요.",
  "흥미롭게 보셨으면 좋겠어요",
  "초심을 잃지 말자 (24.03.27의 내가)",
  "무엇을 더 채워나가볼까나요",
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
// overlay Starter
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
}, 100);

//Text Prompt Importer
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

let selectedOption = "default";

// OptionText 배열을 기반으로 동적으로 아이템 추가
const optionList = document.getElementById("optionList");

const renderOptions = () => {
  artworks.innerHTML = "";
  OptionText.forEach((OptionText) => {
    const listItem = document.createElement("li");
    const divBox = document.createElement("div"); //상자
    const titlePara = document.createElement("p"); //제목
    const descriptionSpan = document.createElement("span"); //설명
    const stateSpan = document.createElement("span"); //상태

    // 각 div를 클릭할 경우 selectedOption에 각자의 link: "PhilosophyOptions",값을 넣는다.
    // 이 값이 default가 아니라면, artworks요소에 해당 selectedOption에 따라서 forEach한다.
    titlePara.textContent = OptionText.title;
    descriptionSpan.textContent = OptionText.description;
    descriptionSpan.id = "description";
    stateSpan.textContent = "•"; // 상태에 따른 점
    stateSpan.style.color = OptionText.state === "available" ? "lime" : "red";
    stateSpan.id = "state";
    //Li에 Link(a)와 하위요소 담기
    listItem.appendChild(divBox);
    divBox.appendChild(titlePara);
    divBox.appendChild(descriptionSpan);
    divBox.appendChild(stateSpan);
    listItem.addEventListener("click", () => {
      selectedOption = OptionText.link;
      renderArtworks();
    });
    //Ul에 Li아이템 삽입하기
    optionList.appendChild(listItem);
  });
};

const artworks = document.getElementById("artworks");

const renderArtworks = () => {
  optionList.innerHTML = "";

  if (selectedOption !== "default") {
    let selectedArray;
    switch (selectedOption) {
      case "ArtisticOptions":
        selectedArray = ArtisticOptions;
        break;
      case "ScienceOptions":
        selectedArray = ScienceOptions;
        break;
      case "PhilosophyOptions":
        selectedArray = PhilosophyOptions;
        break;
      case "AnimeOptions":
        selectedArray = AnimeOptions;
        break;
      default:
        renderOptions();
        break;
    }
    selectedArray.forEach((item) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = item.title;
      link.href = item.link;
      listItem.appendChild(link);
      artworks.appendChild(listItem);
    });
    const backbutton = document.createElement("button");
    backbutton.textContent = "뒤로가기";
    backbutton.addEventListener("click", () => {
      renderOptions();
    });
    artworks.appendChild(backbutton);
  }
};

// 초기 렌더
renderOptions();
