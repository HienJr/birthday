const scene = document.querySelector(".container");
const data = [
  "Chúc mừng sinh nhật",
  "❤️",
  "LOVE YOU",
  "Tuyệt vời",
  "Vui vẻ",
  "Hạnh phúc",
  "Nhiều tiền",
  "May mắn",
];

const depthLayers = [
  { scale: 0.6, speed: 7, opacity: 0.5, zIndex: 1 },
  { scale: 1, speed: 6, opacity: 0.8, zIndex: 2 },
  { scale: 1.4, speed: 5, opacity: 1, zIndex: 3 },
];

const usedPositions = [];

function getRandomPosition(maxWidth, textWidth) {
  let maxAttempts = 50;
  let attempt = 0;
  const padding = 50;

  while (attempt < maxAttempts) {
    const x = Math.floor(Math.random() * (maxWidth - textWidth));
    let overLap = usedPositions.some(
      (pos) => Math.abs(pos - x) <  padding
    );

    if (!overLap) {
      usedPositions.push(x);
      return x;
    }
    attempt++;
  }
  return null;
}

function createDropText(text) {
  const p = document.createElement("p");
  p.textContent = text;
  p.classList.add("drop-text");

  const layer = depthLayers[Math.floor(Math.random() * depthLayers.length)];
  p.style.color = "white";
  p.style.fontSize = `${24 * layer.scale}px`;
  p.style.animationDuration = `${layer.speed}s`;
  p.style.opacity = layer.opacity;
  p.style.zIndex = layer.zIndex;

  scene.appendChild(p);

  const x = getRandomPosition(window.innerWidth, p.offsetWidth);

  if (x !== null) {
    p.style.top = `-${p.offsetWidth}px`;
    p.style.left = `${x}px`;

    setTimeout(() => {
      p.remove();
      usedPositions.splice(usedPositions.indexOf(x), 1);
    }, layer.speed * 1000);
  } else {
    p.remove();
  }
}

const dataLength = data.length;

function startDropText() {
  setInterval(() => {
    const text = data[Math.floor(Math.random() * dataLength)];
    // console.log(text);

    createDropText(text);
  }, 5);
}

export default startDropText;
