import dropText from "./dropText.js";
import shootConfetti from "./shootConfetti.js";
import stream from "./allowMic.js";

const cake = document.querySelector(".cake");
const body = document.body;
const candle = document.querySelectorAll(".candle");
const wick = document.querySelectorAll(".wick");
const flame = document.querySelectorAll(".flame");
const image = document.querySelector(".image");

async function startMic() {
  // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
    const threshold = 45;
    if (average > threshold) {
      wick.forEach((item, index) => {
        item.hidden = true;
      });
      flame.forEach((item) => (item.hidden = true));

      for (let i = 0; i < 15; i++) {
        shootConfetti(0, 0);
        shootConfetti(canvas.width, 0);
        shootConfetti(0, canvas.height);
        shootConfetti(canvas.width, canvas.height);
      }

      candle.forEach((item) => {
        item.style.opacity = 0;
        item.style.transition = "opacity 3s";
      });

      setTimeout(() => {
        image.style.display = "none";
        cake.style.transition = "transform 3s";
        cake.style.transform = "translateY(999px)";
        dropText();
      }, 3000);

      stopMic = true;
    }
  }
  setInterval(detectBlow, 0);
}

export default startMic;
