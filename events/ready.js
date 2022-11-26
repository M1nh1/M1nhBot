const welcome = require('../welcome')
const config = require('../config.json')
const mongoose = require('mongoose')
const ms = require('ms')
const logs = require('discord-logs');

module.exports = {
    name: 'ready',
    run: async (client) => {
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        })
        if (mongoose.connect) {
            console.log('Thành công kết nối tới database!')
        }
        console.log(`${client.user.username} is ready!`);
        client.user.setPresence({ activities: [{ name: '', type: 'WATCHING' }], status: 'online' });

        welcome(client)
        logs(client, {
            debug: true
        });

        // setInterval(() => {
        //     membercountSchema.find().then((data) => {
        //         if (!data & !data.length) return

        //         data.forEach((value) => {
        //             const guild = client.guilds.cache.get(value.Guild)
        //             const memberCount = guild.memberCount

        //             if (value.Member != memberCount) {
        //                 const channel = guild.channels.cache.get(value.Channel)
        //                 channel.setName(`Members: ${memberCount}`)

        //                 value.Member = memberCount
        //                 value.save()
        //             }
        //         })
        //     })
        // }, ms("5 seconds"))
    }
}