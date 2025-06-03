const container = document.querySelector(".container");
const data = [
  "09/10/2001",
  "Chúc mừng sinh nhật",
  "❤️",
  "Love You",
  "Lê Thị Kim Tốt",
  "Tiffany",
  "Vui vẻ",
  "Hạnh phúc",
];

const depthLayers = [
  { scale: 0.6, speed: 7, opacity: 0.5, zIndex: 1 },
  { scale: 1, speed: 6, opacity: 0.8, zIndex: 2 },
  { scale: 1.4, speed: 5, opacity: 1, zIndex: 3 },
];

const usedPositions = [];
const screenWidth = screen.width;
const screenHeight = screen.height;

function getRandomPosition(maxWidth, textWidth) {
  let maxAttempts = 50;
  let attempt = 0;
  const padding = screenWidth > 1024 ? 80 : 30;

  while (attempt < maxAttempts) {
    const x = Math.floor(Math.random() * (maxWidth - textWidth));
    let overLap = usedPositions.some((pos) => Math.abs(pos - x) < padding);

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
  p.style.fontSize =
    screenWidth > 1024 ? `${24 * layer.scale}px` : `${16 * layer.scale}px`;
  p.style.animationDuration = `${layer.speed}s`;
  p.style.opacity = layer.opacity;
  p.style.zIndex = layer.zIndex;

  container.appendChild(p);

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
  });
  for (let i = 0; i < starCount; i++) {
    const start = createStar();
    bg.appendChild(start);
  }
}

export default startDropText;

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", (e) => {
    const beta = e.beta;
    const gama = e.gamma;

    const angleX = Math.max(-60, Math.min(60, beta - 30));
    const angleY = Math.max(-90, Math.min(90, gama));

    container.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  });
}

// Star background
const starCount = 80;
const bg = document.querySelector(".star-background");

function createStar() {
  const start = document.createElement("div");
  start.className = "star";

  start.style.width = `${Math.floor(Math.random() * 3) + 1}px`;
  start.style.height = `${Math.floor(Math.random() * 3) + 1}px`;

  start.style.left = `${Math.random() * screenWidth}px`;
  start.style.top = `${Math.random() * screenHeight}px`;

  start.style.animationDelay = `${Math.random() * 3}s`;

  return start;
}
