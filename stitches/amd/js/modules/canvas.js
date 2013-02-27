// Copyright 2013, Matthew Cobbs

// Licensed under the MIT license.

define(["jquery","util/util","util/array","util/stitches","modules/sprite"],function(d,g,h,c,i){var j={dimensions:{width:400,height:400},progress:function(){}},f=function(a,b){this.$element=d(a);this.settings=d.extend({},j,b);this.dimensions=this.settings.dimensions;this.progress=this.settings.progress;this.sprites=[];this.stylesheet=this.spritesheet=null;this.init()};f.classname=".stitches-canvas";f.prototype={constructor:f,init:function(){this.reset=g.debounce(this.reset,500);this.proxy();this.bind();
this.setup();this.reset()},proxy:function(){g.proxy(this,"createSprite clearActive")},bind:function(){this.$element.on("create-sprite",this.createSprite);this.$element.on("clear-active",this.clearActive)},setup:function(){var a=this;this.$element.find(".stitches-sprite").each(function(){d(this);var b=d(this).find("img"),e=b.data("name"),b=b.attr("src");a.$element.trigger("create-sprite",[e,b])}).remove()},reset:function(){this.$element.trigger("show-overlay");this.measure(this.sprites);this.place(this.sprites);
this.cut(this.sprites);this.$element.trigger("hide-overlay")},measure:function(a){this.dimensions=c.getDimensions(a,this.settings.dimensions)},place:function(a){d.map(a,function(a){a.reset()});a=a.sort(function(a,e){return e.area===a.area?e.name>a.name?1:-1:e.area-a.area});c.placeSprites(a,[],this.dimensions,this.progress)},cut:function(a){c.trim(a,this.dimensions);this.$element.css({width:this.dimensions.width+"px",height:this.dimensions.height+"px"})},add:function(a){this.$element.trigger("show-overlay");
this.sprites.push(a);a.$element.appendTo(this.$element);this.$element.trigger("update-toolbar");this.reset()},remove:function(a){this.$element.trigger("show-overlay");this.sprites=h.remove(this.sprites,a);a.$element.fadeOut("fast").remove();this.$element.trigger("update-toolbar");this.$element.trigger("close-properties");this.reset()},clear:function(){this.$element.trigger("show-overlay");this.sprites=[];this.$element.empty();this.$element.trigger("update-toolbar");this.$element.trigger("close-properties");
this.$element.trigger("open-settings");this.reset()},generateSheets:function(a){var b=this.sprites,e=a.prefix,d=a.uri;a=c.makeSpritesheet(b,this.dimensions);b=c.makeStylesheet(b,a,e,d);try{a=c.dataToObjectURL(a),b=c.dataToObjectURL(b)}catch(f){this.$element.trigger("error",[f])}this.spritesheet=a;this.stylesheet=b;this.$element.trigger("update-toolbar");this.progress(1,"success")},clearActive:function(a,b){this.$element.find(".active").each(function(){var a=d(this),c=a.data("sprite");b&&c!==b&&(a.removeClass("active"),
c.active=!1)})},createSprite:function(a,b,c){var d=this;new i({name:b,src:c,padding:this.settings.padding,callback:function(a){d.add(a)}})}};return f});