const $movie = $('#title');
let $rating = $('#rating');

$('#form').on("submit", function(e){
    $(e.preventDefault());
    $('#list').append(`<li> ${$movie.val()} ... ${$rating.val()} </li>`)
})

$('ul').on('click', function(e){
    $(e.target).remove()
})