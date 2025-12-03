const questions = [
    {
    question: "O que é FRONTEND?",
    options: ["Parte lógica do sistema", "Banco de dados", "Interface visual do usuário", "Rede de internet"],
    correct: 2,
    explanation: "Frontend é a parte visível da aplicação, tudo com o que o usuário interage."
    },
    {
        question: "O que é BACKEND?",
        options: ["Design da aplicação", "Parte lógica e estrutural do sistema", "Somente o banco de dados", "Apenas a interface gráfica"],
        correct: 1,
        explanation: "Backend é onde ficam as regras de negócio, lógica e acesso ao banco de dados."
    },
    {
        question: "O que é um BUG?",
        options: ["Atualização do sistema", "Erro ou falha no sistema", "Novo recurso", "Tipo de hardware"],
        correct: 1,
        explanation: "Bug é um erro que causa comportamento inesperado na aplicação."
    },
    {
        question: "O que é um DATABASE?",
        options: ["Um navegador", "Armazenamento organizado de dados", "Uma linguagem de programação", "Um servidor web"],
        correct: 1,
        explanation: "Database é onde os dados são armazenados e consultados."
    },
    {
        question: "O que é DEPLOYMENT?",
        options: ["Modo de teste do sistema", "Publicação de um sistema", "Erro no servidor", "Instalação de drivers"],
        correct: 1,
        explanation: "Deployment é o processo de colocar a aplicação no ar para uso real."
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
        question: "What is SOFTWARE?",
        options: ["Physical parts of a computer", "Programs and applications", "Internet connection", "Data cables"],
        correct: 1,
        explanation: "Software são programas, aplicativos e sistemas que rodam no computador."
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
            
            if(score === 10) finalMessage.textContent = "Perfeito! Você domina os termos técnicos!";
            else if(score >= 7) finalMessage.textContent = "Muito bom! Continue praticando.";
            else finalMessage.textContent = "Não desista! Revise e tente de novo.";
        }

        function restartQuiz() {
            resultScreen.classList.add('hidden');
            startScreen.classList.remove('hidden');
        }