$(document).ready(function() {
  $("#tweet-text").on("input", countTweet);
});

// traversing DOM instead of using "$('.new-tweet .counter')"

const countTweet = function() {
  console.log(this);
  $(this).siblings().children('.counter').text(140 - $(this).val().length);
  if ($(this).siblings().children('.counter').text() < 0) {
    $(this).siblings().children('.counter').addClass("negative");
  }
  if ($(this).siblings().children('.counter').text() >= 0) {
    $(this).siblings().children('.counter').removeClass("negative");
  }
};