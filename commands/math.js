const math = require("mathjs");

exports.command = {
    action: function(msg,args){
        msg.channel.sendMessage("`" + math.eval(args) + "`");
    }
}
