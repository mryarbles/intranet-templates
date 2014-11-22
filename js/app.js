// Sets the require.js configuration for your application.
requirejs.config( {

    baseUrl: "js/vendor",



    // 3rd party script alias names
    paths: {

        // Core Libraries
        "jquery": "../../bundles/jquery/dist/jquery.min",
        "angular": "../../bundles/angular/angular.min",
        "bootstrap":"../../bundles/bootstrap/dist/js/bootstrap.min",
        "flexslider":"../../bundles/flexslider/jquery.flexslider",
        "mmenu":"../../bundles/jQuery.mmenu/src/js/jquery.mmenu.min.all",
        "preloadjs":"preloadjs-0.4.1.min",
        "plugins":"../plugins",
        "mryarbles":"../mryarbles",
        "tweenmax":"http://cdnjs.cloudflare.com/ajax/libs/gsap/1.14.2/TweenMax.min"


    },

    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        'jquery': {
            exports: '$'
        },
        'plugins':      {
            deps: ['jquery']
        },
        "bootstrap": {
            deps:['jquery']
        },
        "flexslider": {
            deps:['jquery']
        },
        "mmenu":{
            deps:['jquery']
        },
        'tweenmax': {
            exports: 'TweenLite'
        },
        "angular": {
            "deps": [ "jquery", "plugins"],
            "exports": "angular"
        }


    }

});

// Includes File Dependencies
require([
    "jquery",
    "angular",
    "mmenu",
    "../intranet/display/home/HomeView",
    "../intranet/events/DomEvent",
    "mryarbles"
], function ( $, angular,mmenu, HomeView,DomEvent, mry) {


    $(document).ready(function() {

        // configure the mmenu
        $(".nav-drawer").mmenu({
            // options
            offCanvas:{
                position:'right',
                direction:'left'
            },
            classNames: {
                selected: "active"
            }
        });

        $("button.hamburger").click(function() {
            $(".nav-drawer").trigger("open.mm");
        });

        new HomeView({container:".content-container"});

        $(window).resize(function(){
            var self$ = $(this);

            $("body").trigger(DomEvent.RESIZE);

        });




    });
});
