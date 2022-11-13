module.exports = {
  name: 'skip',
  description: 'Skip music!',
  inVoiceChannel: true,
  run: async (client, interaction) => {
    let voiceChannel = interaction.member.voice.channel
    if (!voiceChannel) {
      return interaction.reply(
        `${client.emotes.error} | You must be in a voice channel to use commands!`
      )
    }
    const queue = client.distube.getQueue(interaction)
    if (!queue) return interaction.reply(`${client.emotes.error} | There is nothing in the queue right now!`)
    try {
      const song = await queue.skip()
      interaction.reply(`${client.emotes.success} | Skipped! Now playing:\n${song.name}`)
    } catch (e) {
      interaction.reply(`${client.emotes.error} | ${e}`)
    }
  }
}
