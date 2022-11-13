module.exports = {
    name: 'clear',
    description: 'Chỉ xóa được những tin nhắn dưới 14 ngày!',
    options: [
        {
            name: 'number',
            description: 'Số lượng tin nhắn muốn xóa',
            type: 'STRING',
            required: true
        }
    ],
    run: async(client, interaction) => {
        const value = interaction.options.getString('number')
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({content: 'Bạn không có quyền clear tin nhắn!', ephemeral: true})
        if(!value) return interaction.reply({content: 'Vui lòng nhập số tin nhắn bạn muốn xóa!', ephemeral: true});
        if(isNaN(value)) return interaction.reply({content: 'Vui lòng nhập con số thực!', ephemeral: true});

        if(value > 100) return interaction.reply({content: 'Khổng thể xóa nhiều hơn 100 tin nhắn!', ephemeral: true});
        if(value < 1) return interaction.reply({content: 'Khổng thể xóa ít hơn 1 tin nhắn!', ephemeral: true});
        try {
        await interaction.channel.messages.fetch({limit: value}).then(interactions => {
            interaction.channel.bulkDelete(interactions);
            interaction.reply(`Đã xóa ${value} tin nhắn!`)
        })
    } catch(err) {
        console.error(err)
        interaction.reply({content: 'Đã xảy ra lỗi', ephemeral: true})
    }}
}