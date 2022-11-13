module.exports = {
	name: 'repeat',
	description: 'repeat music',
	options: [
		{
			name: 'mode',
			description: 'change repeat mode!',
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
	  if (!queue) return interaction.reply(`${client.emotes.error} | There is nothing playing!`)
	  const rp = interaction.options.getString('mode')
	  let mode = null
	  switch (rp) {
		case 'off':
		  mode = 0
		  break
		case 'song':
		  mode = 1
		  break
		case 'queue':
		  mode = 2
		  break
	  }
	  mode = queue.setRepeatMode(mode)
	  mode = mode ? (mode === 2 ? 'Repeat queue' : 'Repeat song') : 'Off'
	  interaction.reply(`${client.emotes.repeat} | Set repeat mode to \`${mode}\``)
	}
  }