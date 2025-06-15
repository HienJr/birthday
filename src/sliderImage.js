class SliderImage {
  constructor(className) {
    this.imgList = document.querySelector(className);
    if (!this.imgList) {
      throw new Error(`Element with selector "${className}" not found.`);
    }
    this.originalSlides = Array.from(this.imgList.children);
    this.originalSlidesLength = this.originalSlides.length;
    this.slides = this.originalSlides.slice(0);
    this.items = 5;
    this.currentIndex = this.items;
    this.speed = 1500;
    this.isAnimating = false;
    this.createTrack();
    this.updatePosition();
  }

  createTrack() {
    const cloneHead = this.slides
      .slice(-this.items)
      .map((node) => node.cloneNode(true));
    const cloneTail = this.slides
      .slice(0, this.items)
      .map((node) => node.cloneNode(true));

    this.slides = cloneHead.concat(this.slides.concat(cloneTail));

    this.imgList.innerHTML = "";
    this.slides.forEach((slide) => {
      slide.style.flexBasis = `calc(100% / ${this.items})`;
      this.imgList.appendChild(slide);
    });
  }

  moveSlide(step) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const length = this.slides.length;

    // this.currentIndex = Math.min(Math.max(this.currentIndex + step, 0), length);
    this.currentIndex += step;

    setTimeout(() => {
      if (this.currentIndex >= length - this.items) {
        this.currentIndex = this.items;
        this.updatePosition(true);
      } else if (this.currentIndex <= 0) {
        this.currentIndex = this.originalSlidesLength;
        this.updatePosition(true);
      }

      this.isAnimating = false;
    }, this.speed);
    this.updatePosition();
  }

  updatePosition(instant = false) {
    const offset = -(this.currentIndex * (100 / this.items));
    this.imgList.style.transition = instant
      ? "none"
      : `transform ease ${this.speed}ms`;
    this.imgList.style.transform = `translateX(${offset}%)`;
  }

  autoSlide(step) {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.moveSlide(step);
    }, this.speed);
  }
}

//orig:  1 2 3 4 5 6 7 8
// in:   0 1 2 3 4 5 6 7
// arr:  4 5 6 7 8 [1 2 3 4 5 6 7 8] 1  2   3  4   5
// in:   0 1 2 3 4  5 6 7 8 9 10 11  12 13 14  14  15

export default function init() {
  const top = new SliderImage(".image-top");
  const bot = new SliderImage(".image-bot");
  top.autoSlide(-1);
  bot.autoSlide(1);
}
