document
  .getElementById("fileUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageSample = document.getElementById("imageSample");
        imageSample.innerHTML = `<img src="${e.target.result}" alt="Selected Image" />`;
      };
      reader.readAsDataURL(file);

      //가로세로비율 가져오기 => 점묘하기
      getImageAspectRatio(file, function (aspectRatio) {
        const paper = document.querySelector(".paper");
        const paperWidth = paper.clientWidth; // paper 요소의 가로 길이를 가져옵니다.
        const circleRadius = paperWidth / 80; // 원의 반지름을 계산합니다.

        paper.innerHTML = ""; // 기존 요소를 지웁니다.

        // 원들을 감싸는 컨테이너 요소를 생성합니다.
        const circleContainer = document.createElement("div");
        circleContainer.classList.add("circle-container");
        paper.appendChild(circleContainer);

        // 원 그리기 함수 호출
        drawCircles(circleContainer, 80, circleRadius, 80 * aspectRatio);
      });
    }
  });

function getImageAspectRatio(file, callback) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      const width = this.width;
      const height = this.height;
      const aspectRatio = Math.round((height / width) * 10) / 10; // 소수점 첫째 자리까지 반올림

      // 콜백 함수를 호출하여 결과 전달
      callback(aspectRatio);
    };
  };

  reader.readAsDataURL(file);
}

function drawCircles(container, numCircles, circleRadius, verticalCount) {
  for (let j = 0; j < verticalCount; j++) {
    for (let i = 0; i < numCircles; i++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      circle.style.width = circle.style.height = circleRadius + "px"; // 원의 크기를 설정합니다.
      circle.style.borderRadius = "80%";
      circle.style.backgroundColor = "black"; // 색상을 설정합니다.
      container.appendChild(circle); // container 안에 원을 추가합니다.
    }
  }
}
