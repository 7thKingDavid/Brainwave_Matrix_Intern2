
document.addEventListener("DOMContentLoaded", () => {
  let slides = document.querySelectorAll("#slider .slides img");
  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 3000);
});
