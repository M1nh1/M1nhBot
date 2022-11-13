const membercountSchema = require('../../Models/MemberCount')

module.exports = {
    name: 'setup-membercount',
    description: 'create member count to your server.',
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true })
        const { guild } = interaction

        membercountSchema.findOne({ Guild: guild.id }, async (err, data) => {
            if (data) data.delete()

            const channel = await interaction.guild.channels.create(
                `Member: ${guild.memberCount}`,
                {
                    type: "GUILD_VOICE",
                    permissionOverwrites: [
                        {
                            id: guild.id,
                            deny: ["CONNECT"]
                        }
                    ]
                }
            )

            new membercountSchema({
                Guild: guild.id,
                Channel: channel.id,
                Member: guild.memberCount
            }).save()
        }
        )
        interaction.reply({ content: "Creating member count system...", ephemeral: true })
    }
}
