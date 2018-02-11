# text-to-speech
Create an audio-only interface for reading books from the Gutenberg project suitable for implementation on a Raspberry Pi Zero W single-board computer (with BlueTooth headphones)

![raspberrypizerow](https://user-images.githubusercontent.com/15971213/36076622-7da7ac18-0f13-11e8-8622-d6aa1ec3bf5a.jpg)

## Status
The project currently has one book downloaded, the first in the books array.

## Complications
Some browsers like Safari now block audio/video content from automatically playing as the default setting. You will need to toggle this off for your own test website.

![screen shot 2018-02-11 at 9 47 16 am](https://user-images.githubusercontent.com/15971213/36076626-8efaf3bc-0f13-11e8-8b28-991760d65e75.png)

![screen shot 2018-02-11 at 9 47 36 am](https://user-images.githubusercontent.com/15971213/36076629-9cb67594-0f13-11e8-9de2-5ea2cfa7b2c9.png)

## Exit criteria
* Referring to `books.json` for the location of the collection of books represented, determine the collection of **id** values for all the books
* Download the plain `.txt` versions of each of the remaining books on Gutenberg into the `database/books` folder as *id*.txt, as seen in the previously-downloaded book
* Exercise the routes given in Express to review the interface, noting that the up/down buttons don't change the page navigation; simply enter a different URL to test each route
* Finish the generator function in `read.js` to make this functional