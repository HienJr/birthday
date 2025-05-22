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



// Bắt đầu sau khi người dùng nhấn nút
checkBtn.addEventListener("click", () => {
  const day = document.querySelector(".date");
  const date = new Date();
  const toDay =
    date.getFullYear() +
    "-" +
    (date.getDay() > 10 ? date.getDay() : "0" + date.getDay()) +
    "-" +
    date.getDate();

  if (toDay === toDay) {
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

    animate();

    startMic();
  } else {
    Swal.fire({
      icon: "error",
      title: "Sai rồi!!! 😒😒😒",
      text: "Nhập lại đi ",
    });
  }
});

// On mic
const body = document.body;
const candle = document.querySelectorAll(".candle");
const wick = document.querySelectorAll(".wick");
const flame = document.querySelectorAll(".flame");

async function startMic() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  let stopMic = false;

  analyser.fftSize = 2048; // Độ phân giải
  const bufferLength = analyser.fftSize;
  const dataArray = new Uint8Array(bufferLength);
  source.connect(analyser);

  function detectBlow() {
    if (stopMic) return;
    analyser.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
    const threshold = 15;
    if (average > threshold) {
      wick.forEach((item, index) => {
        item.hidden = true;
      });
      flame.forEach((item) => (item.hidden = true));

      body.style.transition = "background 3s";
      body.style.background = "#fff";

      console.log(Math.random());

      for (let i = 0; i < 15; i++) {
        shootConfetti(0, 0);
        shootConfetti(canvas.width, 0);
      }

      candle.forEach((item) => {
        item.style.opacity = 0;
        item.style.transition = "opacity 3s";
      });

      cake.style.transition = "transform 2s";
      cake.style.transform = "translateY(999px)";

      stopMic = true;
    }
  }
  setInterval(detectBlow, 0);
}
