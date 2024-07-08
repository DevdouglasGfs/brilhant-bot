import { BaseClient, Collection } from 'discord.js';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, { data: SlashCommandBuilder; execute: (interaction: CommandInteraction) => void }>;
  }
}
