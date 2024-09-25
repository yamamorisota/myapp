var input_key_buffer = new Array();
window.addEventListener("keydown", handleKeydown);
function handleKeydown(e) {
   if (isGameOver) return; // ゲームオーバー時にはキー入力を無視する
  e.preventDefault();
  input_key_buffer[e.key] = true;
}
window.addEventListener("keyup", handleKeyup);
function handleKeyup(e) {
   if (isGameOver) return; // ゲームオーバー時にはキー入力を無視する
  e.preventDefault();
  input_key_buffer[e.key] = false;
}


const canvas = document.getElementById("maincanvas");
const ctx = canvas.getContext("2d");
var x = 0;
var y = 300;
var vy = 0;
var isJump = false;
var isGameOver = false;
var blocks = [
  { x: 0, y: 332, w: 200, h: 32 },
  { x: 250, y: 232, w: 200, h: 32 },
  { x: 500, y: 132, w: 300, h: 32 }
];

window.addEventListener("load", update);
window.addEventListener("load", update);

// 画面を更新する関数を定義 (繰り返しここの処理が実行される)
function update() {
  // 画面全体をクリア
  ctx.clearRect(0, 0, 960, 640);

  // 更新後の座標
  var updatedX = x;
  var updatedY = y;

  if (isGameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 上下方向は速度分をたす
    updatedY = y + vy;

    // 落下速度はだんだん大きくなる
    vy = vy + 0.5;

    if (y > 500) {
      // ゲームオーバーのキャラが更に下に落ちてきた時にダイアログを表示し、各種変数を初期化する
      alert("GAME OVER");
      isGameOver = false;
      isJump = false;
      updatedX = 5;
      updatedY = 300;
      vy = 0;
      input_key_buffer = {}; // キーバッファをリセットする
    }
  } else {
    // 入力値の確認と反映
    if (input_key_buffer["ArrowLeft"]) {
      updatedX = x - 2;
    }
    if (input_key_buffer["ArrowUp"]) {
      vy = -7;
      isJump = true;
    }
    if (input_key_buffer["ArrowRight"]) {
      updatedX = x + 2;
    }
     // 画面端のチェック
    if (updatedX < 0) {
      updatedX = 0; // 左端
    }
    if (updatedX > canvas.width - 32) {
      updatedX = canvas.width - 32; // 右端
    }
    if (updatedY < 0) {
      updatedY = 0; // 上端
    }
    if (updatedY > canvas.height - 32) {
      updatedY = canvas.height - 32; // 下端
    }

    // ジャンプ中である場合のみ落下するように調整する
    if (isJump) {
      // 上下方向は速度分をたす
      updatedY = y + vy;

      // 落下速度はだんだん大きくなる
      vy = vy + 0.5;

      // 主人公が乗っているブロックを取得する
      const blockTargetIsOn = getBlockTargetIsOn(x, y, updatedX, updatedY);

      // ブロックが取得できた場合には、そのブロックの上に立っているよう見えるように着地させる
      if (blockTargetIsOn !== null) {
        updatedY = blockTargetIsOn.y - 32;
        isJump = false;
      }
    } else {
      // ブロックの上にいなければジャンプ中の扱いとして初期速度0で落下するようにする
      if (getBlockTargetIsOn(x, y, updatedX, updatedY) === null) {
        isJump = true;
        vy = 0;
      }
    }

    if (y > 400) {
      // 下まで落ちてきたらゲームオーバーとし、上方向の初速度を与える
      isGameOver = true;
      updatedY = 500;
      vy = -15;
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
