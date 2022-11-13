module.exports = {
  name: 'playtop',
  description: 'playtop same as play!',
  options: [
    {
      name: 'query',
      description: 'Enter url youtube, spotify, soundcloud!',
      type: 'STRING',
      required: true
    }
  ],
  inVoiceChannel: true,
  run: async (client, interaction, args) => {
    try {
      let voiceChannel = interaction.member.voice.channel
      if (!voiceChannel) {
        return interaction.reply(
          `${client.emotes.error} | You must be in a voice channel to use commands!`
        )
      }
      const string = interaction.options.getString('string')
      if (!string) return interaction.reply(`${client.emotes.error} | Please enter a song url or query to search.`)
      client.distube.play(interaction.member.voice.channel, string, {
        member: interaction.member,
        textChannel: interaction.channel,
        interaction,
        position: 1
      })
    } catch (e) {
      console.log(e)
      interaction.reply("Something went wrong...")
    }
  }
}
