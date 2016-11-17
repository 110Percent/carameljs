const reload = require("require-reload")(require);
const jsonfile = require("jsonfile");
var tags = reload("../tags.json");
const colors = require("colors");

exports.command = {
    action: function(msg,args){
        if (!tags[msg.guild.id]){
            tags[msg.guild.id] = {};
            jsonfile.writeFileSync("./tags.json",tags);
        }
        if (args.split(" ")[0] == "add"){
            if (tags[msg.guild.id][args.split(" ")[1]]){
                msg.channel.sendMessage("Tag \"" + args.split(" ")[1] + "\" already exists!");
            }
            else if (args.split(" ")[2]){
                tags[msg.guild.id][args.split(" ")[1]] = {
                    content: args.split(" ").splice(2).join(" "),
                    uses: 0,
                    creationDate: new Date(msg.createdTimestamp).toUTCString(),
                    ownerNameCache: msg.author.username,
                    ownerID: msg.author.id
                }
                jsonfile.writeFileSync("./tags.json",tags,{}, function (err) {
                  console.log(err)
                });
                console.log(colors.green("Created tag " + args.split(" ")[1] + " in guild " + msg.guild.id));
            }
        }
        else if (tags[msg.guild.id][args.split(" ")[0]]){
            var embed =  {description: tags[msg.guild.id][args.split(" ")[0]].content};
            msg.channel.sendMessage("",{embed});
        }
        console.log(tags);
    }
}
