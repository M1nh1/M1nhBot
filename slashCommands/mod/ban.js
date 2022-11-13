module.exports = {
    name: 'ban',
    description: 'Ban người nào đó ra khỏi server',
    options: [
        {
            name: 'user',
            description: 'Người bạn muốn ban',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'Lý do ban',
            type: 'STRING',
            require: false,
        },
        {
            name: 'days',
            description: 'Ngày xoá tin nhắn',
            type: 'INTEGER',
            minValue: 0,
            maxValue: 7,
        }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply('Bạn không có quyền ban!');
        const user = interaction.options.getUser('user');
        if (user.id === interaction.user.id) return interaction.reply('Bạn không thể ban chính mình');
        const reason = interaction.options.getString('reason');
        const days = interaction.options.getInteger('days');
        const member = await interaction.guild.members.cache.get(user.id)
        try {
            if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: 'You can\'t\ ban user has higher role than you!'})
            if(!days) {
            interaction.guild.members.ban(user.id, { reason, days });
            interaction.reply(`<@${user.id}> has been ban from server!`)
            } else {
            interaction.guild.members.ban(user.id, { reason, days });
            interaction.reply(`<@${user.id}> has been BAN from server for ${days} days!`);
            }
        } catch (err) {
            interaction.reply('Có lỗi khi ban!');
            console.error(err);
        }
    },
};