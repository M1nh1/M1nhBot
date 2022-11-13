const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const TicketSetup = require('../../Models/TicketSetup')

module.exports = {
    name: 'setup-ticket',
    description: 'create ticket system in server!',
    options: [
        {
            name: "channel",
            description: 'select the channel.',
            required: true,
            type: 'CHANNEL',
            channelTypes: ['GUILD_TEXT']
        },
        {
            name: "category",
            description: 'select the category.',
            required: true,
            type: 'CHANNEL',
            channelTypes: ['GUILD_CATEGORY']
        },
        {
            name: "transcripts",
            description: 'select the transcript.',
            required: true,
            type: 'CHANNEL',
            channelTypes: ['GUILD_TEXT']
        },
        {
            name: "handlers",
            description: 'select the handlers role.',
            required: true,
            type: 'ROLE',
        },
        {
            name: "everyone",
            description: 'select the everyone role.',
            required: true,
            type: 'ROLE',
        },
        {
            name: "description",
            description: 'set the description for the ticket.',
            required: true,
            type: 'STRING',
        },
        {
            name: "firstbutton",
            description: 'name of button, emoji',
            required: true,
            type: 'STRING',
        },
        {
            name: "secondbutton",
            description: 'name of button, emoji',
            required: true,
            type: 'STRING',
        },
        {
            name: "thirdbutton",
            description: 'name of button, emoji',
            required: true,
            type: 'STRING',
        },
        {
            name: "fourthbutton",
            description: 'name of button, emoji',
            required: true,
            type: 'STRING',
        }
    ],
    run: async(client, interaction) => {
        const { guild, options } = interaction

        try {
            const channel = options.getChannel('channel')
            const category = options.getChannel('category')
            const transcripts = options.getChannel('transcripts')

            const handlers = options.getRole('handlers')
            const everyone = options.getRole('everyone')

            const description = options.getString('description')
            const firstbutton = options.getString('firstbutton').split(',')
            const secondbutton = options.getString('secondbutton').split(',')
            const thirdbutton = options.getString('thirdbutton').split(',')
            const fourthbutton = options.getString('fourthbutton').split(',')

            const emoji1 = firstbutton[1]
            const emoji2 = secondbutton[1]
            const emoji3 = thirdbutton[1]
            const emoji4 = fourthbutton[1]

            await TicketSetup.findOneAndUpdate(
                {GuildID: guild.id},
                {
                    Channel: channel.id,
                    Category: category.id,
                    Transcripts: transcripts.id,
                    Handlers: handlers.id,
                    Everyone: everyone.id,
                    Description: description.id,
                    Buttons: [firstbutton[0], secondbutton[0], thirdbutton[0], fourthbutton[0]]
                },
                {
                    new: true,
                    upsert: true
                }
            );

            const embed = new MessageEmbed()
                .setDescription(description)
            
            const button = new MessageActionRow().setComponents(
                new MessageButton().setCustomId(firstbutton[0]).setLabel(firstbutton[0]).setStyle('DANGER').setEmoji(emoji1),
                new MessageButton().setCustomId(secondbutton[0]).setLabel(secondbutton[0]).setStyle('SECONDARY').setEmoji(emoji2),
                new MessageButton().setCustomId(thirdbutton[0]).setLabel(thirdbutton[0]).setStyle('PRIMARY').setEmoji(emoji3),
                new MessageButton().setCustomId(fourthbutton[0]).setLabel(fourthbutton[0]).setStyle('SUCCESS').setEmoji(emoji4)
            )

            await guild.channels.cache.get(channel.id).send({
                embeds: ([embed]),
                components: [
                    button
                ]
            })

            interaction.reply({content: "Ticket message has been sent.", ephemeral: true})

        } catch (err) {
            console.log(err)
            const errEmbed = new MessageEmbed()
                .setColor("RED")
                .setDescription("Something went wrong...")

            return interaction.reply({embeds: [errEmbed], ephemeral: true})
        }
    }
}