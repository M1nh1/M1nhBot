const { MessageEmbed, Permissions } = require('discord.js')
const discordTranscripts = require('discord-html-transcripts')
const ticketSetup = require('../Models/TicketSetup')
const ticketSchema = require('../Models/Ticket')

module.exports = client => {
    client.on('interactionCreate', async (interaction) => {
        const { guild, member, customId, channel } = interaction
        const { ManageChannels, SendMessages } = Permissions

        if (interaction.isButton()) {

            if (!["close", "lock", "unlock", "claim"].includes(customId)) return

            const data = await ticketSetup.findOne({ GuildID: guild.id })

            if (!data) return

            if (!guild.me.permissions.has((r) => r.id === data.Handlers))
                return interaction.reply({ content: "I don't have permissions for this.", ephemeral: true })

            if (!member.roles.cache.find((r) => r.id === data.Handlers))
                return interaction.reply({ content: "You cannot use these button!", ephemeral: true })

            const embed = new MessageEmbed().setColor("AQUA")

            ticketSchema.findOne({ ChannelID: channel.id }, async (err, docs) => {
                if (err) throw err

                if (!docs) return;

                switch (customId) {
                    case 'close':
                        if (docs.Closed === true)
                            return interaction.reply({ content: "Ticket is already getting deleted...", ephemeral: true })

                        const attachment = await discordTranscripts.createTranscript(channel, {
                            limit: -1,
                            returnBuffer: false,
                            filename: `${member.user.username}-ticket${docs.Type}-${docs.TicketID}.html`
                        })

                        await ticketSchema.updateOne({ ChannelID: channel.id }, { Closed: true })

                        const transcriptEmbed = new MessageEmbed()
                            .setTitle(`Transcript Type: ${docs.Type}\nId: ${docs.TicketID}`)
                            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                            .setTimestamp()

                        const transcriptProcess = new MessageEmbed()
                            .setTitle('Saving transcript...')
                            .setDescription("Ticket will be closed in 10 seconds, enable DM's for the ticket transcript.")
                            .setColor("RED")
                            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })

                        const res = await guild.channels.cache.get(data.Transcripts).send({
                            embeds: [transcriptEmbed],
                            files: [attachment]
                        })

                        interaction.reply({ embeds: [transcriptProcess] })

                        setTimeout(function () {
                            member.send({
                                embeds: [transcriptEmbed.setDescription(`Access your ticket transcript: ${res.url}`)]
                            }).catch(() => channel.send('Couldn\'t send transcript to Direct Messages.'))
                            channel.delete();
                        }, 10000);

                        break

                    case 'lock':
                        if (!member.permissions.has(ManageChannels))
                            return interaction.reply({ content: "You don't have permissions for that.", ephemeral: true })

                        if (docs.Locked == true)
                            return interaction.reply({ content: "Ticket is already set to locked.", ephemeral: true })

                        await ticketSchema.updateOne({ ChannelID: channel.id }, { Locked: true })
                        embed.setDescription("Ticket was locked succesfully 🔒")

                        docs.MembersID.forEach((m) => {
                            channel.permissionOverwrites.edit(m, { SEND_MESSAGES: false })
                        })

                        return interaction.reply({ embeds: [embed] })

                    case 'unlock':
                        if (!member.permissions.has(ManageChannels))
                            return interaction.reply({ content: "You don't have permissions for that.", ephemeral: true })

                        if (docs.Locked == false)
                            return interaction.reply({ content: "Ticket is already set to unlocked.", ephemeral: true })

                        await ticketSchema.updateOne({ ChannelID: channel.id }, { Locked: false })
                        embed.setDescription("Ticket was unlocked succesfully 🔓")

                        docs.MembersID.forEach((m) => {
                            channel.permissionOverwrites.edit(m, { SEND_MESSAGES: true })
                        })

                        return interaction.reply({ embeds: [embed] })

                    case 'claim':
                        if (!member.permissions.has(ManageChannels))
                            return interaction.reply({ content: "You don't have permissions for that.", ephemeral: true })

                        if (docs.Claimed == true)
                            return interaction.reply({ content: `Ticket is already claimed by <@${docs.ClaimedBy}>`, ephemeral: true })

                        await ticketSchema.updateOne({ ChannelID: channel.id }, { Claimed: true, ClaimedBy: member.id })

                        embed.setDescription(`Ticket was succesfully claimed by ${member}`)

                        return interaction.reply({ embeds: [embed] })
                }
            })
        }
    })
}