module.exports = {
  name: 'leave',
  description: 'Leave the bot out of the voice!',
  run: async (client, interaction) => {
    let voiceChannel = interaction.member.voice.channel
    if (!voiceChannel) {
      return interaction.reply(
        `${client.emotes.error} | You must be in a voice channel to use commands!`
      )
    }
    client.distube.voices.leave(interaction)
    interaction.reply('I\'m disconnecting from the voice!')
  }
}
