const cards = document.querySelectorAll('.card');
const playerXscore = document.querySelectorAll('span')[0];
const playerOscore = document.querySelectorAll('span')[1];
const resetButton = document.getElementById('resetButton')

let currentPlayer = 'X';
let board = Array(9).fill('');

const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

cards.forEach((card, index)=> {
    card.addEventListener('click', () => {
        if(card.textContent === '') {
            card.textContent = currentPlayer;
            board[index] = currentPlayer;
            if(checkWinner(currentPlayer)) {
                updateScore(currentPlayer);
                alert(`Jogador ${currentPlayer} venceu!`);
                resetGame();
                return;
            }
            if(board.every(cell => cell !== '')) {
                alert('Empate!');
                resetGame();
                return;
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

function checkWinner(player) {
    return winningCombos.some(combo => {
        return combo.every(index => board[index] === player);
    });
}

function updateScore(player) {
    if(player === 'X') {
        playerXscore.textContent = parseInt(playerXscore.textContent) + 1;
    }else {
        playerOscore.textContent = parseInt(playerOscore.textContent) + 1;
    }
}

function resetGame() {
    board = Array(9).fill('');
    cards.forEach(card => card.textContent = '');
    currentPlayer = 'X';
}

// Botão de reiniciar o jogo
resetButton.addEventListener('click', () => {
    board = Array(9).fill('');
    cards.forEach(card => card.textContent = '');
    currentPlayer = 'X';
    playerXscore.textContent = '0';
    playerOscore.textContent = '0';
});