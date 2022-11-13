module.exports = {
    name: 'clear',
    aliases: ['clr'],
    description: 'xóa tin nhắn',
    run: async(client, message, args) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('Bạn không có quyền clear tin nhắn!')
        if(!args[0]) return message.reply('Vui lòng nhập số tin nhắn bạn muốn xóa!');
        if(isNaN(args[0])) return message.reply( 'Vui lòng nhập con số thực!');

        if(args[0] > 100) return message.reply('Khổng thể xóa nhiều hơn 100 tin nhắn!')
        if(args[0] < 1) return message.reply('Khổng thể xóa ít hơn 1 tin nhắn!')
        try {
        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
            message.channel.send(`Đã xóa ${args[0]} tin nhắn!`)
        })
    } catch(err) {
        console.error(err)
        message.reply('Đã xảy ra lỗi')
    }}
}