module.exports = {
  name: 'autoplay',
  inVoiceChannel: true,
  run: async (client, interaction) => {
    const queue = client.distube.getQueue(interaction)
    if (!queue) return interaction.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    const autoplay = queue.toggleAutoplay()
    interaction.channel.send(`${client.emotes.success} | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)
  }
}
