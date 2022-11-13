module.exports = {
  name: 'stop',
  description: 'stop and clear all music in queue!',
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
    queue.stop()
    interaction.reply(`${client.emotes.success} | Stopped!`)
  }
}
