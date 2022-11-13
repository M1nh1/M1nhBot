const Discord = require('discord.js');
const query = require('esquery');
const fs = require('fs')
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'help',
    description: 'Show help menu',
    run: async (client, interaction) => {
        let categories = [];

        fs.readdirSync('./slashCommands/').forEach(dir => {
            const commands = fs.readdirSync(`./slashCommands/${dir}`).filter(file => file.endsWith('.js'));

            const cmds = commands.map(slashCommands => {
                let file = require(`../../slashCommands/${dir}/${slashCommands}`)

                if (!file.name) return 'No Slash Command name.';

                let name = file.name.replace('.js', '')

                return `\`${name}\``;
            })

            let data = new Object();

            data = {
                name: dir.toUpperCase(),
                value: cmds.length === 0 ? 'In progress' : cmds.join(' ')
            };

            categories.push(data)
        })

        const helpEmbed = new Discord.MessageEmbed()
            .setTitle('Help Menu')
            .setColor('GREEN')
            .addFields(categories)
            .setDescription(`Use /help to get slash command information.`)
            .setFooter(`Requested by ${interaction.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()

        return interaction.reply({ embeds: [helpEmbed] });
    }
}