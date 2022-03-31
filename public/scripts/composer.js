/*

  Styles the behaviour of arrow-icon and tweet form when user scrolls

*/

// Script is executed after document finishes loading
$(() => {

  // Hide icon intially until user scrolls
  $('#arrow-scroll').hide();

  // Display icon when user scrolls and tweet form
  $(window).on('scroll', function() {

    if ($(this).scrollTop() !== 0) {
      $('#arrow-scroll').fadeIn("fast"); // Show icon
      $('.navbar2').fadeOut("fast"); // Hide tweet form

    } else {
      $('#arrow-scroll').fadeOut("fast");
      $('.navbar2').fadeIn("fast");
    }
  })

  // Return to top if user clicks on icon
  $('#arrow-scroll').on('click', function() {
    $('body, html').animate({scrollTop:0}, 500); // Smooth scrolling animation
  })
})