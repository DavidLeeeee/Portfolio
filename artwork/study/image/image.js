document.addEventListener("DOMContentLoaded", function () {
  const controllers = document.querySelectorAll(".controller");

  controllers.forEach((controller) => {
    let isDragging = false;
    controller.addEventListener("mousedown", function (e) {
      isDragging = true;
      let startX = e.pageX;
      let startLeft = parseInt(controller.style.left, 10) || 0;

      //드래그중
      function onMouseMove(e) {
        if (isDragging) {
          const dx = e.pageX - startX;
          let newLeft = startLeft + dx;
          // 경계 조건 처리
          const containerWidth = controller.parentElement.offsetWidth; //부모요소의 넓이
          const controllerWidth = controller.offsetWidth;
          if (newLeft < 0) {
            newLeft = 0;
          } else if (newLeft > containerWidth - controllerWidth) {
            newLeft = containerWidth - controllerWidth;
          }
          controller.style.left = newLeft + "px";
          const value = calculateValue(
            newLeft,
            containerWidth,
            controllerWidth
          ); // 값 계산
          if (controller.parentElement.id === "vertical") {
            document.getElementById("sized_Box").style.height = value + "px";
          } else if (controller.parentElement.id === "horizontal") {
            document.getElementById("sized_Box").style.width = value + "px";
          }
        }
      }
      function calculateValue(newLeft, containerWidth, controllerWidth) {
        const maxPx = 1000; // 최대 px 값
        const minPx = 100; // 최소 px 값
        const maxPosition = containerWidth - controllerWidth; // 컨트롤러가 이동할 수 있는 최대 위치

        // newLeft를 이용하여 현재 위치의 비율을 계산
        const ratio = newLeft / maxPosition;

        // 비율을 이용하여 최소값과 최대값 사이의 값을 계산
        const value = minPx + ratio * (maxPx - minPx);

        return value;
      }
      function onMouseUp() {
        isDragging = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const imgSelecter = document.getElementById("imgSelecter");
  const fitSelecter = document.getElementById("fitSelecter");
  const aspectSelecter = document.getElementById("aspectSelecter");
  const image = document.querySelector("#sized_Box img");
  const image2 = document.querySelector("#sized_Box2 img");
  const aspectRatioContainer = document.getElementById("sized_Box2");

  imgSelecter.addEventListener("change", function () {
    const selectedValue = this.value;
    // 선택한 값에 따라 이미지를 변경
    if (selectedValue === "9_16") {
      image.src = "../../../assets/16_9.jpg";
      image2.src = "../../../assets/16_9.jpg";
    } else if (selectedValue === "3_4") {
      image.src = "../../../assets/4_3.jpg";
      image2.src = "../../../assets/4_3.jpg";
    } else if (selectedValue === "4_1") {
      image.src = "../../../assets/1_4.jpg";
      image2.src = "../../../assets/1_4.jpg";
    }
  });
  fitSelecter.addEventListener("change", function () {
    const selectedValue = this.value;
    image.style.objectFit = selectedValue;
    image2.style.objectFit = selectedValue;
  });
  aspectSelecter.addEventListener("change", function () {
    const selectedValue = this.value;
    aspectRatioContainer.style.aspectRatio = selectedValue;
  });
});
