//Initialize Discord Client
const Discord = require("discord.js");
const caramel = new Discord.Client({"fetchAllMembers":true});

//Require other modules
const colors = require("colors");
const fs = require("fs-extra");
const reload = require("require-reload")(require);
const request = require("request");
const exec = require("exec");

//Initialize variables for utils
var commands;
var config;
var serverdb;
var usefulstuff;

//Allow YAML parsing and parse config/other reloadable things
require('require-yaml');
function reloadModules(){
    console.log("Reloading Modules...")
    config = reload("./utils/config.yml");
    serverdb = reload("./utils/serverdb.json");
    usefulstuff = reload("./utils/usefulstuff.yml");
    commands = [];
    rlCommands();
}




//Actions to perform once the bot logs in
caramel.on("ready",function(){
    console.log("Successfully logged in!".italic.green + "\nUser: ".reset.italic + colors.yellow.bold(caramel.user.username + " #" + caramel.user.discriminator) + "\nID: ".reset.italic + colors.cyan.bold(caramel.user.id) + "\nCurrently serving in ".cyan + colors.yellow(caramel.guilds.size) + " guilds.".cyan);
});

//Perform these actions on startup
reloadModules();
caramel.login(config.token);

caramel.on("message", (msg) => {
    if (serverdb[msg.guild.id].customPrefix){
        var prefix = serverdb[msg.guild.id].customPrefix;
    }
    else {
        var prefix = "##";
    }
    if (msg.content.startsWith(prefix)){
        var atCmd = msg.content.substring(prefix.length).split(" ")[0];
        if (msg.author.id == config.ownerid){
            if (atCmd == "reload"){
                reloadModules();
                msg.channel.sendMessage("🔄 Caramel.js was reloaded.");
            }
            else if (atCmd == "eval"){
                var args = msg.content.substring(prefix.length + atCmd.length + 1);
                try {
                    msg.channel.sendMessage("▶ Input:\n```js\n" + args + "```\n\n✅ Output:\n```js\n" + eval(args) + "```");
                }
                catch (err){
                    msg.channel.sendMessage("▶ Input:\n```js\n" + args + "```\n\n❌ Error!\n```js\n" + err + "```");
                }
            }
            else if (atCmd == "shell"){
                var args = msg.content.substring(prefix.length + atCmd.length + 1);
                if (args){
                    exec(args, function(err, stdout, stderr){
                        if (stderr == 0){
                            msg.channel.sendMessage("```\n" + stdout +"\n```" );
                        }
                        else {
                            msg.channel.sendMessage("```\n" + stdout +"\n"+ stderr + "\n```" );
                        }
                    });
                }
            }
        }
        if (commands[atCmd]){
            cmd = commands[atCmd].command;
            var args = msg.content.substring(prefix.length + atCmd.length + 1);
            try {
                cmd.action(msg,args,caramel);
                usefulstuff = reload("./utils/usefulstuff.yml");
                usefulstuff.cmdamount++
                fs.writeJsonSync("./utils/usefulstuff.yml",usefulstuff);
            }
            catch (err){
                console.log(("Error performing command " + atCmd + ": " + err).red.bold);
            }
        }
    }
    if (msg.content.startsWith("##")){
        var atCmd = msg.content.substring(2).split(" ")[0];
        var args = msg.content.substring(atCmd.length + 3);
        if (msg.guild.members.get(msg.author.id).hasPermission("MANAGE_GUILD") || msg.author.id == config.ownerid){
            if (atCmd == "setprefix"){
                if (args.replace(/[^"]/g, "").length != 2){
                    msg.channel.sendMessage("❌ Put the prefix between quotation marks. Please do not include quotation marks in the prefix.");
                }
                else {
                    serverdb = require("./utils/serverdb.json");
                    serverdb[msg.guild.id].customPrefix = args.split("\"")[1];
                    fs.writeJsonSync("./utils/serverdb.json",serverdb);
                    msg.channel.sendMessage("✅ Prefix for this guild has been set to `" + args.split("\"")[1] + "`. Keep in mind that `##prefix` and `##setprefix` are not affected by this.");
                }
            }
        }
        if (atCmd == "prefix"){
            var thePrefix;
            if (serverdb[msg.guild.id].customPrefix){
                thePrefix = serverdb[msg.guild.id].customPrefix;
            }
            else {
                thePrefix = "##";
            }
            msg.channel.sendMessage("🎙 This guild's prefix is `" + thePrefix + "`.");
        }
    }
    if (msg.content == caramel.user){
        var reactions = ["👀","👋","😄","❗","😳","😱","👺","‼"];
        msg.react(reactions[Math.floor(Math.random() * reactions.length)]);
    }
})



//Add a guild to the database when Caramel is added to it
caramel.on("guildCreate", (guild) => {
    serverdb = require("./utils/serverdb.json");
    serverdb[guild.id] = {};
    fs.writeJsonSync("./utils/serverdb.json",serverdb);
    console.log(("Successfully joined guild " + guild.name + "!").green.italic);
});

//Function to reload commands
function rlCommands(){
    fs.readdir("./commands",{},function(err,files){
        if (err){
            console.log("Error reading files in `./commands`.");
        }
        else {
            var errorAmount = 0;
            for (var i = 0; i < files.length; i++){
                var loadCmd = files[i];
                if (loadCmd.split(".")[1] == "js"){
                    try {
                        commands[loadCmd.split(".")[0]] = reload("./commands/" + loadCmd);
                    }
                    catch (err){
                        console.log(("Error loading command " + loadCmd + ": " + err).red);
                        errorAmount++;
                    }
                }
            }
            if (errorAmount <= 0){
                console.log("Successfully loaded all commands!".green.italic);
            }
            else {
                console.log(("Loaded all commands with " + errorAmount + " errors.").yellow.italic);
            }
        }
    });
}
