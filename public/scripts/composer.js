/*

  Styles the behaviour of arrow-icon and tweet form when user scrolls

*/

// Script is executed after document finishes loading
$(() => {

  // Hide icon intially until user scrolls
  $('#arrow-scroll').hide();

  // Stylizes tweet form and icon behaviour when user scrolls
  $(window).on('scroll', function() {

    if ($(this).scrollTop() !== 0) { // If user is not at top of page
      $('#arrow-scroll').fadeIn('fast'); // Show scroll icon
      $('nav').fadeOut('slow'); // Hide nav bar
      
    } else {
      $('#arrow-scroll').fadeOut('fast'); // Hide scroll icon
      $('nav').fadeIn('slow'); // Show nav bar
    }
  })

  // Return to top if user clicks on icon
  $('#arrow-scroll').on('click', function() {
    $('body, html').animate({scrollTop:0}, 500); // Smooth scrolling animation
  })
})