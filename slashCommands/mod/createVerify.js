const { MessageEmbed, MessageActionRow, MessageButton, MessageButtonStyle} = require('discord.js');

module.exports = {
    name: 'verify',
    description: 'create verify',
    options: [
        {
            name: 'channel',
            description: 'choose channel to verify message',
            type: 'CHANNEL',
            required: true
        }
    ],
    run: async (client, interaction) => {
        const channel = interaction.options.getChannel('channel')
        const verifyEmbed = new MessageEmbed()
        .setTitle("Verification")
        .setDescription('Click the button to verify your account and get access to the channels.')
        .setColor('RANDOM')
        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new MessageActionRow().setComponents(
                    new MessageButton().setCustomId('verify').setLabel('Verify').setStyle('SUCCESS')
                )
            ]
        });
        if (!sendChannel) {
            return interaction.reply({content: 'Đã xảy ra lỗi!', ephemeral: true})
        } else {
            return interaction.reply({content: 'Bạn đã tạo verify thành công!', ephemeral: true})
        }
    }
}