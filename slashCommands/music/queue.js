module.exports = {
  name: 'queue',
  description: 'List all music',
  run: async (client, interaction) => {
    let voiceChannel = interaction.member.voice.channel
    if (!voiceChannel) {
      return interaction.reply(
        `${client.emotes.error} | You must be in a voice channel to use commands!`
      )
    }
    const queue = client.distube.getQueue(interaction)
    if (!queue) return interaction.reply(`${client.emotes.error} | There is nothing playing!`)
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n')
    interaction.reply(`${client.emotes.queue} | **Server Queue**\n${q}`)
  }
}
