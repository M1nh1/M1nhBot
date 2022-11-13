const { MessageEmbed } = require("discord.js")

module.exports = {
  name: 'pause',
  description: 'pause music',
  inVoiceChannel: true,
  run: async (client, interaction) => {
    try {
    let voiceChannel = interaction.member.voice.channel
    if (!voiceChannel) {
      return interaction.reply(
        `${client.emotes.error} | You must be in a voice channel to use commands!`
      )
    }
    const queue = client.distube.getQueue(interaction)
    if (!queue) return interaction.reply(`${client.emotes.error} | There is nothing in the queue right now!`)
    if (queue.paused) {
      return interaction.reply({content: 'The song is already paused!', ephemeral: true})
    }
    queue.pause()
    interaction.reply('Paused the song!')
  } catch (e) {
    console.log(e)
    interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription("Something went wrong...")]})
  }
}}
