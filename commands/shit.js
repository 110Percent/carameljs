    const jimp = require("jimp");

exports.command = {
    action: function(msg,args){
        if (args){
            if (args.length < 15){
                jimp.read("./utils/shit.jpg",function(err,shit){
                    jimp.loadFont("./utils/comic_sans.fnt").then(function (font) {
                        shit.print(font, 470, 30, args, 105);
                        shit.getBuffer(jimp.MIME_PNG,function(err,buffer){
                            msg.channel.sendFile(buffer,"shit.png");
                        })
                    });
                });
            }
        }
    }
}
