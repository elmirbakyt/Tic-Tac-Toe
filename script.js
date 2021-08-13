let area = document.getElementById("area");

let cells = document.getElementsByClassName("cell");

let whoWins = document.getElementById("whoWins");

let currentPlayer = document.getElementById("currentPl");

let roundHistory = [];
let player = "X";

let stat = {
  X: 0,
  O: 0,
  D: 0,
};

let winCombination = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

for (let i = 1; i <= 9; i++) {
  area.innerHTML += `<div class = "cell" pos="${i}"></div>`;
}

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", cellonclick);
}

function cellonclick() {
  let data = [];

  if (!this.innerHTML) {
    this.innerHTML = player;
  } else {
    alert("Ячейка уже заняли!");
    return;
  }

  for (let i in cells) {
    if (cells[i].innerHTML == player) {
      data.push(parseInt(cells[i].getAttribute("pos")));
    }
  }

  if (checkWinner(data)) {
    stat[player] += 1
    whoWins.innerHTML = 'Победа ' + [player]
    document.getElementById('roundHistory').innerHTML += `победа  ${player}, </br>`
    refresh()
    roundHistory.push(whoWins.innerHTML)
  }else {
    let draw = true;
    for(let i in cells) {
      if(cells[i].innerHTML == '') draw = false;
    }

    if (draw) {
      stat.D += 1
      whoWins.innerHTML = 'Ничья'
      document.getElementById('roundHistory').innerHTML += `Ничья, </br>`
      refresh()
      roundHistory.push(whoWins.innerHTML)
    }
  }
  player = player === "X" ? "O" : "X";
  currentPlayer.innerHTML = player;
}

function checkWinner(data) {
  for (let i in winCombination) {
    let win = true;
    for (let j in winCombination[i]) {
      let id = winCombination[i][j];
      let ind = data.indexOf(id);

      if (ind == -1) {
        win = false;
      }
    }
    if (win) return true;
  }

  return false;
}

function refresh() {
  for(let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = ''
  }
  updateState()
}

function updateState() {
  document.getElementById('sX').innerHTML = stat.X;
  document.getElementById('sO').innerHTML = stat.O;
  document.getElementById('sD').innerHTML = stat.D;
}