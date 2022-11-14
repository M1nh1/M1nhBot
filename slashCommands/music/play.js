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
      return interaction.editReply(
        `${client.emotes.error} | You must be in a voice channel to use commands!`
      )
    }
    const query = interaction.options.getString('query')
    if (!query) return interaction.editReply(`${client.emotes.error} | Please enter a song url or query to search.`)
    await client.distube.play(interaction.member.voice.channel, query, {
      member: interaction.member,
      textChannel: interaction.channel,
      interaction
    })
    const queue = client.distube.getQueue(interaction)
    const q = queue.songs
      .map((song) => `${client.emotes.success} | Added [${song.name}](${song.url}) - \`${song.formattedDuration}\` to the queue by ${song.user}`)
      .join('\n')
    await interaction.editReply({ embeds: [new MessageEmbed().setColor('RED').setDescription(`${q}`)] })
  }
}