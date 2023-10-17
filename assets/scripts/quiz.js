const intQuiz = document.querySelector('.home__button');
const quitQuiz = document.querySelector('.guide__button--quit');
const playQuiz = document.querySelector('.guide__button--play');

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
const optionsBox = document.querySelector('.quiz__options');

function loadQuestions(index) {
    const question = document.querySelector('.quiz__title');

    question.innerHTML = questions[index].question;

    let letter = 'a';
    let html = '';

    while (letter <= 'd') {
        html += `
            <div class="quiz__option" data-option="${letter}">
                <span>${letter}</span>
                <p class="quiz__option--${letter}">${questions[index][letter]}</p>
            </div>
        `;
        letter = String.fromCharCode(letter.charCodeAt(0) + 1);
    }
    optionsBox.innerHTML = html;

    document.querySelectorAll('.quiz__option').forEach(option => {
        if (option.getAttribute('data-option') === questions[index].correct) {
            option.classList.add('quiz__option--correct');
        }
    });
}

playQuiz.addEventListener('click', () => {
    loadQuestions(0);
    document.querySelector('#quiz').scrollIntoView({ behavior: 'smooth' });
});

// Check answer

document.querySelectorAll('.quiz__option').forEach(option => {
    option.addEventListener('click', (event) => {
        event.stopPropagation();
        console.log('clicked');
    });
});

