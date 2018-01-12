/***************************************************************************************************
 * Game
 * @params {undefined}
 * @returns: {undefined} none
 * creates game instance, prompts user for number of players, call FillDeck ,
 */

function Game() {
    this.players = [];
    this.rounds = 0;
    this.totalRounds = 15;
    var drawPile;
    var discardPile;
    this.initializeGame = function () {
        var playerCount = prompt('How many players? Pick a number from 1 to 4.');
        playerCount = parseInt(playerCount);
        drawPile = new DrawPile();
        discardPile = new Discard();
        drawPile.createDeck(); //fill DrawPil with all 52 cards
        this.createPlayers(playerCount); //create all player objects
        this.playGame(); //begin the game
    };
    this.createPlayers = function (number) {
        for (var playerNumber = 0; playerNumber < number; playerNumber++) {
            player = new Player(); //create new player
            player.draw(3); //have player fill hand with 3 cards
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
    this.initializeGame();
}

/***************************************************************************************************
 *Player
 */
function Player(name) {

    this.hand = [];

    this.playerTurn = function () {
        console.log(this.hand);
        var cardsToRemove = prompt("Choose your cards to remove");
        this.discardCards(cardsToRemove);
        this.draw(cardsToRemove.length);
    };

    this.receiveCards = function (cards) {
        this.hand = this.hand.concat(cards);
    };

    this.discardCards = function (cards) {
        discardPile.receiveCards(cards);
    };

    this.draw = function (numberOfCards) {
        drawPile.dealCard(this, numberOfCards);
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
        for (var createDeckIndex = 1; createDeckIndex <= 52; createDeckIndex++) {
            deckOfCards.push(createDeckIndex);
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
        this.deckOfCards.splice(0, numberOfCards);
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

/***************************************************************************************************
 * Discard
 */
function Discard(name) {
    this.discardPile = [];
    this.receiveCards = function (receivedCards) {
        //receive cards from player add them to discard
        this.discardPile.concat(receivedCards);
    };
    this.sendToDraw = function (cardsToSend) {
        drawPile.rebuildDeck(cardsToSend);
        this.discardPile.splice(1, discardPile.length-1);
    };
}
