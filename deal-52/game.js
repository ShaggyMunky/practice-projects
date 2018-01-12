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

