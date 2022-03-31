/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// ensure script runs after document finishes loading
$(() => {
  loadTweets();

  $('#tweet-form').on('submit', onSubmit)
  
});

const onSubmit = function(e) {
  e.preventDefault();

  const userInput = $('#tweet-text').val();

  // form submission validation
  if (userInput.length > 140) {
    alert('Tweet is too long!');
    return;

  } else if (userInput === "") {
    alert('Tweet cannot be empty!');
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
        <img class="pfp" src="${profile_pic}">
        <h3>${username}</h3>
      </div>

      <div class="display-user-tag">${user_tag}</div>
    </header>
    <p>${content}</p>
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

  for (let tweet of tweetsArray) {
    // prepends each new rendered tweet into the tweets-container div
    container.prepend(createTweetElement(tweet));
  }
};


