const { ActivityType } = require('discord-api-types/v10')
const { MessageEmbed } = require('discord.js')


module.exports = {
    name: 'update',
    description: 'Update the bot presences.',
    options: [
        {
            name: 'activity',
            description: 'Update the bots activity.',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'type',
                    description: 'Pick an activity.',
                    type: 'STRING',
                    required: true,
                    choices: [
                        { name: 'Playing', value: 'Playing' },
                        { name: 'Streaming', value: 'Streaming' },
                        { name: 'Listening', value: 'Listening' },
                        { name: 'Watching', value: 'Watching' },
                        { name: 'Competing', value: 'Competing' }
                    ]
                },
                {
                    name: 'activity',
                    description: 'Set your activity.',
                    type: 'STRING',
                    required: true
                }
            ]
        },
        {
            name: 'status',
            description: 'Update the bots status.',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'type',
                    description: 'Pick a status.',
                    type: 'STRING',
                    required: true,
                    choices: [
                        { name: 'Online', value: 'online' },
                        { name: 'Idle', value: 'idle' },
                        { name: 'Do not disturb', value: 'dnd' },
                        { name: 'Invisible', value: 'invisible' }
                    ]
                }
            ]
        }
    ],
    run: async (client, interaction) => {
        const { options, member } = interaction

        if(member.id !== '432053641675800577') return interaction.reply({ content: "You can not use this command.", ephemeral: true })

        const sub = options.getSubcommand(['activity', 'status'])
        const type = options.getString('type')
        const activity = options.getString('activity')

        try {
            switch (sub) {
                case 'activity':
                    switch (type) {
                        case 'Playing':
                            client.user.setActivity(activity, { type: ActivityType.Playing })
                            break;
                        case 'Streaming':
                            client.user.setActivity(activity, { type: ActivityType.Streaming })
                            break;
                        case 'Listening':
                            client.user.setActivity(activity, { type: ActivityType.Listening })
                            break;
                        case 'Watching':
                            client.user.setActivity(activity, { type: ActivityType.Watching })
                            break;
                        case 'Competing':
                            client.user.setActivity(activity, { type: ActivityType.Competing })
                            break;
                    }
                case 'status':
                    client.user.setPresence({ status: type })
                    break;
            }
        } catch (e) {
            console.log(e)
        }

        const embed = new MessageEmbed()

        return interaction.reply({ embeds: [embed.setDescription(`Succesfully update your ${sub} to ***${type}***.`)] })
    }
}