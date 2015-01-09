
"use strict";
define(
    function (require)
    {
        var $ = require('jquery'),
            plugins = require('plugins'),
            mry = require('mryarbles'),
            DomEvent = require("../events/DomEvent");



        var module = function(options){
            this.options = options;

            $("body").bind(DomEvent.RESIZE,mryarbles.delegate(this.onResize,this));

        };

        module.prototype.onResize = function(){

        }

        module.prototype.openPage = function(){

        }

        module.prototype.closePage = function(){

        }



        return module;
    }
);
