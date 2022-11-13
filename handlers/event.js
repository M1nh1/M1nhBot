const { readdirSync } = require('fs');

module.exports = (client) => {
    let count = 0;
    const folders = readdirSync(`./events/`);
    for (const f of folders) {
        if (!f.endsWith('.js')) continue;
        const eventName = f.substring(0, f.indexOf('.js'));
        const event = require(`../events/${f}`);
        client.on(eventName, event.bind(null, client));
        count++;
    }
    console.log(`${count} event đã sẵn sàng!`);
}