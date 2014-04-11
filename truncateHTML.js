/*
* Author : Martin Donk
* Email : martin.r.donk@gmail.com
* License : MIT license
* Source : https://github.com/jiggzson/truncateHTML
*/

(function($){
    //This method works by first removing all the tags, then chopping the text and then
    //reinserting the text excluding those which may alter the formatting after the chop.
    $.fn.truncateHTML = function() {
        var userOptions = typeof arguments[0] === 'object' ? [].shift.apply(arguments) : {};

        if(arguments[0]) userOptions[arguments[0]] = arguments[1];
        //grab the html and store it
        //prepare the user provided options
        var html = $(this).html().trim(),
            //the container we'll use to store the tags
            tags = [],
            //when reinserting the tags we use this to keep track of the 
            //very last tag that was reinserted
            conditionals = ['img', 'button', 'br', 'hr', 'input', 'textarea', 'video'],
            defaults =  {
                ellipsis: '...',
                chararcters: html.length,
                forceWord: false
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

        //if the cut is word sensitive then we have to check if the cut is follwed by a letter. 
        //If so then we have to remove the last letter altogether.
        if(options.forceWord && text.charAt(options.characters+1) !== SPACE) {
            var textArray = text.split(SPACE).splice(0, text.length-1);
            textArray.pop();
            text = textArray.join(SPACE);
        }

        //add the ellipsis
        text += options.ellipsis;
        
        //put back the tags
        var l = tags.length;
        for(i=0; i<l; i++) {
            var position = tags[i][1],
                tag = tags[i][0];

            //It should be safe to just reinsert all the tags with the exception of a few due 
            //to the fact that they'll have zero width and therefore won't break formatting 
            //e.g. <a href="somelink"></a> shouldn't break formatting.
            //Some tags however are not worthy and must be slain.
            if(position > options.characters) { 
                var tagname = /<\/*(\w+)/gi.exec(tag.split(SPACE).shift())[1].toLowerCase();
                if($.inArray(tagname, conditionals) > -1) tag = '';
            }
            text = text.substr(0, position)+tag+text.substr(position);
        }
        return text;
    };    
})(jQuery);
