import { createCanvas, loadImage } from "canvas";

// ตัวอย่างฟังก์ชันรวมรูปภาพ
export async function mergeImages(
  image1Path: string,
  image2Path: string,
  outputPath: string,
  option: { marginTop: number; name: string; price: number }
): Promise<boolean> {
  const image1 = loadImage(image1Path);
  const image2 = loadImage(image2Path);

  return Promise.all([image1, image2])
    .then(async (images) => {
      // กำหนดขนาด canvas เท่ากับขนาดรูปภาพที่ใหญ่ที่สุด
      const canvasWidth = 1000;
      const canvasHeight = 1200;

      // สร้าง canvas ที่มีขนาดเท่ากับ image1
      const canvas = createCanvas(canvasWidth, canvasHeight);
      const context = canvas.getContext("2d");

      // วาดรูปภาพที่ 1 ลงบน canvas
      context.drawImage(images[0], 0, 0);

      const newWidth = images[1].width;
      const newHeight = images[1].height;

      // คำนวณตำแหน่งที่ต้องการวาดรูปภาพที่ 2
      const x = (canvas.width - newWidth) / 2;
      const y = (canvas.height - newHeight) / 2 + option.marginTop;

      // วาดรูปภาพที่ 2 ลงบน canvas ที่ตำแหน่งที่คำนวณไว้
      context.drawImage(images[1], x, y);

      const text = `ชื่อบัญชี : ${option.name}`;
      const textAmount = `จำนวนเงิน : ${option.price} บาท`;
      const textX = x - 2;
      const textY = canvasHeight - 190;

      context.fillStyle = "black";
      context.font = "normal 40px sans-serif";
      context.fillText(text, textX, textY);
      context.fillText(textAmount, textX, textY + 50);

      // บันทึก canvas เป็นไฟล์รูป
      const fs = require("fs");
      const out = fs.createWriteStream(outputPath);
      const stream = canvas.createPNGStream();
      await new Promise((resolve, reject) => {
        stream.pipe(out);
        out.on("finish", () => {
          console.log("The image was created successfully.");
          resolve(true);
        });
        out.on("error", (err: any) => {
          console.error("Error creating image:", err);
          reject(false);
        });
      });
      return true;
    })
    .catch((err) => {
      console.log("err: ", err);
      return false;
    });
}
