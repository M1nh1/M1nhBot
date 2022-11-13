const { MessageEmbed, MessageActionRow, MessageButtonStyle, MessageButton, ApplicationCommandOptionType } = require("discord.js");
const mal = require("mal-scraper");

module.exports = {
    name: "anime",
    description: `💮 Search for information about Anime by given name`,
    run: async (client, message, args) => {
        try {
            const search = args.join(" ");
            mal
                .getInfoFromName(search)
                .then((data) => {
                    const embed = new MessageEmbed()
                        .setAuthor({ name: `My Anime List search result for ${search}` })
                        .setImage(data.picture)
                        .setColor("#5865F2")
                        .addFields(
                            { name: 'English Title', value: `${data.englishTitle || "None!"}`, },
                            { name: 'Japanese Title', value: `${data.japaneseTitle || "None!"}`, },
                            { name: 'Type', value: `${data.type || "N/A!"}`, },
                            { name: 'Episodes', value: `${data.episodes || "N/A!"}`, },
                            { name: 'Score', value: `${data.score || "N/A!"}`, },
                            { name: 'Rating', value: `${data.rating || "N/A!"}`, },
                            { name: 'Aired', value: `${data.aired || "N/A!"}`, },
                            { name: 'Scored by', value: `${data.scoreStats || "N/A!"}`, },
                        )
                        .setFooter({
                            text: `Requested by ${message.author.username}`,
                            iconURL: message.author.displayAvatarURL({
                                dynamic: true,
                                format: "png",
                                size: 2048,
                            }),
                        })
                        .setTimestamp();
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setStyle('LINK')
                                .setURL(data.url)
                                .setLabel("View more")
                        );
                    message.reply({ embeds: [embed], components: [row] });
                })
        } catch (err) {
            console.error(err)
            message.reply({ content: 'Đã xảy ra lỗi khi tìm kiếm!', ephemeral: true })
        }
    }
}
