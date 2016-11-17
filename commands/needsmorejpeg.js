const jimp = require("jimp");
const request = require('request').defaults({ encoding: null });
const isAbsoluteUrl = require('is-absolute-url');


exports.command = {
    action: function(msg,args){
        var imgQual;
        var scan = 0;
        imgQual = 3;
        if (args){
            if (isAbsoluteUrl(args.split(" ")[0])){
                if (args.split(" ")[0].match(/\.(jpeg|jpg|gif|png)$/) != null){
                    scan = 1;
                    msg.channel.startTyping();
                    var imgURL = args.split(" ")[0]
                    console.log(imgURL);
                    jimp.read(imgURL,function(err,image){
                        if (err) throw err;
                        image.quality(imgQual);
                        image.getBuffer(jimp.MIME_JPEG,function(err,imgbuffer){
                            msg.channel.sendFile(imgbuffer);
                        });
                    });
                    msg.channel.stopTyping();
                }
            }
        }
        if (scan == 0){
            if (msg.attachments.array()[0]){
                if (msg.attachments.array()[0].url.match(/\.(jpeg|jpg|gif|png)$/) != null){
                    msg.channel.startTyping();
                    scan = 1;
                    var imgURL = msg.attachments.array()[0].url;
                    console.log(imgURL);
                    jimp.read(imgURL,function(err,image){
                        if (err) throw err;
                        image.quality(imgQual);
                        image.getBuffer(jimp.MIME_JPEG,function(err,imgbuffer){
                            msg.channel.sendFile(imgbuffer);
                        });
                    });
                    msg.channel.stopTyping();
                }
            }
        }
        if (scan == 0){
            msg.channel.fetchMessages({limit:15}).then(msgCollection => {
                var msgCache = msgCollection.array();
                var cacheid = -1
                for (var i = 0; i < msgCache.length; i++){
                    if (msgCache[i].attachments.array()[0]){
                        cacheid = i
                        break;
                    }
                }
                if (cacheid != -1){
                    msg.channel.startTyping();
                    var imgURL = msgCache[cacheid].attachments.array()[0].url;
                    console.log(imgURL);
                    jimp.read(imgURL,function(err,image){
                        if (err) throw err;
                        image.quality(imgQual);
                        image.getBuffer(jimp.MIME_JPEG,function(err,imgbuffer){
                            msg.channel.sendFile(imgbuffer);
                        });
                    });
                    msg.channel.stopTyping();
                }
                else {
                    msg.channel.sendMessage("❌ No images detected in the past 15 messages.");
                }
            });
        }
    }
}
