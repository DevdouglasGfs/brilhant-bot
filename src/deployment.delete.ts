import { REST, Routes } from 'discord.js';
import 'dotenv/config';
const { DISCORD_TOKEN, APP_ID, GUILD_ID } = process.env;

const rest = new REST().setToken(`${DISCORD_TOKEN}`);
(async () => {
  const commandsToDelete: number[] = [1259628721929850964];

  commandsToDelete.forEach(async (commandId) => {
    console.log(`Started deleting the command with id ${commandsToDelete}.`);

    if (process.env.NODE_ENV === 'production') {
      await rest
        .delete(Routes.applicationCommand(`${APP_ID}`, `${commandId}`))
        .then(() => console.log(`Successfully deleted the command with id ${commandId}.`))
        .catch(console.error);
    } else {
      await rest
        .put(Routes.applicationGuildCommand(`${APP_ID}`, `${GUILD_ID}`, `${commandId}`))
        .then(() => console.log(`Successfully deleted the command with id ${commandId}.`))
        .catch(console.error);
    }
  });
  console.log(`Finished deleting commands.`);
})();
