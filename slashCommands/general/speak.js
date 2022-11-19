const { MessageEmbed } = require('discord.js')
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice')
const { getAudioUrl } = require('google-tts-api')

module.exports = {
    name: 'speak',
    description: 'Speak a message in voice.',
    options: [
        {
            name: 'text',
            description: 'Message to speak.',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction) => {
        const { options } = interaction
        const text = options.getString('text')
        const voiceChannel = interaction.member.voice.channel
        const audioURL = getAudioUrl(text, {
            lang: 'vi',
            slow: false,
            host: 'https://translate.google.com',
            timeout: 10000
        })
        const player = createAudioPlayer()
        const resource = createAudioResource(audioURL)

        const voiceConnection = await joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        })
        player.play(resource)
        voiceConnection.subscribe(player)
        interaction.reply({ embeds: [new MessageEmbed().setDescription(`Đã nói xong`).setColor('GREEN')], ephemeral: true })
    }
}