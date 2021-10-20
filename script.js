const X_CLASS = "x"
const circle_CLASS = "circle"

const winningMessageElement = document.getElementById("winningMessage")
//const restartButton = getElementById("restartButton")
const winningMessageTextElement = document.querySelector(
    "[data-winning-message-text]"
  );
const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
let circleTurn

startGame()

restartButton.addEventListener("click", startGame)

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(circle_CLASS);
    cell.removeEventListener("click", handleClick)
    cell.addEventListener("click", handleClick, { once: true })
  });
  setBoardHoverClass()
  winningMessageElement.classList.remove("show")
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? circle_CLASS : X_CLASS
  //place mark
  placeMark(cell, currentClass)
  //check win
  if (checkWin(currentClass)) {
    console.log("Winner  " + currentClass)
    endGame(false)
  }
  //check draw
  else if (isDraw()) {
    endGame(true);
  } else {
    //switch turn
    swapTurns()
    setBoardHoverClass()
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn;
  console.log("hey swap" + circleTurn)
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(circle_CLASS)
  if (circleTurn) {
    console.log("hey circle")
    board.classList.add(circle_CLASS)
  } else {
    console.log("hey x")
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return winning_combinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = `Draw!`
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "0's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add("show")
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
            cell.classList.contains(circle_CLASS)
    })
}
