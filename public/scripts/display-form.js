/*

  Script that toggles tweet form when user interacts with double arrow icon

*/

$(() => {
  // Hides tweet-form upon load
  $('#compose-tweet').hide();

  // Displays form when arrow is clicked
  $('#tweet-arrow').on('click', function() {

    // Toggles compose tweet form visibility
    $('#compose-tweet').toggle(1000)
    $('#tweet-text').focus(); // Puts pointer in textbox

  });

});