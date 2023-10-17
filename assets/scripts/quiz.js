const intQuiz = document.querySelector('.home__button');
const quitQuiz = document.querySelector('.guide__button--quit');
const playQuiz = document.querySelector('.guide__button--play');

const back = document.querySelector('.quiz__button--back');
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
    const question = document.querySelector('.quiz__title');
    const optionsBox = document.querySelector('.quiz__options');

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
    // load first round
    loadQuestions(0);
    // Disable 'back' button on the right round. 
    document.querySelector('#quiz').scrollIntoView({ behavior: 'smooth' });
});



next.addEventListener('click', () => {
    let question = Number.parseInt(document.querySelector('.quiz__info--question').innerHTML);
    if (question < 5) document.querySelector('.quiz__info--question').innerHTML = ++question;
    if (question == 5) next.innerText = 'grade()';
    loadQuestions(question);
});
// Check answer
document.querySelectorAll('.quiz__option').forEach(option => {
    option.addEventListener('click', (event) => {
        event.stopPropagation();
        console.log('clicked');
    });
});

