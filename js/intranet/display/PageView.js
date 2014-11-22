
"use strict";
define(
    function (require)
    {
        var $ = require('jquery'),
            plugins = require('plugins'),
            mry = require('mryarbles'),
            DomEvent = require("../events/DomEvent");



        var module = function(options){
            console.log("PageView");
            this.options = options;

            $("body").bind(DomEvent.RESIZE,mryarbles.delegate(this.onResize,this));

        };

        module.prototype.onResize = function(){
            console.log("PageView.onResize");

        }

        module.prototype.openPage = function(){
            console.log("PageView.openPage");
        }

        module.prototype.closePage = function(){

        }



        return module;
    }
);
