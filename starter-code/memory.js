// //******************************************************************
// // Game Logic
// //******************************************************************
var MemoryGame = function() {
  this.cards = [
  		{ name: "aquaman",         img: "aquaman.jpg" },
  		{ name: "batman",          img: "batman.jpg" },
  		{ name: "captain america", img: "captain-america.jpg" },
  		{ name: "fantastic four",  img: "fantastic-four.jpg" },
  		{ name: "flash",           img: "flash.jpg" },
      { name: "green arrow",     img: "green-arrow.jpg" },
  		{ name: "green lantern",   img: "green-lantern.jpg" },
  		{ name: "ironman",         img: "ironman.jpg" },
  		{ name: "spiderman",       img: "spiderman.jpg" },
  		{ name: "superman",        img: "superman.jpg" },
  		{ name: "the avengers",    img: "the-avengers.jpg" },
  		{ name: "thor",            img: "thor.jpg" },
      { name: "aquaman",         img: "aquaman.jpg" },
  		{ name: "batman",          img: "batman.jpg" },
  		{ name: "captain america", img: "captain-america.jpg" },
      { name: "fantastic four",  img: "fantastic-four.jpg" },
  		{ name: "flash",           img: "flash.jpg" },
  		{ name: "green arrow",     img: "green-arrow.jpg" },
  		{ name: "green lantern",   img: "green-lantern.jpg" },
  		{ name: "ironman",         img: "ironman.jpg" },
  		{ name: "spiderman",       img: "spiderman.jpg" },
  		{ name: "superman",        img: "superman.jpg" },
  		{ name: "the avengers",    img: "the-avengers.jpg" },
  		{ name: "thor",            img: "thor.jpg" },
  	];
    this.selectedCards = [];
    this.pairsClicked = 0;
    this.correctPairs = 0;

    this._shuffleCards();
};

MemoryGame.prototype._shuffleCards = function() {
  this.cards.sort(function() {
    return Math.random() - 0.5;
  });
};

MemoryGame.prototype.selectCard = function(card) {

  card.removeClass("back").addClass("front");
  card.siblings().removeClass("front").addClass("back");

  if(this.selectedCards.length === 0){
    // Si es la primera carta
    this.selectedCards.push(card);
  }else{
    // Si es la segunda carta
    var previousCard = this.selectedCards[0];
    this.pairsClicked += 1;
    $("#pairs_clicked").text(this.pairsClicked);
    if(card.attr("name") === previousCard.attr("name")){
      // Si son las dos CARTAS IGUALES");
      this.selectedCards.splice(0, this.selectedCards.length);
      this.correctPairs += 1;
      $("#pairs_guessed").text(this.correctPairs);
      this.finished();
    }else{
      // Si son las dos cartas diferentes");
      this.selectedCards.splice(0, this.selectedCards.length);
      setTimeout(function(){
        card.removeClass("front").addClass("back");
        card.siblings().removeClass("back").addClass("front");
        previousCard.removeClass("front").addClass("back");
        previousCard.siblings().removeClass("back").addClass("front");
      }, 1500);
    }
  }
};


MemoryGame.prototype.finished = function() {
  if (this.correctPairs == 12){
    alert("FINISHED - Well done! Let's play again");
    window.location.reload();
  }
};


// //******************************************************************
// // HTML/CSS Interactions
// //******************************************************************



var memoryGame;

$(function(){
  memoryGame = new MemoryGame();
  var html = '';

  memoryGame.cards.forEach(function(pic, index) {
    var sanitizedName = pic.name.split(' ').join('_');

   html += '<div class= "card" name="card_' + sanitizedName + '">';
    html += '<div class="back"';
    html += '    name="' + pic.name + '">';
    html += '</div>';
    html += '<div class="front" ';
    html += 'style="background: url(img/' + pic.img + '") no-repeat"';
    html += '    name="'       + pic.name +  '">';
    html += '</div>';
    html += '</div>';
  });

  // Add all the divs to the HTML
  document.getElementById('memory_board').innerHTML = html;

  $('.back').on('click', function(){
    memoryGame.selectCard($(this));
  });


});
