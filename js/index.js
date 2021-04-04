//variables
var playerScore = 0;
var dealerScore = 0;
var cardDeck = []; 
var winScore = 0; 
var lossScore = 0; 
var drawScore = 0; 
var commentatorText = "Play";
var deckLength = cardDeck.length;
var playerTurns = 0;
var blinkID = 0;

//target elements
var playerCardsElement = document.querySelector("#playerCard");
var dealerCardsElement = document.querySelector("#dealerCard");
var winElement = document.querySelector("#win");
var lossElement = document.querySelector("#loss");
var drawlement = document.querySelector("#draw");
var commentatorElement = document.querySelector("#commentator");
var playerScoreElement = document.querySelector("#pscore");
var dealerScoreElement = document.querySelector("#dscore");
var hitButton = document.querySelector("#hit");
var standButton = document.querySelector("#stand");
var dealButton = document.querySelector("#deal");

//functions
var blink = ()=>{
    hitButton.removeAttribute("onclick", "hit()");
    hitButton.classList.add("disabled");
    standButton.removeAttribute("onclick", "stand()");
    standButton.classList.add("disabled");
    blinkID = setInterval(()=>{
        commentatorElement.classList.toggle("invisible");
    },1000)
}
var restart = ()=>{
    restartcardDeck();
    hitButton.setAttribute("onclick" , "hit()");
    standButton.setAttribute("onclick" , "stand()");
    dealButton.setAttribute("onclick" , "deal()");
    hitButton.classList.remove("disabled");
    standButton.classList.remove("disabled");
    playerScore = 0;
    dealerScore = 0;
    playerScoreElement.innerText = "Player";
    dealerScoreElement.innerText = "Dealer";
    commentatorText = "Play";
    commentatorElement.innerText = commentatorText;
    deckLength = cardDeck.length;
    playerTurns = 0;
    if(blinkID != 0)clearInterval(blinkID); 
    blinkID = 0;
    playerCardsElement.innerText="";
    dealerCardsElement.innerText="";


}
var restartcardDeck = ()=>{
    for(let i = 1 ; i <= 52 ; i++){
        cardDeck.push(i);
    }
    deckLength = cardDeck.length;
}

var cardImgMaker = (num)=>{
    let imgText = `<img src="./img/${num}.png">`
    return imgText;
}
var cardPicker = ()=>{
    let num = Math.floor((Math.random()*100));
    num %= deckLength;
    let ret = cardDeck[num];
    cardDeck.splice(num,1);
    deckLength = cardDeck.length;

    return ret;
}

var hit = ()=>{
    playerTurns++;
    let cardPick = cardPicker();
    var cardImgElement  = cardImgMaker(cardPick);
    playerCardsElement.insertAdjacentHTML("beforeend", cardImgElement);
    let tempScore = cardPick%13;
    if(tempScore == 0 || tempScore == 11 || tempScore == 12) tempScore = 10;
    else if(tempScore == 1){
        tempScore = parseInt(prompt("you have got an ace Card. Which value do you want to have 1 or 11."));
        while(tempScore > 1 && tempScore < 11){
            alert("You can choose 1 or 11 only");
            tempScore = parseInt(prompt("you have got an ace Card. Which value do you want to have 1 or 11."));
        }
    }
    playerScore += tempScore;
    playerScoreElement.innerText = `Player: ${playerScore}`;
    if(playerTurns == 2 && playerScore == 21){
        commentatorText = "BLACKJACK";
        commentatorElement.innerText = commentatorText;
        hitButton.removeAttribute("onclick", "hit()");
        hitButton.classList.add("disabled")
    }
    if(playerScore > 21){
        commentatorText = "BUST";
        commentatorElement.innerText = commentatorText;
        
        lossScore++;
        lossElement.innerText = lossScore;
        blink();
    }
}
var stand = ()=>{
    hitButton.removeAttribute("onclick", "hit()");
    hitButton.classList.add("disabled");
    standButton.removeAttribute("onclick", "stand()");
    standButton.classList.add("disabled");
    let id = setInterval(()=>{
        let cardPick = cardPicker();
        var cardImgElement = cardImgMaker(cardPick);
        dealerCardsElement.insertAdjacentHTML("beforeend" , cardImgElement);
        let tempScore = cardPick%13;
        if(tempScore == 0 || tempScore == 11 || tempScore == 12) tempScore = 10;
        else if(tempScore == 1){
            if(dealerScore+11 < 18) tempScore = 11;
            else tempScore = 1;
        }
        dealerScore += tempScore;
        dealerScoreElement.innerText = `Dealer: ${dealerScore}`;
        if(dealerScore > playerScore || dealerScore > 17){
            clearInterval(id);
        }
    },1000);
    if(dealerScore < playerScore || dealerScore > 21){
        commentatorText = "YOU WIN";
        commentatorElement.innerText = commentatorText;
        winScore++;
        winElement.innerText = winScore;
    }else if(dealerScore == playerScore){
        commentatorText = "DRAW";
        commentatorElement.innerText = commentatorText;
        drawScore++;
        drawlement.innerText = drawScore;
    }else{
        commentatorText = "YOU LOSS";
        commentatorElement.innerText = commentatorText;
        lossScore++;
        lossElement.innerText = lossScore;
    }
}
var deal = ()=>{
    restart();
}
restart();