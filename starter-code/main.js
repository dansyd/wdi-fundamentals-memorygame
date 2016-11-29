//Create 4 card variables, 2 with queen and 2 with king

var cardOne = "queen";
var cardTwo = "queen";
var cardThree = "king";
var cardFour = "king";


// if (cardTwo === cardFour) {
// 	alert('You found a match!');
// } else alert('Sorry, try again.');

// function to create a new card (div)
var createCard = function() {
	var newCard = document.createElement('div');
	newCard.className = 'card';
	document.getElementById('game-board').appendChild(newCard);
}


var numberOfCard = prompt('how many cards would you like to play with?');
for (var i = 0; i < numberOfCard; i++) {
	createCard();
}


