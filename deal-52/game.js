/***************************************************************************************************
 * Game
 * @params {undefined}
 * @returns: {undefined} none
 * creates game instance, prompts user for number of players, call FillDeck ,
 */
$(document).ready(initialize);

var game;

function initialize(){
  game = new Game();
  game.initializeGame();
}


function Game() {
    this.players = [];
    this.rounds = 0;
    this.totalRounds = 15;
    this.initializeGame = function () {
        var playerCount = prompt('How many players? Pick a number from 1 to 4.');
        playerCount = parseInt(playerCount);
        this.drawPile = new DrawPile();
        this.discardPile = new Discard();
        this.drawPile.createDeck(); //fill DrawPil with all 52 cards
        this.createPlayers(playerCount); //create all player objects
        console.log(this.players)
        this.playGame(); //begin the game
    };
    this.createPlayers = function (number) {
        for (var playerNumber = 0; playerNumber < number; playerNumber++) {
            player = new Player(); //create new player
            player.draw(3); //have player fill hand with 3 cards
            player.name = "player" + playerNumber;
            this.players.push(player); //push player to array
        }
    };
    this.playGame = function () {
        while (this.rounds < this.totalRounds) {
            for (var player = 0; player < this.players.length; player++) {
                this.players[player].playerTurn(); //call function of current player to begin turn
            }
            this.rounds++;
        }
        this.getWinner();
    };
    this.getWinner = function(){
      //loop through each player, keep track of who has the highest
      var currentWinner;
      var winnerScore = 0;
      for(var player = 0 ; player < this.players.length ; player++){
        var playerHand = this.players[player].hand;
        var sum = 0;
        for(var cardIndex = 0 ; cardIndex < playerHand.length; cardIndex++){
          sum += playerHand[cardIndex];
        }
        if(sum > winnerScore){
          winnerScore = sum;
          currentWinner = this.players[player];
        }
      }
      console.log(currentWinner.name + ' wins with a score of ' + winnerScore + "!");
    }
}

/***************************************************************************************************
 *Player
 */
function Player() {

    this.hand = [];

    this.playerTurn = function () {
        console.log(this.hand);
        var cardsToRemove = prompt("Choose your cards to remove").split(',');
        for(var i = 0; i < cardsToRemove.length ; i++ ){
            if(this.hand.indexOf(parseInt(cardsToRemove[i])) !== -1){
                this.hand.splice(this.hand.indexOf(parseInt(cardsToRemove[i])),1);
            }
        }
        this.discardCards(cardsToRemove);
        console.log(this.hand);
        console.log('Discard Pile:'+ game.discardPile.discardPile);
    };

    this.receiveCards = function (cards) {
        this.hand = this.hand.concat(cards);
    };

    this.discardCards = function (cards) {
        game.discardPile.receiveCards(cards);
        this.draw(cards.length);
    };

    this.draw = function (numberOfCards) {
        game.drawPile.dealCard(this, numberOfCards);
    };
}

/***************************************************************************************************
 * DrawPile
 */
 function DrawPile() {
     /***********
      * This is the updated DrawPile
      *
      **********/
     this.deckOfCards = [];
     this.createDeck = function () {
         for (var createDeckIndex = 1; createDeckIndex <= 4; createDeckIndex++) {
             for( var i = 1; i <= 13 ; i++){
                 this.deckOfCards.push(i);
             }
         }
         this.shuffleDeck();
     };
     this.dealCard = function (sender, numberOfCards) {
         var cardArray = [];
         console.log("Sender: " + sender + "Number of Cards: " + numberOfCards);
         for (var i = 0; i < numberOfCards; i++) {
             if (this.deckOfCards.length === 0) {
                 game.discardPile.sendToDrawPile();
             }
             cardArray.push(this.deckOfCards[i]);
         }
         this.deckOfCards.splice(0, numberOfCards);
         sender.receiveCards(cardArray);
     };
     this.rebuildDeck = function (array) {
         this.deckOfCards = array;
         this.shuffleDeck();
         console.log(this.deckOfCards);
     };
     this.shuffleDeck = function () {
         for (var i = this.deckOfCards.length - 1; i > 0; i--) {
             var j = Math.floor(Math.random() * (i + 1));
             var temp = this.deckOfCards[i];
             this.deckOfCards[i] = this.deckOfCards[j];
             this.deckOfCards[j] = temp;
         }
     }
}

/***************************************************************************************************
 * Discard
 */
function Discard() {
    this.discardPile = [];
    this.receiveCards = function (receivedCards) {
        //receive cards from player add them to discard
        this.discardPile = this.discardPile.concat(receivedCards);
    };
    this.sendToDrawPile = function () {
      //make a copy of current array
      //send to draw pile
      //discard set to empty array
        game.drawPile.rebuildDeck(this.discardPile);
        this.discardPile = [];

    };
}
