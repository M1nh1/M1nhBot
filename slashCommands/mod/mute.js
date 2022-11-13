const ms = require('ms');
module.exports = {
    name: 'mute',
    description: "Mute người nào đó",
    options: [
        {
            name: 'user',
            description: 'mention someone',
            type: 'USER',
            required: true
        },
        {
            name: 'time',
            description: 'Thời gian mute!',
            type: 'STRING',
            required: true
        },
        {
            name: 'reason',
            description: 'Lý do mute!',
            type: 'STRING',
            required: true
        }
    ],
    run: async(client, interaction) => {
        if (!interaction.member.permissions.has('MANAGE_ROLES')) return interaction.reply({content: 'Bạn không có quyền mute người khác!', ephemeral: true})
        const target = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason')
        const time = interaction.options.getString('time')
        const timeInMs = ms(time)
        if (target) {
 
            let muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
 
            const member = await interaction.guild.members.cache.get(target.id);
            if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: 'You can\'\t mute user has higher role than you!'})
            if (!timeInMs) {
                member.roles.add(muteRole.id);
                interaction.reply(`<@${member.user.id}> đã bị mute`);
                return
            }
            member.roles.add(muteRole.id);
            interaction.reply(`<@${member.user.id}> đã bị mute vì ${reason} trong vòng ${time}`);
 
            setTimeout(function () {
                member.roles.remove(muteRole.id);
            }, ms(time));
        } else {
            interaction.reply({content: 'Không thể tìm thấy người này!',ephemeral: true});
        }
    }
}