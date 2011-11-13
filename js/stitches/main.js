/*!
 * Stitches - HTML5 Sprite Generator
 * http://draeton.github.com/Stitches
 *
 * Copyright 2011, Matthew Cobbs
 * Licensed under the MIT license.
 */
(function(a){a.Stitches=(function(){return{init:function(){Stitches.filesCount=0;Stitches.Page.init()},generateStitches:function(){Stitches.looseIcons=[];Stitches.placedIcons=[];Stitches.Page.$filelist.find("li").each(function(){var d=$(this).data("icon");Stitches.looseIcons.push(d)});Stitches.positionImages();var c=Stitches.makeStitches();var b=Stitches.makeStylesheet();Stitches.Page.buttons.$sprite.attr("href",c);Stitches.Page.buttons.$stylesheet.attr("href",b);Stitches.Page.toggleButtons("remove",["sprite","stylesheet"])},positionImages:function(){Stitches.looseIcons.forEach(function(c,b){c.x=c.y=0;c.isPlaced=false});Stitches.looseIcons=Stitches.looseIcons.sort(function(d,c){return c.area-d.area});Stitches.canvas=Stitches.Icons.idealCanvas(Stitches.looseIcons);Stitches.Icons.placeIcons(Stitches.looseIcons,Stitches.placedIcons,Stitches.canvas);Stitches.Icons.cropCanvas(Stitches.placedIcons,Stitches.canvas)},makeStitches:function(){var b=Stitches.canvas.getContext("2d");Stitches.placedIcons.forEach(function(d,c){b.drawImage(d.image,d.x,d.y)});return Stitches.canvas.toDataURL()},makeStylesheet:function(){Stitches.placedIcons=Stitches.placedIcons.sort(function(d,c){return d.name<c.name?-1:1});var b="";b+=".sprite {\n";b+="    background: url(sprite.png) no-repeat;\n";b+="}\n\n";Stitches.placedIcons.forEach(function(d,c){b+=".sprite-"+d.name+" {\n";b+="    width: "+d.width+"px;\n";b+="    height: "+d.height+"px;\n";b+="    background-position: -"+d.x+"px -"+d.y+"px;\n";b+="}\n\n"});return"data:,"+encodeURIComponent(b)}}})()})(window);