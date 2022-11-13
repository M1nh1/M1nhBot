const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const verifySchema = require('../../Models/Verify')

module.exports = {
    name: 'setup-verify',
    description: 'Create verify system in server!',
    options: [
        {
            name: 'channel',
            description: 'choose channel you want to send verify message.',
            type: 'CHANNEL',
            channelTypes: ['GUILD_TEXT'],
            required: true
        },
        {
            name: 'role',
            description: 'choose the role you want to verify.',
            type: 'ROLE',
            required: true
        }
    ],
    run: async (client, interaction) => {
        const { options, guild } = interaction
        const channel = options.getChannel('channel')
        const role = options.getRole('role')

        verifySchema.findOne({ Guild: guild.id }, async (err, data) => {
            if (!data) {
                await verifySchema.create({
                    Guild: guild.id,
                    Role: role.id
                })
            }
        })

        const verifyEmbed = new MessageEmbed()
        .setTitle("Verification")
        .setDescription('Click the button to verify your account and get access to the channels.')
        .setColor('RANDOM')
        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new MessageActionRow().setComponents(
                    new MessageButton().setCustomId('verify').setLabel('Verify').setStyle('SUCCESS')
                )
            ]
        });
        
        if (!sendChannel) {
            return interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription('Something went wrong...')]})
        } else {
            interaction.reply({ content: 'You has succesfully created a verify system.', ephemeral: true})
        }
    }
}