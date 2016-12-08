const cbmodule = require("cleverbot-node");
const cleverbot = new cbmodule;

exports.command = {
    action: function(msg,args){
        if (args){
            msg.channel.startTyping();
            cbmodule.prepare(function(){
                cleverbot.write(args,function(response){
                    msg.channel.sendMessage("💬 " + response.message);
                })
            });
            msg.channel.stopTyping();
        }
    }
}
