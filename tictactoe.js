let playerOneWinsCount = document.getElementById('score-x');
let playerTwoWinsCount = document.getElementById('score-o');
let drawCount = document.getElementById('score-draw');
let scoreX = 0;
let scoreO = 0;
let draws = 0;
let winner;
let currentPlayer;
const board = document.querySelector('.board');
const cells = Array.from(board.children);
const currentTurn = document.querySelector('.turn__current');
const players = ['x', 'o'];
const playerX = players[0];
const playerO = players[1];
const win_conditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];


playerOneWinsCount.innerHTML = scoreX;
playerTwoWinsCount.innerHTML = scoreO;
drawCount.innerHTML = draws;

function decideWhoStarts () {
	currentPlayer = Math.floor(Math.random() * 2);
	if(currentPlayer == 0){
		currentPlayer = playerX;
		board.classList.remove("o__turn");
		board.classList.add("x__turn");
		alert('X\'s currentPlayer')
	} else {
		currentPlayer = playerO;
		board.classList.remove("x__turn");
		board.classList.add("o__turn");
		alert('O\'s currentPlayer')
	}
	currentTurn.innerHTML = `Current Player - ${currentPlayer.toUpperCase()}`
}

decideWhoStarts();

function makeMove() {
	cells.forEach(cell => {
		cell.addEventListener('click', e => {		
			if(currentPlayer == playerX){
				e.target.classList.add(currentPlayer);
				if(hasWon(currentPlayer)){
					winner = currentPlayer;
					console.log(winner);
					
					endGame(scoreX);
				} else if(checkForDraw()) {
					endGame(draws);
				} else {
				board.classList.remove("x__turn");
				board.classList.add("o__turn");
				currentPlayer = players[1];
				currentTurn.innerHTML = `Current Player - ${currentPlayer.toUpperCase()}`
				}
			} else {
				e.target.classList.add(currentPlayer);
				if(hasWon(currentPlayer)){
					console.log('winner');
					winner = currentPlayer;
					endGame(scoreO);
				} else if(checkForDraw()) {
					console.log('draw');
					endGame(draws);
				} else {
				board.classList.remove("o__turn");
				board.classList.add("x__turn");
				currentPlayer = players[0];
				currentTurn.innerHTML = `Current Player - ${currentPlayer.toUpperCase()}`	
				}	
			}
			
			//endGame(currentPlayer);
		}, { once: true})
	})
}

makeMove();

function checkForDraw() {
	return cells.every(cell => {
	return cell.classList.contains(players[1]) || 
	cell.classList.contains(players[0]);
})
}


function endGame (scoreX, scoreO, draws, winner){
	if(winner == players[0]){
		scoreX += 1;
	} else if(winner == players[1]){
		scoreO += 1;
	} else {
		draws += 1;
	}
}

function hasWon(currentPlayer) {
	return win_conditions.some(condition => {
		return condition.every(index => {
			return cells[index].classList.contains(currentPlayer);
		})
	})
}