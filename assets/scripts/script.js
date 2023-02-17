const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";
const FLIP = "flip";


startGame()

function startGame() {
    let cards = game.createCardsFromTechs();
    initializeCards(cards)


}
function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
     gameBoard.innerHTML = "";
    cards.forEach(card => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;
        createCardContent(card, cardElement);

        cardElement.addEventListener("click", flipCard);
        gameBoard.appendChild(cardElement);
    })

}


function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);




}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement("div");
    cardElementFace.classList.add(face);
    if (face === FRONT) {
        let iconElement = document.createElement("img");
        iconElement.classList.add(ICON)
        iconElement.src = `./assets/imagens/${card.icon}.png`;
        cardElementFace.appendChild(iconElement);

    } else {
        cardElementFace.innerHTML = "&lt/&gt"
    }

    element.appendChild(cardElementFace);

}


function flipCard() {

    if (game.setCard(this.id)) {

        this.classList.add(FLIP)

        if (game.secondCard) {

            if (game.checkMatch()) {

                game.clearCards();
                if (game.checkGameOver()) {
                  let gameOverLayer = document.getElementById("gameOver")
                  gameOverLayer.style.display = "flex"
                };

            } else {

                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove(FLIP)
                    secondCardView.classList.remove(FLIP)
                    game.unflipCard();
                }, 1000);



            }
        }
    }
}

function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver")
    gameOverLayer.style.display = "none"



}