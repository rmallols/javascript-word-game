'use strict';
var express = require('express'),
    fs      = require('fs'),
    app     = express(),
    server  = require('http').createServer(app),
    wordListHash = {};

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: "test" }));

generateWordListHash();

app.get('/', function (req, res) {
    goToIndex(res);
});

app.post('/submit-word', function (req, res) {
    var word = req.body.word.toLowerCase(),
        firstWordChar = word.substr(0, 1),
        wordListSegment = wordListHash[firstWordChar];
    if(isWordValid(word, wordListSegment)) {
        res.send({ msg: 'Congratulations! The specified word is available in the word list directory'});
    } else {
        res.status(400).send({ msg: 'Sorry, the specified word is not available in the word list directory'});
    }
});

app.use(express.static(__dirname + '/../frontend'));

var port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log("listening on " + port);
});

function goToIndex(res) {
    res.send(fs.readFileSync(__dirname + '/../frontend/src/index.html').toString());
}

function generateWordListHash() {
    fs.readFile(__dirname + '/wordlist.txt', 'utf8', function(err, data) {
        if (err) throw err;
        var wordListArray = data.replace(/\n/g,"#").split('#');
        wordListArray.forEach(function (word) {
            word = word.toLowerCase();
            var firstWordChar = word.substr(0, 1);
            if(!wordListHash[firstWordChar]) {
                wordListHash[firstWordChar] = [];
            }
            wordListHash[firstWordChar].push(word);
        });
    });
}

function isWordValid(word, wordListSegments) {
    var isWordValid = false;
    if(wordListSegments) {
        for(var i = 0; i < wordListSegments.length; i++) {
            if(word === wordListSegments[i]) {
                isWordValid = true;
                break;
            }
        }
    }
    return isWordValid;
}