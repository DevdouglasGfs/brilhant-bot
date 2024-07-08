import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export default {
  name: 'ping',
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  async execute(interaction: CommandInteraction) {
    interaction.reply(`Websocket heartbeat: ${interaction.client.ws.ping}ms.`);
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
  },
};
