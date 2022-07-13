let buttonColours = ["red", "blue", "green", "yellow"];

let gamepattern = [];

let userClickedPattern = [];

let level = 0;

let started = false;

$(document).keydown(function()
{
  if(started === false)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});


function nextSequence()
{
  level++;

  userClickedPattern = [];

  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor((Math.random() * 3) + 1);
  let randomChosenColour = buttonColours[randomNumber];
  gamepattern.push(randomChosenColour);

  $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click(function(value)
{
    var userChosenColour = value.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour)
{
  $('.'+currentColour).addClass("pressed");

  setTimeout(function()
  {
    $('.'+currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel)
{
  if(gamepattern[currentLevel] === userClickedPattern[currentLevel])
  {
    console.log("success");

    if(gamepattern.length === userClickedPattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("#level-title").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");
    setTimeout(function()
    {
      $("body").removeClass("game-over");
    }, 200);

    startover();
  }
}

function startover(){
  level = 0;
  gamepattern = [];
  started = false;
}
