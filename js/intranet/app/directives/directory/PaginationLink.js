/**
 * Toggles
 * jquery.toggles wrapper
 */

"use strict";
(
    function(){
        var dependencies = ['angular',"./DirectoryModule"];

        define(dependencies,function(angular,Module) {

            console.log("directives.directory.Pagination");

            Module.directive("paginationLink",function factory($parse){
                var def = {
                    template:'<a>{{ l }}</a>',
                    restrict: 'AE',
                    replace:true,
                    scope: false,
                    link: function linkFn(scope, el, attrs){

                        var jq = jQuery(el);
                        el.bind('click', function(){
                            var t = jQuery(this);
                            scope.$emit('onPagination',t.text());
                        });

                    }
                };
                return def;
            });

        });


    }()
);
