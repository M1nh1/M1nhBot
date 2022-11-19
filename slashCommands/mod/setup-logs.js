const { MessageEmbed } = require('discord.js')
const logSchema = require('../../Models/Logs')

module.exports = {
    name: 'setup-logs',
    description: 'Set up your logging channel for the audit logs.',
    options: [
        {
            name: 'channel',
            description: 'Channel for logging messages.',
            type: 'CHANNEL',
            channelTypes: ['GUILD_TEXT'],
            required: false
        }
    ],
    run: async (client, interaction) => {
        const { channel, guildId, options } = interaction

        const logChannel = options.getChannel('channel') || channel
        const embed = new MessageEmbed()

        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            if (!data) {
                await logSchema.create({
                    Guild: guildId,
                    Channel: logChannel.id,
                })

                embed.setDescription('Data was succesfully sent to the database.')
                    .setColor('GREEN')
                    .setTimestamp()
            } else if (data) {
                logSchema.findOneAndDelete({ Guild: guildId })
                await logSchema.create({
                    Guild: guildId,
                    Channel: logChannel.id,
                })

                embed.setDescription('Old data was succesfully replaced with the new database.')
                    .setColor('GREEN')
                    .setTimestamp()
            }
            if (err) {
                embed.setDescription('Something went wrong. Please contact the developers.')
                    .setColor('RED')
                    .setTimestamp()
            }
            return interaction.reply({ embeds: [embed], ephemeral: true })
        }
        )
    }
}