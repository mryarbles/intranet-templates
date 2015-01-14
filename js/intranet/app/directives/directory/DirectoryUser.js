/**
 * Toggles
 * jquery.toggles wrapper
 */

"use strict";
(
    function(){
        var dependencies = ['angular',"./DirectoryModule","jquery"];

        define(dependencies,function(angular,Module,jQuery) {

            console.log("directives.directory.Pagination");

            Module.directive('directoryUser', function factory($parse){
                console.log("directoryUser factory");
                var def = {
                    templateUrl: '/js/partials/directory/user.html',
                    restrict: 'AE',
                    replace:true,
                    scope: {
                        profile: "=",
                        directoryUser: "=user",
                        super: "="
                    },
                    link: function linkFn(scope, el, attrs, controllers){

                        if(scope.directoryUser.featured){
                            el.addClass("featured");
                        }

                        /*
                         *Not retrieving meta anymore
                         if(scope.directoryUser.meta !== null){
                         var ul = jq.append("<ul class=\"meta\"></ul>");
                         for(var key in scope.directoryUser.meta){
                         ul.append("<li>" + key + " : " + scope.directoryUser.meta[key] + "</li>");
                         }
                         }
                         */
                        if(scope.super == "1"){
                            var menuUl = el.append("<ul class=\"menu\"></ul>");
                            menuUl.append("<li><a href=\"\">Edit User</a></li>");
                            menuUl.append("<li><a href=\"\">Delete User</a></li>");
                        }


                        /*
                        if(scope.directoryUser.thumbnail === null){
                            scope.directoryUser.thumbnail = "/media/no-photo"
                        }
                        */

                    }
                };
                return def;
            });

        });


    }()
);
