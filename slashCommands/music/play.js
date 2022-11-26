const { MessageEmbed } = require("discord.js")

module.exports = {
  name: 'play',
  description: 'Play music in voice!',
  premium: true,
  options: [
    {
      name: 'query',
      description: 'Link youtube, spotify, soundcloud!',
      type: 'STRING',
      required: true
    }
  ],
  inVoiceChannel: true,
  run: async (client, interaction) => {
    interaction.deferReply()
    let voiceChannel = interaction.member.voice.channel
    if (!voiceChannel) {
      return interaction.reply(
        `${client.emotes.error} | You must be in a voice channel to use commands!`
      )
    }
    const query = interaction.options.getString('query')
    if (!query) return interaction.reply(`${client.emotes.error} | Please enter a song url or query to search.`)
    interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription(`${client.emotes.success} | Searching for ${query}}`)] })
    client.distube.play(interaction.member.voice.channel, query, {
      member: interaction.member,
      textChannel: interaction.channel,
      interaction
    })
  }
}