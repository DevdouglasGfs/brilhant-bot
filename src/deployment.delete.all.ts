import { REST, Routes } from 'discord.js';
import 'dotenv/config';
const { DISCORD_TOKEN, APP_ID, GUILD_ID } = process.env;

const rest = new REST().setToken(`${DISCORD_TOKEN}`);
(async () => {
  const commandsToDelete: number[] = [1259628721929850964];

  console.log(`Started deleting every global commands ${commandsToDelete}.`);
  if (process.env.NODE_ENV === 'production') {
    await rest
      .put(Routes.applicationCommands(`${APP_ID}`), { body: [] })
      .then(() => console.log('Successfully deleted all application commands.'))
      .catch(console.error);
  } else {
    await rest
      .put(Routes.applicationGuildCommands(`${APP_ID}`, `${GUILD_ID}`), { body: [] })
      .then(() => console.log('Successfully deleted all guild commands.'))
      .catch(console.error);
  }
  console.log(`Finished deleting every commands.`);
})();
