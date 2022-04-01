/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Executes script after document loads
$(() => {
  loadTweets();
  $('#er').hide(); // Hides error message upon load
  $('#tweet-form').on('submit', onSubmit);

});

// Handles tweet submission
const onSubmit = function(e) {
  e.preventDefault();

  const userInput = $('#tweet-text').val();

  // Exclamation icon for error message
  const warnIcon = `<i class="fa-solid fa-triangle-exclamation"></i>`;


  // Hides any prexisting error messages
  $('#er').text('');
  $('#er').slideUp('fast'); // Hide animation

  // Validation test for input
  if (userInput.length > 140) {
    $('#er').html(`${warnIcon} 
      Tweet entered must be no longer than 140 characters.
      ${warnIcon}`);
    $('#er').slideDown();
    return;

  } else if (userInput === '') {
    $('#er').html(`${warnIcon}
      Tweet entered cannot be empty!
      ${warnIcon}`);
    $('#er').slideDown();
    return;
  }
  const data = $(this).serialize();

  $.post("/tweets", data)
    .then(() => {
      loadTweets(); // Fetches new tweet upon submission
      this.reset(); // Clears input box value
    });

};

// Fetches tweets from /tweets page and loads onto page
const loadTweets = () => {
  $.get("/tweets")
    .then(function(data) {
      renderTweets(data); // Loads existing tweet in HTML markup
    });
};

// Prevents XSS but posts tweet without replacing certain characters
const esc = function(tweetText) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(tweetText));

  return div.innerHTML;
};

// Function to create HTML markup for each tweet article
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
    <p>${esc(content)}</p> <!-- Catches scripts in input -->
    <footer>
      <div class="date-time">${timeago.format(date)}</div> <!-- converts time to time elapsed since post -->
      <div class="tweet-links-icons"> <!-- Fake links -->
        <a href="#"><i class="fa-solid fa-flag"></i></a>
        <a href="#"><i class="fa-solid fa-retweet"></i></a>
        <a href="#"><i class="fa-solid fa-heart"></i></a>
      </div>
    </footer>
  </article>
  `;
  return markUp;
};

// Renders tweet into HTML markup
const renderTweets = function(tweetsArray) {
  const container = $('#tweets-container');
  container.empty();

  for (let tweet of tweetsArray) {
    // Prepends each new rendered tweet into the tweets-container div
    container.prepend(createTweetElement(tweet));
  }
};


