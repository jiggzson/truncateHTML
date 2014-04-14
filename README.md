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


*wordBoundary*:
Force the text to be cut off at a word so you don't end up with something like thi...


*ellipsis*:
Override the default 3-dot ellipsis. If you don't want any for instance just set it to an empty string.

EXAMPLE:

**input**
```
<div class="somediv">
<p>In an effort to provide you with the ability to help yourself, several solutions have been uploaded. 
<br>Two of which can be found <a href="example.com"><span class="bold">by following this link</span></a>. 
Access will be available tomorrow.</p>
</div>

<script>
    $('.somediv').truncateHTML({'characters':150, wordBoundary: true});
</script>
```

**output**

```
<p>In an effort to provide you with the ability to help yourself, several solutions have been uploaded. 
<br>Two of which can be found <a href="example.com"><span class="bold">by following this...</span></a></p>
```
