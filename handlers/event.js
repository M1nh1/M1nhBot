const { readdirSync } = require('fs');

module.exports = (client) => {
    let count = 0;
    const folders = readdirSync(`./events/`);
    for (const f of folders) {
        const event = require(`../events/${f}`);
        client.on(event.name, (...args) => event.run(...args, client));
        count++;
    }
    console.log(`${count} event đã sẵn sàng!`);
}