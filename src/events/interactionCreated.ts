import { Events, Interaction } from 'discord.js';
import { FormatErrorMessage } from '../utils/formatters.js';

export default {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    const command = interaction.client.commands.filter((c) => c.data.name === commandName).first();
    console.log(interaction.client.commands.values());
    if (!command) {
      new FormatErrorMessage('Missing command(s)', `No command matching ${commandName} was found.`);
      return;
    }
    try {
      command?.execute(interaction);
    } catch (error) {
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      } else {
        if (commandName === 'ping') {
          interaction.reply(`Websocket heartbeat: ${interaction.client.ws.ping}ms.`);
          const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
          interaction.editReply({
            content: `Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`,
          });
        }
      }
    }
  },
};
