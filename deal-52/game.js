function DrawPile() {

    /***************************************
     * array of cards
     * create deck
     * deal card to player
     * receive cards from discard
     * shuffle deck
     */
    this.deckOfCards = [];

    function Card(value, suit, numVal) {
        this.value = value;
        this.suit = suit;
        this.numVal = numVal;
    }

    this.createDeck = function () {
        for (var createDeckIndexO = 1; createDeckIndexO <= 4; createDeckIndexO++) {
            for( var createDeckIndexI = 1 ; createDeckIndexI <=12 ; createDeckIndexI++){
                if(createDeckIndexI = 1){
                    var card = new Card('Ace', '');
                }


                var card = new Card();
                deckOfCards.push(createDeckIndex);
            }
        }
        console.log(deckOfCards);
    };

    this.dealCard = function (sender, numberOfCards) {
        var cardArray = [];
        console.log("Sender: " + sender + "Number of Cards: " + numberOfCards);
        for (var i = 0; i < numberOfCards; i++) {
            if (deckOfCards.length > 0) {
                this.rebuildDeck();
            }
            cardArray.push(deckOfCards[i]);
        }
        sender.receiveCards(cardArray);
    };

    this.rebuildDeck = function (array) {
        deckOfCards = this.shuffleDeck(array);
        console.log(deckOfCards);
    };

    this.shuffleDeck = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }


}

var drawPile = new DrawPile();


/*****************************************************
 *Player
 */
function Player(name) {

    this.hand = [];

    this.playerTurn = function () {
        console.log(this.hand);
        var cardsToRemove = prompt("Choose your cards to remove");
        this.draw(cardsToRemove);
    };

    this.receiveCards = function (card) {
        this.hand = this.hand.concat(card);
    };

    this.discardCards = function (target) {
        discardPile.
    };

    this.draw = function(numberOfCards){
        drawPile.dealCard(this, numberOfCards);
    };
}

/***************************************************************************************************
 * Game
 * @params {undefined}
 * @returns: {undefined} none
 * creates game instance, prompts user for number of players, call FillDeck ,
 */

function Game() {

    var players = [];
    var rounds = 0;
    var totalRounds = 15;

    this.initializeGame = function () {
        var playerCount = prompt('How many players? Pick a number from 1 to 4.');
        playerCount = parseInt(playerCount);
        drawPile.fillDeck(); //fill DrawPil with all 52 cards
        this.createPlayers(playerCount); //create all player objects
        this.playGame(); //begin the game
    };

    this.createPlayers = function (number) {
        for (var playerNumber = 0; playerNumber < number; playerNumber++) {
            player = new Player(); //create new player
            player.receiveCard(3); //have player fill hand with 3 cards
            this.players.push(player); //push player to array
        }
    };

    this.playGame = function () {
        while (this.rounds < this.totalRounds) {
            for (var player = 0; player < players.length; players++) {
                this.players[player].beginTurn(); //call function of current player to begin turn
            }
        }
    };

    function Discard(name) {
        this.discardPile = [];
        this.receiveCards = function (receivedCards) {
            //receive cards from player add them to discard
            discardPile.concat(receivedCards);
        };
        this.sendToDraw = function (cardsToSend) {
            var deck = this.discardPile.slice();
            this.discardPile = [];
            return deck;
        };
    };
}