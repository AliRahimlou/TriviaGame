$(document).ready(function () {
    console.log("ready!");

    var options = [
        {
            question: "What is the capital city of Spain?", 
            choice: ["Guatemala", "El Salvadore", "Peru", "Madrid"],
            answer: 3,
         },
         {
             question: "What popular soda beverage was originally developed as a mixer for whiskey?", 
            choice: ["Mountain Dew", "Sprite", "7-UP", "Coke"],
            answer: 0,
         }, 
         {
             question: "What is the world's longest river?", 
            choice: ["Mississippi", "Nile", "Amazon", "Long" ],
            answer: 2,
        }, 
        {
            question: "Name the only heavyweight boxing champion to finish his career of 49 fights without ever having been defeated?", 
            choice: ["Floyd Maywheather", "Mike Tyson", "Rocky Marciano", "Muhammed Ali" ],
            answer: 2,
        }, 
        {
            question: "What is the diameter of Earth?", 
            choice: [" 6,000 miles", "8,000 miles", "24,000 miles", "13,000 miles" ],
            answer: 1,
        }, 
        {
            question: "What is the most widely eaten fish in the world?", 
            choice: ["Tilapia", "Herring", "Sardine", "Tuna" ],
            answer: 1,
        }, 
        {
            question: "What color is Absynthe?", 
            choice: ["White", "Red", "Blue", "Green" ],
            answer: 3,
        }, 
        {
            question: "Name the seventh planet from the sun.", 
            choice: ["Uranus", "Pluto", "Earth", "Saturn" ],
            answer: 0,
        }];


        var correctCount = 0;
        var wrongCount = 0;
        var outOfTime = 0;
        var timer = 30;
        var intervalId;
        var userGuess ="";
        var running = false;
        var qCount = options.length;
        var pick;
        var questionPicked;
        var newArray = [];
        var holder = [];
        


        $("#reset").hide();

$("#start").on("click", function () {
		$("#start").hide();
		showQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
    holder.push(options[i]);
}
    })
    
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
function decrement() {
	$("#timer").html("<h2>Time remaining: " + timer + "</h2>");
	timer --;

	if (timer === 0) {
		outOfTime++;
		stopTimer();
        $("#answerOptions").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
        end()
	}	
}

function stopTimer() {
	running = false;
	clearInterval(intervalId);
}

function showQuestion() {
	questionPicked = Math.floor(Math.random()*options.length);
	pick = options[questionPicked];


		$("#questions").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<button></button>" + "<br>" + "<br>");
			userChoice.addClass("answerOptions");
			userChoice.html(pick.choice[i]);
			userChoice.attr("data-guessvalue", i);
			$("#answerOptions").append(userChoice);

}


$(".answerOptions").on("click", function () {
	userGuess = parseInt($(this).attr("data-guessvalue"));

	
	if (userGuess === pick.answer) {
		stopTimer();
		correctCount++;
		userGuess="";
        $("#answerOptions").html("<h4>Correct!</h4>");
        end()
        
		

	} else {
		stopTimer();
		wrongCount++;
		userGuess="";
		$("#answerOptions").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		end()
    }
   
    

})
}

function end(){
	newArray.push(pick);
	options.splice(questionPicked,1);

	setTimeout(function() {
		$("#answerOptions").empty();
        timer= 30;
        
    if ((wrongCount + correctCount + outOfTime) === qCount) {
		$("#questions").empty();
		$("#questions").html("<h3>Game Over!  YOUR STATS: </h3>");
		$("#answerOptions").append("<h3> Correct: " + correctCount + "</h3>" );
		$("#answerOptions").append("<h3> Incorrect: " + wrongCount + "</h3>" );
		$("#answerOptions").append("<h3> Unanswered: " + outOfTime + "</h3>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		outOfTime = 0;

	} else {
		runTimer();
        showQuestion();
        

    }
}, 2000);

}




$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerOptions").empty();
	$("#questions").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
    showQuestion();

    
    

})






})