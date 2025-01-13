document.addEventListener("DOMContentLoaded", () => {
  const cardArray = [
    { name: "fries", img: "fries.png" },
    { name: "cheeseburger", img: "cheeseburger.png" },
    { name: "ice-cream", img: "ice-cream.png" },
    { name: "pizza", img: "pizza.png" },
    { name: "milkshake", img: "milkshake.png" },
    { name: "hotdog", img: "hotdog.png" },
    { name: "fries", img: "fries.png" },
    { name: "cheeseburger", img: "cheeseburger.png" },
    { name: "ice-cream", img: "ice-cream.png" },
    { name: "pizza", img: "pizza.png" },
    { name: "milkshake", img: "milkshake.png" },
    { name: "hotdog", img: "hotdog.png" },
  ];

  let cardsChosen = [];
  let cardsChosenIds = [];
  let cardsWon = [];
  let timer;
  let timeElapsed = 0;

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  const timerDisplay = document.querySelector("#timer");
  

  function shuffleCards() {
    return cardArray.sort(() => 0.5 - Math.random());
  }


  function startTimer() {
    timer = setInterval(() => {
      timeElapsed++;
      timerDisplay.textContent = `Time: ${timeElapsed} seconds`;
    }, 1000);
  }


  function createBoard() {
    grid.innerHTML = ''; 
    const shuffledCards = shuffleCards();
    
    for (let i = 0; i < shuffledCards.length; i++) {
      const card = document.createElement("img");
      card.setAttribute("src", "blank.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
    
    startTimer(); 
  }


  function flipCard() {
    const cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);

    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  // Check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll("img");
    const [optionOneId, optionTwoId] = cardsChosenIds;

    if (optionOneId == optionTwoId) {
      alert("You have clicked the same image!");
      cards[optionOneId].setAttribute("src", "blank.png");
      cards[optionTwoId].setAttribute("src", "blank.png");
    } else if (cardsChosen[0] === cardsChosen[1]) {
      alert("You have found a match!");
      cards[optionOneId].setAttribute("src", "white.png");
      cards[optionTwoId].setAttribute("src", "white.png");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
    } else {
      alert("Sorry, try again!");
      cards[optionOneId].setAttribute("src", "blank.png");
      cards[optionTwoId].setAttribute("src", "blank.png");
    }

    cardsChosen = [];
    cardsChosenIds = [];
    resultDisplay.textContent = cardsWon.length;

    if (cardsWon.length === cardArray.length / 2) {
      clearInterval(timer);
      resultDisplay.textContent = `Congratulations! You have won in ${timeElapsed} seconds!`;
      
     
      setTimeout(() => {
        alert('Restarting game...');
        resetGame();
      }, 3000); 
    }
  }

  
  function resetGame() {
    clearInterval(timer); 
    timeElapsed = 0;
    cardsWon = []; 
    resultDisplay.textContent = ''; 
    timerDisplay.textContent = 'Time: 0 seconds'; 
    createBoard(); 
  }

 
  const restartButton = document.createElement('button');
  restartButton.textContent = 'Restart Game';
  restartButton.addEventListener('click', resetGame);
  
  document.body.appendChild(restartButton); 

  createBoard(); 
});
