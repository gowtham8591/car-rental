//replace port 8080 below if you wish to change the server port
var serverport = 8585;

var http = require('http');
var qs = require('querystring');
var url = require('url');
var fs = require('fs');
var util = require('util');
var mime = require('mime');
var vidStreamer = require("vid-streamer");

var mydb = require('./mydb');

//write back result
writeResult = function (res, code, result, mimetype)
{
    res.writeHead(code, {'Content-Type': mimetype, 'Content-Length': result.length});
    res.write(result);
    res.end();
}

// get getFilename from request using url
getFilename = function (req) {
    var filename = req.url.substring(1);
    if (!!filename)
        return filename;
    return "/";
}

// sendFile 
sendFile = function (filename, res) {
    if (filename[filename.length - 1] === '/')
        filename += 'index.html'
    fs.readFile(filename, function (err, data) {
        if (err) {
            writeResult(res, "404", "Page not found!", "text/plain");
            return;
        }
//    console.log('file: ' + filename + ' mime : ' + mime.lookup(filename));    
        writeResult(res, 200, data, mime.lookup(filename));
    });
}


// the GET handler
handleGet = function (req, res) {
    var filename = getFilename(req).replace(/%20/g, " ");

    if (req.url === "/") {
        writeResult(res, "200", "A Simple Server says: Hello!", "text/plain");
    }
    else if (req.url === "/getScores") {
        sendScores(req, res);
    }
    else if (req.url === "/delay") {
        setTimeout(function () {
            sendFile('dummypage', res);
        }, 2000);
    }
    else if (req.url === '/getxml') {
        console.log("INCOMING REQUEST: " + req.method + " " + req.url);
        res.writeHead(200, {"Content-Type": "text/xml"});
        res.end("<order>12345</order>" + "\n");
    }
    else if (req.url === '/getUsers') {
        mydb.getUsers(res, getUsers);
    }
    else if (req.url.indexOf("/getUser") >= 0) {
        req.parsed_url = url.parse(req.url, true);
        var getp = req.parsed_url.query;
        var emailAddress = getp.emailAddress ? getp.emailAddress : "";
        console.log("emailAddress: " + emailAddress);
        mydb.getUser(res, emailAddress, getUser);
    }
    else if (req.url.indexOf("/resources/video") >= 0
            || req.url.indexOf("/resources/audio") >= 0) {
        vidStreamer(req, res);
    } else {
        sendFile(filename, res);
    }
}

//Handles /postAddUser
addUser = function (req, res) {
    var body = "";
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        var obj = qs.parse(body);
        var str = "<div><h1>Thanks for registering our contact list!</h1>"
                + "<div>Hi " + obj.firstName + "!"
                + "<p>Your Email ID: " + obj.emailAddress + "</p>"
                + "</div></div>";

        writeResult(res, "200", str, "text/html");
        mydb.insertUser(obj.firstName, obj.lastName, obj.emailAddress);
    });
};

//Handles /postDeleteUser
deleteUser = function (req, res) {
    var body = "";
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        var obj = qs.parse(body);
        var str = "<div><h1>Hope you will come back again!</h1>"
                + "<div>Hi " + obj.firstName + "!"
                + "<p>Your Email ID: " + obj.emailAddress + "</p>"
                + "</div></div>";

        writeResult(res, "200", str, "text/html");
        mydb.deleteUser(obj.userID);
    });
};

//Handles /postAddUser
updateUser = function (req, res) {
    var body = "";
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        var obj = qs.parse(body);
        var str = "<div><h1>Thanks for updating your contact information!</h1>"
                + "<div>Hi " + obj.firstName + "!"
                + "<p>Your Email ID: " + obj.emailAddress + "</p>"
                + "</div></div>";

        writeResult(res, "200", str, "text/html");
        mydb.updateUser(obj.firstName, obj.lastName, obj.emailAddress, obj.userID);
    });
};

// HTTP REQUEST HANDLERS
handlePost = function (req, res) {
    if (req.url === "/postComment") {
        addComment(req, res);
    } else if (req.url === "/postAddUser") {
        addUser(req, res);
    } else if (req.url === "/postUpdateUser") {
        updateUser(req, res);
    } else if (req.url === "/postDeleteUser") {
        deleteUser(req, res);
    } else {
        var str = "<h1>Server Response</h1>"
                + "Your post was successful!";
        writeResult(res, "200", str, "text/html");
    }
};

getUsers = function (res, users) {
   util.log("INCOMING REQUEST: " + req.method + " " + req.url);
    res.writeHead(200, {"Content-Type": "text/html"});
    var content = '{ "users" : ' + JSON.stringify(users) + ' } \n';
    res.end(content);
};

getUser = function (res, users) {
    //util.log("INCOMING REQUEST: " + req.method + " " + req.url);
    res.writeHead(200, {"Content-Type": "text/html"});
    var content = JSON.stringify(users);
    res.end(content);
    util.log(content);
};

// Connect to DB first
mydb.connectDB();

// server starts here
http.createServer(function (req, res) {
    if (req.method === 'GET') {
        handleGet(req, res);
    }
    else
    if (req.method === 'POST') {
        handlePost(req, res);
    }
}).listen(serverport);
util.log('A Simple Node Server is running...');
