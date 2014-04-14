/*
* Author : Martin Donk
* Email : martin.r.donk@gmail.com
* License : MIT license
* Source : https://github.com/jiggzson/truncateHTML
*/

(function($){
    //This method works by first removing all the tags, then truncating the text and then
    //reinserting without breaking the html
    $.fn.truncateHTML = function() {
        var userOptions = typeof arguments[0] === 'object' ? [].shift.apply(arguments) : {};

        if(arguments[0]) userOptions[arguments[0]] = arguments[1];
        //prepare the user provided options
        var $this = (this),
            html = $this.html().trim(),
            //the container we'll use to store the tags
            tags = [],
            //the tags which are to be explicitly excluded when tags are reinserted
            //after truncating
            conditionals = ['img', 'button', 'br', 'hr', 'input', 'textarea', 'video'],
            defaults =  {
                ellipsis: '...',
                chararcters: html.length,
                wordBoundary: false
            },
            options = $.extend(true, defaults, userOptions),

            //strip the html tags
            text = html.replace(/(<([^>]+)>)/ig, function() {
                var match = arguments[0],
                    location = arguments[3];
                tags.push([match, location]);
                return '';
            }),
            SPACE = ' ';

        //trim the text
        text = text.substr(0, options.characters);

        //if the cut should not cut words then we have to check if the cut is followed by a letter. 
        //if so then we have to remove the last letter altogether.
        if(options.wordBoundary && text.charAt(options.characters+1) !== SPACE) {
            var textArray = text.split(SPACE).splice(0, text.length-1);
            textArray.pop();
            text = textArray.join(SPACE);
        }
        
        //add the ellipsis
        text += options.ellipsis;
  
        //put back the tags
        var l = tags.length,
            deadTags = [];
        for(i=0; i<l; i++) {
            var position = tags[i][1],
                tag = tags[i][0];
            if(position > text.length) { 
                var matches = /<(\/*)(\w+)/gi.exec(tag.split(SPACE).shift()),
                    tagname = matches[2].toLowerCase();
                if($.inArray(tagname, conditionals) > -1) { tag = ''; }	
                //If any closing tag is found it's removed
                if(matches[1] ==='/' && deadTags[deadTags.length-1] === tagname) { deadTags.pop();}
                else if(tag) { deadTags.push(tagname); }
            }
            else {
                text = text.substr(0, position)+tag+text.substr(position);
            }
        }
        //the remaining tags should only be closing tags
        text += deadTags.map(function(tag){return '</'+tag+'>';}).join('');
		
        //replace the html within the container
        $this.html(text); 
        
        return $this;
    };    
})(jQuery);
