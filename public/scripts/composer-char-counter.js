// wait for document to finish loading
$(() => {
  const $textarea = $('#tweet-text');

  $textarea.on('input', function() {

    // DOM traversal to access the counter element
    let $counter = $($($textarea.parent().siblings().children()[1]).children()[0]);

    // initialize character count of input box
    let charCount = 140 - $textarea.val().length;
    
    if (charCount < 0) { // change counter to red if negative
      $counter.val(charCount).css({'color': 'red'});
    } else if (charCount > 0) {
      $counter.val(charCount).css({'color': '#545149'});
    }
  })
})

