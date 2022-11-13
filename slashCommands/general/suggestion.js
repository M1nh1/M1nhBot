const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const suggestionSchema = require('../../Models/Suggestion')

module.exports = {
    name: 'suggestion',
    description: "Ask something to do.",
    options: [
        {
            name: 'type',
            description: 'Select an option.',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Youtube', value: 'Youtube'
                },
                {
                    name: 'Discord', value: 'Discord'
                },
                {
                    name: 'Other', value: 'Other'
                }
            ]
        },
        {
            name: 'description',
            description: 'Describe your suggestion clearly.',
            type: 'STRING',
            required: true
        },
        {
            name: 'channel',
            description: 'Choose channel want to send suggestion message.',
            type: 'CHANNEL',
            channelTypes: ['GUILD_TEXT'],
            required: true
        }
    ],
    run: async (client, interaction) => {
        const { options, guildId, member, user, guild } = interaction

        const type = options.getString('type')
        const description = options.getString('description')

        const channel = options.getChannel('channel')

        const embed = new MessageEmbed()
            .setColor('ORANGE')
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
            .addFields(
                { name: 'Suggestion:', value: description, inline: false },
                { name: 'Type:', value: type, inline: true },
                { name: 'Status:', value: 'Pending', inline: true }
            )
            .setTimestamp()

        const buttons = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('suggest-accept').setLabel('✅ Accept').setStyle('PRIMARY'),
            new MessageButton().setCustomId('suggest-decline').setLabel('⛔ Decline').setStyle('DANGER')
        )
        
        try {
            const m = await channel.send({ embeds: [embed], components: [buttons], fetchReply: true })
            await interaction.reply({ content: "Suggestion was succesfully sent to the channel.", ephemeral: true })

            await suggestionSchema.create({
                GuildID: guildId, MessageID: m.id, Details: [
                    {
                        MemberID: member.id,
                        Type: type,
                        Suggestion: description
                    }
                ]
            })
        } catch (e) {
            console.log(e)
        }
    }
}