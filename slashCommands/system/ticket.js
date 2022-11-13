const { MessageEmbed } = require('discord.js')
const ticketSchema = require('../../Models/Ticket')
const { Permissions } = require('discord.js')

module.exports = {
    name: 'ticket',
    description: 'ticket action',
    options: [
        {
            name: 'action',
            description: 'add or remove members from the ticket.',
            required: true,
            type: 'STRING',
            choices: [
                {
                    name: 'add',
                    value: 'add'
                },
                {
                    name: 'remove',
                    value: 'remove'
                }
            ]
        },
        {
            name: 'member',
            description: 'select a members to see the ticket.',
            type: 'USER'
        }
    ],
    run: async (client, interaction) => {
        const { guildId, options, channel } = interaction
        const action = options.getString('action')
        const member = options.getUser('member')
        const { ViewChannel, SendMessages, ManageChannels, ReadMessageHistory } = Permissions

        switch (action) {
            case 'add':
                ticketSchema.findOne({ GuildID: guildId, ChannelID: channel.id }, async (err, docs) => {
                    if (err) throw err
                    if (!docs)
                        return interaction.reply({ embeds: [new MessageEmbed().setColor("RED").setDescription('Something went wrong. Try again later.')], ephemeral: true })

                    if (docs.MembersID.includes(member.id))
                        return interaction.reply({ embeds: [new MessageEmbed().setColor("RED").setDescription('Something went wrong. Try again later.')], ephemeral: true })

                    docs.MembersID.push(member.id)

                    channel.permissionOverwrites.edit(member.id, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
                    })

                    interaction.reply({ embeds: [new MessageEmbed().setColor("GREEN").setDescription(`${member} has been added to the ticket.`)], ephemeral: true })

                    docs.save
                })
                break;
            case 'remove':
                ticketSchema.findOne({ GuildID: guildId, ChannelID: channel.id }, async (err, docs) => {
                    if (err) throw err
                    if (!docs)
                        return interaction.reply({ embeds: [new MessageEmbed().setColor("RED").setDescription('Something went wrong. Try again later.')], ephemeral: true })

                    if (docs.MembersID.includes(member.id))
                        return interaction.reply({ embeds: [new MessageEmbed().setColor("RED").setDescription('Something went wrong. Try again later.')], ephemeral: true })

                    docs.MembersID.remove(member.id)

                    channel.permissionOverwrites.edit(member.id, {
                        VIEW_CHANNEL: false,
                    })

                    interaction.reply({ embeds: [new MessageEmbed().setColor("GREEN").setDescription(`${member} has been removed to the ticket.`)], ephemeral: true })

                    docs.save
                })
                break;
        }
    }
}