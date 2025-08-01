// script.js
// Lógica interativa para a autoavaliação estratégica da Innosfera.

document.addEventListener('DOMContentLoaded', () => {
  const startSection = document.getElementById('start-section');
  const quizSection = document.getElementById('quiz-section');
  const resultSection = document.getElementById('result-section');
  const emailForm = document.getElementById('email-form');
  const emailInput = document.getElementById('email');
  const startButton = document.getElementById('start-button');
  const progressText = document.getElementById('progress');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const nextButton = document.getElementById('next-button');
  const resultTitle = document.getElementById('result-title');
  const resultDescription = document.getElementById('result-description');

  // Perguntas e pontuações conforme especificado
  const questions = [
    'Todos na sua empresa têm clareza sobre quais segmentos de clientes devem priorizar — e por quê?',
    'Você se interessa e estuda com frequência as reais necessidades dos seus clientes?',
    'Você tem uma lista de necessidades dos clientes que ainda não são atendidas — e que sua estratégia busca resolver?',
    'Você conhece os principais recursos da sua empresa que geram valor para os clientes? E desenvolve esses recursos de forma contínua?',
    'Seus processos principais são desenhados para resolver problemas reais dos clientes e entregar valor com eficiência?',
    'Seus planos de curto e longo prazo estão focados no desenvolvimento desses recursos e processos que criam valor?'
  ];

  // Opções disponíveis para todas as perguntas (textos e pontuações)
  const answerOptions = [
    { text: 'Com certeza sim', points: 5 },
    { text: 'Mais sim do que não', points: 4 },
    { text: 'Mais não do que sim', points: 2 },
    { text: 'Com certeza não', points: 0 }
  ];

  let currentQuestionIndex = 0;
  let totalScore = 0;
  let selectedPoints = null;

  /**
   * Exibe a pergunta atual e renderiza as opções de resposta.
   */
  function renderQuestion() {
    // Atualiza texto da pergunta
    questionText.textContent = questions[currentQuestionIndex];
    // Atualiza indicador de progresso
    progressText.textContent = `Pergunta ${currentQuestionIndex + 1}/${questions.length}`;
    // Limpa opções anteriores
    optionsContainer.innerHTML = '';
    selectedPoints = null;
    // Desabilita botão próximo inicialmente
    nextButton.disabled = true;
    // Cria cada opção dinamicamente
    answerOptions.forEach(option => {
      const optionDiv = document.createElement('div');
      optionDiv.classList.add('option');
      optionDiv.textContent = option.text;
      optionDiv.dataset.points = option.points;
      optionDiv.addEventListener('click', () => {
        // Remove seleção anterior
        document
          .querySelectorAll('#options-container .option')
          .forEach(el => el.classList.remove('selected'));
        // Seleciona atual
        optionDiv.classList.add('selected');
        // Armazena pontuação
        selectedPoints = parseInt(option.points, 10);
        // Habilita botão próximo
        nextButton.disabled = false;
      });
      optionsContainer.appendChild(optionDiv);
    });
  }

  /**
   * Calcula e retorna o resultado final com base na pontuação acumulada.
   * @param {number} score Pontuação total do usuário
   * @returns {{title: string, description: string}} Objeto com título e descrição
   */
  function getResultForScore(score) {
    if (score >= 25) {
      return {
        title: 'Estrategista nato',
        description:
          'Você pensa e age estrategicamente — está acima da média. O próximo passo é garantir que sua estratégia esteja sendo acompanhada por indicadores sólidos. Criar um painel de monitoramento estratégico pode fortalecer ainda mais sua execução. A Innosfera pode te ajudar nisso.'
      };
    }
    if (score >= 18) {
      return {
        title: 'Pensador estratégico',
        description:
          'Você está no caminho certo. Mas atenção: sem ritmo e consistência na execução, a estratégia perde força. Na Innosfera, ajudamos empresas a reduzir esse gap entre planejamento e ação, acelerando resultados.'
      };
    }
    if (score >= 11) {
      return {
        title: 'Aprendiz estratégico',
        description:
          'Você já entendeu o valor da estratégia — agora é hora de torná-la prática. Ao estruturar suas decisões, você ganha clareza, aprende com o processo e executa melhor. A Innosfera pode apoiar sua empresa a tirar a estratégia do PowerPoint e transformar isso em cultura.'
      };
    }
    return {
      title: 'Hora de começar',
      description:
        'Estratégia ainda não é clara para você — e tudo bem. Mas é hora de agir, antes que sua empresa perca relevância. A Innosfera te ajuda a mapear o contexto, desenhar horizontes estratégicos e executar com agilidade para ganhar tração.'
    };
  }

  /**
   * Mostra o resultado final e esconde as demais seções.
   */
  function showResult() {
    const result = getResultForScore(totalScore);
    resultTitle.textContent = result.title;
    resultDescription.textContent = result.description;
    quizSection.classList.remove('active');
    resultSection.classList.add('active');
  }

  /**
   * Manipula a submissão do formulário de e‑mail.
   * Valida o campo e inicia o quiz.
   */
  emailForm.addEventListener('submit', event => {
    event.preventDefault();
    // Se o e‑mail for válido (navegadores impedem submissão se for inválido), iniciamos o quiz
    if (!emailInput.checkValidity()) {
      // Caso o browser não suporte a validação, exibimos mensagem padrão
      emailInput.reportValidity();
      return;
    }
    // Inicia o quiz: oculta seção inicial, mostra seção do quiz e renderiza primeira pergunta
    startSection.classList.remove('active');
    quizSection.classList.add('active');
    currentQuestionIndex = 0;
    totalScore = 0;
    renderQuestion();
  });

  /**
   * Manipula clique no botão Próxima.
   * Acumula pontuação e avança para a próxima pergunta ou mostra resultado.
   */
  nextButton.addEventListener('click', () => {
    if (nextButton.disabled || selectedPoints === null) return;
    // Acumula pontuação
    totalScore += selectedPoints;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  });
});