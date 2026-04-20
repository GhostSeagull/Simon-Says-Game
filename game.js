
let colours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let hasGameStarted = false;
let isGameOver = false;
let counter = -1; //counter counts the number of clicks in a sequence.

// Function that changes title each time we have new sequence
function changeTitle(){
    if(!isGameOver)
        $("h1").text("Level "+ gamePattern.length);
    else
        $("h1").text("Game Over, Press Any Key to Restart");
}

/*We are listening keydowns and start the game in case it has not started yet */
$(document).on("keydown", function(){
    if(hasGameStarted == false){
        hasGameStarted = true;
        isGameOver = false;
        nextSequence();
        changeTitle();
    }
})


/* Listening clicks, we have to check the userPattern is the same than gamePattern once they have same length.
userPattern.length > gamePattern.length --> game over.
userPattern[element] != gamePattern[element] --> game over. 
Every click increase counter +1.
if game over, red flashes resets counter to -1, empty patterns, hasGameStarted = false.
if userPattern.length <= gamePattern.length --> check if userPattern[counter] == gamePattern[counter].
In case everything is right, call nextSequence after 1 sec.
*/
$(".btn").on("click", function(event){
    
    //If the game has not started, we don't care about clicks.
    if(hasGameStarted){
        //If it has started, we see the button that has been clicked, getting its attribute and its sound 
        // then push the colour into userPattern
        const buttonAttribute= $(event.target).attr("id");
        playSound(buttonAttribute);
        userPattern.push(buttonAttribute);
        counter++; //Increase the counter

        //We put the pressed class effect for 0.1sec.
        $("#" + buttonAttribute).addClass("pressed");
        setTimeout(() => $("#"+buttonAttribute).removeClass("pressed"), 100);
        
        //if userPattern length is lower than gamePattern, it has to check that their value on the same index is equal
        // counter will help with that
        if(userPattern.length <= gamePattern.length){
            //If value on the same element is different, its game over otherwise, game continues
            if(userPattern[counter] != gamePattern[counter]){
                gameOver();
                return;
            }

            //We only call nextSequence if we have the same gamePattern than userPattern, values and length.
            if(userPattern.length == gamePattern.length)
                setTimeout(nextSequence, 1000);
            
        }else{
            //In case userPattern length is higher than gamePattern length, the game should end because that does not make sense.
            //If we do not have this, I could click a lot before nextSequence happens 
            gameOver();
        }
    }
});

function playSound(colour){
    var sound = new Audio('./sounds/' +colour + '.mp3');
    sound.play();
}



function nextSequence(){
    
    //I put here the condition to prevent nextSequence occur when game is already lost.
    // before I could lose the game while "nextSequence is coming", so title was changed to level X but game was lost so I could not actually play.

    if(!isGameOver){
        //Restart values after every new Sequence
        userPattern = [];
        counter = -1;

        //Create random number and choose its respective colour
        let randomNumber = Math.floor(Math.random()*4);
        let randomChosenColour = colours[randomNumber];

        //Insert the colour chosen in the gamePattern
        gamePattern.push(randomChosenColour);
        //Create effect of fadeOut and fadeIn in the respective colour to let user know what is the next colour in the pattern.
        $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

        playSound(randomChosenColour);
        
        changeTitle();

    }

}

// Function to reset variables values in order to restart the game and create the respective effects of losing
function gameOver(){
    isGameOver = true;
    hasGameStarted = false; 
    changeTitle();
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"),50);
    playSound("wrong");
    counter = -1;
    gamePattern = [];
    userPattern = [];
}