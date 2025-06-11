export default function sliderImage() {
  const imgList = document.querySelector(".image");
  const slides = Array.from(imgList.children);
  const totalSlides = slides.length;
  const items = 5; // số item hiển thị
  let currentIndex = items;
  const step = 1;
  const speed = 1500;

  slides.forEach((slide) => (slide.style.flexBasis = `calc(100% / ${items})`));

  updatePosition(true);

  for (let i = 0; i < items; i++) {
    const cloneStart = slides[i].cloneNode(true);
    const cloneEnd = slides[totalSlides - items + i].cloneNode(true);
    imgList.appendChild(cloneStart); // clone đầu → cuối
    imgList.insertBefore(cloneEnd, imgList.firstChild); // clone cuối → đầu
  }

  const imgListLength = imgList.children.length;

  let isAnimating;
  setInterval(moveSlide, speed);

  function moveSlide() {
    if (isAnimating) return;
    currentIndex = Math.min(Math.max(currentIndex + step, 0), imgListLength);
    isAnimating = true;

    setTimeout(() => {
      if (currentIndex >= imgListLength - items) {
        currentIndex = items;
        updatePosition(true);
      }
      isAnimating = false;
    }, speed);
    updatePosition(false);
  }

  function updatePosition(instant = false) {
    let offset = -(currentIndex * (100 / items));
    imgList.style.transition = instant ? "none" : `transform ease ${speed}ms`;
    imgList.style.transform = `translateX(${offset}%)`;
  }
}

// arr:  6 7 8 [1 2 3 4 5 6 7 8] 1  2  3
// in:   0 1 2  3 4 5 6 7 8 9 10 11 12 13
