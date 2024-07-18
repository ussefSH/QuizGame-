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
    const timerElement = document.getElementById('timer');
    const timelineElement = document.getElementById('timeline'); // Élément de la timeline
    const gameOptionsMenu = document.getElementById('game-options-menu'); // Menu déroulant
    const contexteElement = document.getElementById('contexte');

    let playerName = '';
    let currentQuestionIndex = 0;
    let score = 0;
    let timerInterval;
    let totalTime = 0;

const questions = [
    {
        question: "Quel monument est connu comme la résidence des rois de France jusqu'à la Révolution française?",
        answers: [
            { text: "Mont Saint-Michel", correct: false },
            { text: "Notre-Dame de Paris", correct: false },
            { text: "Château de Versailles", correct: true },
            { text: "Tour Eiffel", correct: false }
        ],
        context: "Le Château de Versailles est un symbole de la monarchie absolue de Louis XIV et a été la résidence principale des rois de France de 1682 jusqu'à la Révolution française."
    },
    {
        question: "Quelle cathédrale gothique est située à Paris et est célèbre pour ses gargouilles et ses vitraux?",
        answers: [
            { text: "Cathédrale de Chartres", correct: false },
            { text: "Cathédrale Notre-Dame de Paris", correct: true },
            { text: "Cathédrale de Reims", correct: false },
            { text: "Basilique du Sacré-Cœur", correct: false }
        ],
        context: "La Cathédrale Notre-Dame de Paris est un chef-d'œuvre de l'architecture gothique, connue pour ses sculptures et ses vitraux, ainsi que pour ses rôles historiques et littéraires."
    },
    {
            question: "Quel monument parisien a été construit pour l'Exposition universelle de 1889?",
            answers: [
                {text: "Tour Eiffel", correct: true},
                {text: "Arc de Triomphe", correct: false},
                {text: "Panthéon", correct: false},
                {text: "Sacré-Cœur", correct: false},
            ],
            context:"Construite pour l'Exposition universelle de 1889 à Paris, la Tour Eiffel est devenue un symbole mondial de la France et de son ingéniosité architecturale."
    },
    {
            question: "Quel est le nom de la célèbre forteresse médiévale située à Carcassonne?",
            answers: [
                {text: "Forteresse de Chinon", correct: false},
                {text: "Château de Chambord", correct: false},
                {text: "Château d'Amboise", correct: false},
                {text: "Cité de Carcassonne", correct: true},
            ],
            context:"Une forteresse médiévale située à Carcassonne, célèbre pour ses murs bien préservés et son histoire riche remontant à l'époque gallo-romaine et médiévale."
    },
    {
            question: "Quel monument commémore les victoires de Napoléon et est situé à l'extrémité des Champs-Élysées?",
            answers: [
                {text: "Arc de Triomphe", correct: true},
                {text: "Place de la Concorde", correct: false},
                {text: "Les Invalides", correct: false},
                {text: "Palais Garnier", correct: false},
            ],
            context:"Construit pour commémorer les victoires de Napoléon, l'Arc de Triomphe est situé à l'extrémité des Champs-Élysées à Paris et honore ceux qui ont combattu et sont morts pour la France."
    },
    {
            question: "Quel célèbre château de la Loire est connu pour son architecture Renaissance et son escalier à double révolution?",
            answers: [
                {text: "Château de Chambord", correct: true},
                {text: "Château de Chenonceau", correct: false},
                {text: "Château de Blois", correct: false},
                {text: "Château de Villandry", correct: false},
            ],
            context:"Connu pour son architecture Renaissance et son escalier à double révolution, le Château de Chambord est l'un des plus grands châteaux de la Loire, commandé par François Ier."
    },
    {
            question: "Quel édifice religieux est situé au sommet de la butte Montmartre à Paris?",
            answers: [
                {text: "Église Saint-Sulpice", correct: false},
                {text: "Basilique du Sacré-Cœur", correct: true},
                {text: "Église de la Madeleine", correct: false},
                {text: "Cathédrale Notre-Dame de Paris", correct: false},
            ],
            context:" Située au sommet de la butte Montmartre à Paris, cette basilique blanche est dédiée au Sacré-Cœur de Jésus et est un lieu de pèlerinage et un point de vue panoramique sur la ville."
    },
    {
            question: "Quel célèbre musée parisien était autrefois un palais royal?",
            answers: [
                {text: "Musée d'Orsay", correct: false},
                {text: "Musée de l'Orangerie", correct: false},
                {text: "Musée du Louvre", correct: true},
                {text: "Musée Rodin", correct: false},
            ],
            context:"Autrefois un palais royal, le Louvre est aujourd'hui l'un des plus grands musées d'art du monde, abritant des œuvres célèbres comme la Joconde et la Vénus de Milo."
    },
    {
            question: "Quel monument situé à Arles est un exemple bien conservé de l'architecture romaine en France?",
            answers: [
                {text: "Arènes de Lutèce", correct: false},
                {text: "Amphithéâtre d'Arles", correct: true},
                {text: "Amphithéâtre de Nîmes", correct: false},
                {text: "Théâtre antique d'Orange", correct: false},
            ],
            context:"Un exemple bien conservé de l'architecture romaine en France, cet amphithéâtre servait autrefois aux spectacles de gladiateurs et est aujourd'hui un site touristique majeur."
    },
    {
            question: "Quel monument à Lyon est célèbre pour sa basilique dédiée à la Vierge Marie?",
            answers: [
                {text: "Cathédrale Saint-Jean-Baptiste", correct: false},
                {text: "Église Saint-Nizier", correct: false},
                {text: "Église Saint-Paul", correct: false},
                {text: "Basilique Notre-Dame de Fourvière", correct: true},
            ],
            context:" Située à Lyon, cette basilique dédiée à la Vierge Marie est un lieu de pèlerinage important et offre une vue spectaculaire sur la ville."
    },
    {
            question: "Quel palais est le siège officiel du Président de la République française?",
            answers: [
                {text: "Palais de l'Élysée", correct: true},
                {text: "Palais du Luxembourg", correct: false},
                {text: "Palais Bourbon", correct: false},
                {text: "Palais Royal", correct: false},
            ],
            context:"Le siège officiel du Président de la République française, situé à Paris. Ce palais est le centre de l'exécutif en France depuis la fin du XVIIIe siècle."
    },
    {
            question: "Quel monument parisien abrite le tombeau de Napoléon Bonaparte?",
            answers: [
                {text: "Panthéon", correct: false},
                {text: "Les Invalides", correct: true},
                {text: "Père Lachaise", correct: false},
                {text: "Chapelle Expiatoire", correct: false},
            ],
            context:" Ce complexe abrite le tombeau de Napoléon Bonaparte et est également un musée militaire. Il a été construit par ordre de Louis XIV pour abriter les invalides de guerre."
    },
    {
            question: "Quel monument parisien est connu pour son grand dôme et a été construit par ordre de Louis XIV?",
            answers: [
                {text: "Panthéon", correct: false},
                {text: "Sainte-Chapelle", correct: false},
                {text: "Les Invalides", correct: true},
                {text: "Église Saint-Sulpice", correct: false},
            ],
            context:"Ce complexe abrite le tombeau de Napoléon Bonaparte et est également un musée militaire. Il a été construit par ordre de Louis XIV pour abriter les invalides de guerre."
    },
    {
            question: "Quel célèbre aqueduc romain est situé près de Nîmes?",
            answers: [
                {text: "Pont du Gard", correct: true},
                {text: "Pont d'Avignon", correct: false},
                {text: "Pont de Pierre", correct: false},
                {text: "Pont de Normandie", correct: false},
            ],
            context:"Un aqueduc romain bien préservé situé près de Nîmes, il est un témoignage impressionnant de l'ingénierie romaine."
    },
    {
            question: "Quel château est surnommé le \"château des Dames\" et est construit sur le Cher?",
            answers: [
                {text: "Château de Chambord", correct: false},
                {text: "Château de Cheverny", correct: false},
                {text: "Château de Chenonceau", correct: true},
                {text: "Château d'Azay-le-Rideau", correct: false},
            ],
            context:"Connu comme le château des Dames en raison de l'influence des femmes dans son histoire, ce château sur le Cher est célèbre pour son architecture élégante et ses jardins."
    },
    {
            question: "Quel édifice est célèbre pour ses grandes fresques romanes et se trouve à Poitiers?",
            answers: [
                {text: "Église Notre-Dame la Grande", correct: true},
                {text: "Église Saint-Hilaire-le-Grand", correct: false},
                {text: "Cathédrale Saint-Pierre", correct: false},
                {text: "Abbaye de Saint-Savin-sur-Gartempe", correct: false},
            ],
            context:" Située à Poitiers, cette église est célèbre pour ses fresques romanes et son architecture distincte."
    },
    {
            question: "Quel monument historique est une ancienne abbaye bénédictine située sur une île en Normandie?",
            answers: [
                {text: "Mont Saint-Michel", correct: true},
                {text: "Abbaye de Jumièges", correct: false},
                {text: "Abbaye de Fontevraud", correct: false},
                {text: "Abbaye de Cluny", correct: false},
            ],
            context:"Une ancienne abbaye bénédictine située sur une île en Normandie, ce site est un haut lieu de pèlerinage et un chef-d'œuvre architectural médiéval."
    },
    {
            question: "Quel célèbre opéra parisien est connu pour son architecture grandiose et ses balcons ornés?",
            answers: [
                {text: "Opéra Bastille", correct: false},
                {text: "Palais Garnier", correct: true},
                {text: "Théâtre des Champs-Élysées", correct: false},
                {text: "Théâtre du Châtelet", correct: false},
            ],
            context:"Cet opéra parisien est connu pour son architecture grandiose, ses balcons ornés et son intérieur somptueux. Il a été commandé par Napoléon III et est un symbole de l'opéra français."
    },
    {
            question: "Quel monument parisien a été transformé en musée d'art au début du XXe siècle et est célèbre pour sa collection impressionniste?",
            answers: [
                {text: "Centre Pompidou", correct: false},
                {text: "Musée de l'Orangerie", correct: false},
                {text: "Petit Palais", correct: false},
                {text: "Musée d'Orsay", correct: true},
            ],
            context:" Transformé en musée d'art au début du XXe siècle, le Musée d'Orsay est célèbre pour sa collection impressionniste et ses œuvres d'art du XIXe siècle."
    },
    {
            question: "Quel célèbre cimetière parisien abrite les tombes de nombreux artistes et écrivains célèbres?",
            answers: [
                {text: "Cimetière Montparnasse", correct: false},
                {text: "Cimetière de Montmartre", correct: false},
                {text: "Cimetière du Père Lachaise", correct: true},
                {text: "Cimetière de Passy", correct: false},
            ],
            context:"Ce cimetière parisien abrite les tombes de nombreux artistes et écrivains célèbres, dont Oscar Wilde, Jim Morrison et Édith Piaf, et est un lieu de mémoire important."
    }
    ];

    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', handleNextButton);
    gameOptionsMenu.addEventListener('change', handleGameOptions);

    function startQuiz() {
        playerName = playerNameInput.value.trim();
        if (!playerName) {
            alert('Veuillez entrer votre nom pour commencer le quiz.');
            return;
        }
        homeElement.style.display = 'none';
        gameElement.style.display = 'block';
        document.body.classList.remove('home-active');
        currentQuestionIndex = 0;
        score = 0;
        totalTime = 0;
        startTimer();
        nextButton.innerHTML = 'Suivant';
        showQuestion();
        initializeTimeline(); // Initialiser la timeline
    }

    function startTimer() {
        timerElement.innerHTML = 'Temps : 00:00';
        let startTime = Date.now();
        timerInterval = setInterval(() => {
            totalTime = Math.floor((Date.now() - startTime) / 1000);
            let minutes = Math.floor(totalTime / 60);
            let seconds = totalTime % 60;
            timerElement.innerHTML = `Temps : ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
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
                button.dataset.monument = answer.text; // Ajouter le nom du monument à l'attribut data
            }
            button.addEventListener('click', selectAnswer);
        });
    }

    function resetState() {
        nextButton.style.display = 'none';
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
        hideContexte(); // Masquer le contexte lors de la réinitialisation de l'état
    }

    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === 'true';
        const monument = isCorrect ? selectedBtn.dataset.monument : Array.from(answerButtonsElement.children).find(btn => btn.dataset.correct === 'true').dataset.monument;
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
    
        // Afficher le contexte de la question actuelle
        const currentQuestion = questions[currentQuestionIndex];
        showContexte(currentQuestion.context, monument, isCorrect);
    
        updateTimeline(isCorrect); // Mettre à jour la timeline
    }
    
    function showScore() {
        stopTimer();
        resetState();
        gameElement.style.display = 'none';
        resultElement.style.display = 'block';
        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;
        resultMessageElement.innerHTML = `Félicitations ${playerName}<br> Vous avez obtenu ${score} sur ${questions.length}.<br>
        Vous avez terminé le quiz en ${minutes} minutes et ${seconds} secondes !`;
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    function handleGameOptions() {
        const selectedOption = gameOptionsMenu.value;
        if (selectedOption === 'home') {
            restartNewPlayer();
        } else if (selectedOption === 'restart') {
            restartSamePlayer();
        }
        gameOptionsMenu.value = ''; // Réinitialiser la sélection
    }

    function restartSamePlayer() {
        resultElement.style.display = 'none';
        gameElement.style.display = 'block';
        currentQuestionIndex = 0;
        score = 0;
        totalTime = 0;
        startTimer();
        showQuestion();
        initializeTimeline(); // Réinitialiser la timeline
    }

    function restartNewPlayer() {
        resultElement.style.display = 'none';
        homeElement.style.display = 'block';
        document.body.classList.add('home-active');
        playerNameInput.value = '';
    }

    function initializeTimeline() {
        timelineElement.innerHTML = '';
        for (let i = 1; i <= questions.length; i++) {
            const timelineItem = document.createElement('div');
            timelineItem.classList.add('timeline-item');
            timelineItem.innerHTML = i;
            timelineElement.appendChild(timelineItem);
        }
    }

    function updateTimeline(isCorrect) {
        const timelineItems = timelineElement.children;
        const currentTimelineItem = timelineItems[currentQuestionIndex];
        if (isCorrect) {
            currentTimelineItem.classList.add('correct');
        } else {
            currentTimelineItem.classList.add('incorrect');
        }
    }

    function showContexte(contexte, monument, isCorrect) {
        contexteElement.innerHTML = `<p><strong>Contexte historique de ${monument} :</p><p>${contexte}</p></strong>`;
        contexteElement.classList.remove('correct', 'incorrect'); // Supprimer les anciennes classes
        contexteElement.classList.add(isCorrect ? 'correct' : 'incorrect'); // Ajouter la nouvelle classe
        contexteElement.style.display = 'block'; // Afficher le contexte
    }

    function hideContexte() {
        contexteElement.innerHTML = ''; // Vider le contenu du contexte
        contexteElement.style.display = 'none'; // Masquer le contexte
        contexteElement.classList.remove('correct', 'incorrect'); // Supprimer les classes
    }

    document.body.classList.add('home-active');
});