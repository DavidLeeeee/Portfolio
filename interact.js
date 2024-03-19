// Text to be displayed with typing animation
const headlineText = "안녕하세요 한진우 박사님";
const descriptionText = "당신은 도파민 중독입니다.";

// DOM elements
const headlineElement = document.getElementById("headline");
const descriptionElement = document.getElementById("description");

// Typing animation function
function typeWriter(text, element, delay = 100) {
  let index = 0;
  const typing = setInterval(() => {
    element.textContent += text[index];
    index++;
    if (index === text.length) {
      clearInterval(typing);
    }
  }, delay);
}

// Show overlay and start typing animation
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block"; // Show the overlay

  // Start typing animation for headline
  typeWriter(headlineText, headlineElement);

  // Start typing animation for description after a delay
  setTimeout(() => {
    typeWriter(descriptionText, descriptionElement);
  }, headlineText.length * 100); // Wait until headline typing animation is finished
});
