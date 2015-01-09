
"use strict";
define(
    function (require)
    {
        var $ = require('jquery'),
            plugins = require('plugins'),
            mry = require('mryarbles'),
            mmenu = require("mmenu");


        var module = function(opts){

            console.log("MainNav");

            if(opts !== undefined){
                this.options = opts
            } else {
                this.options = {}
            }

            this.options = $.extend(this.options,module.defaults);

            this.openButton = $(this.options.openButton);

            this.closeButton = $(this.options.closeButton);

            this.menu = $(this.options.target);

            // configure the mmenu
            this.menu.mmenu(this.options).on("closed.mm", mryarbles.delegate(this.onClosed,this));

            this.closeButton.click(mryarbles.delegate(this.onClose,this));

            $(this.options.openButton).click(mryarbles.delegate(this.onOpen,this));


        };

        module.prototype.onOpen = function(e){
            this.openButton.addClass("mm-open");
            $(this.options.target).trigger("open.mm");
        };

        module.prototype.onClose = function(e){
            console.log("MainNav.onClose");
            this.menu.trigger("close.mm");
        }

        module.prototype.onClosed = function(e){
            this.openButton.removeClass("mm-open");
        }

        module.defaults = {
            target:".nav-drawer",
            openButton:"button.hamburger",
            closeButton:".btn-nav-close",
            offCanvas:{
                position:'right',
                direction:'left'
            },
            classes: "",
            classNames: {
                selected: "active"
            }
        };



        return module;
    }
);
