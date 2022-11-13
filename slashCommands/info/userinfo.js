const { ContextMenuInteraction, MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'User info',
    type: 'USER',
    /**
     * 
     * @param {ContextMenuInteraction} interaction 
     */
    run: async(client, interaction) => {
        const target = await interaction.guild.members.fetch(interaction.targetId)
        const { guild, user } = interaction

        const m = new MessageEmbed()
        .setAuthor(target.user.tag, target.user.displayAvatarURL({dynamic: true, size: 512}))
        .setThumbnail(target.user.displayAvatarURL({dynamic: true, size: 512}))
        .addField("ID", `${target.user.id}`)
        .addField("Roles", `${target.roles.cache.map(r => r).join(" ").replace("@everyone"," ") || "None"}`)
        .addField("Member Since", `\`${moment(guild.joinedAt).format('MMM Do YYYY, h:mm:ss a')}\``)
        .addField("Discord User Since", `\`${moment(user.createdAt).format('MMM Do YYYY, h:mm:ss a')}\``)
        .setColor('RANDOM')
        interaction.reply({embeds: [m]})
    }
}