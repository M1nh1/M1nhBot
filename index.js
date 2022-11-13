const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.MESSAGE_CONTENT], partials: ["MESSAGE", "CHANNEL", "REACTION"]
})
const config = require('./config.json')

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  savePreviousSongs: true,
  searchSongs: 10,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})

client.commands = new Collection();
client.aliases = new Collection();
client.categories = new Collection();
client.interactions = new Collection();

['command', 'event', 'slashCommand'].forEach(handler => require(`./handlers/${handler}`)(client));

client.emotes = config.emoji

process.on('unhandledRejection', async (reason, p) => {
  console.log("[Anti-Crash]")
  console.log(reason, p)
  const errEmbed = new MessageEmbed()
    .setColor("RED")
    .setTitle("⚠ New Error")
    .setDescription("An error just occured in the bot console!**\n\nERROR:\n\n**```" + reason + "\n\n" + p + "```")
    .setTimestamp()
    .setFooter('Anti-Crash System')
  client.channels.cache.get('1038328487427198996').send({ embeds: [errEmbed] })
})

const button = new MessageActionRow().addComponents(
  new MessageButton().setCustomId('volume-down').setLabel('🔉').setStyle('DANGER'),
  new MessageButton().setCustomId('stop').setLabel('⏹').setStyle('SECONDARY'),
  new MessageButton().setCustomId('pause-resume').setLabel('⏯').setStyle('SECONDARY'),
  new MessageButton().setCustomId('skip').setLabel('⏭').setStyle('SECONDARY'),
  new MessageButton().setCustomId('volume-up').setLabel('🔊').setStyle('SUCCESS')
)
const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send({
      embeds: [
        new MessageEmbed().setColor('RED').setImage(`${song.thumbnail}`).setDescription(`${client.emotes.play} | Playing [${song.name}](${song.url}) - ***[${song.formattedDuration}]***\nRequested by: ${song.user
          }\n${status(queue)}`)], components: [button]
    }
    )
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send({
      embeds: [
        new MessageEmbed().setColor('RED').setDescription(`${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)]
    }
    )
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send({
      embeds: [
        new MessageEmbed().setColor('RED').setDescription(`${client.emotes.success} | Added \`${playlist.name}\` playlist (${playlist.songs.length
          } songs) to queue\n${status(queue)}`)]
    }
    )
  )
  .on('error', (channel, e) => {
    channel.send({ embeds: [new MessageEmbed().setColor('RED').setDescription(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)] })
    console.error(e)
  })
  .on('empty', message => message.textChannel.send(new MessageEmbed().setDescription('Voice channel is empty! Leaving the channel...')))
  .on('searchNoResult', (message, query) =>
    message.channel.send(new MessageEmbed().setColor('RED').setDescription(`${client.emotes.error} | No result found for \`${query}\`!`))
  )
  .on('finish', queue => queue.textChannel.send({ embeds: [new MessageEmbed().setColor('RED').setTitle('⚠️ Music queue ended').setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: true})}).setTimestamp()]}))

  .on("searchResult", (message, result) => {
    let i = 0
    message.channel.send(
      `**Choose an option from below**\n${result
        .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
        .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
    )
  })
  .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`))
  .on("searchInvalidAnswer", message =>
    message.channel.send(
      `${client.emotes.error} | Invalid answer! You have to enter the number in the range of the results`
    )
  )
  .on("searchDone", () => {})

client.login(config.token);