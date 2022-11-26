const { MessageEmbed } = require('discord.js')
const verifySchema = require('../Models/Verify')
const suggestionSchema = require('../Models/Suggestion')
const embedLength = require('@discordjs/builders')

module.exports = {
    name: 'interactionCreate',
        
    run: async (interaction, client) => {
        if (interaction.isButton()) {
            const { guildId, guild, customId, member, message } = interaction

            const queue = client.distube.getQueue(interaction)

            if (customId == 'verify') {

                const data = await verifySchema.findOne({ Guild: guild.id })

                if (!data)
                    return interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription("❌ | Looks like you haven't created a verify system yet.")], ephemeral: true });

                const role = guild.roles.cache.get(data.Role)
                if (member.roles.cache.find(r => r.id === role.id)) return interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription("❌ | You're already verified as a member.")], ephemeral: true })

                await member.roles.add(role)

                interaction.reply({ embeds: [new MessageEmbed().setColor('GREEN').setDescription("✅ | You're now verified as a member")], ephemeral: true })
            } else if (customId == 'stop') {
                if (!interaction.member.voice.channel) return interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription(`${client.emotes.error} | You need to join the voice channel first.`)], ephemeral: true })
                if (interaction.member.voice.channel !== interaction.guild.me.voice.channel) return interaction.reply({ content: `${client.emotes.error} | You need to join same voice as bot`, ephemeral: true })
                queue.stop()
                interaction.reply({ content: `${client.emotes.success} | Stopped!`, ephemeral: true })
            } else if (customId == 'pause-resume') {
                if (!interaction.member.voice.channel) return interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription(`${client.emotes.error} | You need to join the voice channel first.`)], ephemeral: true })
                if (interaction.member.voice.channel !== interaction.guild.me.voice.channel) return interaction.reply({ content: `${client.emotes.error} | You need to join same voice as bot`, ephemeral: true })
                if (!queue.paused) {
                    queue.pause()
                    interaction.reply({ content: `${client.emotes.success} | Paused!`, ephemeral: true })
                } else {
                    queue.resume()
                    interaction.reply({
                        content: `${client.emotes.success} | Resumed the song!`, ephemeral: true
                    })
                }
            } else if (customId == 'volume-down') {
                if (!interaction.member.voice.channel) return interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription(`${client.emotes.error} | You need to join the voice channel first.`)], ephemeral: true })
                if (interaction.member.voice.channel !== interaction.guild.me.voice.channel) return interaction.reply({ content: `${client.emotes.error} | You need to join same voice as bot`, ephemeral: true })
                let volumedown = queue.volume
                volumedown = volumedown - 10
                queue.setVolume(volumedown)
                interaction.reply({ content: `${client.emotes.success} | Volume set to \`${volumedown}\``, ephemeral: true })
            } else if (customId == 'volume-up') {
                if (!interaction.member.voice.channel) return interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription(`${client.emotes.error} | You need to join the voice channel first.`)], ephemeral: true })
                if (interaction.member.voice.channel !== interaction.guild.me.voice.channel) return interaction.reply({ content: `${client.emotes.error} | You need to join same voice as bot`, ephemeral: true })
                let volumeup = queue.volume
                volumeup = volumeup + 10
                queue.setVolume(volumeup)
                interaction.reply({ content: `${client.emotes.success} | Volume set to \`${volumeup}\``, ephemeral: true })
            } else if (customId == 'skip') {
                if (!interaction.member.voice.channel) return interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription(`${client.emotes.error} | You need to join the voice channel first.`)], ephemeral: true })
                if (interaction.member.voice.channel !== interaction.guild.me.voice.channel) return interaction.reply({ content: `${client.emotes.error} | You need to join same voice as bot`, ephemeral: true })
                try {
                    const song = await queue.skip()
                    interaction.reply({ content: `${client.emotes.success} | Skipped! Now playing: \n${song.name}`, ephemeral: true })
                } catch (err) {
                    queue.stop()
                    interaction.reply({ content: `${client.emotes.danger} | No more song to skip, queue ended!`, ephemeral: true })
                }
            }
        }
    }
}