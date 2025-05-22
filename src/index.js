import shootConfetti from "./shootConfetti.js";
import detectBlow from "./detectBlow.js";

const checkBtn = document.querySelector(".check");

const playBtn = document.querySelector("#playBtn");
const banner = document.querySelector(".banner");
const loadIcon = document.querySelector(".load-wrapper");
const question = document.querySelector(".question");
const cake = document.querySelector(".cake");

playBtn.onclick = function () {
  banner.hidden = true;
  loadIcon.hidden = false;

  loadIcon.addEventListener("animationend", function (e) {
    e.preventDefault();
    question.hidden = false;
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
};

checkBtn.onclick = function () {
  const day = document.querySelector(".date");
  const date = new Date();
  const toDay =
    date.getFullYear() +
    "-" +
    (date.getDay() > 10 ? date.getDay() : "0" + date.getDay()) +
    "-" +
    date.getDate();

  if (day.value === toDay) {
    alert("Hãy thổi vào cổng sạc để tắt nến!!!");
    const audio = document.querySelector("#audio");
    audio.play();

    document.body.style.transition = "background 3s";
    document.body.style.background = "#000";
    question.hidden = true;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let i = 0; i < 10; i++) {
      shootConfetti(0, canvas.height);
      shootConfetti(canvas.width, canvas.height);
    }

    cake.hidden = false;

    // Bắn tự động
    // setInterval(() => {
    //   shootConfetti(0, canvas.height);
    //   shootConfetti(canvas.width, canvas.height);
    // }, 1000);

    // Bắn khi click hoặc chạm
    canvas.addEventListener("click", (e) =>
      shootConfetti(e.clientX, e.clientY)
    );
    canvas.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      shootConfetti(touch.clientX, touch.clientY);
    });

    detectBlow();
  } else {
    Swal.fire({
      icon: "error",
      title: "Sai rồi!!! 😒😒😒",
      text: "Nhập lại đi ",
    });
  }
};

