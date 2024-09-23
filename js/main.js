var input_key_buffer = new Array();
window.addEventListener("keydown", handleKeydown);
function handleKeydown(e) {
  e.preventDefault();
  input_key_buffer[e.keyCode] = true;
}
window.addEventListener("keyup", handleKeyup);
function handleKeyup(e) {
  e.preventDefault();
  input_key_buffer[e.keyCode] = false;
}
const canvas = document.getElementById("maincanvas");
const ctx = canvas.getContext("2d");
var x = 0;
var y = 300;
var vy = 0;
var isJump = false;
window.addEventListener("load", update);
function update() {
  ctx.clearRect(0, 0, 9999, 9999);
  if (input_key_buffer[37]) {
    x = x - 2;
  }
  if (input_key_buffer[38]) {
    vy = -7;
    isJump = true;
  }
  if (input_key_buffer[39]) {
    x = x + 2;
  }
  if (isJump) {
    y = y + vy;
    vy = vy + 0.5;
  }
    if (y + 32 > 332) {
    y = 332 - 32;
  }
  var image = new Image();
  image.src = "./assets/images/character-01/man.png"
  ctx.drawImage(image, x, y, 32, 32);
  var groundImage = new Image();
  console.log("OK");
  groundImage.src = "./assets/images/ground-01/ground.png"
  ctx.drawImage(groundImage, 0, 300 + 32, 640, 32);

  window.requestAnimationFrame(update);
}
