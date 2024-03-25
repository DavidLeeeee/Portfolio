let textobserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "scale(1.1)";
      } else {
        entry.target.style.transform = "scale(1)";
        entry.target.style.opacity = 0;
      }
    });
  },
  { threshold: 0.5 }
);

let imgobserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "scale(1.3)";
      } else {
        entry.target.style.opacity = 0.5;
        entry.target.style.transform = "scale(1)";
      }
    });
  },
  { threshold: 0.5 }
);

let thinkImages = document.querySelectorAll(".thinkArticle img");
let articleTitles = document.querySelectorAll(".articleTitle");
let articleP = document.querySelectorAll(".thinkArticle p");

thinkImages.forEach((img) => {
  imgobserver.observe(img);
});

articleTitles.forEach((title) => {
  textobserver.observe(title);
});

articleP.forEach((p) => {
  textobserver.observe(p);
});
