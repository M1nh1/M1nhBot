module.exports = {
    name: 'unmute',
    description: "Unmute người nào đó",
    options: [
        {
            name: 'user',
            description: 'Mention someone',
            type: 'USER',
            required: true
        }
    ],
    run: async(client, interaction) => {
        if (!interaction.member.permissions.has('MANAGE_ROLES')) return interaction.reply({content: 'Bạn không có quyền unmute người khác!', ephemeral: true})
        const target = interaction.options.getUser('user');
        const member = interaction.guild.member.cache.get(target.id)
        if(target){
            let mainRole = interaction.guild.roles.cache.find(role => role.name === 'Member');
            let muteRole = interaction.guild.roles.cache.find(role => role.name === 'Mute');


            if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: 'You can\'\t timeout user has higher role than you!'})
            let memberTarget= interaction.guild.members.cache.get(target.id);
 
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            interaction.reply(`<@${memberTarget.user.id}> đã được unmute`);
        } else{
            interaction.reply('Không thể tìm thấy người này!');
        }
    }
}