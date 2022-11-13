const { MessageEmbed } = require('discord.js')
const Schema = require('../../Models/premium-guild')
const day = require('dayjs')

module.exports = {
    name: 'add-premium',
    description: 'Add that guild to premium list.',
    options: [
        {
            name: 'id',
            description: 'Enter guild id to add.',
            type: 'STRING',
            required: true
        },
        {
            name: 'expire',
            description: 'When the premium is expire.',
            type: 'STRING',
            required: false
        }
    ],
    run: async (client, interaction) => {
        const { member, options } = interaction
        const guildid = options.getString('id')
        const expire = options.getString('expire')

        if (member.id !== '432053641675800577') return interaction.reply({ content: "You can not use this command.", ephemeral: true })
        if (!guildid) return interaction.reply({ content: "Please specify a valid guild id", ephemeral: true })
        if (!client.guilds.cache.has(guildid)) return interaction.reply({ content: "Its an invalid guild id.", ephemeral: true })

        Schema.findOne({ Guild: guildid }, async (err, data) => {

            if (data) data.delete();

            if (expire) {
                const Expire = day(expire).valueOf()
                new Schema({
                    Guild: guildid,
                    Expire: `${day(expire).valueOf()}`,
                    Date: expire,
                    Permanent: false
                }).save();
            } else {
                new Schema({
                    Guild: guildid,
                    Expire: 0,
                    Date: 0,
                    Permanent: true
                }).save();
            }
            interaction.reply(`Added ${guildid} to premium list.`)
        }
        )
    }
}
