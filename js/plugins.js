// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());



//**********************************************************
// JQUERY CONFIG, UTILS AND PLUGINS
//**********************************************************
(function($) {

    $.Events = {
        SCROLL:						'onScroll',
        RESIZE:						'onWindowResize',
        LOAD_COMPLETE:              'onLoadComplete'
    };

    $.Body = $('body');
    $.Window = $(window);

    $.Mobile 	= navigator.userAgent.match(/(iPhone)|(iPod)|(android)|(webOS)/i);
    $.Android   = navigator.userAgent.match(/(android)|(webOS)/i);
    $.IPhone    = navigator.userAgent.match(/(iPhone)/i);
    $.IPad 		= navigator.userAgent.match(/(iPad)/i);

    $.Window.resize(function($event){
        $.Body.triggerHandler($.Events.RESIZE,$event);
    });

    /**
     * Binds the windows scroll event and dispatches event.
     */
    $.Window.scroll(
        function($event){
            $.Body.triggerHandler($.Events.SCROLL,$event);
        }
    );

    /**
     * $.extend
     * extends jquery to delegate callbacks to objects.
     */
    $.extend({
        scope: function(fn, scope)
        {
            return function(){
                return fn.apply(scope, arguments);
            }
        }
    });



    // onScreen jQuery plugin v0.2.1
    // (c) 2011-2013 Ben Pickles
    //
    // http://benpickles.github.com/onScreen
    //
    // Released under MIT license.

    $.expr[":"].onScreen = function(elem) {
        var $window = $(window)
        var viewport_top = $window.scrollTop()
        var viewport_height = $window.height()
        var viewport_bottom = viewport_top + viewport_height
        var $elem = $(elem)
        var top = $elem.offset().top
        var height = $elem.height()
        var bottom = top + height

        return (top >= viewport_top && top < viewport_bottom) ||
        (bottom > viewport_top && bottom <= viewport_bottom) ||
        (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom)
    }


})(jQuery);


//**********************************************************
// POLYFILLS
//**********************************************************

// IE8 ployfill for GetComputed Style (for Responsive Script below)
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}


/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
 */
(function(w){
    // This fix addresses an iOS bug, so return early if the UA claims it's something else.
    if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
    var doc = w.document;
    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
        x, y, z, aig;
    if( !meta ){ return; }
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true; }
    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false; }
    function checkTilt( e ){
        aig = e.accelerationIncludingGravity;
        x = Math.abs( aig.x );
        y = Math.abs( aig.y );
        z = Math.abs( aig.z );
        // If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
            if( enabled ){ disableZoom(); } }
        else if( !enabled ){ restoreZoom(); } }
    w.addEventListener( "orientationchange", restoreZoom, false );
    w.addEventListener( "devicemotion", checkTilt, false );
})( this );




