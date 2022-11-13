module.exports = {
    name: 'untimeout',
    description: 'timeout',
    options: [
        {
            name: 'user',
            description: 'mention someone to timeout',
            type: 'USER',
            required: true
        }
    ],
    run: async(client, interaction) => {
        if (!interaction.member.permissions.has('MODERATE_MEMBERS')) return interaction.reply({content: 'Bạn không có quyền unimeout người khác!', ephemeral: true})
        const user = interaction.options.getUser('user')
        const member = await interaction.guild.members.cache.get(user.id)
        try {
        if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: 'You can\'\t untimeout user has higher role than you!'})
        member.timeout(null)
        interaction.reply(`${user} has been untimeout!`)
        } catch(err) {
            console.error(err)
        }
    }
}