$(document).ready(function() {
  $('article').hover(hoverOn, hoverOff);
});

const hoverOn = function() {
  $(this).addClass("hover");
};

const hoverOff = function() {
  $(this).removeClass("hover");
};