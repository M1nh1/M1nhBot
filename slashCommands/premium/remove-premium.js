const { MessageEmbed } = require('discord.js')
const Schema = require('../../Models/premium-guild')

module.exports = {
    name: 'remove-premium',
    description: 'Remove that guild out of premium list.',
    options: [
        {
            name: 'id',
            description: 'Enter guild id to remove.',
            type: 'STRING',
            require: true
        }
    ],
    run: async(client, interaction) => {
        const { options, member } = interaction
        const guildid = options.getString('id')

        if(member.id !== '432053641675800577') return
        if(!guildid) return interaction.reply({ content: "Please specify a valid id.", ephemeral: true })

        Schema.findOne({ Guild: guildid }, async(err, data) => {
            if(!data) return interaction.reply({ content: "The id that you have provide is not present in the database.", ephemeral: true })
            data.delete()
            interaction.reply(`Removed ${guildid} out of premium list.`)
        })
    }
}