function handleHorizontalScroll(event) {
  if (event.deltaY !== 0) {
    event.preventDefault();
    const scrollDistance = 50;
    this.scrollLeft += event.deltaY > 0 ? scrollDistance : -scrollDistance;
  }
}

function handleScrollButtons(element, scrollDistance) {
  let intervalId;
  element.addEventListener("mouseover", function () {
    const direction = this.classList.contains("lefter") ? -1 : 1;
    const container = document.getElementById("cardnews");

    intervalId = setInterval(function () {
      container.scrollLeft += scrollDistance * direction;
    }, 10);
  });

  element.addEventListener("mouseout", function () {
    clearInterval(intervalId);
  });
}

// 가로 스크롤 이벤트 리스너 등록
document
  .getElementById("cardnews")
  .addEventListener("wheel", handleHorizontalScroll);

// 좌우 스크롤러 이벤트 리스너 등록
const scrollDistance = 10; // 스크롤 간격
document.querySelectorAll(".lefter, .righter").forEach(function (element) {
  handleScrollButtons(element, scrollDistance);
});

// 이전의 worst 코드
/*
//휠 스크롤 좌-우 적용
document.getElementById("cardnews").addEventListener("wheel", function (event) {
  if (event.deltaY !== 0) {
    // deltaY가 0이 아닌 경우(즉, 세로 스크롤)에만 이벤트를 처리
    event.preventDefault(); // 기본 스크롤 동작 방지

    const scrollDistance = 50; // 스크롤 간격을 조절할 수 있습니다.
    this.scrollLeft += event.deltaY > 0 ? scrollDistance : -scrollDistance; // 마우스 휠 방향에 따라 스크롤 처리
  }
});

//좌우 스크롤러
document.querySelectorAll(".lefter, .righter").forEach(function (element) {
  let intervalId;
  element.addEventListener("mouseover", function () {
    const scrollDistance = 10; // 스크롤 간격을 조절할 수 있습니다.
    const direction = this.classList.contains("lefter") ? -1 : 1;
    const container = document.getElementById("cardnews");

    intervalId = setInterval(function () {
      container.scrollLeft += scrollDistance * direction;
    }, 10);
  });

  element.addEventListener("mouseout", function () {
    clearInterval(intervalId);
  });
});
*/
