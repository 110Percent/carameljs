require('require-yaml');
var reload = require("require-reload")(require);

exports.command = {
    action: function(msg,args,caramel){
        var config = reload("../utils/config.yml");
        var embed = {
            color: 3447003,
            description: "https://110percent.github.io/carameljs/commands/﻿",
            timestamp: new Date(),
            footer: {
                icon_url: caramel.user.avatarURL,
                text: 'Caramel.js v' + config.version
            }
        }
        msg.channel.sendMessage("For a list of commands, visit Caramel's page:",{embed});
    }
}
