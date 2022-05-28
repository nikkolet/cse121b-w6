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
        question: 'Wonder Woman made her first appearance in what comic book?',
        choice1: 'Wonder Woman #1',
        choice2: 'Sensation Comics #1',
        choice3: 'Action Comics #27',
        choice4: 'All Star Comics #8',
        answer: 4,
    },
    {
        question: 'Which of Wonder Woman\'s accessories was forged from the magic girdle of Aphrodite?',
        choice1: 'Her magic lasso',
        choice2: 'Her bracelets',
        choice3: 'Her tiara',
        choice4: 'Her Earrings',
        answer: 1,
    },
    {
        question: 'During the 1960\'s, Wonder Woman became the pupil of what Chinese martial arts master?',
        choice1: 'Sin Tzu',
        choice2: 'I Ching',
        choice3: 'Gao Xingjian',
        choice4: 'Jet Li',
        answer: 2,
    },
    {
        question: 'Which of Wonder Woman\'s accessories allows her to breathe in outer space?',
        choice1: 'Her tiara',
        choice2: 'Her bracelets',
        choice3: 'Her magic lasso',
        choice4: 'Her earrings',
        answer: 4,
    },
    {
        question: 'What animal do Amazons ride on the island?',
        choice1: 'Cheetah',
        choice2: 'Kangaroos',
        choice3: 'Elephant',
        choice4: 'Unicorns',
        answer: 2,
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