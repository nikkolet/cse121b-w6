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
        question: 'What were the names of Bruce Wayne\'s Parents?',
        choice1: 'James & Elizabeth',
        choice2: 'Wayne & Alice',
        choice3: 'George & Elaine',
        choice4: 'Thomas & Martha',
        answer: 4,
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
    },
    {
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
    },
    {
        question: 'What is Clark Kent\'s middle name?',
        choice1: 'Jacob',
        choice2: 'Joseph',
        choice3: 'Walter',
        choice4: 'Thomas',
        answer: 2,
    },
    {
        question: 'What is the name of hte dimensional plane where Kryptonian criminals were exiled for their crimes?',
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
    },
    {
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
const MAX_QUESTIONS = 20

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