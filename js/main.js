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
var blocks = [
  { x: 0, y: 332, w: 100, h: 32 },
  { x: 150, y: 232, w: 100, h: 32 },
  { x: 300, y: 132, w: 730, h: 32 }
];

window.addEventListener("load", update);
function update() {
  ctx.clearRect(0, 0, 640, 480);
  var updatedX = x;
  var updatedY = y;
  if (input_key_buffer[37]) {
    updatedX = x - 2;
  }
  if (input_key_buffer[38]) {
    vy = -7;
    isJump = true;
  }
  if (input_key_buffer[39]) {
    updatedX = x + 2;
  }

  if (isJump) {
    updatedY = y + vy;
    vy = vy + 0.5;
    const blockTargetIsOn = getBlockTargetIsOn(x, y, updatedX, updatedY);
    if (blockTargetIsOn !== null) {
      updatedY = blockTargetIsOn.y - 32;
      isJump = false;
    }
  } else {
    if (getBlockTargetIsOn(x, y, updatedX, updatedY) === null) {
      isJump = true;
      vy = 0;
    }
  }
  x = updatedX;
  y = updatedY;

  var image = new Image();
  image.src = "./assets/images/character-01/man.png"
  ctx.drawImage(image, x, y, 32, 32);
  var groundImage = new Image();
  groundImage.src = "./assets/images/ground-01/ground.png"
  for (const block of blocks) {
    ctx.drawImage(groundImage, block.x, block.y, block.w, block.h);
 }
  window.requestAnimationFrame(update);
}
function getBlockTargetIsOn(x, y, updatedX, updatedY) {
  for (const block of blocks) {
    if (y + 32 <= block.y && updatedY + 32 >= block.y) {
      if (
        (x + 32 <= block.x || x >= block.x + block.w) && (updatedX + 32 <= block.x || updatedX >= block.x + block.w)
      ) {
        continue;
      }
      return block;
    }
  }
  return null;
}


// window.addEventListener("load", update);
// function update() {
//   ctx.clearRect(0, 0, 9999, 9999);
//   if (input_key_buffer[37]) {
//     x = x - 2;
//   }
//   if (input_key_buffer[38]) {
//     vy = -7;
//     isJump = true;
//   }
//   if (input_key_buffer[39]) {
//     x = x + 2;
//   }
//   if (isJump) {
//     y = y + vy;
//     vy = vy + 0.5;
//   }
//     if (y + 32 > 332) {
//     y = 332 - 32;
//   }
//   var image = new Image();
//   image.src = "./assets/images/character-01/man.png"
//   ctx.drawImage(image, x, y, 32, 32);
//   var groundImage = new Image();
//   console.log("OK");
//   groundImage.src = "./assets/images/ground-01/ground.png"
//   ctx.drawImage(groundImage, 0, 300 + 32, 640, 32);

//   window.requestAnimationFrame(update);
// }
