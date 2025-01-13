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

  // Pomieszanie kart
  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  let cardsChosen = [];
  let cardsChosenIds = [];
  let cardsWon = [];

  // Stworzenie planszy
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement("img");
      card.setAttribute("src", "blank.png"); // Ustawienie obrazka początkowego
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
  }

  // Funkcja odkrywająca karty
  function flipCard() {
    const cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute("src", cardArray[cardId].img); // Ustawienie obrazka karty

    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  // Sprawdzanie dopasowania kart
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
      resultDisplay.textContent = "Congratulations! You have won!";
    }
  }

  createBoard();
});
