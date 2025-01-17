/*

  Dynamic character counter for tweet post

*/

// Waits for document to finish loading
$(() => {
  const $textarea = $('#tweet-text');

  $textarea.on('input', function() {

    // DOM traversal to access the counter element
    const $counter = $($($textarea.parent().siblings().children()[1]).children()[0]);

    // Initialize character count of input box
    const numOfChars = $textarea.val().length;
    const charCount = 140 - numOfChars;
    
    if (charCount < 0) { // Change counter to red if negative
      $counter.val(charCount).css({'color': '#EB5744'});
      
    } else if (charCount > 0) {
      $counter.val(charCount).css({'color': '#545149'});
    }
  });
});

