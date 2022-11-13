const { MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'serverinfo',
    description: 'check server info',
    run: (client, interaction) => {
        const { guild } = interaction
        const { createdTimestamp, ownerId, members, memberCount, channels, emojis, stickers } = guild
        const Embed = new MessageEmbed()
        .setColor("PURPLE")
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setThumbnail(guild.iconURL({dynamic: true}))
        .addFields(
            {
                name: "GENERAL",
                value: [
                `- Name: ${guild.name}`,
                `- Created: \`${moment(guild.createdAt).format('MMM Do YYYY, h:mm:ss a')}\``,
                `- Owner: <@${ownerId}>`,
            ].join("\n")
            },
            {
                name: "💡 | USERS",
                value: [
                `- Members: ${members.cache.filter(member => !member.user.bot).size}`,
                `- Bots: ${members.cache.filter(member => member.user.bot).size}`,
                `Total: ${memberCount}`
            ].join("\n")
            },
            {
                name: "CHANNELS",
                value: [
                `- Text: ${channels.cache.filter((c) => c.type === "GUILD_TEXT").size}`,
                `- Voice: ${channels.cache.filter((c) => c.type === "GUILD_VOICE").size}`,
                `- Categories: ${channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}`,
                `- Threads: ${channels.cache.filter((c) => c.type === "GUILD_NEWS_THREAD" && "GUILD_PUBLIC_THREAD" && "GUILD_PRIVATE_THREAD").size}`,
                `- Stage: ${channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}`,
                `- News: ${channels.cache.filter((c) => c.type === "GUILD_NEWS").size}`,
                `Total: ${channels.cache.size}`
            ].join("\n")
            },
            {
                name: '😃 | EMOJIS & STICKERS',
                value: [
                `- Animated: ${emojis.cache.filter((e) => e.animated).size}`,
                `- Static: ${emojis.cache.filter((e) => !e.animated).size}`,
                `- Stickers: ${stickers.cache.size}`,
                `Total: ${stickers.cache.size + emojis.cache.size}`,
            ].join("\n")
            },
            {
                name: '✨ | NITRO STATISITCS',
                value: [
                `- Tier: ${guild.premiumTier.replace("TIER_", "")}`,
                `- Boosts: ${guild.premiumSubscriptionCount}`,
                `- Boosters: ${members.cache.filter((m) => m.premiumSince).size}`
            ].join("\n")
            }
        )
        .setFooter("Last Checked").setTimestamp()
        interaction.reply({embeds: [Embed]})
    }
}