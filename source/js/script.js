

$('.toggle-nav').click(function(e) {
    e.preventDefault();
    console.log(this);
    $(this).toggleClass('active');
    $('.menu ul').toggleClass('active');
});