"use strict";
(function(){
    var dependencies = ['config', 'angular', "ngRoute","ngAnimate","../display/home/HomeView","../display/MainNav", "./global/Global", "./home/Home", "./directory/Directory", "./services/Services","./directives/DirectivesModule"];
    define(dependencies,

            function (config,  angular, ngRoute, ngAnimate, HomeView, MainNav, GlobalModule, HomeModule, DirectoryModule, ServicesModule, DirectivesModule){

                console.log("Intranet");

                var intranetModule = angular.module(config.appName, ['ngRoute', 'ngAnimate', GlobalModule.name, HomeModule.name, DirectoryModule.name, ServicesModule.name, DirectivesModule.name]);

                intranetModule.config(
                    function($routeProvider,$locationProvider,$interpolateProvider){
                        console.log("Intranet config");

                        $interpolateProvider.startSymbol('{!{');
                        $interpolateProvider.endSymbol('}!}');

                        $routeProvider.caseInsensitiveMatch = true;
                        $routeProvider
                            .when( "/",{
                                templateUrl:'templates/home/index.html',
                                controller:'HomeController',
                                controllerAs:'home'
                            })
                            .when( "/directory",{
                                templateUrl:'templates/directory/index.html',
                                controller:'DirectoryController',
                                controllerAs:'directory'
                            })
                            .otherwise(
                                {
                                    redirectTo:'/'
                                }
                            );

                        $locationProvider.html5Mode(true);
                    }
                );

                intranetModule.run(function($rootScope){
                    console.log("Intranet Run");

                });


                angular.bootstrap(document, [config.appName]);


                return intranetModule;

            }

    );
}());
