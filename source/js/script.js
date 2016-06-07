
/** Navigation **/
$('.toggle-nav').click(function(e) {
    e.preventDefault();
    console.log(this);
    $(this).toggleClass('active');
    $('.menu ul').toggleClass('active');
});



/** Header **/

$(function() {
    var $liElements = $('#intro ul li');
    var lastElem = null;
    $liElements.
    each(function() {
      if (lastElem && lastElem.offset().top != $(this).offset().top) {
          $(lastElem).addClass('no-bullet');
      }
      lastElem = $(this);
    }).last().addClass('no-bullet');
})();