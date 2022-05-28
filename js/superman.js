const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

// Default quesitons
let questions = [{
        question: 'What is Clark Kent\'s middl name?',
        choice1: 'Jacob',
        choice2: 'Joseph',
        choice3: 'Walter',
        choice4: 'Thomas',
        answer: 2,
    },
    {
        question: 'What is the name of the dimensional plane where Kryptonian criminals were exiled for their crimes?',
        choice1: 'No Man\'s land',
        choice2: 'Phantom Zone',
        choice3: 'Zimbardo\'s Prison',
        choice4: 'Bizarro World',
        answer: 2,
    },
    {
        question: 'What super-villian killed the Man of Steel in Superman #75?',
        choice1: 'Darkseid',
        choice2: 'Braniac',
        choice3: 'Doomsday',
        choice4: 'Lex Luthor',
        answer: 3,
    },
    {
        question: 'Which one of Superman\'s sweethearts became the super-heroine known as Insect Queen?',
        choice1: 'Lyla Lerrol',
        choice2: 'Lana Lang',
        choice3: 'Louis Lane',
        choice4: 'Lori Lemaris',
        answer: 2,
    },
    {
        question: 'What member of the Superman family died in Crisis on Infinite Earths?',
        choice1: 'Superman',
        choice2: 'Lois Lane',
        choice3: 'Supergirl',
        choice4: 'Jimmy Olson',
        answer: 3,
    }


]
const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]

    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
            'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()