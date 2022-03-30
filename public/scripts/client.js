/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// ensure script runs after document finishes loading
$(() => {

  // function to create HTML markup for each tweet article
  const createTweetElement = function(tweetData) {
    const username = tweetData.user.name;
    const pfp = tweetData.user.avatars;
    const handle = tweetData.user.handle;
    const content = tweetData.content.text;
    const date = tweetData.created_at;

    const markUp = `
    
      <article class="tweet">
      <header>
        <div class="user">
          <img class="pfp" src="${pfp}">
          <h3>${username}</h3>
        </div>

        <div class="display-user-tag">${handle}</div>
      </header>
      <p>${content}</p>
      <footer>
        <div class="date-time">${date}</div>
        <div class="tweet-links-icons">
          <a href="#"><i class="fa-solid fa-flag"></i></a>
          <a href="#"><i class="fa-solid fa-retweet"></i></a>
          <a href="#"><i class="fa-solid fa-heart"></i></a>
        </div>
      </footer>
    </article>
    `
    return markUp
  }

  // renders each tweet in array into HTML markup 
  const renderTweets = function(tweetsArray) {
    let renderedTweets = [];
    
    for (let tweet of tweetsArray) {
      renderedTweets.push(createTweetElement(tweet));
    }
    // prepends rendered tweets to tweets-container
    $('#tweets-container').prepend(renderedTweets);
  }

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  renderTweets(data);
})

