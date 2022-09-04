function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.guess = function (answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  }

  this.questionIndex++;
};

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length;
};

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};

function populate() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    // show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;

    // show options
    var choices = quiz.getQuestionIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }

    showProgress();
  }
}

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    populate();
  };
}

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML =
    "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score +"/6" +"</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
}

// create questions here
var questions = [
  new Question(
    "Larry Page is founder of which company?",
    ["Adobe", "Google", "Uber", "Bloomberg"],
    "Google"
  ),
  new Question(
    "Great Barrier Reef is located where?",
    ["Australia", "Thailand", "Japan", "Sri Lanka"],
    "Australia"
  ),
  new Question(
    "Statue of Unity is located in which Indian state?",
    ["Madhya Pradesh", "Andhra Pradesh", "Gujrat", "Maharashtra"],
    "Gujrat"
  ),
  new Question(
    "Taj Mahal is situated on the banks of which river?",
    ["Ganga", "Yamuna", "Paravati", "Kaveri"],
    "Yamuna"
  ),
  new Question(
    "Headquartes of UNESCO is loacated at?",
    ["New York", "Paris", "Geneva", "London"],
    "Paris"
  ),

  new Question(
    "Fields Medal is associated with which subject?",
    ["Mathematics", "Physics", "Medicine", "Chemistry"],
    "Mathematics"
  ),
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
