/*

  Script that toggles tweet form when user interacts with double arrow icon

*/

// get mentor to review this

$(() => {
  // Hides tweet-form upon load
  $('#new-tweet').hide();

  // Display form when arrow is clicked
  $('#tweet-arrow').on('click', function() {
    $('#new-tweet').slideDown();
    $('#tweet-text').focus();
  })
})