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
  movies: ["The Godfather","Titanic", "Forrest Gump", "Pulp Fiction",
      "The Dark Knight", "Inception", "Avengers: Endgame",
      "Jurassic Park", "Star Wars", "The Matrix", "Toy Story",
      "Gladiator", "Rocky", "The Shawshank Redemption",
      "Back to the Future", "Iron Man", "Spider Man", "Frozen",
      "Top Gun", "The Lion King"],
  countries: ["Egypt", "France", "Japan", "Brazil", "Germany",
      "India", "Canada"],
  animals: ["lion", "tiger", "elephant", "cat", "dog", "panda", "giraffe"],
  fruits: ["apple", "banana", "grape", "mango","orange", "watermelon", "peach"],
  colors: ["red", "blue", "green", "yellow", "purple","orange","black"],
  sports: ["football", "basketball", "tennis", "cricket", "swimming","volleyball"],
  verbs: ["run", "jump", "think", "write", "read", "sing", "dance"],
  tools: ["hammer", "screwdriver", "wrench", "saw", "drill", "pliers", "tape"],
};

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

document.addEventListener("click", (e) => {
    if (gameEnded) return; //enable any new clicks

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
            if (wrong === 7) {
                // 💀 GAME OVER
                gameStateDiv.innerHTML = `<h3 style="color:red">Game Over! The word was "${randomV}"</h3>`;
                failSound.play();
                gameEnded = true;
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
                gameStateDiv.innerHTML = `<h3 style="color:green">🎉 You Won! (★‿★)</h3>`;
                winSound.play();
                gameEnded = true;
            }
        }
    }
});














