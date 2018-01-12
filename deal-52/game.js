/***************************************************************************************************
 * Game
 * @params {undefined}
 * @returns: {undefined} none
 * creates game instance, prompts user for number of players, call FillDeck ,
 */

function Game(){
    this.players = [];
    this.rounds = 0;
    this.totalRounds = 15;
    var drawPile;
    var discardPile;
    this.initializeGame = function(){
        var playerCount = prompt('How many players? Pick a number from 1 to 4.');
        playerCount = parseInt(playerCount);
        drawPile = new DrawPile();
        discardPile = new Discard();
        drawPile.createDeck(); //fill DrawPil with all 52 cards
        this.createPlayers(playerCount); //create all player objects
        this.playGame(); //begin the game
    };
    this.createPlayers = function(number){
        for(var playerNumber = 0 ; playerNumber < number ; playerNumber++){
            player = new Player(); //create new player
            player.drawCard(3); //have player fill hand with 3 cards
            this.players.push(player); //push player to array
        }
    };
    this.playGame = function(){
        while(this.rounds < this.totalRounds){
            for(var player = 0 ; player < players.length ; players++){
                this.players[player].beginTurn(); //call function of current player to begin turn
            }
        }
    };
    this.initializeGame();
}
/***************************************************************************************************
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
 * DrawPile
 */
function DrawPile() {

    /***************************************
     * array of cards
     * create deck
     * deal card to player
     * receive cards from discard
     * shuffle deck
     */
    this.deckOfCards = [];

    function Card(value , suit){
        this.value = value;
        this.suit  = suit;
    }

    this.createDeck = function () {
        for (var createDeckIndex = 1; createDeckIndex <= 52; createDeckIndex++) {
            deckOfCards.push(createDeckIndex);
        }
        console.log(deckOfCards);
    };

    this.dealCard = function (sender, numberOfCards) {
        console.log("Sender: " + sender + "Number of Cards: " + numberOfCards);
        for (var i = 0; i < numberOfCards; i++) {
            if(deckOfCards.length>0){
                this.rebuildDeck();
            }
            sender.receiveCards(deckOfCards[i]);
        }
    };

    this.rebuildDeck = function (array){
        deckOfCards = this.shuffleDeck(array);
        console.log(deckOfCards);
    };

    this.shuffleDeck = function(array){
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }


}

/***************************************************************************************************
 * Discard
 */
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
