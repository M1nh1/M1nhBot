const { MessageEmbed } = require('discord.js')
const { afk } = require('../../AFK1')

module.exports = {
    name: 'afk',
    description: 'AFK mode',
    options: [
        {
            name: 'reason',
            description: 'reason afk',
            type: 'STRING'
        }
    ],
    run: async(client, interaction) => {
        const reason = interaction.options.getString('reason') || "No Reason"
        const user = interaction.member
        afk.set(interaction.member.id, [Date.now(), reason])
        const embed = new MessageEmbed()
        .setTitle(`You have been set to AFK mode.`)
        .setDescription(`For: ${reason}`)
        .setTimestamp()
        .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
        try {
        interaction.reply({content: 'You has been set AFK mode!', ephemeral: true})
        interaction.channel.send({embeds: [embed]})
        } catch (err) {
            console.error(err)
            interaction.reply({content: 'Đã xảy ra lỗi!', ephemeral: true})
        }
    }
}