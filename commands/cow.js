const cows = require('cows');

exports.command = {
    action: function(msg){
        msg.channel.sendCode(cows()[Math.floor(Math.random() * cows().length)].replace("`","\`"),"");
    }
}
