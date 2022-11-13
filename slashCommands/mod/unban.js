module.exports = {
    name: 'unban',
    description: 'unban who in your server!',
    options: [
        {
            name: 'id',
            description: 'ID ban',
            type: 'STRING',
            required: true
        }
    ],
    run: async(client, interaction) => {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply('Bạn không có quyền unban!');
        const userId = interaction.options.getString('id')

        try {
            await interaction.guild.members.unban(userId)

            interaction.reply(`<@${userId}> has been unban!`)
        } catch (err) {
            console.error(err)
            interaction.reply({content: 'Đã xảy ra lỗi!', ephemeral: true})
        }
    }
}