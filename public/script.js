const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

if (!username) {
  alert('No username found. Please go back to the homepage.');
  window.location.href = '/';
}

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
const gridSize = 20;
let snake = [{ x: 160, y: 160 }];
let direction = 'right';
let food = { x: 100, y: 100 };
let score = 0;
const gameSpeed = 100;

document.getElementById('home-btn').addEventListener('click', () => {
  window.location.href = '/';
});

function startGame() {
  generateFood();
  gameLoop();
}

function gameLoop() {
  moveSnake();
  if (checkCollision()) {
    alert('Game Over! Score: ' + score);
    saveScore(username, score);
    resetGame();
  }
  if (checkFoodCollision()) {
    score += 10;
    generateFood();
    growSnake();
  }

  drawGame();
  setTimeout(gameLoop, gameSpeed);
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'green';
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, gridSize, gridSize);

  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 20);
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
  };
}

function moveSnake() {
  const head = { ...snake[0] };

  switch (direction) {
    case 'left':
      head.x -= gridSize;
      break;
    case 'right':
      head.x += gridSize;
      break;
    case 'up':
      head.y -= gridSize;
      break;
    case 'down':
      head.y += gridSize;
      break;
  }

  snake.unshift(head);
  snake.pop();
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function checkFoodCollision() {
  const head = snake[0];
  return head.x === food.x && head.y === food.y;
}

function growSnake() {
  const tail = { ...snake[snake.length - 1] };
  snake.push(tail);
}

function resetGame() {
  snake = [{ x: 160, y: 160 }];
  direction = 'right';
  score = 0;
  generateFood();
}

async function saveScore(username, score) {
  const response = await fetch('/save-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, score })
  });

  if (response.ok) {
    console.log('Score saved');
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && direction !== 'down') {
    direction = 'up';
  } else if (event.key === 'ArrowDown' && direction !== 'up') {
    direction = 'down';
  } else if (event.key === 'ArrowLeft' && direction !== 'right') {
    direction = 'left';
  } else if (event.key === 'ArrowRight' && direction !== 'left') {
    direction = 'right';
  }
});

startGame();
