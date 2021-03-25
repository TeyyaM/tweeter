/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

//from initial-tweets
const createTweetElement = (data) => {
  const timeAgo = (created) => {
    let num = created / 1000;
    if (num < 60) {
      return (`${Math.floor(num)} seconds ago`);
    }
    num /= 60;
    if (num < 60) {
      return (`${Math.floor(num)} minutes ago`);
    }
    num /= 60;
    if (num < 24) {
      return (`${Math.floor(num)} hours ago`);
    }
    num /= 24;
    if (num < 30) {
      return (`${Math.floor(num)} days ago`);
    }
    if (num < 365) {
      return (`${Math.floor(num / 30)} months ago`);
    }
    return (`${Math.floor(num / 365)} years ago`);
  };
  const htmlTweet =
    `<article class="posted-tweets">
    <header>
    <span>
    <img src="${escape(data.user.avatars)}" alt="User Icon">
    ${escape(data.user.name)}
    </span>
    <span class="email">${escape(data.user.handle)}</span>
    </header>
    
    <body>
    <p>${escape(data.content.text)}</p>
    </body>
    <hr>
    <footer>
    <span>${timeAgo(data.created_at)}</span>
    <span class="icons">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </span>
    </footer>
    </article>`;
  return htmlTweet;
};

// <p>${$(data.content.text).text()}</p>
const renderTweets = (dataArr) => {
  for (let data of dataArr) {
    let $tweet = createTweetElement(data);
    $('.new-tweet').after($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
};

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then((tweets) => {
      renderTweets(tweets);
    })
    .then(() => {
      $('article').hover(function() {
        $(this).addClass("hover");
      }, function() {
        $(this).removeClass("hover");
      });
    })
    .catch(error => {
      console.log(error);
    });
};

// Taken from compass/lighthouse labs
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Keeps animation from overlapping
const errorMessage = function(str) {
  if ($("#error-message").text() !== '') {
    setTimeout(function() {
      $("#error-message").text(str);
      $("#error-message").slideDown();
    }, 700);
  } else {
    $("#error-message").text(str);
    $("#error-message").slideDown();
  }
};

$(document).ready(function() {

  loadTweets();

  $("form").on("submit", function(event) {
    $("#error-message").slideUp();
    event.preventDefault();
    console.log($('#tweet-text').val().length);
    if ($('#tweet-text').val().length > 140) {
      errorMessage("Too long! Shorter is s(T)weeter!");
    } else if ($('#tweet-text').val().length === 0 || $(this).serialize() === null) {
      errorMessage("Empty Tweet!");
    } else {
      $.ajax({
        url: "/tweets",
        method: 'POST',
        data: $(this).serialize()
      })
        .then(() => {
          $(".posted-tweets").remove(); // Removes already appended tweets
        })
        .then(() => { // Loads all tweets including the new one and empties the textarea
          $("#tweet-text").val('');
          $("#error-message").text('');
          $('.new-tweet .counter').text(140);
          loadTweets();
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
});