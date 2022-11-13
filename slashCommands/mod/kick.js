module.exports = {
    name: 'kick',
    description: 'Kick người nào đó ra khỏi server',
    options: [
        {
            name: 'user',
            description: 'Người bạn muốn kick',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'Lý do kick',
            type: 'STRING',
            require: false,
        }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.reply('Bạn không có quyền kick!');
        const user = interaction.options.getUser('user');
        if (user.id === interaction.user.id) return interaction.reply('Bạn không thể kick chính mình');
        const reason = interaction.options.getString('reason');
        const member = interaction.member.guild.cache.get(user.id)
        try {
            if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: 'You can\'\t kick user has higher role than you!'})
            interaction.guild.members.kick(user.id, reason);
            interaction.reply(`<@${user.id}> has been kick from server!`)
        } catch (err) {
            interaction.reply('Có lỗi khi kick!');
            console.error(err);
        }
    },
};