// letters box
let Eletters = "abcdefghijklmnopqrstuvwxyz";
let ALetters = "أابتثجحخدذرزسشصضطظعغفقكلمنهويءؤةى";
Eletters = Array.from(Eletters)
ALetters = Array.from(ALetters)

// Game maps
const wordsMapE = {
  countries: ["Egypt", "Korea", "France", "Japan", "Italy", "Canada"],
  animals: ["lion", "panda", "cat", "elephant", "tiger", "giraffe"],
  fruits: ["apple", "banana", "mango", "orange", "grape", "strawberry"],
  colors: ["red", "blue", "yellow", "green", "purple", "black"],
  sports: ["football", "tennis", "swimming", "basketball", "volleyball", "boxing"],
};

const hintsMapE = {
  countries: [
    "7000 year",        // Egypt
    "Drama",            // Korea
    "City of lights",   // France
    "Anime & sushi",    // Japan
    "Pizza & pasta",    // Italy
    "Maple leaf"        // Canada
  ],
  animals: [
    "King of the jungle",   // lion
    "Black and white",      // panda
    "Domestic pet",         // cat
    "Has trunk",            // elephant
    "Striped big cat",      // tiger
    "Long neck"             // giraffe
  ],
  fruits: [
    "Keeps the doctor away",    // apple
    "Yellow and curved",        // banana
    "Orange, green or red",     // mango
    "Citrus fruit",             // orange
    "Tiny and purple",          // grape
    "Red, sweet and small"      // strawberry
  ],
  colors: [
    "Love",             // red
    "Sky",              // blue
    "Bright and sunny", // yellow
    "Nature",           // green
    "Royal",            // purple
    "Darkest"           // black
  ],
  sports: [
    "Goal",                 // football
    "Racquet game",         // tennis
    "Water",                // swimming
    "Basket",               // basketball
    "Net game",             // volleyball
    "Fighting sport"        // boxing
  ],
};

const WordsMapA = {
  "الدول": ["مصر", "فرنسا", "اليابان", "إيطاليا", "ألمانيا", "البرازيل"],
  "الحيوانات": ["قطة", "أسد", "باندا", "فيل", "نمر", "زرافة"],
  "الفواكه": ["تفاح", "موز", "مانجو", "عنب", "برتقال", "فراولة"],
  "الألوان": ["أحمر", "أزرق", "أصفر", "أخضر", "أسود", "بنفسجي"],
  "الرياضة": ["كرة القدم", "تنس", "سباحة", "كرة سلة", "ملاكمة", "كرة طائرة"],
  "الأفلام": ["فروزن", "الأسد الملك", "راتاتوي", "كوكو", "إنسايد آوت", "المنتقمون"]
};

const HintsMapA = {
  "الدول": [
    "نهر النيل",      // مصر
    "برج إيفل",       // فرنسا
    "أنمي وسوشي",     // اليابان
    "بيتزا ومكرونة",  // إيطاليا
    "سيارات وعلوم",   // ألمانيا
    "كرة القدم والاحتفالات" // البرازيل
  ],
  "الحيوانات": [
    "تحب الحليب",     // قطة
    "ملك الغابة",     // أسد
    "أبيض وأسود",     // باندا
    "له خرطوم",       // فيل
    "مخطط ومفترس",    // نمر
    "رقبة طويلة"      // زرافة
  ],
  "الفواكه": [
    "أحمر ومفيد",      // تفاح
    "أصفر ومنحني",     // موز
    "أخضر أو برتقالي", // مانجو
    "صغير وبنفسجي",    // عنب
    "حمضي وبرتقالي",   // برتقال
    "أحمر ولذيذ"       // فراولة
  ],
  "الألوان": [
    "لون الحب",        // أحمر
    "لون السماء",      // أزرق
    "لون الشمس",       // أصفر
    "لون الطبيعة",     // أخضر
    "غامق جدًا",       // أسود
    "لون ملكي"         // بنفسجي
  ],
  "الرياضة": [
    "هدف",             // كرة القدم
    "مضرب وكرة",       // تنس
    "ماء",             // سباحة
    "سلة",             // كرة سلة
    "قتال",            // ملاكمة
    "شبكة"             // كرة طائرة
  ]
};

// setting game mode
const englishBtn = document.getElementById("english-btn");
const arabicBtn = document.getElementById("arabic-btn");

englishBtn.addEventListener("click", () => {
  setGame(Eletters,wordsMapE,hintsMapE);
  englishBtn.style.display = "none";
  arabicBtn.style.display = "none";
});

arabicBtn.addEventListener("click", () => {
  setGame(ALetters,WordsMapA,HintsMapA);
document.querySelector(".letters-guess").setAttribute("dir", "rtl");
document.querySelector(".letters").setAttribute("dir", "rtl");  arabicBtn.style.display = "none";
  englishBtn.style.display = "none";
});


function setGame(letters,wordsMap,hintsMap){
    let container = document.querySelector(".letters")
    letters.forEach(letter =>{
        let span = document.createElement("span")
        let theLetter = document.createTextNode(letter)
        span.appendChild(theLetter)
        span.className = "letter-box"
        container.appendChild(span)
    })

    // Pick random word
    const keys = Object.keys(wordsMap);
    const randomPN = Math.floor(Math.random() * keys.length);
    const randomP = keys[randomPN];
    const values = wordsMap[randomP];
    const randomVN = Math.floor(Math.random() * values.length);
    const randomV = values[randomVN];
    const hint = hintsMap[randomP][randomVN];

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
    document.querySelector(".no\\.letters span").innerHTML = randomV.split('').filter(c => c !== ' ').length;

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
                    gameStateDiv.innerHTML = `<h2>💡 Hint: ${hint}</h2>`;
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
    playAgainBtn.onclick = () => location.reload();
}

// dark mode
    const toggleButton = document.getElementById("dark-mode-toggle");
        toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
          toggleButton.textContent = "☀️";
        } else {
          toggleButton.textContent = "🌙";
        }
     });














