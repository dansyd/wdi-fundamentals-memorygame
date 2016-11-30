// -- FUNCTIONS -- //


//Uses Math.random to create a new random card position for every game
function randomCards() {
	var newCards = [];
	var randomCard;
	var queenCounter = 0;
	var kingCounter = 0;
	for (var i=0; i<4; i++) {
		randomCard = Math.floor((Math.random() * 2) + 1);
		
		//if Math.random generates 1, then it's a queen, if it generates a 2 it's a king
		if (randomCard === 1) {
				newCards[i] = "queen";
				queenCounter++;
		} else {
				newCards[i] = "king";
				kingCounter++;
		}

		//If I have 2 queens already, I check if it's the 2nd or 3rd cards that's been generated
		if (queenCounter===2) {
			
			//If it's the 2nd, I already have a pair of queens, so the other 2 cards will be 2 kings -> exit from loop
			if (i===1) {
				newCards[2] = "king";
				newCards[3] = "king";
				break;
			} else  //If it's the 3rd, I already have a pair of queens, so the last card will be a king -> exit from loop
				{
					newCards[3] = "king";
					break;
			  	}
		}	
		//If I have 2 kings already, I check if it's the 2nd or 3rd cards that's been generated
		if (kingCounter===2) {

			//If it's the 2nd, I already have a pair of kings, so the other 2 cards will be 2 queens -> exit from loop
			if (i===1) {
				newCards[2] = "queen";
				newCards[3] = "queen";
				break;
			} else  //If it's the 3rd, I already have a pair of kings, so the last card will be a queen -> exit from loop
				{
					newCards[3] = "queen";
					break;
			  	}
		}	
	}
	//Return the cards to the global cards variable
	return newCards; 
}


//Function to reset the board with new random cards
function resetBoard() {
 	while (board.hasChildNodes()) {
 		board.removeChild(board.firstChild)
 	}
	cards = randomCards();	
	createBoard();
}

function resetScore () {
	document.getElementById("wonGamesResult").innerHTML = 0;
	document.getElementById("lostGamesResult").innerHTML = 0;
	lostGamesCounter=0;
	wonGamesCounter=0;
}

//Check if 2 cards are a match
function isMatch(cards) {
	if (cards[0] === cards[1]) {
		alert("You found a match!");
		
		//Increase the counter for games won and set the span
		wonGamesCounter++;
		document.getElementById("wonGamesResult").innerHTML = wonGamesCounter;
		
		//Reset the board with new random cards - set Timeout to show the cards for 2 seconds
		setTimeout(resetBoard, 2000);
	} else {
		alert("Sorry, you lost.");

		//Increase the counter for games lost and set the span
		lostGamesCounter++;
		document.getElementById("lostGamesResult").innerHTML = lostGamesCounter;

		//Reset the board with new random cards - set Timeout to show the cards for 2 seconds
		setTimeout(resetBoard, 2000);
	  }
}

//checks to see if there are cards in play
function isTwoCards() {

  // add card to array of cards in play
  // 'this' hasn't been covered in this prework, but
  // for now, just know it gives you access to the card the user clicked on
  cardsInPlay.push(this.getAttribute('data-card'));

  //Create the image tag of the queen or king based on the attribute data-card assigned when the div card was generated
  if (this.getAttribute('data-card') === "queen") {
  	this.innerHTML = '<img src="queen.png" alt="queen" />';
  } else this.innerHTML = '<img src="king.png" alt="king" />';

  // if you have two cards in play check for a match
  if (cardsInPlay.length === 2) {

    // pass the cardsInPlay as an argument to isMatch function
    isMatch(cardsInPlay);

    // clear cards in play array for next try
    cardsInPlay = [];
  }
}


function createBoard() {
	//Using the global board variable (container), I create the divs for the cards
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('div');
		cardElement.className = 'card';
		cardElement.setAttribute('data-card', cards[i]);
		// when a card is clicked the function isTwoCards will be executed
	    cardElement.addEventListener('click', isTwoCards);
	    board.appendChild(cardElement);
	    //I will show the cards at the start of the game for 1 second
	    showCard(cardElement);
	}
	//I will hide the cards after 1 second
  	setTimeout(hideCards, 1000);	
}

function showCard(card) {
	if (card.getAttribute('data-card') === "queen") {
  		card.innerHTML = '<img src="queen.png" alt="queen" />';
  	} else card.innerHTML = '<img src="king.png" alt="king" />';
}

function hideCards() {
	var cardsToHide = document.getElementsByClassName('card');
	console.log(cardsToHide);
	for (var i = 0; i < cardsToHide.length; i++) {
		cardsToHide[i].innerHTML = "";
	}
}

// -- END FUNCTIONS -- //





document.getElementById('resetScore').addEventListener('click', resetScore);

var cards = randomCards();

//Create empty array to be filled dinamically
var cardsInPlay = [];

//Counters to keep track of won and lost games
var wonGamesCounter = 0;
var lostGamesCounter = 0;

var board = document.getElementById('game-board');
createBoard();
