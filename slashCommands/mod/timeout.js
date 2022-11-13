const ms = require('ms')

module.exports = {
    name: 'timeout',
    description: 'timeout',
    options: [
        {
            name: 'user',
            description: 'mention someone to timeout',
            type: 'USER',
            required: true
        },
        {
            name: 'time',
            description: 'test',
            type: 'STRING',
            required: true
        },
        {
            name: 'reason',
            description: 'test',
            type: 'STRING',
            required: true
        }
    ],
    run: async(client, interaction) => {
        if (!interaction.member.permissions.has('MODERATE_MEMBERS')) return interaction.reply({content: 'Bạn không có quyền timeout người khác!', ephemeral: true})
        const user = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason')
        const time = interaction.options.getString('time')
        const member = await interaction.guild.members.cache.get(user.id)
        if(!reason) reason = 'Lí do không được cung cấp!'
        const timeMs = ms(time)
        if(!timeMs) return interaction.reply({content: 'Hãy nhập thời gian timeout!', ephemeral: true})
        try {
        if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: 'You can\'t\ timeout user has higher role than you!'})
        member.timeout(timeMs, reason)
        interaction.reply(`${user} has been timeout for ${time}, reason: ${reason}`)
        } catch(err) {
            console.error(err)
        }
    }
}