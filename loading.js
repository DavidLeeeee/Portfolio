//각각의 창을 넘길 때, 생기는 로딩 페이지

const loadingModal = document.getElementById("loadingModal");
loadingModal.style.backgroundColor = "rgba(0,0,0,0.2)";
const loadbox = document.createElement("div");
const loadText = document.createElement("p");
const loadgauge = document.createElement("div");
loadbox.id = "loadbox";
// loadbox.style.backgroundColor = "rgba(0,0,0,1)";
loadbox.style.width = "400px"; // 너비 설정
loadbox.style.height = "40px"; // 높이 설정
loadbox.style.margin = "auto";

loadText.is = "loadText";
loadText.textContent = "Loading . . .";
loadText.style.color = "white"; // 텍스트 색상 설정

loadgauge.id = "loadgauge";
loadgauge.style.width = "380px"; // 너비 설정
loadgauge.style.height = "8px"; // 높이 설정
loadgauge.style.borderRadius = "12px";
loadgauge.style.backgroundColor = "rgba(255,255,255,0.8)";

// 생성된 요소들을 loadingModal에 추가
loadingModal.appendChild(loadbox);
loadbox.appendChild(loadText);
loadbox.appendChild(loadgauge);

// 로딩 애니메이션을 시작하는 함수
function startLoadingAnimation() {
  // 로딩 게이지의 너비를 0으로 설정합니다.
  loadgauge.style.width = "0";

  // 애니메이션을 지연시키고 시작합니다.
  setTimeout(function () {
    // 1.5초에 걸쳐 로딩 게이지를 채우는 애니메이션을 적용합니다.
    loadgauge.style.transition = "width 1.5s";
    loadgauge.style.width = "380px"; // 로딩 게이지의 최대 너비로 설정합니다.
    loadgauge.style.background = "linear-gradient(90deg, #002 0%, #115 100%)"; // 파란색으로 변경합니다.
  }, 100); // 100ms의 지연시간을 설정합니다.
  setTimeout(function () {
    loadingModal.style.display = "none";
  }, 1500);
}

// 로딩 애니메이션을 시작합니다.
startLoadingAnimation();
