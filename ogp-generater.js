const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

const IMAGE_SIZE = {
  width: 600,
  height: 315,
};
const FONT_SETTING = '36px "YuGothic";';
const BACKGROUND_COLOR = "#eee";
("#CCCCCC");
const PADDING = 50;

const main = (postTitle, fileName) => {
  const canvas = createCanvas(IMAGE_SIZE.width, IMAGE_SIZE.height);
  const ctx = canvas.getContext("2d");

  // 背景の作成
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, IMAGE_SIZE.width, IMAGE_SIZE.height);

  // 下部のアイコンの挿入

  // タイトルの埋め込み
  ctx.font = FONT_SETTING;
  ctx.fillStyle = "#000000";
  ctx.fillText(postTitle, 50, 100);

  // 画像出力
  canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, "text.png")));
};

main("こんにちは、今日も元気です");
