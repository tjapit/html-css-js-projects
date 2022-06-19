/**
 * Blackjack script
 * @author Timothy Japit
 */
/* HTML elements */
/* message element */
const messageEl = document.getElementById('message');
/* card element */
const cardEl = document.getElementById('cards');
/* sum element */
const sumEl = document.getElementById('sum');
/* NEW CARD buton */
const newCardBtn = document.querySelector('.newcard-btn');

/* Variables */
/* initialize first and second card */
let cards = [];
/* initialize sum */
let sum = 0;
/* win state */
let hasBlackJack = false;
/* life state */
let isAlive = true;
/* display message */
let message = "";

/* functions */
/**
 * Starts the game
 */
function startGame() {
    // reset states
    cards = []
    hasBlackJack = false;
    isAlive = true;    
    // draw cards
    cards[0] = Math.floor(Math.random() * 10) + 2;
    cards[1] = Math.floor(Math.random() * 10) + 2;
    sum = cards.reduce((num1, num2) => num1 + num2, 0);
    // set cards
    setCards(cards);
    // assigning sum element text to sum of the two cards
    setSum(sum);
    // renders game
    renderGame();
}

/**
 * Renders the game
 */
function renderGame() {
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "Woohoo! You've got Blackjack!";
        hasBlackJack = true;
    } else {
        message = "You're out of the game!";
        isAlive = false;
    }

    // grey out the new card button when bust
    if (!isAlive || hasBlackJack) {
        newCardBtn.classList.add("grey-out");
    } else {
        newCardBtn.classList.remove("grey-out");
    }

    // message to HTML element
    setMessage(message);
}

/**
 * New card button
 */
function newCard() {
    if (sum < 21) {
        // new card
        let newCard = Math.floor(Math.random() * 10 + 2);
        // add to card array
        cards.push(newCard);
        // add to sum
        sum += newCard;
        // set new sum
        setSum(sum);
        // add new card to list of cards
        setCards(cards)
        // render game
        renderGame();
    } 
}


/**
 * Sets the message element to the given message
 * @param {String} message message to be displayed
 */
function setMessage(message) {
    messageEl.textContent = message;
}

/**
 * Sets all the cards
 * @param {int[]} cards array of cards in hand
 */
function setCards(cards) {
    cardEl.textContent = "Cards: ";
    cards.forEach(element => {
        cardEl.textContent += element + " ";
    });
}

/**
 * Sets the sum element to the sum of the cards
 * @param {int} sum sum of the cards
 */
function setSum(sum) {
    sumEl.textContent = "Sum: " + sum;
}