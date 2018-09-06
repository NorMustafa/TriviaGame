
var panel = $('#quiz-area');
var countStartNumber = 30;


$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});



var questions = [{
  question: "What is generally considered to be the first pony car?",
  answers: ["Pontiac Firebird", "Mercury Cougar", "Ford Mustang", "Chevrolet Camaro"],
  correctAnswer: "Ford Mustang",

}, {
  question: "What was the first Japanese car to be produced in the United States?",
  answers: ["Mazda Miata", "Honda Accord", "Toyota Camry", "Nissan Maxima"],
  correctAnswer: "Honda Accord",
  
}, {
  question: "What car sold more than one million units in 1965, setting a record that still stands today?",
  answers: ["Buick Wildcar", "Pontiac GTO", "Ford Thunderbird", "Chevrolet Impala"],
  correctAnswer: "Chevrolet Impala",
  
}, {
  question: 'What year was the Corvette first introduced?',
  answers: ["1953", "1943", "1963", "1973"],
  correctAnswer: "1953",
  
}, {
  question: 'What was the first car to be mass-produced?',
  answers: ["Model A", "Packard", "Duryea Motor Wagon", "Model T"],
  correctAnswer: "Model T",
  
}, {
  question: 'What kind of car did Starsky and Hutch drive in the classic television series?',
  answers: ["Ford Bronco", "Ford Thunderbird", "Ford Gran Torino", "Ford Ranger"],
  correctAnswer: "Ford Gran Torino",
  
}, {
  question: "How much horse power did the first Porsche 911 have?",
  answers: ["130 HP", "35 HP", "90 HP", "180 HP"],
  correctAnswer: "130 HP",
  
}, {
  question: "What was the first commercially available hybrid gasoline-electric car in the United States?",
  answers: ["Ford Escape Hybrid", "Toyota Prius", "Honda Insight", "Saturn Vue"],
  correctAnswer: "Honda Insight",
  
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
   
    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
