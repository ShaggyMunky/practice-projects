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

var drawPile = new DrawPile();
