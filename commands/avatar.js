exports.command = {
    action: function(msg,args){
        if (args){
            if (msg.mentions.users.array()[0]){
                msg.channel.sendFile(msg.mentions.users.array()[0].avatarURL);
            }
            else if (msg.guild.members.find(val => val.user.username == args)){
                msg.channel.sendFile(msg.guild.members.find(val => val.user.username == args).user.avatarURL);
            }
            else if (msg.guild.members.find("nickname",args)){
                msg.channel.sendFile(msg.guild.members.find("nickname",args).user.avatarURL);
            }
            else if (msg.guild.members.get(args)){
                msg.channel.sendFile(msg.guild.members.find("id",args).user.avatarURL);
            }
            else {
                msg.channel.sendMessage("❌ User not found.")
            }
        }
        else {
            msg.channel.sendFile(msg.author.avatarURL);
        }
    }
}
