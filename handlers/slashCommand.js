const { readdirSync } = require('fs');
const slashCommands = [];
const ascii = require('ascii-table');

let table = new ascii('Lệnh')
table.setHeading("Tên file", "Tình trạng")

module.exports = (client) => {
    let count = 0;
    readdirSync('./slashCommands/').forEach(dir => {
        let commands = readdirSync(`./slashCommands/${dir}`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../slashCommands/${dir}/${file}`);
            if (pull.name) {
                client.interactions.set(pull.name, pull);
                slashCommands.push(pull);
                count++;
                table.addRow(file, '✅')
            } else {
                table.addRow(file,'❌ thiếu help.name')
                continue;
            }
        }
    });

    client.once('ready', async () => {
        //await client.guilds.cache.get(guildID).commands.set(slashCommands);
        await client.application.commands.set(slashCommands);
    });

    console.log(`Đã load ${count} slash commands!`);
    console.log(table.toString())
}