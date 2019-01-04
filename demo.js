// Demo app to show how to use Deck Of Cards module

(function() {
  angular.module('cardDemo', ['DeckOfCards']);
  
  // create a controller to bind to the UI of the demo page
  angular
    .module('cardDemo')
    .controller('DemoController', DemoController);
  
  // inject the deckFactory from the DeckOfCards module into our controller
  DemoController.$inject = ['deckFactory'];
  
  function DemoController(deckFactory) {
    var self = this;
    
    // create a new deck of cards
    self.deck = deckFactory.createNewDeck();
    
    // an array to show cards that have been dealt
    self.dealt = [];
    
    // a proxy for the deck's shuffle
    self.shuffle = self.deck.shuffle;
    
    // expose a reset method to clear the board
    self.reset = reset;
    
    // expose functions to deal one or all cards
    self.dealOne = dealOne;
	
	self.sortCards = sortCards;
    
    function reset() {
      self.dealt = [];
      // puts the cards in order
	  arrCards = [];
      self.deck.reset();
    }
    
	var arrCards = [];
    function dealOne() {
      // get a card from the deck
      var nextCard = self.deck.dealOneCard();
      if (nextCard) {
        // add the card to the dealt array to bind to the UI
		arrCards.push(nextCard)
        self.dealt.push(nextCard);
      }
      return nextCard;
    }
	
	//Sort selected cards in descending order
	function sortArray(a,b) {
		return ((a.priority > b.priority) ? -1 : ((a.priority < b.priority) ? 1 : 0));
	}
	
	//Sort cards as per type and value
	function sortCards() {
		var sortedCards = [];
		var clubs = [];
		var spades = [];
		var hearts = [];
		var diamonds = [];
		arrCards.sort(sortArray);
		arrCards.forEach(function(card) {
			if(card.suit.name == 'Clubs') {
				clubs.push(card);
			}
			if(card.suit.name == 'Spades') {
				spades.push(card);
			}
			if(card.suit.name == 'Hearts') {
				hearts.push(card);
			}
			if(card.suit.name == 'Diamonds') {
				diamonds.push(card);
			}
		  });
		sortedCards = [clubs, spades, hearts, diamonds];
		self.dealt = [];
		self.dealt = [].concat.apply([], sortedCards);		
	}
  }
  
})();
