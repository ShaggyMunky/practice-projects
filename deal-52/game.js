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
