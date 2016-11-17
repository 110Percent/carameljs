exports.command = {
    action: function(msg,args){
        var randomNumber;
        if (args){
            if (args = Number(args)){
                randomNumber = args;
            }
            else {
                msg.channel.sendMessage("❌ Argument must be an integer.");
                return;
            }
        }
        else {
            randomNumber = 6;
        }
        msg.channel.sendMessage("🎲 Rolled " + Math.floor(Math.random() * randomNumber) + ".");
    }
}
