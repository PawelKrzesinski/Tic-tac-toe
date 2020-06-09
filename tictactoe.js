const board = document.querySelector('.board');
const cells = Array.from(board.children);
const currentTurn = document.querySelector('.turn__current');
const blueScreenButton = document.querySelector('.blue__screen__btn');
const blueScreen = document.querySelector('.blue__screen');
const msg = document.querySelector('.message');
let playerOneWinsCount = document.getElementById('score-x');
let playerTwoWinsCount = document.getElementById('score-o');
let drawCount = document.getElementById('score-draw');
let scoreX = 0;
let scoreO = 0;
let draws = 0;
let winner;
let currentPlayer;

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

startGame();

function setCurrentPlayer(){
	currentTurn.innerHTML = `Current Player - ${currentPlayer.toUpperCase()}`;
	msg.innerHTML = `<h1>${currentPlayer.toUpperCase()} starts the game !</h1>`;
}

function startGame () {
	currentPlayer = Math.floor(Math.random() * 2);
	if(currentPlayer == 0){
		currentPlayer = playerX;
		board.classList.remove("o__turn");
		board.classList.add("x__turn");	
	} else {
		currentPlayer = playerO;
		board.classList.remove("x__turn");
		board.classList.add("o__turn");
	}
	setCurrentPlayer();
	blueScreen.style.display = 'flex';
	blueScreenButton.innerHTML = "START !";
	blueScreenButton.addEventListener('click', () => {
		blueScreen.style.display = 'none';	
		
	});
	
	makeMove();
}

function makeMove() {
	cells.forEach(cell => {	
		cell.addEventListener('click', clickHandler, { once: true});
	});
}

function clickHandler(e) {
	if(currentPlayer == playerX){
		e.target.classList.add(currentPlayer);
		if(hasWon(currentPlayer)){
			winner = currentPlayer;
			scoreX += 1;		
			playerOneWinsCount.innerHTML = scoreX;
			endGame();
		} else if(checkForDraw(currentPlayer)) {
			draws += 1;
			drawCount.innerHTML = draws;
			endGame();
		} else {
		board.classList.remove("x__turn");
		board.classList.add("o__turn");
		currentPlayer = players[1];
		setCurrentPlayer();
		}
	} else {
		e.target.classList.add(currentPlayer);
		if(hasWon(currentPlayer)){
			winner = currentPlayer;
			scoreO += 1;
			playerTwoWinsCount.innerHTML = scoreO;
			endGame();
		} else if(checkForDraw(currentPlayer)) {
			draws += 1;
			drawCount.innerHTML = draws;
			endGame();
		} else {
		board.classList.remove("o__turn");
		board.classList.add("x__turn");
		currentPlayer = players[0];
		setCurrentPlayer();
		}	
	}

}

function checkForDraw() {
	return cells.every(cell => {
	return cell.classList.contains(players[1]) || 
	cell.classList.contains(players[0]);
});
}

function hasWon(currentPlayer) {
	return win_conditions.some(condition => {
		return condition.every(index => {
			return cells[index].classList.contains(currentPlayer);
		});
	});
}

function endGame() {
	if(checkForDraw()) {
		blueScreen.style.display = 'flex';
		msg.innerHTML = `<h1>It's a draw !</h1>`;
		blueScreenButton.innerHTML = 'Restart';
	}
	if(winner != ""){
		blueScreen.style.display = 'flex';
		msg.innerHTML = `<h1>${winner.toUpperCase()} has won !</h1>`;
		blueScreenButton.innerHTML = 'Restart';
	}
	blueScreenButton.addEventListener('click', clearTable);
}

function clearTable () {
	cells.forEach(cell => {
		cell.classList = 'cell';
		cell.removeEventListener('click', clickHandler);
	});
	winner = '';
	currentPlayer = '';
	currentTurn.innerHTML = '';
	msg.innerHTML = '';
	blueScreen.style.display = 'none';
	blueScreenButton.removeEventListener('click', clearTable);
	startGame();
}
