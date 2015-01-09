
"use strict";
define(
    function (require)
    {
        var $ = require('jquery'),
            plugins = require('plugins'),
            mry = require('mryarbles'),
            preload = require("preloadjs"),
            PreloaderEvent = require("../events/PreloaderEvent");
            //fs = require('flexslider'),
            //BackgroundEvent = require("./../../events/BackgroundEvent"),
           // DomEvent = require("./../../events/DomEvent");


        var module = function(){
            console.log("Preloader");
            this.elements = $("[data-src]");
            this.queue = new createjs.LoadQueue();
            this.queue.on("complete",mryarbles.delegate(this.onComplete,this));
            this.startQueue();

        };

        var prot = module.prototype;

        prot.onComplete = function(e){
            console.log("Preloader.onComplete");
            for(var i= 0,l=this.elements.length;i<l;i++){
                var el = this.elements.eq(i);
                var src = el.attr("data-src");
                el.attr("src",src);
            }

            $("body").trigger(PreloaderEvent.COMPLETE);
        }

        prot.startQueue = function(){
            console.log("Preloader.startQueue");
            var manifest = [];
            for(var i= 0,l=this.elements.length;i<l;i++){
                var el = this.elements.eq(i);
                var src = el.attr("data-src");
                //console.log(src);
                var o = {
                    id: "asset" + i,
                    src:src
                }
                manifest.push(o);
            }

            this.queue.loadManifest(manifest);

        }



        return module;
    }
);
