var books =           require('./books.json');
var fs =              require('fs');
var _arrayBookData =  [];
var _ptrParagraph =   -1;
var _ordBook =        -1;
var _bRead =          false;

exports.book = function(ordBook, callback) {
  // No work to do, we've already read this book into the global variable
  if (ordBook == _ordBook && _bRead) {
    callback(false);
    return;
  }
  var fileName =  "/Users/justincase/sites/text-to-speech/database/books/" +
                  books.rows[ordBook].id.toString() +
                  ".txt";
  fs.readFile(fileName, 'utf8', function(errRead, bookData) {
    if (errRead) { callback(errRead + ' ' + fileName); return; }
    // Chop off everything in the header
    var re =      /START OF THE PROJECT GUTENBERG/;
    var result =  bookData.match(re);
    if (result) {
      bookData =  bookData.substr(
                  result.index +
                  "START OF THE PROJECT GUTENBERG EBOOK ***".length +
                  books.rows[ordBook].doc.title.length);
    } else { callback('Error finding start marker in book'); return; }
    // Chop off everything in the end
    re = /END OF THE PROJECT GUTENBERG/;
    var result =   bookData.match(re);
    if (result) {
      bookData =  bookData.substr(0,
                  result.index -
                  "***".length);
    } else { callback('Error finding end marker in book'); return; }
    // Chop off everything before the chapter start
    re =          /CHAPTER/;
    result =      bookData.match(re);
    if (result) {
      bookData = bookData.substr(result.index);
    } else { callback('Error finding chapter marker in book'); return; }
    // Success, we've read the book into bookData
    _bRead =          true;
    _ordBook =        ordBook;
    _ptrParagraph =   0;
    var index =       bookData.split('\r\n\r\n');
    _arrayBookData.push(
                      books.rows[ordBook].doc.title +
                      ' by ' +
                      books.rows[ordBook].doc.author);
    _arrayBookData.push('Chapter 1');
    for (var i = 1; i < index.length - 1; i++) {
      _arrayBookData.push(index[i]);
    }
    callback(false);
    return;
  }); // fs.readFile()
}     // book()

exports.paragraph = function* () {
  // Write your code here
  var thisParagraph = "";
  do {
    thisParagraph = _arrayBookData[_ptrParagraph++];
    // Skip blank lines
    if (thisParagraph == '') {
      thisParagraph = _arrayBookData[_ptrParagraph++];
    }
    yield thisParagraph;
  } while (_ptrParagraph <= _arrayBookData.length);
  return null;  // Returning without a yield triggers the paragraph.next().done boolean


} // paragraph*()
