const Discord = require('discord.js')
const Canvas = require('canvas')
const Schema = require('./Models/Welcome')

const canvas = Canvas.createCanvas(1024, 500)
const ctx = canvas.getContext('2d')

module.exports = client => {
    client.on('guildMemberAdd', async member => {
        Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
            if (!data) return
            let message = data.Message

            const channel = client.channels.cache.get(data.Channel)

            const background = await Canvas.loadImage(data.Background).then(async (img) => {
                ctx.drawImage(img, 0, 0, 1024, 500)
                ctx.fillText("welcome", 360, 360)
                ctx.beginPath()
                ctx.arc(512, 166, 128, 0, Math.PI * 2, true)
                ctx.stroke()
                ctx.fill()
            })

            ctx.fillStyle = '#ffffff'
            ctx.font = '42px sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText(member.user.tag.toUpperCase(), 512, 410)
            ctx.font = '32px sans-serif'
            ctx.fillText(message, 512, 455)
            ctx.beginPath()
            ctx.arc(512, 410, 60, 0, Math.PI * 2, true)
            ctx.closePath()
            await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }))
                .then(img => {
                    ctx.drawImage(img, 393, 47, 238, 238)
                })
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