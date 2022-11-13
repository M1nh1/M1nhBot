module.exports = {
  name: 'join',
  description: 'join voice',
  run: async (client, interaction, args) => {
    let voiceChannel = interaction.member.voice.channel
    if (!voiceChannel) {
      return interaction.reply(
        `${client.emotes.error} | You must be in a voice channel to use commands!`
      )
    }
    client.distube.voices.join(voiceChannel)
    interaction.reply({content: 'Thao tác thành công!', ephemeral: true})
  }
}
