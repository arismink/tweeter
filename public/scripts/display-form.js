/*

  Script that toggles tweet form when user interacts with double arrow icon

*/

$(() => {
  // Hides tweet-form upon load
  $('#new-tweet').hide();

  // Displays form when arrow is clicked
  $('#tweet-arrow').on('click', function() {
    $('#new-tweet').slideDown();
    $('#tweet-text').focus(); // Puts pointer in textbox
  });
});