module.exports = {
  name: 'shuffle',
  description: 'shuffle mode',
  options: [
    {
      name: 'mode',
      description: 'ON, OFF',
      type: 'STRING',
      required: true
    }
  ],
  inVoiceChannel: true,
  run: async (client, interaction) => {let voiceChannel = interaction.member.voice.channel
    if (!voiceChannel) {
      return interaction.reply(
        `${client.emotes.error} | You must be in a voice channel to use commands!`
      )
    }
    const queue = client.distube.getQueue(interaction)
    const mode = interaction.options.getString('mode')
    if (!queue) return interaction.reply(`${client.emotes.error} | There is nothing in the queue right now!`)
    queue.shuffle()
    interaction.reply(`Shuffled songs in the queue ${mode}`)
  }
}
