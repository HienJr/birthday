const playBtn = document.querySelector("#playBtn");
const banner = document.querySelector(".banner");
const loadIcon = document.querySelector(".load-wrapper");
const cake = document.querySelector(".cake");
const question = document.querySelector(".question");

playBtn.onclick = function () {
  banner.hidden = true;
  loadIcon.hidden = false;

  loadIcon.addEventListener("animationend", function (e) {
    e.preventDefault();
    question.hidden = false;
  });
};

const date = document.querySelector(".date");

const birthDay = "2001-09-10";
const toDay = "2025-09-10";
const timestamp = Date.parse(toDay) - Date.parse(birthDay);
const years = timestamp / (1000 * 60 * 60 * 24 * 365.25);

// //////////////////
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sound = document.getElementById("boomSound");
const startBtn = document.querySelector(".check");

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Confetti {
  constructor(x, y, directionX) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 3;
    this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    this.alpha = 1;
    //  Tốc độ rơi (lực hấp dẫn)
    this.gravity = 0.05;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.2;

    const angle = directionX < x ? -2.5 : -0.6;
    const speed = Math.random() * 6 + 6;
    this.vx =
      speed * Math.cos(angle) + (directionX < x ? -1 : 1) * Math.random() * 2;
    this.vy = speed * Math.sin(angle) + Math.random() * -1;
  }

  update() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
    this.alpha -= 0.001;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
    ctx.globalAlpha = 1;
  }
}

const confettiList = [];

function shootConfetti(x, y) {
  for (let i = 0; i < 35; i++) {
    confettiList.push(
      new Confetti(x, y, Math.random() < 0.5 ? 0 : canvas.width)
    );
  }
}

function animate() {
  // Xoá toàn bộ khung hình trước đó
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Cập nhật và vẽ từng mảnh pháo.
  for (let i = confettiList.length - 1; i >= 0; i--) {
    const confetti = confettiList[i];
    confetti.update();
    confetti.draw();

    // Xoá mảnh pháo nếu mờ hoàn toàn hoặc đã rơi khỏi màn hình.
    if (confetti.alpha <= 0 || confetti.y > canvas.height) {
      confettiList.splice(i, 1);
    }
  }

  // Gọi lại animate() mỗi frame (~60 lần/giây).
  requestAnimationFrame(animate);
}

// Bắt đầu sau khi người dùng nhấn nút
startBtn.addEventListener("click", () => {
  if (date.value === toDay) {
    alert("Hãy thổi vào cổng sạc để tắt nến!!!");
    const audio = document.querySelector("#audio");
    audio.play();

    document.body.style.transition = "background 3s";
    document.body.style.background = "#000";
    question.hidden = true;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let i = 0; i < 30; i++) {
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
  } else {
    Swal.fire({
      icon: "error",
      title: "Sai rồi!!! 😒😒😒",
      text: "Nhập lại đi ",
    });
  }
});

const body = document.body;
const candle = document.querySelectorAll(".candle");
const wick = document.querySelectorAll(".wick");
const flame = document.querySelectorAll(".flame");

async function startMic() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();

  analyser.fftSize = 2048; // Độ phân giải
  const bufferLength = analyser.fftSize;
  const dataArray = new Uint8Array(bufferLength);
  source.connect(analyser);

  function detectBlow() {
    analyser.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
    const threshold = 43;
    if (average > threshold) {
      wick.forEach((item, index) => {
        item.hidden = true;
        // if (item.hidden === true) {
        //   candle[index].style.transition = "opacity .5s";
        //   candle[index].style.opacity = 0;
        // }
      });
      flame.forEach((item) => (item.hidden = true));

      body.style.transition = "background 3s";
      body.style.background = "#fff";

      // document.body.style.transform
    }
  }

  let timerId = setInterval(detectBlow, 0);
}

startMic();
