const cats = require("cat-ascii-faces");

exports.command = {
    action: function(msg){
        msg.channel.sendMessage(cats().replace("`","\\`"));
    }
}
