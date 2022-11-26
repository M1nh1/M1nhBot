const Discord = require('discord.js')
const Canvas = require('canvas')
const Schema = require('./Models/Welcome')

module.exports = client => {
    client.on('guildMemberAdd', async member => {
        Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
            if (!data) return
            let message = data.Message

            const channel = client.channels.cache.get(data.Channel)

            const canvas = Canvas.createCanvas(1024, 500)
            const ctx = canvas.getContext('2d')

            const img = await Canvas.loadImage(data.Background)
            ctx.drawImage(img, 0,0, 1024, 500)

            ctx.fillStyle = '#ffffff'
            ctx.font = '42px sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText(member.user.tag.toUpperCase(), 512, 410)
            ctx.font = '32px sans-serif'
            ctx.fillText(message, 512, 455)
            const avURL = member.user.displayAvatarURL({ dynamic: false, format: 'png' })
            const avimg = await Canvas.loadImage(avURL)

            ctx.beginPath()
            ctx.arc(512, 166, 119, 0, Math.PI * 2, true)
            ctx.closePath()
            ctx.clip()

            ctx.drawImage(avimg, 393, 47, 238, 238)

            let atta = new Discord.MessageAttachment(canvas.toBuffer(), `welcome-${member.id}.png`)
            try {
                channel.send({ files: [atta] })
            } catch (err) {
                console.log(err)
            }
        })
    }
    )
}