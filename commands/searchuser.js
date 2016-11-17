

exports.command = {
    action: function(msg,args){
        if (args){
            if (args.length > 2){
                var pushusers = [];
                for (var i = 0; i < msg.guild.members.size; i++){
                    var find = msg.guild.members.array()[i];
                    if (find.nickname){
                        if (find.user.username.toLowerCase().indexOf(args.toLowerCase()) != -1 || find.nickname.toLowerCase().indexOf(args.toLowerCase()) != -1){
                            pushusers.push(find);
                        }
                    }
                    else {
                        if (find.user.username.toLowerCase().indexOf(args.toLowerCase()) != -1){
                            pushusers.push(find);
                        }
                    }
                }
                var printusers = [];
                for (var i = 0; i < pushusers.length; i++){
                    var pushuser = pushusers[i];
                    if (pushuser.nickname){
                        printusers.push(pushuser.user.username + " #" + pushuser.user.discriminator + "\t|\t" + pushuser.nickname);
                    }
                    else {
                        printusers.push(pushuser.user.username + " #" + pushuser.user.discriminator);
                    }
                }
                if (pushusers.length > 0){
                    msg.channel.sendMessage("🔍 Found `" + pushusers.length + "` users:\n```cs\n" + printusers.join("\n") + "```");
                }
                else {
                    msg.channel.sendMessage("❓ No users found.");
                }
            }
            else {
                msg.channel.sendMessage("❌ Search term must be at least 3 characters long.");
            }
        }
        else {
            msg.channel.sendMessage("❌ Please use a search term.");
        }

    }
}
