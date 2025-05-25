const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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

export default function shootConfetti(x, y) {
  for (let i = 0; i < 35; i++) {
    confettiList.push(
      new Confetti(x, y, Math.random() < 0.5 ? 0 : canvas.width)
    );
  }
}

function animate() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

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

animate();
