const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'poll',
    description: 'create poll',
    options: [
        {
            name: 'title',
            description: 'set your title',
            type: 'STRING',
            required: true
        },
        {
            name: 'description',
            description: 'enter something',
            type: 'STRING',
            required: true
        },
        {
            name: 'channel',
            description: 'choose channel you want to send',
            type: 'CHANNEL',
            required: true
        },
        {
            name: 'emote1',
            description: 'enter first emote',
            type: 'STRING',
            required: true
        },
        {
            name: 'emote2',
            description: 'enter second emote',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply("You don't have permissions to create a poll.");
        const { options } = interaction
        const title = options.getString('title')
        const description = options.getString('description')
        const channel = options.getChannel('channel')
        const emote1 = options.getString('emote1')
        const emote2 = options.getString('emote2')

        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setFooter({ text: `Poll by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()

        interaction.reply({ content: 'Sending message...', ephemeral: true })
        const m = await channel.send({ embeds: [embed] })
        m.react(emote1)
        m.react(emote2)
    }
}