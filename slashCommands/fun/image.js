const img = require('images-scraper')

const google = new img({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
    name : 'image',
    description: 'Enter title of image for search',
    options: [
        {
            name: 'query',
            description: 'enter title of image for search',
            type: 'STRING',
            required : true
        }
    ],
    run : async(client, interaction) => {
        interaction.deferReply({fetchReply: true})
        const { options } = interaction
        const query = options.getString('query')
        if(!query) return interaction.reply('Please enter a search query')

        const results = await google.scrape(query, 1)
        await interaction.editReply(results[0].url);
    }
}