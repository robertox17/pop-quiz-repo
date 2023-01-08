const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
var startScreenEl = document.getElementById('start-screen');

var currentQuestionIndex = 0;


const myQuestions = [
  {
    question: "what is the most usefull language to learn?",
    answers: {
      a: "Javascript",
      b:  "python",
      c: "java"
    },
    correctAnswer: "a"
  },
  {
    question: "string values must be enclosed within ___ when being assigned to variables",
    answers: {
      a: "commas",
      b:  "quotes",
      c:  "curly brackets "
    },
    correctAnswer: "b"
  },
  {
    question: "What are variables used for in JavaScript Programs?",
    answers: {
      a:  "Causing high-school algebra flashbacks",
      b:  "Varying randomly",
      c:  "Storing numbers"
    },
    correctAnswer: "c"
  },
  
];

let timer;
let timeLeft;

function startQuiz() {

  // Reset time left
  timeLeft = 60;
  // Start timer
  timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timer").innerHTML = timeLeft + " seconds remaining";
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);

  // Display first question
  showQuestion(0);
}

function showQuestion(questionIndex) {
  // Clear previous question
  quizContainer.innerHTML = "";
  // Get current question object
  const currentQuestion = myQuestions[questionIndex];
  // Display question
  const questionElement = document.createElement("h2");
  questionElement.innerHTML = currentQuestion.question;
  quizContainer.appendChild(questionElement);
  // Display answer choices
  for (const key in currentQuestion.answers) {
    // Create button for each answer
    const answerButton = document.createElement("button");
    answerButton.innerHTML = currentQuestion.answers[key];
    answerButton.setAttribute("value", key);
    answerButton.addEventListener("click", selectAnswer);
    quizContainer.appendChild(answerButton);
  }
}

function selectAnswer(event) {
  const selectedAnswer = event.target.value;
  // Check if answer is correct
  const currentQuestion = myQuestions[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.correctAnswer) {
    // Answer is correct
    console.log("Correct!");
  } else {
    // Answer is incorrect
    console.log("Incorrect!");
    // Subtract time from timer
    timeLeft -= 10;
  }
  currentQuestionIndex++;
  // Check if all questions have been answered
  if (currentQuestionIndex === myQuestions.length) {
    endQuiz();
  } else {
    // Display next question
    showQuestion(currentQuestionIndex);
  }
}

function endQuiz() {
  // Clear quiz container
  quizContainer.innerHTML = "";
  // Stop timer
  clearInterval(timer);
  // Display score
  const scoreElement = document.createElement("h2");
  scoreElement.innerHTML = "Your score: " + timeLeft;
  quizContainer.appendChild(scoreElement);
  // Display form to enter initials
  const form = document  .createElement("form");
  const initialsInput = document.createElement("input");
  initialsInput.setAttribute("type", "text");
  initialsInput.setAttribute("placeholder", "Enter your initials");
  form.appendChild(initialsInput);
  const submitInitialsButton = document.createElement("button");
  submitInitialsButton.innerHTML = "Submit";
  form.appendChild(submitInitialsButton);
  quizContainer.appendChild(form);
  // Handle form submission
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const initials = initialsInput.value;
    // Save score with initials
    saveScore(initials, timeLeft);
    // Display high scores
    showScores();
  });
}

function saveScore(initials, score) {
  // Save score to local storage
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ initials, score });
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function showScores() {
  // Get scores from local storage
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  // Sort scores in descending order
  highScores.sort((a, b) => b.score - a.score);
  // Clear previous scores
  resultsContainer.innerHTML = "";
  // Display scores
  for (const score of highScores) {
    const scoreElement = document.createElement("div");
    scoreElement.innerHTML = `${score.initials}: ${score.score}`;
    resultsContainer.appendChild(scoreElement);
  }
}

// Start quiz when start button is clicked
submitButton.addEventListener("click", startQuiz);

