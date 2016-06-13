angular.module('cppSlideApp').directive('initSlideshow', function($interval, $location, $timeout) {
    function init() {
        // initialize the slideshow
        $('.image img').fullscreenslides();
        
        // All events are bound to this container element
        var $container = $('#fullscreenSlideshowContainer');
        
        // This is triggered once:
        $container.bind('init', function() { 
            // The slideshow does not provide its own UI, so add your own
            // check the fullscreenstyle.css for corresponding styles
            $container
                .append('<div class="ui" id="fs-close">&times;</div>')
                .append('<div class="ui" id="fs-loader">Loading...</div>')
                .append('<div class="ui" id="fs-prev">&lt;</div>')
                .append('<div class="ui" id="fs-next">&gt;</div>')
                .append('<div class="ui" id="fs-caption"><span></span></div>');
            
            // Bind to the ui elements and trigger slideshow events
            $('#fs-prev').click(function(){
                // You can trigger the transition to the previous slide
                $container.trigger('prevSlide');
            });
            $('#fs-next').click(function(){
                // You can trigger the transition to the next slide
                $container.trigger('nextSlide');
            });
            $('#fs-close').click(function(){
                // You can close the slide show like this:
                $container.trigger('close');
            });
            
        })
        // When a slide starts to load this is called
        .bind('startLoading', function() { 
            // show spinner
            $('#fs-loader').show();
        })
        // When a slide stops to load this is called:
        .bind('stopLoading', function() { 
            // hide spinner
            $('#fs-loader').hide();
        })
        // When a slide is shown this is called.
        // The "loading" events are triggered only once per slide.
        // The "start" and "end" events are called every time.
        // Notice the "slide" argument:
        .bind('startOfSlide', function(event, slide) { 
            // set and show caption
            $('#fs-caption span').html(slide.title);
            $('#fs-caption').show();
        })
        // before a slide is hidden this is called:
        .bind('endOfSlide', function(event, slide) { 
            $('#fs-caption').hide();
        });

        $('.image a').first().trigger('click');

        var interval = $location.search().t || 10000;
        $interval(function() {
            $container.trigger('nextSlide');
        }, interval);
    }

    return function(scope, element, attrs) {
        if (scope.$last) {
            $timeout(init);
        }
    };
});
