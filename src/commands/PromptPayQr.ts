import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../Command";
import generatePayload from "promptpay-qr";
import * as path from "path";
import { generateQRCode } from "../utils/generateQRCode";
import { config } from "dotenv";
import { mergeImages } from "../utils/mergeQrImage";
config();
export const Qr: Command = {
  name: "qr",
  description: "Returns a PromptPay QR photo",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "price",
      description: "price to pay",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const textArgument = interaction.options.get("price")?.value as number;
    const qrData = generatePayload(process.env.PROMPT_PAY_NUMBER as string, {
      amount: textArgument,
    });
    //save to public folder
    const outputFilePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "qr",
      "qr.png"
    );
    const templateImage = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "template.png"
    );

    await generateQRCode(qrData, outputFilePath);
    const outputMergeFilePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "qr",
      "output.png"
    );
    await mergeImages(
      templateImage,
      outputFilePath,
      outputMergeFilePath,
      {
        marginTop: 60,
        name: "นายรัชชานนท์ รัตนวิจิตร",
        price: textArgument,
      }
    );

    const content = `Price is ${textArgument}`;

    await interaction.followUp({
      ephemeral: true,
      content,
      files: [outputMergeFilePath],
    });
  },
};
