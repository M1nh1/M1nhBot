const { MessageEmbed } = require('discord.js')
const { afk } = require('../../AFK1')

module.exports = {
    name: 'afk',
    description: 'AFK mode',
    run: async(client, message, args) => {
        const reason = args.join(" ") || "No Reason"
        const user = message.member
        afk.set(message.author.id, [Date.now(), reason])
        const embed = new MessageEmbed()
        .setTitle(`You have been set to AFK mode.`)
        .setDescription(`For: ${reason}`)
        .setTimestamp()
        .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
        message.channel.send({embeds: [embed]})
    }
}