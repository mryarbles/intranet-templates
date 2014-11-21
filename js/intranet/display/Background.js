
"use strict";
define(
    function (require)
    {
        var $ = require('jquery'),
            BackgroundEvent = require("./../events/BackgroundEvent"),
            TweenLite = require("tweenmax"),
            mry = require("mryarbles");


        var module = function($backgroundsArr){
            this.bgSelecters = $backgroundsArr;


            console.dir(this);

            $("body").bind(BackgroundEvent.CHANGE, mryarbles.delegate(this.onBackgroundChange,this));

        };


        module.prototype.onBackgroundChange = function(e){
            var color = e.color;

            console.log("Background.onBackgroundChange color:" + color);
            // apply backgrounds
            for(var i= 0,l=this.bgSelecters.length;i<l;i++){
                var el = $(this.bgSelecters[i]).get(0);
                TweenLite.to(el,.25, {backgroundColor:color});
            }

        }

        return module;
    }
);
