const questions = [
    {
        question: "What does CPU mean?",
        options: ["Central Processing Unit", "Computer Power Utility", "Control Program Unit", "Core Process Usage"],
        correct: 0,
        explanation: "CPU significa Central Processing Unit, o 'cérebro' do computador."
    },
    {
        question: "What is a MOUSE?",
        options: ["A storage device", "An input device", "A type of software", "A network cable"],
        correct: 1,
        explanation: "Mouse é um dispositivo de entrada usado para controlar o cursor."
    },
    {
        question: "What does RAM stand for?",
        options: ["Random Access Memory", "Run Access Mode", "Remote Active Memory", "Rapid Application Module"],
        correct: 0,
        explanation: "RAM é uma memória de acesso rápido usada pelo sistema para tarefas temporárias."
    },
    {
        question: "What is SOFTWARE?",
        options: ["Physical parts of a computer", "Programs and applications", "Internet connection", "Data cables"],
        correct: 1,
        explanation: "Software são programas, aplicativos e sistemas que rodam no computador."
    },
    {
        question: "What is a PASSWORD used for?",
        options: ["To delete accounts", "To protect access", "To install apps", "To update software"],
        correct: 1,
        explanation: "Passwords são usadas para proteger acesso a contas e dispositivos."
    },
    {
        question: "What does WI-FI provide?",
        options: ["Electric power", "Wireless internet connection", "Data storage", "Computer cooling"],
        correct: 1,
        explanation: "Wi-Fi fornece conexão sem fio à internet."
    },
    {
        question: "What is a FILE?",
        options: ["A physical device", "A folder", "A stored document or data", "A type of virus"],
        correct: 2,
        explanation: "File é um documento ou conjunto de dados armazenado no computador."
    },
    {
        question: "What does URL mean?",
        options: ["Universal Resource Link", "Universal Random Location", "Uniform Resource Locator", "User Response Link"],
        correct: 2,
        explanation: "URL é o endereço de um site na internet."
    },
    {
        question: "What is a KEYBOARD?",
        options: ["An output device", "A networking tool", "An operating system", "An input device"],
        correct: 3,
        explanation: "Keyboard (teclado) é um dispositivo de entrada usado para digitar."
    },
    {
        question: "What does APP refer to?",
        options: ["A device", "An application", "A cable type", "A processor"],
        correct: 1,
        explanation: "App é a abreviação de application, ou aplicativo."
    }
];


        let currentQuestionIndex = 0;
        let score = 0;

        const startScreen = document.getElementById('start-screen');
        const quizScreen = document.getElementById('quiz-screen');
        const resultScreen = document.getElementById('result-screen');
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const feedbackArea = document.getElementById('feedback');
        const explanationText = document.getElementById('explanation-text');
        const nextBtn = document.getElementById('next-btn');
        const progressBar = document.getElementById('progress-bar');
        const scoreDisplay = document.getElementById('score-display');
        const finalMessage = document.getElementById('final-message');

        function startQuiz() {
            startScreen.classList.add('hidden');
            quizScreen.classList.remove('hidden');
            currentQuestionIndex = 0;
            score = 0;
            loadQuestion();
        }

        function loadQuestion() {
            const currentData = questions[currentQuestionIndex];
            
            feedbackArea.classList.add('hidden');
            nextBtn.classList.add('hidden');
            optionsContainer.innerHTML = '';
            
            questionText.textContent = `${currentQuestionIndex + 1}. ${currentData.question}`;
            const progress = ((currentQuestionIndex) / questions.length) * 100;
            progressBar.style.width = `${progress}%`;

            currentData.options.forEach((option, index) => {
                const btn = document.createElement('button');
                btn.textContent = option;
                btn.classList.add('btn', 'option-btn');
                btn.onclick = () => checkAnswer(index, btn);
                optionsContainer.appendChild(btn);
            });
        }

        function checkAnswer(selectedIndex, selectedBtn) {
            const currentData = questions[currentQuestionIndex];
            const buttons = optionsContainer.querySelectorAll('.option-btn');

            buttons.forEach(btn => btn.disabled = true);

            if (selectedIndex === currentData.correct) {
                selectedBtn.classList.add('correct');
                score++;
            } else {
                selectedBtn.classList.add('wrong');
                buttons[currentData.correct].classList.add('correct');
            }

            explanationText.textContent = currentData.explanation;
            feedbackArea.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
        }

        function nextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }

        function showResults() {
            quizScreen.classList.add('hidden');
            resultScreen.classList.remove('hidden');
            scoreDisplay.textContent = `${score} / ${questions.length}`;
            
            if(score === 10) finalMessage.textContent = "Perfeito! Você domina o Simple Present!";
            else if(score >= 7) finalMessage.textContent = "Muito bom! Continue praticando.";
            else finalMessage.textContent = "Não desista! Revise as regras e tente de novo.";
        }

        function restartQuiz() {
            resultScreen.classList.add('hidden');
            startScreen.classList.remove('hidden');
        }