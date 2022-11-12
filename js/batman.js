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
        "question": "What were the names of Bruce Wayne\'s Parents?",
        "choice1": "James & Elizabeth",
        "choice2": "Wayne & Alice",
        "choice3": "George & Elaine",
        "choice4": "Thomas & Martha",
        "answer": "4",
    },
    {
        question: 'According to the 1960s TV show, how far is the Batcave from Gotham City?',
        choice1: '41 miles',
        choice2: '4 miles',
        choice3: '1 mile',
        choice4: '14 miles',
        answer: 4,
    },
    {
        question: 'Who was introduced as Batman\'s first ever foe in Batman #1 in April, 1940?',
        choice1: 'The Penguin',
        choice2: 'Ra\'s Al Gul',
        choice3: 'The Joker',
        choice4: 'Harley Quinn',
        answer: 3,
    },
    {
        question: 'What is Batman\'s online screen name?',
        choice1: 'JohnDoe297',
        choice2: 'Batsy322',
        choice3: 'BruceW75',
        choice4: 'BruceBat21',
        answer: 1,
    },
    {
        question: 'Which of these was NOT an inspiration for Batman?',
        choice1: 'Sherlock Holmes',
        choice2: 'Dracula',
        choice3: 'Zorro',
        choice4: 'A Leonardo da Vinci Sketch',
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