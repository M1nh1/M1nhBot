const { afk } = require('../AFK1')
const premiumguildSchema = require('../Models/premium-guild')
const moment = require('moment')
const config = require('../config.json')

module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return

    const mentionedMember = message.mentions.members.first()
    if (mentionedMember) {
        const data = afk.get(mentionedMember.id)

        if (data) {
            const [timestamp, reason] = data
            const timeAgo = moment(timestamp).fromNow()

            message.reply(`${mentionedMember} is currently afk (${timeAgo})\nReason: ${reason}`)
        }
    }
    const getData = afk.get(message.author.id)
    if (getData) {
        afk.delete(message.author.id)
        message.reply(`${message.member} afk has been removed!`)
    }
    if (message.content.includes("discord.gg/")) {
        const { guild } = message
        const channel = client.channels.cache.get('1032183610024927352')

        console.log(`Đã xóa tin nhắn của ${message.author.tag} với nội dung ${message.content}`)
        message.delete(1);
        message.channel.send(`Không được gửi link server <@${message.author.id}>`)
        channel.send(`Đã xóa tin nhắn của ${message.author.tag} với nội dung ${message.content} ở trong ${guild.name}`)
    }
    if (message.author.bot) return;
    const prefix = config.prefix;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (command) {
        if (command.premium) {
            premiumguildSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
                if (!data) return message.reply("This is premium command!")
                if (!data.Permanent && Date.now() > data.Expire) {
                    data.delete()
                    return message.reply("The premium system is expired!")
                } else command.run(client, message, args);
            })
        } else command.run(client, message, args);
    }
}