//**********************************************************
// MRYARBLES
//**********************************************************
(function($scope){

    "use strict";

    var mry = $scope.mryarbles = $scope.mryarbles || {};

    //====================================================
    // Utils
    //====================================================
    mry.utils = mry.utils || {};


    mry.delegate = function($targetMethod,$scope){
        return function($args){
            return $targetMethod.call($scope,$args);
        };
    }

    mry.createPackage = function ($packageName) {
        var parts = $packageName.split(".");
        var part = $scope;

        for (var i = 0; i < parts.length; i++) {
            part = part[parts[i]] === undefined ? (part[parts[i]] = {}) : part[parts[i]];
        }
        return part;
    }

    mry.extend = function ($subclass, $superclass) {
        function superclassConstructor () {};
        superclassConstructor.prototype = $superclass.prototype;
        $subclass.parent = $superclass.prototype;
        $subclass.prototype = new superclassConstructor();
        $subclass.prototype.constructor = $subclass;
        $subclass.fn = $subclass.prototype;
        $subclass.fn.parent = $subclass;

        // add the include function
        $subclass.include = function($obj){
            for(var i in $obj){
                this.fn[i] = $obj[i];
            }
        }

        // add proxy function
        $subclass.proxy = function($callBack){
            var self = this;
            return(
                function(){
                    return $callBack.apply(self,arguments);
                }
            );
        }

        $subclass.fn.proxy = $subclass.proxy;
    }

    mry.getQueryString = function(){
        var result = {}, queryString = location.search.substring(1),
            re = /([^&=]+)=([^&]*)/g, m;

        while(m = re.exec(queryString))
        {
            result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        return result;
    }

    mry.Date = {
        addSuffix: function(i) {
            var j = i % 10;
            if (j == 1 && i != 11) {
                return i + "st";
            }
            if (j == 2 && i != 12) {
                return i + "nd";
            }
            if (j == 3 && i != 13) {
                return i + "rd";
            }
            return i + "th";
        }
    };

    mry.String = {
        stringToBoolean: function($str){

            if(typeof($str) === "string"){

                switch($str.toLowerCase()){
                    case "true": case "yes": case "1": return true;
                    case "false": case "no": case "0": case null: return false;
                    default: return Boolean(string);
                }
            } else {
                //console.log("mryarbles.utils.String.stringToBoolean: argument is not a string: " + typeof($str) + " returned:" + $str);
                return $str;
            }
        }
    };

    mry.Math = {
        randomInt: function(min,max){
            return Math.round((max - min) * Math.random() + min);
        }
    };

    mry.Math.Color = {

    };

    mry.Math.Color.hexToRGB = function(hex){

        if(hex.indexOf("#") > -1){
            hex = hex.split("#")[1];
        }

        var bigint = parseInt(hex, 16),
            r = (bigint >> 16) & 255,
            g = (bigint >> 8) & 255,
            b = bigint & 255,
            rgb = {
                r:r,
                g:g,
                b:b
            };



        return rgb;
    }

    /*
    mry.utils.ObjectUtils = {
        toString: function (o){
            var parse = function(_o){
                var a = [], t;
                for(var p in _o){
                    if(_o.hasOwnProperty(p)){
                        t = _o[p];
                        if(t && typeof t == "object"){
                            a[a.length]= p + ":{ " + arguments.callee(t).join(", ") + "}";
                        } else {
                            if(typeof t == "string"){
                                a[a.length] = [ p+ ": \"" + t.toString() + "\"" ];
                            } else{
                                a[a.length] = [ p+ ": " + t.toString()];
                            }
                        }
                    }
                }
                return a;
            }
            return "{" + parse(o).join(", ") + "}";
        }
    };
    */

    mry.Debug = {};
    mry.Debug.log = function($send){
        if(window.console){
            if(typeof($send) === 'string'){
                console.log($send);
            } else {
                console.dir($send);
            }
        }
    }

})(window);