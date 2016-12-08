exports.command = {
    action: function(msg,args){
        if (args){
<<<<<<< HEAD
            if (msg.mentions.users.array()[0]){
=======
            if (msg.mentions.users.array()[0] && msg.mentions.users.array()[0] == args){
>>>>>>> ac03cde4c419ae637b030f9e56a46df9f02522c5
                msg.channel.sendFile(msg.mentions.users.array()[0].avatarURL);
            }
            else if (msg.guild.members.find(val => val.user.username == args)){
                msg.channel.sendFile(msg.guild.members.find(val => val.user.username == args).user.avatarURL);
            }
            else if (msg.guild.members.find("nickname",args)){
                msg.channel.sendFile(msg.guild.members.find("nickname",args).user.avatarURL);
            }
<<<<<<< HEAD
            else if (msg.guild.members.get(args)){
=======
            else if (msg.guild.members.find("id",args)){
>>>>>>> ac03cde4c419ae637b030f9e56a46df9f02522c5
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
