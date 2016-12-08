const jimp = require("jimp");

exports.command = {
    action: function(msg,args){
        msg.channel.startTyping();
        if (args){
            var target1 = args.split(" ")[0]
            console.log(target1);
            console.log(msg.mentions.users.array()[0])
            if (msg.mentions.users.array()[0]){
                target1 = msg.mentions.users.array()[0];
            }
            else if (msg.guild.members.find(val => val.user.username.toLowerCase() == target1.toLowerCase())){
                target1 = msg.guild.members.find(val => val.user.username.toLowerCase() == target1.toLowerCase()).user;
            }
            else if (msg.guild.members.find("nickname",target1)){
                target1 = msg.guild.members.find("nickname",target1).user;
            }
            else if (msg.guild.members.get(target1)){
                target1 = msg.guild.members.get(target1).user;
            }
            else {
                msg.channel.sendMessage("❌ User not found. Guess you're searching for a lover who never existed...");
                msg.channel.stopTyping();
                return;
            }

            var target2 = args.split(" ")[1]
            if (target2){
                if (msg.mentions.users.array()[1]){
                    target2 = msg.mentions.users.array()[1];
                }
                else if (msg.guild.members.find(val => val.user.username.toLowerCase() == target2.toLowerCase())){
                    target2 = msg.guild.members.find(val => val.user.username.toLowerCase() == target2.toLowerCase()).user;
                }
                else if (msg.guild.members.find("nickname",target2)){
                    target2 = msg.guild.members.find("nickname",target2).user;
                }
                else if (msg.guild.members.get(target2)){
                    target2 = msg.guild.members.get(target2).user;
                }
                else {
                    target2 = target1;
                    target1 = msg.author;
                }
            }
            else {
                target2 = target1;
                target1 = msg.author;
            }
        }
        else {
            var target1 = msg.guild.members.array()[Math.floor(Math.random() * msg.guild.members.array().length)].user;
            var target2 = msg.guild.members.array()[Math.floor(Math.random() * msg.guild.members.array().length)].user;
        }
        var newShip = new jimp(384,128,function(err,ship){
            jimp.read(target1.avatarURL, function(err,img){
                ship.blit(img,0,0,0,0,128,128);
                jimp.read(target2.avatarURL,function(err,img2){   //Ivan don't touch my fucking code
                    ship.blit(img2,256,0,0,0,img2.bitmap.width,img2.bitmap.height);
                    console.log("h" + img2.bitmap.height);
                    jimp.read("./utils/heart.png", function (err, heartpic){
                        heartpic.scale(0.5);
                        ship.blit(heartpic,160,32,0,0,64,64);
                        ship.getBuffer(jimp.MIME_PNG,function(err,buffer){
                            msg.channel.sendFile(buffer,"blit.png","I call it... " + target1.username.substring(0,Math.floor(target1.username.length/2)) + target2.username.substring(Math.ceil(target2.username.length/2)) + "! 😘\n");
                            msg.channel.stopTyping();
                        })
                    })
                })
            })
        })
        msg.channel.stopTyping();
    }
}
