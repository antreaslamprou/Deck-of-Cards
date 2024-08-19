// Create the Cards & Deck
let suit = [ "Clubs", "Diamonds", "Hearts", "Spades" ];
let rank = [ "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King" ];

// Constants
const RANKS = rank.length;
const SUITS = suit.length;
const N = SUITS * RANKS;

const area = document.querySelector('.area');
const deck = document.querySelector('.deck');
const buttons = document.querySelectorAll('.buttons button');
const actionText = document.getElementById('action-text');

const cardsPerRow = 13; 
const cardWidth = deck.offsetWidth; 
const cardHeight = deck.offsetHeight; 

let isDeckDisplayed = false;

// Show the modal when the page loads
document.addEventListener("DOMContentLoaded", function() {
  var myModal = new bootstrap.Modal(document.getElementById('modal'));
  myModal.show();
});

// Initialize Deck
for(let i = 0; i < 13; i++) { 
  for(let j = 0; j < 4; j++) {
    let card = document.createElement('div');
    card.className = "card";
    card.class = rank[i] + "_of_" + suit[j];
    card.classList.add(card.class);
    card.id = 4 * i + j;

    // Construct the image URL based on the class
    let imageUrl = "images/" + card.class + ".png";

    // Set the background image using the constructed URL
    card.style.backgroundImage = "url('" + imageUrl + "')";
    
    deck.appendChild(card);
  }
}

const cards = Array.from(deck.children);

async function shuffleCards(functioncall , display = true) {
  await disableButtons();
  if (isDeckDisplayed) {
    editActionText("Collecting Deck ...");
    await revertCards();
    await delay(N * 125 + 100);
  }

  if (functioncall == orderCards) editActionText("Ordering ..."); else editActionText("Shuffling ...");
  
  await delay(300);

  await rotateDeck();
  await delay(500);

  await orderCards();

  await animateShuffle();
  await functioncall();

  await rotateDeck(false);
  await delay(200);

  if (display) {
    editActionText("Showing Deck");
    await displayCards()
    await delay(N * 100 + 1000);
  }

  await disableButtons(false);
}

function editActionText(string) {
  actionText.innerHTML = string;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function rotateDeck(rotateDown = true) {
  return new Promise((resolve) => {
    if (rotateDown) {
      cards.forEach((card) => {
        card.classList.add("face-down");
      });
    }
    else {
      cards.forEach((card) => {
        card.classList.remove("face-down");
      });
    }
    resolve();
  });
}

function disableButtons(disable = true) {
  return new Promise((resolve) => {
    buttons.forEach(button => {
      button.disabled = disable;
    });
    resolve();
  });
}

function displayCards() {
  return new Promise((resolve) => {
    // Keep track of deck
    isDeckDisplayed = true;

    // Move the deck to the top left
    deck.classList.remove("top-50", "start-50", "translate-middle");
    deck.style.transition = "ease 2s";
    deck.style.top = '0%';
    deck.style.left = '0%';
    deck.style.transform = 'translate(0%, 0%)';

    // Sort cards based on their current zIndex
    cards.sort((a, b) => parseInt(a.style.zIndex) - parseInt(b.style.zIndex));

    // Calculate the total width and height of the deck layout
    let deckWidth = cardsPerRow * cardWidth;
    let deckHeight = Math.ceil(cards.length / cardsPerRow) * cardHeight;

    // Calculate the offset to center the grid within the container
    let offsetX = (area.offsetWidth - deckWidth) / 2;
    let offsetY = (area.offsetHeight - deckHeight) / 2;

    setTimeout(() => {
      // Animate each card to its target position
      cards.forEach((card, index) => {
        // Calculate row and column based on index
        let row = Math.floor(index / cardsPerRow);
        let col = index % cardsPerRow;

        // Set the target position based on row and column
        let targetX = offsetX + col * cardWidth;
        let targetY = offsetY + row * cardHeight;

        // Animate the card to its target position
        setTimeout(() => {
          card.style.transform = `translate(${targetX}px, ${targetY}px)`;
        }, index * 100); // Stagger the animation for each card
      });
    }, 1000);
    resolve();
  });
}

function revertCards() {
  return new Promise((resolve) => {
    // Keep track of deck
    isDeckDisplayed = false;

    // Sort cards based on their current zIndex in reverse order
    const sortedCards = Array.from(cards).sort((a, b) => parseInt(b.style.zIndex) - parseInt(a.style.zIndex));

    // Animate the sorted cards back to the deck
    sortedCards.forEach((card, index) => {
      // Animate the card back to the deck's position (bottom right)
      setTimeout(() => {
        card.style.transform = 'translate(0px, 0px)';
      }, index * 100); // Stagger the animation for each card
    });

    // Move the deck back to the center after all cards are returned
    setTimeout(() => {
      deck.style.transition = "ease 2s";
      deck.style.top = '';
      deck.style.left = '';
      deck.style.transform = '';
      deck.classList.add("top-50", "start-50", "translate-middle");
    }, sortedCards.length * 100 + 500);
  resolve();
  });
}


function orderCards() {
  return new Promise((resolve) => {
    cards.sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id);
    });

    // Reinsert cards into the deck in sorted order
    cards.forEach(card => {
        card.style.zIndex = card.id;
    });
    resolve();
  });
}


function performeShuffle () {
  return new Promise((resolve) => {
    for (let i = 0; i < cards.length; i++) {
      // Get a random index from the remaining cards
      const r = i + Math.floor(Math.random() * (cards.length - i));

      // Swap the current card with the randomly selected card using their z-index
      [cards[i].style.zIndex, cards[r].style.zIndex] = [cards[r].style.zIndex, cards[i].style.zIndex];
    }
    resolve();
  });
}

function animateShuffle() {
  const midIndex = Math.floor(cards.length / 2);

  // Center Deck
  deck.classList.remove("bottom-0", "end-0");
  deck.classList.add("top-50", "start-50", "translate-middle");

  // Split the deck into two halves
  const leftHalf = cards.slice(0, midIndex);
  const rightHalf = cards.slice(midIndex);

  return new Promise(resolve => {
    // Initial animation to spread the cards
    leftHalf.forEach((card, index) => {
      setTimeout(() => {
        card.style.transform = `translateX(100px) translateY(${index * 10}px) rotate(-15deg)`;
        card.style.zIndex = N - (midIndex - index) ;
      }, index * 50);
    });

    rightHalf.forEach((card, index) => {
      setTimeout(() => {
        card.style.transform = `translateX(-100px) translateY(${index * 10}px) rotate(15deg)`;
        card.style.zIndex = N - (midIndex - index) ;
      }, index * 50);
    });

    // Shuffle the cards back together alternately
    setTimeout(() => {
      for (let i = 0; i < midIndex; i++) {
        setTimeout(() => {
          leftHalf[i].style.transform = "translateX(0px) translateY(0px) rotate(0deg)";
          leftHalf[i].style.zIndex = i * 2 - 1;

          rightHalf[i].style.transform = "translateX(0px) translateY(0px) rotate(0deg)";
          rightHalf[i].style.zIndex = i * 2;
        }, i * 50);
      }
      setTimeout(resolve, midIndex * 50 + 500);
    }, midIndex * 50 + 500);
  });
}

function randomNumber() {
  // Generate a random index for the suit (0 to 3)
  let suitIndex = Math.floor(Math.random() * suit.length);

  // Generate a random index for the face ranks (0 to 10)
  let rankIndex = Math.floor(Math.random() * 10);

  cards.forEach((card) => {
    if (card.classList.contains(`${rank[rankIndex]}_of_${suit[suitIndex]}`)) {
      editActionText(`Your card is <span>${rank[rankIndex]} of ${suit[suitIndex]}<span>`);
      card.style.zIndex = 53; 
      return;
    }
  });
}

function randomFace() {
  // Generate a random index for the suit (0 to 3)
  let suitIndex = Math.floor(Math.random() * suit.length);

  // Generate a random index for the face ranks (10 to 12)
  let rankIndex = Math.floor(Math.random() * 3) + 10;

  cards.forEach((card) => {
    if (card.classList.contains(`${rank[rankIndex]}_of_${suit[suitIndex]}`)) {
      editActionText(`Your card is <span>${rank[rankIndex]} of ${suit[suitIndex]}<span>`);
      card.style.zIndex = 53; 
      return;
    }
  });
}