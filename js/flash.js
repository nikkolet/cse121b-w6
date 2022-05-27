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
        question: 'What color are Barry Allen\'s eyes?',
        choice1: 'Green',
        choice2: 'Brown',
        choice3: 'Amber',
        choice4: 'Blue',
        answer: 2,
    },
    {
        question: 'In which comic series did Barry Allen die?',
        choice1: 'Dead Heat',
        choice2: 'Forever Evil',
        choice3: 'Iron Heights',
        choice4: 'Crisis On Infinite Earths',
        answer: 4,
    },
    {
        question: 'In which year was "The Flash" first introduced?',
        choice1: 'In the year 1921',
        choice2: 'In the year 1945',
        choice3: 'In the year 1940',
        choice4: 'In the year 1960',
        answer: 3,
    },
    {
        question: 'What is the naem of the first-ever "Reverse Flash"?',
        choice1: 'Eobard Thawne',
        choice2: 'Edward Clarris',
        choice3: 'Max Mercury',
        choice4: 'Barry Allen',
        answer: 2,
    },
    {
        question: 'Which of these superheros is a descendant of the Flash?',
        choice1: 'Black Lightning',
        choice2: 'White Lightning',
        choice3: 'Nightwing',
        choice4: 'Green Lightning',
        answer: 4,
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