const request = require("request");
const uri = require('strict-uri-encode');
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
const isAbsoluteUrl = require('is-absolute-url');

exports.command = {
    action: function(msg,args){
        var scan = 0;
        if (args){
            if (isAbsoluteUrl(args.split(" ")[0])){
                if (args.split(" ")[0].match(/\.(jpeg|jpg|gif|png)$/) != null){
                    scan = 1;
                    msg.channel.startTyping();
                    var imgURL = args.split(" ")[0];
                    request("http://waifu2x.booru.pics/Home/fromlink?url=" + uri(imgURL) + "&denoise=1&scale=2&submit=",function(err,response,body){
                        if (err){
                            console.log(err);
                        }
                        else {
                            var lineID = -1;
                            for (var i = 0; i < body.split("\n").length; i++){
                                if (body.split("\n")[i].indexOf(">PNG<") != -1){
                                    lineID = i;
                                    break;
                                }
                            }
                            sleep(2000).then(() => {
                                request("http://waifu2x.booru.pics/Home/fromlink?url=" + uri(imgURL) + "&denoise=1&scale=2&submit=",function(err,response,body){
                                    if (err){
                                        console.log(err);
                                    }
                                    else {
                                        var lineID = -1;
                                        for (var i = 0; i < body.split("\n").length; i++){
                                            if (body.split("\n")[i].indexOf(">PNG<") != -1){
                                                lineID = i;
                                                break;
                                            }
                                        }
                                        var resizeURL = "http://waifu2x.booru.pics" + body.split("\n")[lineID].split("\"")[1];
                                        msg.channel.sendFile(resizeURL);
                                    }
                                });
                            });
                        }
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
                    request("http://waifu2x.booru.pics/Home/fromlink?url=" + uri(imgURL) + "&denoise=1&scale=2&submit=",function(err,response,body){
                        if (err){
                            console.log(err);
                        }
                        else {
                            var lineID = -1;
                            for (var i = 0; i < body.split("\n").length; i++){
                                if (body.split("\n")[i].indexOf(">PNG<") != -1){
                                    lineID = i;
                                    break;
                                }
                            }
                            sleep(2000).then(() => {
                                request("http://waifu2x.booru.pics/Home/fromlink?url=" + uri(imgURL) + "&denoise=1&scale=2&submit=",function(err,response,body){
                                    if (err){
                                        console.log(err);
                                    }
                                    else {
                                        var lineID = -1;
                                        for (var i = 0; i < body.split("\n").length; i++){
                                            if (body.split("\n")[i].indexOf(">PNG<") != -1){
                                                lineID = i;
                                                break;
                                            }
                                        }
                                        var resizeURL = "http://waifu2x.booru.pics" + body.split("\n")[lineID].split("\"")[1];
                                        msg.channel.sendFile(resizeURL);
                                    }
                                });
                            });
                        }
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
                    request("http://waifu2x.booru.pics/Home/fromlink?url=" + uri(imgURL) + "&denoise=1&scale=2&submit=",function(err,response,body){
                        if (err){
                            console.log(err);
                        }
                        else {
                            var lineID = -1;
                            for (var i = 0; i < body.split("\n").length; i++){
                                if (body.split("\n")[i].indexOf(">PNG<") != -1){
                                    lineID = i;
                                    break;
                                }
                            }
                            sleep(2000).then(() => {
                                request("http://waifu2x.booru.pics/Home/fromlink?url=" + uri(imgURL) + "&denoise=1&scale=2&submit=",function(err,response,body){
                                    if (err){
                                        console.log(err);
                                    }
                                    else {
                                        var lineID = -1;
                                        for (var i = 0; i < body.split("\n").length; i++){
                                            if (body.split("\n")[i].indexOf(">PNG<") != -1){
                                                lineID = i;
                                                break;
                                            }
                                        }
                                        var resizeURL = "http://waifu2x.booru.pics" + body.split("\n")[lineID].split("\"")[1];
                                        msg.channel.sendFile(resizeURL);
                                    }
                                });
                            });
                        }
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
