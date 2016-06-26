
(function() {
    $(function() {
        // get all a elements that contains # in href, not including the ones that are set equal to #
        // sets a click handler to these a elements
        $('a[href*="#"]:not([href="#"])').click(function() {
            // check if the location and hostname are equal to those in the element clicked upon
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                // target is the elememnt on the page with the id corresponding to the href of the a element
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                console.log(target.length);
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 800);
                    return false;
                }
            }
        });
    });
})();