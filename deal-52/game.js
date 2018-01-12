/**
*Player
*/
function Player(name){
    this.hand = [];
    this.playerTurn = function(){
      console.log(this.hand);
      var cardsToRemove = prompt("Choose your cards to remove");
    };
    this.recieveCards = function (cards){
        this.hand = this.hand.concat(cards);
    };
    this.sendCards = function(target){

    };
}
/***************************************************************************************************
* Game
* @params {undefined}
* @returns: {undefined} none
* creates game instance, prompts user for number of players, call FillDeck ,
*/

function Game(){
  var players = [];
  var rounds = 0;
  var totalRounds = 15;
  this.initializeGame = function(){
    var playerCount = prompt('How many players? Pick a number from 1 to 4.');
    playerCount = parseInt(playerCount);
    DrawPile.fillDeck(); //fill DrawPil with all 52 cards
    this.createPlayers(playerCount); //create all player objects
    this.playGame(); //begin the game
  }
  this.createPlayers = function(number){
    for(var playerNumber = 0 ; playerNumber < number ; playerNumber++){
      player = new Player(); //create new player
      player.receiveCard(3); //have player fill hand with 3 cards
      this.players.push(player); //push player to array
    }
  }
  this.playGame = function(){
    while(this.rounds < this.totalRounds){
      for(var player = 0 ; player < players.length ; players++){
        this.players[player].beginTurn(); //call function of current player to begin turn
      }
    }
  }

  function Discard(name){
    this.discardPile = [];
    this.receiveCards = function(receivedCards){
        //receive cards from player add them to discard
        discardPile.concat(receivedCards);
    };
    this.sendToDraw = function(cardsToSend){
        var deck = this.discardPile.slice();
        this.discardPile = [];
        return deck;
    };
}