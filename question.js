function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if (quiz.isEnded()) {
        showScores();
    } else {

        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var endOfExmas = "<h1>Result</h1>";
    endOfExmas += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = endOfExmas;
};

var questions = [
    new Question("Green, Orange, & Violet are created after mixing two Primary colors together. What are these colors also referred to as?", ["Secondary Colors", "Primary Colors", "Tertiary Colors", "Analogous Colors"], "Secondary Colors"),
    new Question("These colors are created after mixing a Primary and a Secondary color together:", ["Analogous Colors", "Tertiary Colors", "Complementary Colors", "Warm Colors"], "Tertiary Colors"),
    new Question("These colors are opposite from each other on the color wheel:", ["Tertiary Colors", "Primary Colors", "Analogous Colors", "Complementary Colors"], "Complementary Colors"),
    new Question("Three colors beside each other on the color wheel are also known as: ", ["Analogous Colors", "Secondary Colors", "Cool Colors", "Complementary Colors"], "Analogous Colors"),
    new Question(" Reds, Yellows, and Oranges depict feelings of heat, passion, and intensity. These colors are also known as:", ["Cool Colors", "Primary Colors", "Secondary Colors", "Secondary Colors"], "Secondary Colors")
];

var quiz = new Quiz(questions);

populate();