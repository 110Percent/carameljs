const pretty = require('pretty-ms');
require('require-yaml');
var reload = require("require-reload")(require);


exports.command = {
    action: function(msg,args,caramel){
        var config = reload("../utils/config.yml");
        var usefulstuff = reload("../utils/usefulstuff.yml");
        var serverdb = reload("../utils/serverdb.json")
        if (serverdb[msg.guild.id].customPrefix){
            var cPrefix = serverdb[msg.guild.id].customPrefix;
        }
        else {
            var cPrefix = "##"
        }
<<<<<<< HEAD
        var stats = {
=======
        var embed = {
>>>>>>> ac03cde4c419ae637b030f9e56a46df9f02522c5
              color: 3447003,
              author: {
                   name: "Caramel.js Stats"
              },
              description: "﻿",
              fields: [
                {
                    name: 'Version',
                    value: String(config.version),
                    inline: true
                },
                {
                    name: 'Guilds',
                    value: caramel.guilds.size,
                    inline:true
                },
                {
                    name: 'Uptime',
                    value: pretty(caramel.uptime),
                    inline: true
                },
                {
                    name: 'Commands Processed',
                    value: usefulstuff.cmdamount,
                    inline: true
                },
                {
                    name: 'Guild Prefix',
                    value: "\"" + cPrefix + "\"",
                    inline: true
                },
                {
                    name: 'Ping',
                    value: (Date.now() - msg.createdTimestamp) + "ms",
                    inline: true
                },
              ],
              timestamp: new Date(),
              footer: {
                icon_url: caramel.user.avatarURL,
                text: 'Caramel.js v' + config.version
              }
            };
<<<<<<< HEAD
        msg.channel.sendMessage("Caramel.js Stats:",{embed:stats}).catch(err => {console.log(err)});
=======
        msg.channel.sendMessage("",{embed}).catch(err => {console.log(err)});
>>>>>>> ac03cde4c419ae637b030f9e56a46df9f02522c5
    }
}
