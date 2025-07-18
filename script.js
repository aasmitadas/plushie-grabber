window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // Claw setup
  let clawX = 180;
  let clawY = 0;
  let isDropping = false;

  // Plushie data (just source and position)
  const plushieData = [
    { x: 100, y: 460, imgSrc: 'fish.png' },
    { x: 200, y: 460, imgSrc: 'images.png' },
    { x: 300, y: 460, imgSrc: 'monkey.png' },
    { x: 400, y: 460, imgSrc: 'monnkey.png' },
    { x: 500, y: 460, imgSrc: 'teddy.png' },
    { x: 600, y: 460, imgSrc: 'lion.png' }
  ];

  let plushies = [];

  // Function to load all images and return a promise
  function loadImages() {
    const promises = plushieData.map(data => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = data.imgSrc;
        img.onload = () => {
          plushies.push({ ...data, img });
          resolve();
        };
      });
    });

    return Promise.all(promises);
  }

  // Draw the claw
  function drawClaw() {
    ctx.fillStyle = '#ff669a';
    ctx.fillRect(clawX, clawY, 40, 20);
  }

  // Draw all plushies
  function drawPlushies() {
    plushies.forEach(p => {
      ctx.drawImage(p.img, p.x, p.y, 50, 50);
    });
  }

  // Game loop
  function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawClaw();
    drawPlushies();

    if (isDropping && clawY < 500) {
      clawY += 5;
    } else if (clawY >= 500) {
      isDropping = false;
      setTimeout(() => {
        clawY = 0;
      }, 500);
    }

    requestAnimationFrame(drawGame);
  }

  // Drop button
  document.getElementById('dropButton').addEventListener('click', () => {
    if (!isDropping) {
      isDropping = true;
    }
  });

  // Start after all images load
  loadImages().then(() => {
    requestAnimationFrame(drawGame);
  });
});
