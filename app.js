/*
GAME RULES
- Player must guess a number btween min and max
- Player gets a certain amount aof guesses
- Notify player of guesses remaining
- Let player choose to play again
*/

// Create Vars

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI 
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again event Listener
game.addEventListener('mouseup', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }    
});

// Listen for Event guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    console.log(guess);
    // Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Chek if won
    if(guess === winningNum){
        // Game Over Won
        // // Disable input
        // guessInput.disabled = true;
        // // Change border color
        // guessInput.style.borderColor = 'green';
        // // Set Message for winning
        // setMessage(`${winningNum} is correct, YOU WIN`, 'green');

        gameOver(true, `${winningNum} is correct, YOU WIN`) ;

    } else {
        // Wrong Number 
        // guessesLeft = guessesLeft - 1;
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // Game over Lost
            // guessInput.disabled = true;
            // // Change border color
            // guessInput.style.borderColor = 'red';
            // // Set Message for winning
            // setMessage(`Game Over, You Lost. The correct number was ${winningNum}`, 'red');

            gameOver(false, `Game Over, You Lost. The correct number was ${winningNum}`);

        } else {
            // Game continues - answer wrong
            
            // Change border color
            guessInput.style.borderColor = 'red';
            
            // Clear Input
            guessInput.value = '';

            // Tell User its Wrong Number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
        }
    }
});

// Game Over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set text color
    message.style.color = color;
    // Set Message for winning
    setMessage(msg);

    // Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';

}

// Get Winning Number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
      
// Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}