exports.command = {
    action: function(msg,args){
        var embed =  {description: args};
        msg.channel.sendMessage("",{embed});
    }
}
