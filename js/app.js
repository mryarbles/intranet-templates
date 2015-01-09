// Sets the require.js configuration for your application.
requirejs.config( {

    baseUrl: "js/vendor",



    // 3rd party script alias names
    paths: {

        // Core Libraries
        "jquery": "../../bundles/jquery/dist/jquery.min",
        "angular": "../../bundles/angular/angular",
        "ngRoute":"../../bundles/angular-route/angular-route",
        "ngAnimate":"../../bundles/angular-animate/angular-animate.min",
        "bootstrap":"../../bundles/bootstrap/dist/js/bootstrap.min",
        "flexslider":"../../bundles/flexslider/jquery.flexslider",
        "toggles":"../../bundles/jquery-toggles/toggles",
        "mmenu":"../../bundles/jQuery.mmenu/src/js/jquery.mmenu.min.all",
        "preloadjs":"preloadjs-0.4.1.min",
        "plugins":"../plugins",
        "mryarbles":"../mryarbles",
        "tweenmax":"http://cdnjs.cloudflare.com/ajax/libs/gsap/1.14.2/TweenMax.min",
        "config":"../config"


    },

    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        'jquery': {
            exports: '$$'
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
        "toggles":{
            deps:['jquery']
        },
        'tweenmax': {
            exports: 'TweenLite'
        },
        "angular": {
            "deps": [ "jquery", "plugins"],
            "exports": "angular"
        },
        "ngRoute": {
            "deps": [ "angular"]
        },
        "ngAnimate": {
            "deps":["angular"]
        }


    }

});

// Includes File Dependencies
require([
    "jquery",
    "angular",
    "config",
    "../intranet/display/MainNav",
    "../intranet/app/Intranet",
    "../intranet/events/DomEvent"

], function ( $$, angular, config, MainNav,Intranet,DomEvent) {
    angular.element(document).ready(function() {

        $$.noConflict(true);

        $$(window).resize(function(){
            var self$ = $$(this);
            $$("body").trigger(DomEvent.RESIZE);
        });

        new MainNav({});

        /*
        var module = angular.module(config.appName, [])
            .config(function($routeProvider,$locationProvider){
                $routeProvider
                    .when("/",{templateUrl:'templates/home/index.html',controller:'HomeController'});

                $locationProvider.html5Mode(true);
            }
        )

            .controller("HomeController",HomeController);
            */



    });

});
