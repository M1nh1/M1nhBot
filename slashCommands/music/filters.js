module.exports = {
  name: 'filter',
  description: '3d, bassboost, echo, karaoke, nightcore',
  options: [
    {
      name: 'mode',
      description: 'Mode music to filter!',
      type: 'STRING',
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
    const choosen = interaction.options.getString('mode')
    if (!queue) return interaction.reply(`${client.emotes.error} | There is nothing in the queue right now!`)
    if (choosen === 'off' && queue.filters?.length) queue.setFilter(false)
    else if (Object.keys(client.distube.filters).includes(choosen)) queue.setFilter(choosen)
    else if (choosen) return interaction.reply(`${client.emotes.error} | Not a valid filter`)
    interaction.reply(`Current Queue Filter: \`${queue.filters.join(', ') || 'Off'}\``)
  }
}
