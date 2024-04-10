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

  for (let j = 0; j < verticalCount; j++) {
    for (let i = 0; i < numCircles; i++) {
      const x = i * (2 * circleRadius) + circleRadius;
      const y = j * (2 * circleRadius) + circleRadius;

      const pixelColor = ctx.getImageData(x, y, 1, 1).data;
      const rgbColor = `rgb(${pixelColor[0]}, ${pixelColor[1]}, ${pixelColor[2]})`;

      const circle = document.createElement("div");
      circle.classList.add("circle");
      circle.style.width = circle.style.height = circleRadius + "px";
      circle.style.borderRadius = "50%";
      circle.style.backgroundColor = rgbColor;
      container.appendChild(circle);
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
