truncateHTML
============

A jquery addon function which shortens the contents of a div without hopefully breaking its html.

USAGE:

**Somewhere after having jquery loaded**

    <script src="path/to/truncateHTML.js"></script>

then

    $('some_div_or_span').truncateHTML(options);
    
or

    $('some_div_or_span').truncateHTML({option1: value, option2: value});
    
to shorten the contents of the div.


OPTIONS:

*characters*: 
The number of characters to retain. Keep in mind that this not take into account your ellipsis 
so you will have to subtract that from this number.


*forceWord*:
Force the text to be cut off at a word so you don't end up with something like thi...


*ellipsis*:
Override the default 3-dot ellipsis. If you don't want any for instance just set it to an empty string.

