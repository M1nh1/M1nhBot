module.exports = {
  name: 'resume',
  description: 'Resume the music!',
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
    if (queue.paused) {
      queue.resume()
      interaction.reply('Resumed the song!')
    } else {
      interaction.reply('The queue is not paused!')
    }
  }
}
