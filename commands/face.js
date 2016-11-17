const face = require("cool-ascii-faces");

exports.command = {
    action: function(msg){
        msg.channel.sendMessage(face().replace("`","\\`"));
    }
}
