module.exports = {
    name: 'simjoin',
    run: async (client, message, args) => {
        client.emit('guildMemberAdd', message.member);
    }
}