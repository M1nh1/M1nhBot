const { MessageEmbed, MessageButton, MessageActionRow, Permissions } = require('discord.js')
const TicketSetup = require('../Models/TicketSetup');
const ticketSchema = require('../Models/Ticket')

module.exports = client => {
    client.on('interactionCreate', async (interaction) => {
        if (interaction.isButton()) {
            const { guild, member, customId, channel } = interaction
            const { VIEW_CHANNEL, SEND_MESSAGES, MANAGE_CHANNELS, READ_MESSAGE_HISTORY } = Permissions
            const ticketId = Math.floor(Math.random() * 9000) + 10000;

            const data = await TicketSetup.findOne({ GuildID: guild.id })

            if (!data)
                return;

            if (!data.Buttons.includes(customId))
                return;

            if (!guild.me.permissions.has(MANAGE_CHANNELS))
                interaction.reply({ content: "I don't have permissions for this.", ephemeral: true })

            await guild.channels.create(`${member.user.username}-ticket${ticketId}`, {
                type: 'GUILD_TEXT',
                parent: data.Category,
                permissionsOverwrites: [
                    {
                        id: data.Everyone,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: member.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: data.Handlers,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                ]
            }).then(async (channel) => {
                await ticketSchema.create({
                    GuildID: guild.id,
                    MembersID: member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Type: customId,
                    Claimed: false
                });

                const embed = new MessageEmbed()
                    .setTitle(`${guild.name} - Ticket: ${customId}`)
                    .setDescription("Our team will contact you shortly. Please describe you issue.")
                    .setFooter({ text: `${ticketId}`, iconURL: member.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp()

                const button = new MessageActionRow().addComponents(
                    new MessageButton().setCustomId("close").setLabel('Close ticket').setStyle('PRIMARY').setEmoji('❌'),
                    new MessageButton().setCustomId("lock").setLabel('Lock the ticket').setStyle('SECONDARY').setEmoji('🔐'),
                    new MessageButton().setCustomId("unlock").setLabel('Unlock the ticket').setStyle('SUCCESS').setEmoji('🔒'),
                    new MessageButton().setCustomId("claim").setLabel('Claim').setStyle('SECONDARY').setEmoji('🛄'),
                )

                channel.send({
                    embeds: ([embed]),
                    components: [
                        button
                    ]
                })

                interaction.reply({ content: `Succesfully created a ticket.`, ephemeral: true })
            })
        }
    })
}