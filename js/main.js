const canvas = document.getElementById("maincanvas");
const ctx = canvas.getContext("2d");

window.addEventListener("load", update);

function update() {
  console.log("OK");
  ctx.clearRect(0, 0, 640, 480);
  var image = new Image();
  image.src = "./images/character-01/man.png";
  ctx.drawImage(image, 0, 0, 32, 32);

  window.requestAnimationFrame(update);
}
