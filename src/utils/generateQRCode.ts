import * as fs from 'fs';
import * as path from 'path';
import * as qr from 'qrcode';

export async function generateQRCode(data: string, outputPath: string): Promise<void> {
  try {
    const qrCodeBuffer = await qr.toBuffer(data);

    const outputFolder = path.dirname(outputPath);
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    fs.writeFileSync(outputPath, qrCodeBuffer);

    console.log(`QR code generated and saved to: ${outputPath}`);
  } catch (error) {
    console.error('Error generating and saving QR code:', error);
  }
}


