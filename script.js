const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box= 20;
const canvasSize= 400;
let snake= [{x: 160, y:160}];

let direction= "RIGHT";

let food =  {
    x: Math.floor(Math.random()* (canvas.width / box)) * box,
    y: Math.floor(Math.random()* (canvas.height / box)) * box,
};

document.addEventListener("keydown", changeDirection);

function changeDirection(event){
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    
    snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "lime" : "green";
    ctx.fillRect(segment.x, segment.y, box, box);
  });

   ctx.fillStyle = "red";
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
    alert("Game Over!");
    document.location.reload();
  }

   if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };

    } else {
    snake.pop();
  }

  snake.unshift(head);

  

}

setInterval(draw, 100);

