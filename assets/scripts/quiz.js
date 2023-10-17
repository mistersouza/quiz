const intQuiz = document.querySelector('.home__button');
const quitQuiz = document.querySelector('.guide__button--quit');
const playQuiz = document.querySelector('.guide__button--play');

const next = document.querySelector('.quiz__button--next');

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
    const question = document.querySelector('.quiz__title');
    const optionsBox = document.querySelector('.quiz__options');
    // pulating the question with the good stuff
    question.innerHTML = questions[index].question;
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
    // load first round
    loadQuestions(0);
    // Disable 'back' button on the right round. 
    document.querySelector('#quiz').scrollIntoView({ behavior: 'smooth' });
});


next.addEventListener('click', () => {
    let question = Number.parseInt(document.querySelector('.quiz__footer--count').innerHTML);
    if (question < 5) {
        loadQuestions(question);
        document.querySelector('.quiz__footer--count').innerHTML = ++question;
    }
    if (question == 5) {
        next.innerHTML = 'grade()';
    }
    next.classList.add('disabled');
});


// Check answer
function checkAnswer(option) {
    let isCorrect = option.classList.contains('quiz__option--correct');
    let score = document.querySelector('.quiz__header--score');

    if (isCorrect) {
        score.innerHTML = `${Number.parseInt(score.innerHTML, 10) + 1}`;
        option.classList.add('quiz__option--correct--active');
    } else {
        // I can't get both correct and incorrect active classes to show at once. 
        option.classList.add('quiz__option--wrong--active');
    }
    for (let child of option.parentElement.children) {
        child.classList.add('disabled');
    }
    next.classList.remove('disabled');
}

