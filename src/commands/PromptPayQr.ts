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
config();
export const Qr: Command = {
  name: "qr",
  description: "Returns a greeting",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "price",
      description: "The text to include in the greeting",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const textArgument = interaction.options.get("price")?.value as number;
    const qrData = generatePayload(process.env.PROMPT_PAY_NUMBER as string, { amount: textArgument });
    //save to public folder
    const outputFilePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "qr",
      "qr.png"
    );

    await generateQRCode(qrData, outputFilePath);

    const content = `Price is ${textArgument}`;

    await interaction.followUp({
      ephemeral: true,
      content,
      files: [outputFilePath],
    });
  },
};
