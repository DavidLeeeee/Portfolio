function drawCirclesWithColor(
  container,
  img,
  circleRadius,
  numCircles,
  verticalCount
) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  const stepX = img.width / numCircles;
  const stepY = img.height / verticalCount;

  for (let j = 0; j < verticalCount; j++) {
    for (let i = 0; i < numCircles; i++) {
      const x = i * stepX + stepX / 2; // 원의 중심 X 좌표
      const y = j * stepY + stepY / 2; // 원의 중심 Y 좌표

      // 원 중심 위치의 픽셀 색상 추출
      const pixelColor = ctx.getImageData(x, y, 1, 1).data;
      const rgbColor = `rgb(${pixelColor[0]}, ${pixelColor[1]}, ${pixelColor[2]})`;

      const circle = document.createElement("div");
      circle.classList.add("circle");
      circle.style.width = circle.style.height = circleRadius + "px"; // 원의 크기 설정
      circle.style.borderRadius = "50%";
      circle.style.backgroundColor = rgbColor; // 추출한 색상 설정
      container.appendChild(circle); // 컨테이너에 원 추가
    }
  }
}

document
  .getElementById("fileUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageSample = document.getElementById("imageSample");
        imageSample.innerHTML = `<img src="${e.target.result}" alt="Selected Image" />`;

        const img = new Image();
        img.onload = function () {
          const paper = document.querySelector(".paper");
          const paperWidth = paper.clientWidth;
          const circleRadius = paperWidth / 80;
          const numCircles = 80;
          const verticalCount = Math.round(
            (img.height / img.width) * numCircles
          );

          paper.innerHTML = "";
          const circleContainer = document.createElement("div");
          circleContainer.classList.add("circle-container");
          paper.appendChild(circleContainer);

          drawCirclesWithColor(
            circleContainer,
            img,
            circleRadius,
            numCircles,
            verticalCount
          );
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

window.addEventListener("load", drawCirclesWithColor); // 페이지 로드 시 초기화
window.addEventListener("resize", drawCirclesWithColor); // 창 크기 조정 시 다시 그리기
