const cardValues = [1, 2, 3, 4,5,1, 2, 3, 4,5,1, 2, 3, 4,5,1, 2, 3, 4,5];

// Set maximum number of guesses
const maxGuesses = 10;

// Variables to track game state
let selectedCards = [];
let guesses = maxGuesses;
let matchedPairs = 0;

// Get DOM elements
const gameboard = document.getElementById('cardDeck');
const guessesDisplay = document.getElementById('guesses');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restart-btn');
const outOfGuessesModal = document.getElementById('out-of-guesses-modal');
const outOfGuessesBtn = document.getElementById('out-of-guesses-btn');
const gameWonModal = document.getElementById('game-won-modal');
const gameWonBtn = document.getElementById('game-won-btn');

// Initialize game
initializeGame();

// Function to initialize the game
function initializeGame() {
  // Reset game state
  selectedCards = [];
  guesses = maxGuesses;
  matchedPairs = 0;

  // Shuffle the card values
  shuffleCards();

  // Update guesses display
  updateGuessesDisplay();

  // Clear the gameboard
  clearGameboard();

  // Create and append the cards to the gameboard
  createCards();

  // Clear game status
  clearGameStatus();

  // Hide modals
  hideModal(outOfGuessesModal);
  hideModal(gameWonModal);
}

// Function to shuffle the card values
function shuffleCards() {
  cardValues.sort(() => Math.random() - 0.5);
}

// Function to update the guesses display
function updateGuessesDisplay() {
  guessesDisplay.textContent = `Guesses Remaining: ${guesses}`;
}

// Function to clear the gameboard
function clearGameboard() {
  gameboard.innerHTML = '';
}

// Function to create and append the cards to the gameboard
function createCards() {
  cardValues.forEach(value => {
    const card = createCard(value);
    gameboard.appendChild(card);
  });
}

// Function to create a single card element
function createCard(value) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = value;
  card.setAttribute('number', value);
  card.style.backgroundColor = 'red';
  card.style.color = 'red';

  card.addEventListener('click', () => {
    handleCardClick(card);
  });

  return card;
}

// Function to handle card click event
function handleCardClick(card) {
  if (!card.classList.contains('matched') && selectedCards.length < 2) {
    card.style.backgroundColor = 'white';
    card.textContent = card.getAttribute('number');
    card.classList.add('selected');
    selectedCards.push(card);

    if (selectedCards.length === 2) {
      const [card1, card2] = selectedCards;

      if (card1.getAttribute('number') === card2.getAttribute('number')) {
  card1.classList.add('matched');
  card2.classList.add('matched');
  selectedCards = [];
  matchedPairs++;

        if (matchedPairs === cardValues.length / 2) {
          // Game completed
          showModal(gameWonModal);
        }
      } else {
        setTimeout(() => {
          card1.style.backgroundColor = 'lightblue';
          card1.textContent = '';
          card1.classList.remove('selected');

          card2.style.backgroundColor = 'lightblue';
          card2.textContent = '';
          card2.classList.remove('selected');

          selectedCards = [];
          guesses--;

          if (guesses <= 0) {
            // Game over
            showModal(outOfGuessesModal);
          }
          
          updateGuessesDisplay();
        }, 1000);
      }
    }
  }
}

// Function to set the game status
function setGameStatus(status) {
  gameStatus.textContent = status;
}

// Function to clear the game status
function clearGameStatus() {
  gameStatus.textContent = '';
}

// Function to show a modal
function showModal(modal) {
  modal.style.display = 'block';
}

// Function to hide a modal
function hideModal(modal) {
  modal.style.display = 'none';
}

// Restart button event listener
restartButton.addEventListener('click', () => {
  hideModal(outOfGuessesModal);
  hideModal(gameWonModal);
  initializeGame();
});

// Out of guesses modal button event listener
outOfGuessesBtn.addEventListener('click', () => {
  hideModal(outOfGuessesModal);
  initializeGame();
});

// Game won modal button event listener
gameWonBtn.addEventListener('click', () => {
  hideModal(gameWonModal);
  initializeGame();
});