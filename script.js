let eatSound, gameOverSound, clickSound;
let audioInitialized = false;
function initSounds() {
  eatSound = new Audio("eat.mp3");
  gameOverSound = new Audio("gameover.mp3");
  clickSound = new Audio("click.mp3");
  audioInitialized = true;
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreValue = document.getElementById("scoreValue");

const box= 20;
const canvasSize= 400;


let snake= [{x: 160, y:160}];

let direction= "RIGHT";

const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreText = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");


let gameOver = false;

let food =  {
    x: Math.floor(Math.random()* (canvas.width / box)) * box,
    y: Math.floor(Math.random()* (canvas.height / box)) * box,
};

let theme = 'dark'; 

const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
  if (theme === 'dark') {
    document.body.classList.add("light");
    theme = 'light';
    toggleBtn.textContent = "Dark Mode";
  } else {
    document.body.classList.remove("light");
    theme = 'dark';
    toggleBtn.textContent = "Light Mode";
  }
});

restartBtn.addEventListener("click", () => {
  if (clickSound) {
  clickSound.currentTime = 0;
  clickSound.play();
}
  snake = [{ x: 160, y: 160 }];
  direction = "RIGHT";
  food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
  };
  gameOver = false;
  gameOverScreen.style.display = "none";
});

document.addEventListener("keydown", (event) => {
  if (!audioInitialized) initSounds();
  changeDirection(event);
});

function changeDirection(event){
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

document.addEventListener("keydown", () => {
  if (!eatSound) {
    eatSound = new Audio("eat.mp3");
    gameOverSound = new Audio("gameover.mp3");
    clickSound = new Audio("click.mp3");
  }
}, { once: true });

function draw() {
 
  if (gameOver) return;

  ctx.clearRect(0, 0, canvasSize, canvasSize);

  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0
      ? (theme === 'dark' ? "#FFD700" : "#00FF00")
      : (theme === 'dark' ? "#FFEA70" : "#7CFC00");
    ctx.fillRect(segment.x, segment.y, box, box);
  });

  
  ctx.fillStyle = theme === 'dark' ? "blue" : "red";
  ctx.fillRect(food.x, food.y, box, box);


   let head = { ...snake[0] };

   if (direction === "UP") head.y -= box;
   if (direction === "DOWN") head.y += box;
   if (direction === "LEFT") head.x -= box;
   if (direction === "RIGHT") head.x += box;

   if (
  head.x < 0 ||
  head.x >= canvasSize ||
  head.y < 0 ||
  head.y >= canvasSize ||
  snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
  gameOver = true;
  if (gameOverSound) {
  gameOverSound.currentTime = 0;
  gameOverSound.play();
}
  finalScoreText.textContent = snake.length - 1;
  gameOverScreen.style.display = "block";
  return;
  }

   if (head.x === food.x && head.y === food.y) {
   if (eatSound) {
  eatSound.currentTime = 0;
  eatSound.play();
}
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };

    } else {
    snake.pop();
  }

  snake.unshift(head);

  scoreValue.textContent = snake.length - 1;


}

setInterval(draw, 100);

