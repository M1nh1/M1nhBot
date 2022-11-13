const { default: axios } = require("axios");
const { lines } = require("prelude-ls");
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'lyrics',
    description: 'get lyrics for a song',
    options: [
        {
            name: 'query',
            description: 'enter the name of the song you want to search',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction) => {
        function substring(length, value) {
            const replaced = value.replace(/\n/g, "--")
            const regex = `.{1,${length}}`;
            const lines = replaced
                .match(new RegExp(regex, "g"))
                .map((line) => line.replace("--", "\n"))

            return lines;
        }

        const { options } = interaction
        const query = options.getString("query")

        const url = new URL('https://some-random-api.ml/lyrics');
        url.searchParams.append('title', query);
        console.log("url", url)

        try {
            const { data } = await axios.get(url.href)

            const embeds = substring(4096, data.lyrics).map((value, index) => {
                const isFirst = index === 0;

                return new MessageEmbed({
                    title: isFirst ? `${data.title} - ${data.author}` : null,
                    thumbnail: isFirst ? { url: data.thumbnail.genius }: null,
                    description: value,
                })
            })
            return interaction.reply({ embeds })
        } catch (err) {
            console.log(err)
            interaction.reply({ content: 'Something went wrong...', ephemeral: true })
        }
    }
}