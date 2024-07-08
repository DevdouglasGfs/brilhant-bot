import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import path from 'node:path';
import fs from 'node:fs';
import { commands } from './src/deployment.js';
const { DISCORD_TOKEN } = process.env;

export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
client.commands = commands;

try {
  const eventsPath = path.join(__dirname, 'src', 'events');
  const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.ts'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const {default: event} = await import(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
} catch (error) {
  console.log(error);
}

client.login(DISCORD_TOKEN);
