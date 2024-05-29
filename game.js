document.addEventListener('DOMContentLoaded', () => {
    const homeElement = document.getElementById('home');
    const gameElement = document.getElementById('game');
    const resultElement = document.getElementById('result');
    const playerNameInput = document.getElementById('player-name');
    const startButton = document.getElementById('start-btn');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');
    const resultMessageElement = document.getElementById('result-message');
    const restartSamePlayerButton = document.getElementById('restart-same-player-btn');
    const restartNewPlayerButton = document.getElementById('restart-new-player-btn');

    let playerName = '';
    let currentQuestionIndex = 0;
    let score = 0;

    const questions = [
        {
            question: "Quel monument est connu comme la résidence des rois de France jusqu'à la Révolution française?",
            answers: [
                {text: "Mont Saint-Michel", correct: false},
                {text: "Notre-Dame de Paris", correct: false},
                {text: "Château de Versailles", correct: true},
                {text: "Tour Eiffel", correct: false},
            ]
        },
        {
            question: "Quelle cathédrale gothique est située à Paris et est célèbre pour ses gargouilles et ses vitraux?",
            answers: [
                {text: "Cathédrale de Chartres", correct: false},
                {text: "Cathédrale Notre-Dame de Paris", correct: true},
                {text: "Cathédrale de Reims", correct: false},
                {text: "Cathédrale de Strasbourg", correct: false},
            ]
        },
        {
            question: "Quel monument parisien a été construit pour l'Exposition universelle de 1889?",
            answers: [
                {text: "Tour Eiffel", correct: true},
                {text: "Arc de Triomphe", correct: false},
                {text: "Panthéon", correct: false},
                {text: "Sacré-Cœur", correct: false},
            ]
        },
        {
            question: "Quel est le nom de la célèbre forteresse médiévale située à Carcassonne?",
            answers: [
                {text: "Forteresse de Chinon", correct: false},
                {text: "Château de Chambord", correct: false},
                {text: "Château d'Amboise", correct: false},
                {text: "Cité de Carcassonne", correct: true},
            ]
        },
        {
            question: "Quel monument commémore les victoires de Napoléon et est situé à l'extrémité des Champs-Élysées?",
            answers: [
                {text: "Arc de Triomphe", correct: true},
                {text: "Place de la Concorde", correct: false},
                {text: "Les Invalides", correct: false},
                {text: "Palais Garnier", correct: false},
            ]
        },
        {
            question: "Quel célèbre château de la Loire est connu pour son architecture Renaissance et son escalier à double révolution?",
            answers: [
                {text: "Château de Chambord", correct: true},
                {text: "Château de Chenonceau", correct: false},
                {text: "Château de Blois", correct: false},
                {text: "Château de Villandry", correct: false},
            ]
        },
        {
            question: "Quel édifice religieux est situé au sommet de la butte Montmartre à Paris?",
            answers: [
                {text: "Église Saint-Sulpice", correct: false},
                {text: "Basilique du Sacré-Cœur", correct: true},
                {text: "Église de la Madeleine", correct: false},
                {text: "Cathédrale Notre-Dame de Paris", correct: false},
            ]
        },
        {
            question: "Quel célèbre musée parisien était autrefois un palais royal?",
            answers: [
                {text: "Musée d'Orsay", correct: false},
                {text: "Musée de l'Orangerie", correct: false},
                {text: "Musée du Louvre", correct: true},
                {text: "Musée Rodin", correct: false},
            ]
        },
        {
            question: "Quel monument situé à Arles est un exemple bien conservé de l'architecture romaine en France?",
            answers: [
                {text: "Arènes de Lutèce", correct: false},
                {text: "Amphithéâtre d'Arles", correct: true},
                {text: "Amphithéâtre de Nîmes", correct: false},
                {text: "Théâtre antique d'Orange", correct: false},
            ]
        },
        {
            question: "Quel monument à Lyon est célèbre pour sa basilique dédiée à la Vierge Marie?",
            answers: [
                {text: "Cathédrale Saint-Jean-Baptiste", correct: false},
                {text: "Église Saint-Nizier", correct: false},
                {text: "Église Saint-Paul", correct: false},
                {text: "Basilique Notre-Dame de Fourvière", correct: true},
            ]
        },
        {
            question: "Quel palais est le siège officiel du Président de la République française?",
            answers: [
                {text: "Palais de l'Élysée", correct: true},
                {text: "Palais du Luxembourg", correct: false},
                {text: "Palais Bourbon", correct: false},
                {text: "Palais Royal", correct: false},
            ]
        },
        {
            question: "Quel monument parisien abrite le tombeau de Napoléon Bonaparte?",
            answers: [
                {text: "Panthéon", correct: false},
                {text: "Les Invalides", correct: true},
                {text: "Père Lachaise", correct: false},
                {text: "Chapelle Expiatoire", correct: false},
            ]
        },
        {
            question: "Quel monument parisien est connu pour son grand dôme et a été construit par ordre de Louis XIV?",
            answers: [
                {text: "Panthéon", correct: false},
                {text: "Sainte-Chapelle", correct: false},
                {text: "Les Invalides", correct: true},
                {text: "Église Saint-Sulpice", correct: false},
            ]
        },
        {
            question: "Quel célèbre aqueduc romain est situé près de Nîmes?",
            answers: [
                {text: "Pont du Gard", correct: true},
                {text: "Pont d'Avignon", correct: false},
                {text: "Pont de Pierre", correct: false},
                {text: "Pont de Normandie", correct: false},
            ]
        },
        {
            question: "Quel château est surnommé le \"château des Dames\" et est construit sur le Cher?",
            answers: [
                {text: "Château de Chambord", correct: false},
                {text: "Château de Cheverny", correct: false},
                {text: "Château de Chenonceau", correct: true},
                {text: "Château d'Azay-le-Rideau", correct: false},
            ]
        },
        {
            question: "Quel édifice est célèbre pour ses grandes fresques romanes et se trouve à Poitiers?",
            answers: [
                {text: "Église Notre-Dame la Grande", correct: true},
                {text: "Église Saint-Hilaire-le-Grand", correct: false},
                {text: "Cathédrale Saint-Pierre", correct: false},
                {text: "Abbaye de Saint-Savin-sur-Gartempe", correct: false},
            ]
        },
        {
            question: "Quel monument historique est une ancienne abbaye bénédictine située sur une île en Normandie?",
            answers: [
                {text: "Mont Saint-Michel", correct: true},
                {text: "Abbaye de Jumièges", correct: false},
                {text: "Abbaye de Fontevraud", correct: false},
                {text: "Abbaye de Cluny", correct: false},
            ]
        },
        {
            question: "Quel célèbre opéra parisien est connu pour son architecture grandiose et ses balcons ornés?",
            answers: [
                {text: "Opéra Bastille", correct: false},
                {text: "Palais Garnier", correct: true},
                {text: "Théâtre des Champs-Élysées", correct: false},
                {text: "Théâtre du Châtelet", correct: false},
            ]
        },
        {
            question: "Quel monument parisien a été transformé en musée d'art au début du XXe siècle et est célèbre pour sa collection impressionniste?",
            answers: [
                {text: "Centre Pompidou", correct: false},
                {text: "Musée de l'Orangerie", correct: false},
                {text: "Petit Palais", correct: false},
                {text: "Musée d'Orsay", correct: true},
            ]
        },
        {
            question: "Quel célèbre cimetière parisien abrite les tombes de nombreux artistes et écrivains célèbres?",
            answers: [
                {text: "Cimetière Montparnasse", correct: false},
                {text: "Cimetière de Montmartre", correct: false},
                {text: "Cimetière du Père Lachaise", correct: true},
                {text: "Cimetière de Passy", correct: false},
            ]
        }
    ];

    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', handleNextButton);
    restartSamePlayerButton.addEventListener('click', restartSamePlayer);
    restartNewPlayerButton.addEventListener('click', restartNewPlayer);

    function startQuiz() {
        playerName = playerNameInput.value.trim();
        if (!playerName) {
            alert('Veuillez entrer votre nom pour commencer le quiz.');
            return;
        }
        homeElement.style.display = 'none';
        gameElement.style.display = 'block';
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = 'Suivant';
        showQuestion();
    }

    function showQuestion() {
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerHTML = answer.text;
            button.classList.add('btn');
            answerButtonsElement.appendChild(button);
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
        });
    }

    function resetState() {
        nextButton.style.display = 'none';
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === 'true';
        if (isCorrect) {
            selectedBtn.classList.add('correct');
            score++;
        } else {
            selectedBtn.classList.add('incorrect');
        }
        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.dataset.correct === 'true') {
                button.classList.add('correct');
            }
            button.disabled = true;
        });
        nextButton.style.display = 'block';
    }

    function showScore() {
        resetState();
        gameElement.style.display = 'none';
        resultElement.style.display = 'block';
        resultMessageElement.innerHTML = `${playerName}, vous avez obtenu ${score} sur ${questions.length} !`;
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    function restartSamePlayer() {
        resultElement.style.display = 'none';
        gameElement.style.display = 'block';
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    }

    function restartNewPlayer() {
        resultElement.style.display = 'none';
        homeElement.style.display = 'block';
        playerNameInput.value = '';
    }
});
