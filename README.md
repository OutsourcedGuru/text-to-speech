# text-to-speech
Create an audio-only interface for reading books from the Gutenberg project suitable for implementation on a Raspberry Pi Zero W single-board computer (with BlueTooth headphones)

## Status
The project currently has one book downloaded, the first in the books array.

## Complications
Some browsers like Safari now block audio/video content from automatically playing as the default setting. You will need to toggle this off for your own test website.

## Exit criteria
* Referring to `books.json` for the location of the collection of books represented, determine the collection of **id** values for all the books
* Download the plain `.txt` versions of each of the remaining books on Gutenberg into the `database/books` folder as *id*.txt, as seen in the previously-downloaded book
* Exercise the routes given in Express to review the interface, noting that the up/down buttons don't change the page navigation; simply enter a different URL to test each route
* Finish the generator function in `read.js` to make this functional