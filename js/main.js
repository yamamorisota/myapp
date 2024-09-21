var input_key_buffer = new Array();
window.addEventListener("keydown", handleKeydown);
function handleKeydown(e){
  console.log("key down :" + e.keyCode);
  input_key_buffer[e.keyCode] = true;
}
window.addEventListener("keyup", handleKeyup);
function handleKeyup(e) {
  console.log("key up :" + e.keyCode);
  input_key_buffer[e.keyCode] = false;
}

const canvas = document.getElementById("maincanvas");
const ctx = canvas.getContext("2d");

var x = 0;
var y = 0;

window.addEventListener("load", update);
function update() {
  ctx.clearRect(0, 0, 640, 480);
  if (input_key_buffer[37]) {
    x = x - 1;
  }
  if (input_key_buffer[38]) {
    y = y - 1;
  }
  if (input_key_buffer[39]) {
    x = x + 1;
  }
  if (input_key_buffer[40]) {
    y = y + 1;
  }
  var image = new Image();
  image.src = "./images/character-01/man.png";
  ctx.drawImage(image, x, y, 32, 32);
  window.requestAnimationFrame(update);
}

// var input_key_buffer = new Array();
// window.addEventListener("keydown", handleKeydown);
// function handleKeydown(e) {
//   console.log("key down :" + e.keyCode);
//   input_key_buffer[e.keyCode] = true;
//   if (e.keyCode === 37) {
//     alert("左が押されたよ");
//   }else if (e.keyCode === 38) {
//     alert("上が押されたよ")
//   }else if (e.keyCode === 39) {
//     alert("右が押されたよ")
//   } else if (e.keyCode === 40) {
//     alert("舌が押されたよ")
//   }
// }
// window.addEventListener("keyup", handleKeyup);
// function handleKeyup(e) {
//   console.log("key upo :" + e.keyCode);
//   input_key_buffer[e.keyCode] = false;
//   if (e.keyCode === 37) {
//     alert("左が離されたよ");
//   } else if (e.keyCode === 38) {
//     alert("上が離されたよ");
//   } else if (e.keyCode === 39) {
//     alert("右が離されたよ");
//   } else if (e.keyCode === 40) {
//     alert("下が離されたよ");
//   }
// }
