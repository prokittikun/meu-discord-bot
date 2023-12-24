import { Client } from "discord.js";
import { config } from "dotenv";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
config();
console.log("Bot is starting...");

const client = new Client({
    intents: []
});

ready(client);
interactionCreate(client);
client.login(process.env.DISCORD_BOT_TOKEN)