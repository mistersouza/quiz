const intQuiz = document.querySelector('.home__button');
const quitQuiz = document.querySelector('.button--quit');
const playQuiz = document.querySelector('.button--play');
const playAgain = document.querySelector('.button--again');

const next = document.querySelector('.quiz__button--next');
// Get question number
let question = Number.parseInt(document.querySelector('.quiz__footer--count').innerHTML);
// Get score
const score = document.querySelector('.quiz__header--score');
let options;
// Scroll into guide section
intQuiz.addEventListener('click', () => {
    document.querySelector('#guide').scrollIntoView({ behavior: 'smooth' });
});

// Scroll back up into home section
quitQuiz.addEventListener('click', () => {
    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
});

// Set initial question
function loadQuestions(index) {
    // Grabbin' the question and options elements
    const questionTitle = document.querySelector('.quiz__title');
    const optionsBox = document.querySelector('.quiz__options');
    // pulating the question with the good stuff
    questionTitle.innerHTML = questions[index].question;
    // Time to loop through the options 
    let letter = 'a';
    let html = '';
    // Cooking up the answer options
    while (letter <= 'd') {
        html += `
            <div class="quiz__option" data-option="${letter}">
                <span>${letter}</span>
                <p class="quiz__option--${letter}">${questions[index][letter]}</p>
            </div>
        `;
        // 
        letter = String.fromCharCode(letter.charCodeAt(0) + 1);
    }
    // Serving the fresh options
    optionsBox.innerHTML = html;
    // Adding some click action to the options and highlighting the correct ones
    document.querySelectorAll('.quiz__option').forEach(option => {
        option.setAttribute('onclick', 'checkAnswer(this)');
        if (option.getAttribute('data-option') === questions[index].correct) {
            option.classList.add('quiz__option--correct');
        }
    });
    //  Disabling the 'Next' button for now
    next.classList.add('disabled');
}
playQuiz.addEventListener('click', () => {
    // Load the first round
    loadQuestions(0);
    document.querySelector('#quiz').scrollIntoView({ behavior: 'smooth' });
});


next.addEventListener('click', () => {
    if (question < 5) {
        loadQuestions(question);
        document.querySelector('.quiz__footer--count').innerHTML = ++question;
    } else {
        document.querySelector('#results').scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.quiz__footer--count').innerHTML = 1;
        question = 1;
        showProgress();
    }
    next.classList.add('disabled');
});
// Check answer
function checkAnswer(option) {
    let isCorrect = option.classList.contains('quiz__option--correct');

    if (isCorrect) {
        score.textContent = parseInt(score.textContent, 10) + 1;
    }

    if (question < 5) {
        option.classList.add(isCorrect
            ? 'quiz__option--correct--active'
            : 'quiz__option--wrong--active'
        );

        for (let each of option.parentElement.children) {
            each.classList.add('disabled');
            if (each.classList.contains('quiz__option--correct')) {
                each.classList.add('quiz__option--correct--active');
            }
        }
    } else {
        next.innerHTML = 'grade()';
        document.querySelector('.results__title').textContent = `// You scored ${score.textContent} out of 5`;
    }
    next.classList.remove('disabled');
}

function showProgress() {
    const progressBar = document.querySelector('.results__progress');
    const progressValue = document.querySelector('.result__score');
    let progressStartValue = 0;
    let progressEndValue = (Number.parseInt(score.textContent, 10) / 5) * 100;
    let pace = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        console.log(progressStartValue);
        progressValue.textContent = `${progressStartValue}%`;
        if (progressStartValue === progressEndValue) {
            clearInterval(progress);
        }
    }, pace);
}

playAgain.addEventListener('click', () => {
    loadQuestions(0);
    score.textContent = 0;
    next.innerHTML = 'next()';
    document.querySelector('#quiz').scrollIntoView({ behavior: 'smooth' });
});