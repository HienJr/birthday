const scene = document.querySelector(".container");
const data = [
  "09/10/2001",
  "Chúc mừng sinh nhật",
  "❤️",
  "Love You",
  "Lê Thị Kim Tốt",
  "Tiffany",
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
const screenWidth = screen.width;

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
  });
}

export default startDropText;

function explodeText(textEl, x, y, z) {
  const textContent = textEl.textContent;
  for (let i = 0; i < textContent.length; i++) {
    const span = document.createElement("span");
    span.textContent = textContent[i];
    span.className = "text";
    camera.appendChild(span);

    let dx = (Math.random() - 0.5) * 100;
    let dy = (Math.random() - 0.5) * 100 - 50;
    let dz = (Math.random() - 0.5) * 200;

    let opacity = 1;
    let frame = 0;

    function animateFragment() {
      dx *= 0.98;
      dy += 1; // gravity
      dz *= 0.98;
      x += dx * 0.1;
      y += dy * 0.1;
      z += dz * 0.1;
      opacity -= 0.02;

      span.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
      span.style.opacity = opacity.toFixed(2);

      if (opacity > 0) {
        requestAnimationFrame(animateFragment);
      } else {
        span.remove();
      }
    }

    animateFragment();
  }
}
