const pretty = require('pretty-ms');

exports.command = {
    action: function(msg,args,caramel){
        msg.channel.sendMessage("🕒 Caramel.js Uptime: " + pretty(caramel.uptime));
    }
}
