const showBtn = document.querySelector(".show-btn");
const hiddenBtn = document.querySelector(".hidden-btn");
const content = document.querySelector(".main");

showBtn.onclick = function () {
  content.hidden = false;
};

hiddenBtn.onclick = function () {
  content.hidden = true;
};
