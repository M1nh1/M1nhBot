const { MessageEmbed } = require('discord.js')
const suggestionSchema = require('../Models/Suggestion')

module.exports = client => {
    client.on('interactionCreate', async (interaction) => {
        const { member, guildId, customId, message } = interaction

        if(interaction.isButton()) {
            if (customId == 'suggest-accept' || customId == 'suggest-decline') {
                suggestionSchema.findOne({ GuildID: guildId, MessageID: message.id }, async(err, data) => {
                    if (err) throw err

                    if(!data)
                        return interaction.reply({ content: 'No data was found.', ephemeral: true })
                    
                    const embed = message.embeds[0]

                    if(!embed)
                        return interaction.reply({ content: "No embed was found.", ephemeral: true })
                    
                    switch (customId) {
                        case "suggest-accept":
                            embed.fields[2] = { name: 'Status:', value: "Accepted", inline: true}

                            message.edit({ embeds: [embed.setColor("GREEN")], components: [] })
                            interaction.reply({ content: "Suggestion succesfully accepted.", ephemeral: true })
                            break;
                        case "suggest-decline":
                            embed.fields[2] = { name: 'Status:', value: "Declined", inline: true}

                            message.edit({ embeds: [embed.setColor("RED")], components: [] })
                            interaction.reply({ content: "Suggestion succesfully declined.", ephemeral: true })
                            break;
                    }
                })
            }
        }
    })
}