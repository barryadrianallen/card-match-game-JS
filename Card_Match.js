const imgTagList = document.getElementsByTagName("img");  
let index = [];
let userCardNumber = 0;
let card1Index;
let card2Index;

var View = {
    revealCard1: (card)=> {
        imgTagList[card].src = Model.cardURL[shuffledIndexArray[card]];
        Model.firstCardUrl = Model.cardURL[shuffledIndexArray[card]];
        card1Index = card;
        userCardNumber++;
    },
    revealCard2: (card)=> {
        imgTagList[card].src = Model.cardURL[shuffledIndexArray[card]];
        Model.secondCardUrl = Model.cardURL[shuffledIndexArray[card]];
        card2Index = card;
        userCardNumber++;
    },
    hideCards: ()=> {
        imgTagList[card1Index].src = "Cards_png/blue_back.png";
        imgTagList[card2Index].src = "Cards_png/blue_back.png";
    },
    removeCards: ()=> {
        imgTagList[card1Index].src = "Cards_png/red_back.png";
        imgTagList[card2Index].src = "Cards_png/red_back.png";
    }
}

var Model = {
    cardsRemaining: 18,
    cardURL: ["Cards_png/AS.png", "Cards_png/AS.png", 
                "Cards_png/AC.png", "Cards_png/AC.png", "Cards_png/AD.png", 
                "Cards_png/AD.png", "Cards_png/AH.png", "Cards_png/AH.png",
                "Cards_png/KS.png", "Cards_png/KS.png", "Cards_png/KC.png",
                "Cards_png/KC.png", "Cards_png/KD.png", "Cards_png/KD.png",
                "Cards_png/KH.png", "Cards_png/KH.png", "Cards_png/QS.png",
                "Cards_png/QS.png"],
    shuffledCardUrls: [],
    firstCardUrl: "",
    secondCardUrl: ""
}

var Controller = {
    checkForMatch: ()=> {
        if (Model.firstCardUrl == Model.secondCardUrl){
            View.removeCards();
            userCardNumber = 0;
            Model.cardsRemaining -= 2;
            checkGameState();
        }
        else{
            View.hideCards();
            userCardNumber = 0;
        }
    }
}

let init = ()=> {
    shuffleCardFilePaths();
}

window.onload = init;

let indexArray = initializeIndexArray(index);
function initializeIndexArray(array){
    for (let i=0; i<Model.cardURL.length; i++){
        array.push(i);
    }
    return array;
}

let shuffledIndexArray = shuffleArray(indexArray);
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];        
    }
    return array;
}

let pickCard = (cardNumber)=> {
    
    if(userCardNumber == 0){
        View.revealCard1(cardNumber);
    }
    else if(userCardNumber == 1){
        View.revealCard2(cardNumber);
        setTimeout(Controller.checkForMatch, 800);
    }
    else{
        return;
    }
}

let shuffleCardFilePaths = ()=> {
    for (let i=0; i<shuffledIndexArray.length; i++){
        Model.shuffledCardUrls.push(Model.cardURL[shuffledIndexArray[i]]);
    }
}

let checkGameState = ()=> {
    if (Model.cardsRemaining == 0){
        let reset = window.confirm("Game Over: Play again?");
        if (reset){
            resetGame();
        }
        else{
            return;
        }
    }
    else{
        return;
    }
}

let resetCards = ()=> {
    for(let i=0; i<imgTagList.length; i++){
        imgTagList[i].src = "Cards_png/blue_back.png";
    }
}

let resetGame = ()=> {
    index = [];
    indexArray = initializeIndexArray(index);
    shuffledIndexArray = shuffleArray(indexArray);
    userCardNumber = 0;
    card1Index = 0;
    card2Index = 0;
    resetCards();
    shuffleCardFilePaths();
}