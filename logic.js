// letters box
const letters = "abcdefghigklmnopqrstuvwxyz0123456789";
let array = Array.from(letters)
let container = document.querySelector(".letters")
array.forEach(letter =>{
    let span = document.createElement("span")
    let theLetter = document.createTextNode(letter)
    span.appendChild(theLetter)
    span.className = "letter-box"
    container.appendChild(span)
})


// random category & random word
const wordsMap = {
  movies: ["Frozen", "The Lion King", "Ratatouille"],
  countries: ["Egypt", "Korea", "France"],
  animals: ["lion", "panda", "cat"],
  fruits: ["apple", "banana", "mango"],
  colors: ["red", "blue", "yellow"],
  sports: ["football", "tennis", "swimming"],
  actors: ["Tom Hanks", "Emma Watson", "Will Smith"]
};

const hintsMap = {
  movies: [
    "snow",                // Frozen
    "Jungle animals",        // The Lion King
    "Chef"     // Ratatouille
  ],
  countries: [
    "7000 year",         // Egypt
    "Drama",       // Korea
    "City of lights"                // France
  ],
  animals: [
    "King of the jungle",           // lion
    "Black and white",         // panda
    "domestic pet"           // cat
  ],
  fruits: [
    "Keeps the doctor away",        // apple
    "Yellow and curved",            // banana
    "Orange, green or red"            // mango
  ],
  colors: [
    "love",                // red
    "sky",                 // blue
    "Bright and sunny"              // yellow
  ],
  sports: [
    "goal",           // football
    "Racquet game",                 // tennis
    "Water"     // swimming
  ],
  actors: [
    "Forrest Gump",            // Tom Hanks
    "Hermione",              // Emma Watson
    "Men in Black"             // Will Smith
  ]
};


// => the game flow
let keys = Object.keys(wordsMap)
let randomPN = Math.floor(Math.random() * keys.length)
let randomP = keys[randomPN]
let Values = wordsMap[randomP]
let randomVN = Math.floor(Math.random() * Values.length)
let randomV = Values[randomVN]

document.querySelector(".game-info .category span").innerHTML = randomP

// guessing area
let guesses = document.querySelector(".letters-guess")
let wordLetters = Array.from(randomV)
wordLetters.forEach(letter => {
    let spaceSpan = document.createElement("span")
    if (letter === ' '){
        spaceSpan.className = "space"
    }
    guesses.appendChild(spaceSpan)
})


// Count non-space letters
let letterCount = randomV.split('').filter(c => c !== ' ').length;
document.querySelector(".no\\.letters span").innerHTML = letterCount;


// clicking the letters & the game states
let guessesSpan = document.querySelectorAll(".letters-guess span");
let choiceState = false;
let wrong = 0;
let draw = document.querySelector(".hangman-draw");
let gameStateDiv = document.querySelector(".game-state");
let failSound = document.getElementById("fail-sound");
let winSound = document.getElementById("win-sound");
let gameEnded = false;
const playAgainBtn = document.getElementById("play-again");
let hint = hintsMap[randomP][randomVN];

document.addEventListener("click", (e) => {
    if (gameEnded) return;

    if (e.target.classList.contains('letter-box') && !e.target.classList.contains('clicked')) {
        e.target.classList.add("clicked");
        let clickedLetter = e.target.innerHTML.toLowerCase();
        choiceState = false;

        wordLetters.forEach((wordLetter, index) => {
            if (clickedLetter === wordLetter.toLowerCase()) {
                choiceState = true;
                guessesSpan[index].innerHTML = wordLetter.toUpperCase();
            }
        });

        if (!choiceState) {
            wrong++;
            draw.classList.add(`wrong-${wrong}`);

            if (wrong === 6) {
                gameStateDiv.innerHTML = `<h2 style="color: navy">💡 Hint: ${hint}</h2>`;
            }

            if (wrong === 7) {
                gameStateDiv.innerHTML = `<h2 style="color:red">Game Over! The word was "${randomV}"</h2>`;
                gameStateDiv.appendChild(playAgainBtn);
                playAgainBtn.style.display = "inline-block";
                gameEnded = true;

                // Wrap in a setTimeout to force async execution right after DOM change
                // Delay a little to ensure DOM update first
                setTimeout(() => {
                    failSound.play().catch(e => console.log("Fail sound error:", e));
                }, 100);
            }
        } else {
            // ✅ Check for win
            let allRevealed = true;
            wordLetters.forEach((letter, index) => {
                if (letter !== ' ' && guessesSpan[index].innerHTML === "") {
                    allRevealed = false;
                }
            });

            if (allRevealed) {
                gameStateDiv.innerHTML = `<h2 style="color:green">🎉 You Won! (★‿★)</h2>`;
                gameStateDiv.appendChild(playAgainBtn);
                playAgainBtn.style.display = "inline-block";
                gameEnded = true;

                setTimeout(() => {
                    winSound.play().catch(e => console.log("Win sound error:", e));
                }, 100);
            }
        }
    }
});


// reloading the game (reset the page)
playAgainBtn.addEventListener("click", () => {
    location.reload();
});












