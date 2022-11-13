module.exports = {
  name: 'nowplaying',
  description: 'Show music now playing',
  inVoiceChannel: true,
  run: async (client, interaction, args) => {
    let voiceChannel = interaction.member.voice.channel
    if (!voiceChannel) {
      return interaction.reply(
        `${client.emotes.error} | You must be in a voice channel to use commands!`
      )
    }
    const queue = client.distube.getQueue(interaction)
    if (!queue) return interaction.reply(`${client.emotes.error} | There is nothing in the queue right now!`)
    const song = queue.songs[0]
    interaction.reply(`${client.emotes.play} | I'm playing **\`${song.name}\`**, by ${song.user}`)
  }
}
