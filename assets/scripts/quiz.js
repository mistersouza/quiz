const intQuiz = document.querySelector('.home__button');
const quitQuiz = document.querySelector('.guide__button--quit');
const playQuiz = document.querySelector('.guide__button--play');


intQuiz.addEventListener('click', () => {
    document.querySelector('#guide').scrollIntoView({ behavior: 'smooth' });
});

quitQuiz.addEventListener('click', () => {
    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
})

