//각각의 창을 넘길 때, 생기는 로딩 페이지

const loadingModal = document.getElementById("loadingModal");

const loadbox = document.createElement("div");
const loadText = document.createElement("p");
const loadgauge = document.createElement("div");
loadbox.id = "loadbox";
loadbox.style.backgroundColor = "rgba(0,0,0,1)";
loadbox.style.width = "400px"; // 너비 설정
loadbox.style.height = "200px"; // 높이 설정
loadbox.style.margin = "auto";

loadText.is = "loadText";
loadText.textContent = "Loading . . .";
loadText.style.color = "white"; // 텍스트 색상 설정

loadgauge.id = "loadgauge";
loadgauge.style.width = "380px"; // 너비 설정
loadgauge.style.height = "5px"; // 높이 설정

// 생성된 요소들을 loadingModal에 추가
loadingModal.appendChild(loadbox);
loadbox.appendChild(loadText);
loadbox.appendChild(loadgauge);
//loadingModal => (안의 내용물 전부 중앙정렬)absolute, background = (0,0,0,0.8) 에서 시간에 따라 (0,0,0,0)으로 변함
//
//loadbox => flex,column, width=> 400px height=200px
//loadText => color="white"
//loadgauge => width = 380px, height = 5px
