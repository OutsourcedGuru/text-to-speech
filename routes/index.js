var express =   require('express');
var router =    express.Router();
var speak =     require('node-speak');
var books =     require('../books.json');
var fs =        require('fs');
var read =      require('../read');

router.get('/', function(req, res, next) {
  var audio =   "";
  var text =    "Main Menu: use your up and down arrow keys";
  speak(text, {
    //gender: 'female',
    amplitude:  30,                          // default is 100
    pitch:      150,                         // default is 50
    speed:      155,                         // wpm speed is 175
    voice:      'en/en-us',                  // default voice is US English
    wordgap:     0,                          // extra wordgap in 10ms units, default is 0
    callback:   function(src) {
      audio =       src;
      htmlOutput =  "<!DOCTYPE html><html><body>" + text +
                    "<audio id='o' src='" + audio + "' /></body>" +
                    "<script type='text/javascript'>" +
                    "document.getElementById('o').play();" +
                    "</script>" +
                    "</html>"
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(htmlOutput);
    }   // callback of speak()
  });   // speak()
});     // router.get('/')

router.get('/books/:ordBook', function(req, res, next) {
  var audio =   "";
  var text =    "Book " + req.params.ordBook + ": " + books.rows[req.params.ordBook].doc.title;
  speak(text, {
      //gender: 'female',
      amplitude:  40,                          // default is 100
      pitch:      175,                         // default is 50
      speed:      135,                         // wpm speed is 175
      voice:      'en/en-us',                  // default voice is US English
      wordgap:    0,                           // extra wordgap in 10ms units, default is 0
      callback:   function(src) {
        audio =       src;
        htmlOutput =  "<!DOCTYPE html><html><body>" + text +
                      "<audio id='o' src='" + audio + "' /></body>" +
                      "<script type='text/javascript'>" +
                      "document.getElementById('o').play();" +
                      "</script>" +
                      "</html>"
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(htmlOutput);
      } // callback of speak()
  });   // speak()
});     // router.get('/books/:ordBook')


router.get('/books/read/:ordBook', function(req, res, next) {
  var text = "";
  read.book(req.params.ordBook, function(errRead) {
    if (errRead) {
      text = 'Read error for book ' + req.params.ordBook + ': ' + errRead;
      console.log(text);
      htmlOutput =  "<!DOCTYPE html><html><body><pre>" + text + "</pre></html>"
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(htmlOutput);
    }
    var audio =       "";
    var paragraph =   read.paragraph();
    var result =      paragraph.next();
    var done =        result.done;
    text =            result.value;
    console.log('paragraph.next().value returned done: ' + done);
    speak(text, {
        amplitude:  40,                          // default is 100
        pitch:      175,                         // default is 50
        speed:      135,                         // wpm speed is 175
        voice:      'en/en-us',                  // default voice is US English
        wordgap:    0,                           // extra wordgap in 10ms units, default is 0
        callback:   function(src) {
          audio =       src;
          htmlOutput =  "<!DOCTYPE html><html><body><pre>" + text +
                        "</pre><audio id='o' src='" + audio + "' /></body>" +
                        "<script type='text/javascript'>" +
                        "document.getElementById('o').play();" +
                        "</script>" +
                        "</html>"
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(htmlOutput);
        } // callback of speak()
    });   // speak()
  })      // read.book()
});

module.exports = router;
