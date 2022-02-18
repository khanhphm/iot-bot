const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Hello png'),
    async execute(interaction) {
        console.log(interaction);
        await interaction.reply("PONG!!!!");
    }
}