import chalk from 'chalk';
import 'dotenv/config';
import { Client, Events } from 'discord.js';
const { DISCORD_TOKEN } = process.env;

export default {
  name: Events.ClientReady,
  async execute(readyClient: Client) {
    if(!readyClient.isReady()) await readyClient.login(DISCORD_TOKEN);
    else console.log(`🚀 Ready! Logged in as ${chalk.cyan(readyClient.user.tag)}`);
  },
  once: true,
};
