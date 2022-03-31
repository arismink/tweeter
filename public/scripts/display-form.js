/*

  script to toggle tweet form

*/

$(() => {
  // hide new-tweet form upon load
  $('#new-tweet').hide();

  // display new-tweet when user clicks arrow
  $('#tweet-arrow').on('click', function() {
    $('#new-tweet').slideDown();
  })
})