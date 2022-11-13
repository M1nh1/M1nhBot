const welcomeSchema = require('../../Models/Welcome')
const {model, Schema} = require('mongoose')

module.exports = {
    name: 'setup-welcome',
    description: 'create welcome message system in server!',
    options: [
        {
            name: 'channel',
            description: 'choose channel to send a welcome message',
            type: 'CHANNEL',
            required: true,
            channelTypes: [
                'GUILD_TEXT'
            ]
        },
        {
            name: 'message',
            description: 'Ex: welcome or You are new member.',
            type: 'STRING',
            required: true
        },
        {
            name: 'background',
            description: 'set your background picture.',
            type: 'STRING',
            required: true
        }
    ],
    run: async(client, interaction) => {
        const {channel, options, guild} = interaction

        const welcomeChannel = options.getChannel('channel')
        const message = options.getString('message')
        const background = options.getString('background')

        welcomeSchema.findOne({Guild: guild.id}, async (err, data) => {
            if(!data) {
                await welcomeSchema.create({
                    Guild: interaction.guild.id,
                    Channel: welcomeChannel.id,
                    Message: message,
                    Background: background
                })
            }
            interaction.reply({content: 'You has succesfully created a welcome message!', ephemeral: true})
        })
    }
}