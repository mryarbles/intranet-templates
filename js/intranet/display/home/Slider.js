
"use strict";
define(
    function (require)
    {
        var $ = require('jquery'),
            plugins = require('plugins'),
            mry = require('mryarbles'),
            fs = require('flexslider'),
            BackgroundEvent = require("./../../events/BackgroundEvent"),
            DomEvent = require("./../../events/DomEvent");


        var module = function($container,$header){

            var body$ = $("body");

            this.self$ = $($container);
            this.header$ = $($header);

            this.self$.flexslider({
                animation:'slide',
                easing:'linear',
                animationLoop:true,
                animationSpeed: 250,
                slideshow:false,
                controlNav:true,
                controlsContainer: "#sliderControls",
                start:mryarbles.delegate(this.onSliderStart,this),
                before: mryarbles.delegate(this.onSliderBefore,this)
            });

            this.applyGradients();

            body$.bind(DomEvent.RESIZE, mryarbles.delegate(this.onResize,this));
        };

        module.prototype.applyGradients = function(){
            console.log("Slider.applyGradients");

            var slides$ = this.self$.find(".slide");
            console.dir(slides$);

            $.each(slides$, function(i){
                var slide$ = slides$.eq(i);
                console.log(slide$);
                var color = slide$.attr("data-color");

                if(color !== undefined){

                    var rgb = mryarbles.Math.Color.hexToRGB(color);

                    var cssStr = "background-image: linear-gradient(to bottom, rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0) 25%, rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",1) 100%);";
                    cssStr += " background-repeat: repeat-x";
                    //background-image: -webkit-linear-gradient(left, @start-color @start-percent, @end-color @end-percent); // Safari 5.1-6, Chrome 10+
                    //background-image: -o-linear-gradient(left, @start-color @start-percent, @end-color @end-percent); // Opera 12
                    //background-image: linear-gradient(to right, @start-color @start-percent, @end-color @end-percent); // Standard, IE10, Firefox 16+, Opera 12.10+, Safari 7+, Chrome 26+
                    //background-repeat: repeat-x;
                    //filter: e(%("progid:DXImageTransform.Microsoft.gradient(startColorstr='%d', endColorstr='%d', GradientType=1)",argb(@start-color),argb(@end-color)));

                    slide$.find(".copy").attr("style",cssStr);

                    /*
                     background-image: -webkit-linear-gradient(left, @start-color @start-percent, @end-color @end-percent); // Safari 5.1-6, Chrome 10+
                     background-image: -o-linear-gradient(left, @start-color @start-percent, @end-color @end-percent); // Opera 12
                     background-image: linear-gradient(to right, @start-color @start-percent, @end-color @end-percent); // Standard, IE10, Firefox 16+, Opera 12.10+, Safari 7+, Chrome 26+
                     background-repeat: repeat-x;
                     filter: e(%("progid:DXImageTransform.Microsoft.gradient(startColorstr='%d', endColorstr='%d', GradientType=1)",argb(@start-color),argb(@end-color))); // IE9 and down
                     */
                }

            });

        }

        module.prototype.sizeToScreen = function(){
            console.log("Slider.sizeToScreen");
            var h = $(window).height() - (this.header$.height() + 1),
                minH = 500;

            if(h < minH) {
                h = minH;
            }

            console.log("height:" + h);

            this.self$.height(h);
            this.self$.find(".slides li").height(h);
        }

        module.prototype.onSliderBefore = function(slider){
            console.log("Slider.onSliderBefore");
            console.dir(slider);
            this.updateColors(slider);
        };

        module.prototype.onSliderStart = function(slider){
            console.log("Slider.onSliderStart");
            this.sizeToScreen();
            this.updateColors(slider);
        };

        module.prototype.getCurrentSlide = function(slider){
            var index = slider.animatingTo;

            console.log("Slider.getCurrentSlide: " + index);

            //var slide = $(".flexslider .slide:nth-child(" + (index + 1) + ")");
            var slide = slider.slides.eq(slider.animatingTo);

            return slide;
        }

        module.prototype.updateColors = function(slider){
            //var slide = $(".flexslider .slide.flex-active-slide"),
                var slide = this.getCurrentSlide(slider),
                color = slide.attr("data-color"),
                scheme = slide.attr("data-style"),
                body$ = $("body");
            console.log("Slider.updateColors");

            //console.dir(slide);

            //console.log("color:" + color + " scheme:" + scheme);

            var possibles = ["darkly","lightly","custom"]

            for(var j= 0,pl=possibles.length;j<pl;j++){
                if(body$.hasClass(possibles[j])){
                    body$.removeClass(possibles[j]);
                }
            }

            body$.addClass(scheme);

            if(color !== undefined && color !== null){
                var e = $.Event(BackgroundEvent.CHANGE,{ color: color });
            } else {
                if(scheme === "darkly"){
                    var e = $.Event(BackgroundEvent.CHANGE,{ color: "#2b2b2b"});
                } else {
                    var e = $.Event(BackgroundEvent.CHANGE,{ color: "#ffffff"});
                }


            }
            $("body").trigger(e);
        };

        module.prototype.onResize = function(e){
            console.log("Slider.onResize");
            this.sizeToScreen();
        };

        return module;
    }
);
