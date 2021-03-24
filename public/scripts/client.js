/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

//from initial-tweets

const hoverOn = function() {
  $(this).addClass("hover");
};

const hoverOff = function() {
  $(this).removeClass("hover");
};

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
    `<article>
    <header>
    <span>
    <img src="${data.user.avatars}" alt="User Icon">
    ${data.user.name}
    </span>
    <span class="email">${data.user.handle}</span>
    </header>
    
    <body>
    <p>${data.content.text}</p>
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

const renderTweets = (dataArr) => {
  for (let data of dataArr) {
    let $tweet = createTweetElement(data);
    $('.container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
};

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then((tweets) => {
      renderTweets(tweets);
    })
    .then(() => {
      $('article').hover(hoverOn, hoverOff);
    })
    .catch(error => {
      throw error;
    });
};

$(document).ready(function() {

  loadTweets();


  $("form").on("submit", function(event) {
    event.preventDefault();
    // Add 5 to max account for 'text=' hence 145
    if ($(this).serialize().length > 145) {
      alert("Too long! Shorter is s(T)weeter!");
    } else if ($(this).serialize().length === 5 || $(this).serialize() === null) {
      alert("Empty Tweet!");
    } else {
      console.log($(this).serialize().length);
      console.log($(this).serialize());
      $("#tweet-text").val('');
    }
  });

});