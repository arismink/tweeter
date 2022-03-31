/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// ensure script runs after document finishes loading
$(() => {
  loadTweets();
  $('#er').hide(); // hide error message initially
  $('#tweet-form').on('submit', onSubmit)

});


const onSubmit = function(e) {
  e.preventDefault();
  const userInput = $('#tweet-text').val();


  // ask mentor how to prevent message from changing before slideup
  $('#er').slideUp();

  // display error if validation fails
  if (userInput.length > 3) {
    $('#er').html(`<i class="fa-solid fa-triangle-exclamation"></i>
      Tweet entered must be no longer than 140 characters.
      <i class="fa-solid fa-triangle-exclamation"></i>`);
    $('#er').slideDown();
    return;

  } else if (userInput === "") {
    $('#er').html(`<i class="fa-solid fa-triangle-exclamation"></i>
      Tweet entered cannot be empty!
      <i class="fa-solid fa-triangle-exclamation"></i>`);
    $('#er').slideDown();
    return;
  }
  const data = $(this).serialize();

  $.post("/tweets", data)
    .then(() => {
      loadTweets(); // fetch new tweet upon submission
      this.reset(); // clear input box value
    })

}

// fetches tweets from /tweets page and loads onto page
const loadTweets = () => {
  $.get("/tweets")
    .then(function(data) {
      renderTweets(data);
    });
}

// prevent XSS
const esc = function(tweetText) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(tweetText));

  return div.innerHTML;
}

// function to create HTML markup for each tweet article
const createTweetElement = function(tweetData) {

  const {
    name : username,
    avatars : profile_pic,
    handle : user_tag
  } = tweetData.user;

  const { text : content } = tweetData.content;
  const { created_at : date } = tweetData;

  const markUp = `
  
    <article class="tweet">
    <header>
      <div class="user">
        <img class="user-pic" src="${profile_pic}">
        <h3>${username}</h3>
      </div>

      <div class="display-user-tag">${user_tag}</div>
    </header>
    <p>${esc(content)}</p>
    <footer>
      <div class="date-time">${timeago.format(date)}</div>
      <div class="tweet-links-icons">
        <a href="#"><i class="fa-solid fa-flag"></i></a>
        <a href="#"><i class="fa-solid fa-retweet"></i></a>
        <a href="#"><i class="fa-solid fa-heart"></i></a>
      </div>
    </footer>
  </article>
  `;
  return markUp;
};

// renders each tweet in array into HTML markup
const renderTweets = function(tweetsArray) {
  const container = $('#tweets-container');
  container.empty();

  for (let tweet of tweetsArray) {
    // prepends each new rendered tweet into the tweets-container div
    container.prepend(createTweetElement(tweet));
  }
};


