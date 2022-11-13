module.exports = {
  name: 'volume',
  description: 'Change volume music!',
  options: [
    {
      name: 'numbers',
      description: '1-100',
      type: 'INTEGER',
      required: true
    }
  ],
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
    const volume = interaction.options.getInteger('numbers')
    if (isNaN(volume)) return interaction.reply(`${client.emotes.error} | Please enter a valid number!`)
    queue.setVolume(volume)
    interaction.reply(`${client.emotes.success} | Volume set to \`${volume}\``)
  }
}
