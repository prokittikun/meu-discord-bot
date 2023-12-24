import { Command } from "./Command";
import { Ping } from "./commands/Ping";
import { Qr } from "./commands/PromptPayQr";

export const Commands: Command[] = [Ping, Qr];