const premiumguildSchema = require('../Models/premium-guild')

module.exports = {
  name: 'interactionCreate',
  run: async (interaction, client) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      const command = client.interactions.get(interaction.commandName);
      if (command) {
        if (command.premium) {
          premiumguildSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (!data) return interaction.reply({ content: "This is premium command!", ephemeral: true })
            if (!data.Permanent && Date.now() > data.Expire) {
              data.delete()
              return interaction.reply({ content: "The premium system is expired!", ephemeral: true })
            } else command.run(client, interaction);
          })
        } else command.run(client, interaction);
      }
    }
  }
}