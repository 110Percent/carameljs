exports.command = {
    action: function(msg){
        msg.channel.sendMessage("🏓 Pong!\tResponse Time: " + (Date.now() - msg.createdTimestamp) + "ms");
    }
}
