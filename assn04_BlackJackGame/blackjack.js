/* Irving Alvarez */

// Constants
bankroll = 500000;
bet = 0;
prize = 0;

dealer = $("#dealer-hand");
player = $("#player-hand");

playerScore = 0;
dealerScore = 0;

hiddenCard = null;

// Initial state
$("#hit, #stand").attr("disabled", "true");

// Cards for the game
deck = [
    'empty', 'cardback',
    '2C', '2D', '2H', '2S',
    '3C', '3D', '3H', '3S',
    '4C', '4D', '4H', '4S',
    '5C', '5D', '5H', '5S',
    '6C', '6D', '6H', '6S',
    '7C', '7D', '7H', '7S',
    '8C', '8D', '8H', '8S',
    '9C', '9D', '9H', '9S',
    'TC', 'TD', 'TH', 'TS',
    'AC', 'AD', 'AH', 'AS',
    'JC', 'JD', 'JH', 'JS',
    'KC', 'KD', 'KH', 'KS',
    'QC', 'QD', 'QH', 'QS',
]
dealtCards = [];
blackjack1 = blackjack2 = false;
stand = false;

// Start the game
$("#start-deal").on("click", function(){

    // Validate amount
    if(validBet($(this))){

        bet = $(this).prev().val();

        hiddenCard = getRandomCard(); // dealer's hidden card
        c1 = c2 = null;

        dealCard(player, c1=getRandomCard());
        dealCard(player, c2=getRandomCard());
        dealCard(dealer, 1);
        dealCard(dealer, getRandomCard());

        // Check for BlackJack
        questionBlackJack(c1, c2);

        $(this).attr("disabled", "true");
        $("#hit, #stand").removeAttr("disabled");

        gameState();
    }

});

// Player hits
$("#hit").on("click", function(){

    dealCard(player, getRandomCard());

});

// Player stands
$("#stand").on("click", function(){

    stand = true;

    // Show hidden dealer card
    c = deck[hiddenCard];
    dealer.find("img[src='images/cardback.png']").attr("src", "images/"+c+".png");
    
    // Update dealer's score
    updateScore(dealer, deck[hiddenCard]);
    while(dealerScore < 17)
        dealCard(dealer, getRandomCard());

});

// Deal a card to the player or dealer
function dealCard(p, cid){

    // Get clone to add new card
    card = p.find("#card-template").clone();
    card.addClass("hand animated zoomInUp")
    .attr({
        "id": "",
        "src": "images/"+deck[cid]+".png",
    });

    // Add card to appropiate hand
    if(p.attr("data-p") == "dealer")
        card.insertBefore(".hand-p1");

    if(p.attr("data-p") == "player")
        card.insertBefore(".hand-p2");

    updateScore(p, deck[cid]);
}

// Get a random card(index) from the deck(list) and return it
function getRandomCard(){

    if(dealtCards.length < 52){

        // Get a random index(a card id)
        i = Math.floor((Math.random() * 52) + 2);

        // Check if card has been dealt
        found = dealtCards.find(function(element){
            return element == i;
        })

        // Push to dealt cards if new card
        if(!found)
            dealtCards.push(i);
        // Else get another card
        else{
            while(found){
                i = Math.floor((Math.random() * 52) + 2);
                found = dealtCards.find(function(element){
                    return element == i;
                })
            }
            dealtCards.push(i);
        }

        return i;
    }
    else
        $("#start-deal").attr("disabled", "true");

}

// Update the player's or dealer's score
function updateScore(p, c){

    cardVal = 0;

    // Get card value
    if(c != 'cardback'){ // Ugly

        if(c[0] == "A")
            cardVal = 11;
        else if(c[0] == "J" || c[0] == "K" || c[0] == "Q" || c[0] == "T")
            cardVal = 10;
        else
            cardVal = parseInt(c[0]);
    }
    
    // Add card value to player/dealer
    if(p.attr("data-p") == "dealer")
        dealerScore += cardVal;        

    else if(p.attr("data-p") == "player")
        playerScore += cardVal;

    gameState();

}

// Check the state of the game
// Declare victory or loss
function gameState()
{
    elem = $("#game-message");
    msg = ["BlackJack! You win!", "Game Over: You win!", "Game Over: You loose!", "Game Over: Tie!", "Money won: ", "Money lost: "]
    gameOver = false;

    if(hasBlackJack()){
        prize = bet * 1.5;
        elem.find("h1").addClass("grandprize-pulse").text(msg[0]).css("color", "yellow");
        elem.find("p").text(msg[4] + "$" + prize);
        gameOver = true;
    }
    else if(dealerScore > 21){
        prize = bet;
        elem.find("h1").text(msg[1]).css("color", "yellow");
        elem.find("p").text(msg[4] + "$" + prize);
        gameOver = true;
    }
    else if(playerScore > 21){
        prize = bet * -1;
        elem.find("h1").text(msg[2]).css("color", "red");
        elem.find("p").text(msg[5] +  "$" + prize);
        gameOver = true;
    }
    else if(stand && (playerScore > dealerScore)){
        prize = bet;
        elem.find("h1").text(msg[1]).css("color", "yellow");
        elem.find("p").text(msg[4] + "$" + prize);
        gameOver = true;
    }
    else if(stand && (dealerScore > playerScore)){
        prize = bet * -1;
        elem.find("h1").text(msg[2]).css("color", "red");
        elem.find("p").text(msg[5] + "$" + prize);
        gameOver = true;
    }
    else if(stand && (playerScore == dealerScore)){
        prize = 0;
        elem.find("h1").text(msg[3]).css("color", "white");
        elem.find("p").text(msg[4] + "$" + prize);
        gameOver = true;
    }

    if(gameOver){
        $("#hit, #stand").attr("disabled", "true");
        elem.removeClass("d-none").addClass("animated bounceIn");
        $("#game-table").addClass("blur-out");
    }    
}

// Validate user's bet value
function validBet(dealbtn)
{
    playerBet = dealbtn.prev();

    if(!playerBet.val()){
        playerBet.val("Enter an amount").css("color", "red");
        return false;
    }
    else if(playerBet.val() > bankroll){
        playerBet.val("Not enough money!").css("color", "red");
        return false;
    }
    else if(isNaN(playerBet.val())){
        playerBet.val("Enter a number").css("color", "red");
        return false;
    }

    return true;
}

// Checks if player has blackjack!
function questionBlackJack(c1, c2)
{
    // c1, c2 are indexe's

    if((c1 >= 38 && c1 <= 41) || (c2 >= 38 && c2 <= 41))
        blackjack1 = true;
    if((c2 >= 42 && c2 <= 53) || (c1 >= 42 && c1 <= 53))
        blackjack2 = true;
}

// Return true if player has black jack
function hasBlackJack()
{
    return blackjack1 && blackjack2;
}

// Restart game (Reload page)
$(document).on("click", "#playagain", function(){

    window.location.reload(true);
        
});