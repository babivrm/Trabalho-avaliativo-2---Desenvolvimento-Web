// --- 1. Dados das Perguntas (Requisito: Mínimo de 15 questões) ---
const questions = [
    {
        question: "Qual tag HTML é usada para criar uma lista não ordenada?",
        answers: [
            { text: "<ul>", correct: true },
            { text: "<ol>", correct: false },
            { text: "<list>", correct: false },
            { text: "<li>", correct: false }
        ]
    },
    {
        question: "Qual propriedade CSS é usada para mudar a cor do texto?",
        answers: [
            { text: "font-color", correct: false },
            { text: "color", correct: true },
            { text: "text-color", correct: false },
            { text: "background-color", correct: false }
        ]
    },
    {
        question: "Qual método JavaScript é usado para selecionar um elemento pelo seu ID?",
        answers: [
            { text: "document.querySelector()", correct: false },
            { text: "document.getElementsByClassName()", correct: false },
            { text: "document.getElementById()", correct: true },
            { text: "document.getElementByTag()", correct: false }
        ]
    },
    {
        question: "O que o acrônimo CSS significa?",
        answers: [
            { text: "Creative Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "Qual é o principal uso da tag `<canvas>` em HTML5?",
        answers: [
            { text: "Exibir vídeos", correct: false },
            { text: "Desenhar gráficos e animações via script", correct: true },
            { text: "Criar formulários de entrada", correct: false },
            { text: "Incorporar documentos PDF", correct: false }
        ]
    },
    {
        question: "Qual palavra-chave é usada para declarar uma variável com escopo de bloco em JavaScript?",
        answers: [
            { text: "var", correct: false },
            { text: "const", correct: false },
            { text: "let", correct: true },
            { text: "int", correct: false }
        ]
    },
    {
        question: "Qual seletor CSS tem a maior especificidade?",
        answers: [
            { text: "ID (#)", correct: true },
            { text: "Classe (.)", correct: false },
            { text: "Elemento (tag)", correct: false },
            { text: "Pseudo-classe (:hover)", correct: false }
        ]
    },
    {
        question: "Qual comando Git é usado para salvar as alterações em um repositório local?",
        answers: [
            { text: "git push", correct: false },
            { text: "git pull", correct: false },
            { text: "git commit", correct: true },
            { text: "git clone", correct: false }
        ]
    },
    {
        question: "O que significa 'DOM' em JavaScript?",
        answers: [
            { text: "Data Object Model", correct: false },
            { text: "Document Order Management", correct: false },
            { text: "Document Object Model", correct: true },
            { text: "Design Object Markup", correct: false }
        ]
    },
    {
        question: "Qual a função do atributo 'alt' na tag `<img>`?",
        answers: [
            { text: "Mudar o alinhamento da imagem", correct: false },
            { text: "Definir a URL da imagem", correct: false },
            { text: "Fornecer um texto alternativo para leitores de tela e quando a imagem não carrega", correct: true },
            { text: "Criar um link para a imagem", correct: false }
        ]
    },
    {
        question: "Em CSS Flexbox, qual propriedade alinha os itens **ao longo do eixo transversal**?",
        answers: [
            { text: "justify-content", correct: false },
            { text: "align-items", correct: true },
            { text: "flex-direction", correct: false },
            { text: "align-content", correct: false }
        ]
    },
    {
        question: "Qual operador JavaScript verifica **apenas a igualdade de valor**, mas não o tipo?",
        answers: [
            { text: "===", correct: false },
            { text: "==", correct: true },
            { text: "=", correct: false },
            { text: "!=", correct: false }
        ]
    },
    {
        question: "Qual elemento HTML é semanticamente correto para representar o **conteúdo principal** de um documento?",
        answers: [
            { text: "<div>", correct: false },
            { text: "<section>", correct: false },
            { text: "<article>", correct: false },
            { text: "<main>", correct: true }
        ]
    },
    {
        question: "Qual é o nome do sistema de gerenciamento de pacotes padrão para JavaScript?",
        answers: [
            { text: "Composer", correct: false },
            { text: "npm (Node Package Manager)", correct: true },
            { text: "pip", correct: false },
            { text: "Yarn", correct: false }
        ]
    },
    {
        question: "O que o termo 'Responsividade' em Design Web se refere?",
        answers: [
            { text: "Velocidade de carregamento da página", correct: false },
            { text: "A capacidade de um site se adaptar a diferentes tamanhos de tela e dispositivos", correct: true },
            { text: "A usabilidade do site", correct: false },
            { text: "O uso de JavaScript no site", correct: false }
        ]
    }
];

// --- 2. Variáveis de Estado e Elementos do DOM ---

let currentQuestionIndex = 0;
let score = 0;
let userName = '';
let myChart = null; // Variável para a instância do Chart.js

// Referências aos elementos HTML
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const userNameInput = document.getElementById('userName');
const startQuizBtn = document.getElementById('startQuizBtn');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const nextBtn = document.getElementById('nextBtn');
const feedbackElement = document.getElementById('feedback');
const resultTextName = document.getElementById('resultTextName');
const scoreText = document.getElementById('scoreText');
const percentageText = document.getElementById('percentageText');
const performanceMessage = document.getElementById('performanceMessage');
const restartBtn = document.getElementById('restartBtn');

// Habilita o botão 'Começar Quiz' quando o nome for digitado
userNameInput.addEventListener('input', () => {
    startQuizBtn.disabled = userNameInput.value.trim() === '';
});

// --- 3. Funções de Controle do Quiz ---

// Inicia o Quiz
startQuizBtn.addEventListener('click', startQuiz);
function startQuiz() {
    userName = userNameInput.value.trim();
    if (userName) {
        currentQuestionIndex = 0;
        score = 0;
        // Oculta a tela inicial e mostra a tela do quiz
        startScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        showQuestion();
    }
}

// Exibe a Pergunta Atual
function showQuestion() {
    resetState(); // Limpa botões e feedback
    const currentQuestion = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    
    // Atualiza a barra de progresso
    progressText.textContent = `Pergunta ${questionNumber} de ${questions.length}`;
    const progressPercentage = (questionNumber / questions.length) * 100;
    progressFill.style.width = `${progressPercentage}%`;

    questionElement.textContent = currentQuestion.question;

    // Cria os botões das alternativas
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn-answer');
        if (answer.correct) {
            // Define um atributo para identificar a resposta correta no momento da checagem
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Limpa os botões e feedback para a próxima pergunta
function resetState() {
    nextBtn.classList.add('hidden');
    feedbackElement.classList.add('hidden');
    // Remove todos os botões de resposta anteriores
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Lógica de Correção e Navegação (Requisito 2 e 3)
function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    
    // Desabilita todos os botões após a seleção
    Array.from(answerButtonsElement.children).forEach(button => {
        button.removeEventListener('click', selectAnswer);
    });

    // 1. Correção Automática e Feedback Visual
    if (isCorrect) {
        score++;
        selectedButton.classList.add('correct');
        feedbackElement.textContent = "Correto!";
        feedbackElement.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
        feedbackElement.textContent = "Incorreto. A resposta correta está destacada em verde.";
        feedbackElement.classList.add('incorrect');
        // Mostra a correta se a selecionada estiver errada
        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.dataset.correct === 'true') {
                button.classList.add('correct');
            }
        });
    }

    feedbackElement.classList.remove('hidden');
    nextBtn.classList.remove('hidden'); // Botão para avançar (Requisito 2)
}

// Próxima Pergunta ou Fim do Quiz
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// --- 4. Funções de Resultado (Requisito 3, 4 e 5) ---

function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    const totalQuestions = questions.length;
    const numErrors = totalQuestions - score;
    const percentage = Math.round((score / totalQuestions) * 100);

    // 3. Correção Automática (Exibição dos Dados)
    resultTextName.textContent = `Parabéns, ${userName}!`;
    scoreText.innerHTML = `Você acertou **${score}** de ${totalQuestions} perguntas.`;
    percentageText.innerHTML = `Aproveitamento: **${percentage}%**`;
    
    // 4. Mensagem de Desempenho
    displayPerformanceMessage(percentage);
    
    // 5. Gráfico de Desempenho (Chart.js)
    renderChart(score, numErrors);
}

// Exibe a mensagem de acordo com a pontuação
function displayPerformanceMessage(percentage) {
    let message = '';
    let className = '';

    if (percentage >= 80) {
        message = `≥ 80% → "Excelente!"`;
        className = 'msg-excellent';
    } else if (percentage >= 50 && percentage <= 79) {
        message = `Entre 50% e 79% → "Bom desempenho"`;
        className = 'msg-good';
    } else { // percentage < 50
        message = `< 50% → "Precisa melhorar"`;
        className = 'msg-needs-improvement';
    }

    performanceMessage.textContent = message;
    performanceMessage.className = `performance-message ${className}`;
}


// Cria o gráfico de pizza usando Chart.js
function renderChart(acertos, erros) {
    const ctx = document.getElementById('performanceChart').getContext('2d');

    // Destrói a instância anterior se existir para evitar sobreposição
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'doughnut', // Gráfico de Rosca/Pizza
        data: {
            labels: ['Acertos', 'Erros'],
            datasets: [{
                data: [acertos, erros],
                backgroundColor: [
                    'rgba(76, 175, 80, 0.8)', // Verde
                    'rgba(244, 67, 54, 0.8)'  // Vermelho
                ],
                borderColor: [
                    '#ffffff',
                    '#ffffff'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Permite que o container-chart defina o tamanho
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            family: 'Poppins'
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Proporção de Acertos vs. Erros',
                    font: {
                        size: 16,
                        family: 'Poppins'
                    }
                }
            }
        }
    });
}

// Reinicia o quiz
restartBtn.addEventListener('click', () => {
    // Esconde a tela de resultado e mostra a tela inicial
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    // Limpa o input e desabilita o botão
    userNameInput.value = '';
    startQuizBtn.disabled = true;
    // Opcional: rolar para o topo da página
    window.scrollTo(0, 0);
});