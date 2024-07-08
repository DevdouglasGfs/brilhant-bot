import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { SlashCommandBuilder, REST, Routes, Client, Collection, RESTPutAPIApplicationCommandsResult } from 'discord.js';
import { RESTPutAPIApplicationGuildCommandsResult } from 'discord-api-types/v10';
import { FormatErrorMessage } from './utils/formatters.js';
const { APP_ID, GUILD_ID, DISCORD_TOKEN } = process.env;

export const commands = new Collection() satisfies typeof Client.prototype.commands;
const commandsData: SlashCommandBuilder[] = [];

export const mapCommands = async (baseRouter?: string) => {
  const foldersPath = path.join(__dirname, baseRouter || 'commands');
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const {
        default: { data, execute },
      } = await import(filePath);

      if (data && execute) {
        const { commandName } = data;

        commands.set(commandName, { data, execute });
        commandsData.push(data.toJSON());
      } else {
        new FormatErrorMessage('Missing command(s)', `Command missing in: ${!data ? 'data' : ''} ${!execute ? 'execute' : ''}`);
      }
    }
  }
};

const rest = new REST().setToken(`${DISCORD_TOKEN}`);
(async () => {
  await mapCommands();
  try {
    console.log(`Started refreshing ${commandsData.length} application (/) commands.`);

    const data = async () => {
      if (process.env.NODE_ENV === 'production') {
        return await rest.put(Routes.applicationCommands(`${APP_ID}`), {
          body: commandsData,
        });
      } else {
        return await rest.put(Routes.applicationGuildCommands(`${APP_ID}`, `${GUILD_ID}`), {
          body: commandsData,
        });
      }
    };
    const res = await (data() as Promise<RESTPutAPIApplicationGuildCommandsResult | RESTPutAPIApplicationCommandsResult>);
    console.log(`Successfully reloaded ${res.length} application (/) commands.`);
  } catch (error) {
    console.log(error);
  }
})();
