const isWinner = (cells, stateOfGame, winnerCombinations) => (
  winnerCombinations.some(combination => (
    combination.every(i => cells[i].classList.contains(stateOfGame.current))
  ))
);

const drawMsg = (stateOfGame, msg) => {
  stateOfGame['running'] = false;
  document.querySelector('[data-win-message-text]').textContent = msg;
  document.querySelector('.win-message').classList.add('show');
}

const handleClick = (e, stateOfGame, cells, winnerCombinations) => {
  const { target: { parentNode }} = e;
  if ((parentNode.classList.contains('circle') ||
    parentNode.classList.contains('cross')) && stateOfGame.running) {
      stateOfGame['compt'] += 1;
      const player = stateOfGame.current === 'circle' ? 'cross' : 'circle';
      e.target.classList.add(stateOfGame.current);
      parentNode.classList.remove(stateOfGame.current);
      if (stateOfGame.compt > 4) {
        if (isWinner(cells, stateOfGame, winnerCombinations)) {
          const msg = `${stateOfGame.current === 'circle' ? 'O' : 'X'} wins`
          return drawMsg(stateOfGame, msg);
        }
      }
      parentNode.classList.add(player);
      stateOfGame['current'] = player;
  }
  if (stateOfGame.compt > 8 && stateOfGame.running) {
    stateOfGame['current'] = null;
    return drawMsg(stateOfGame, "No winner...")
  }
}

const main = () => {
  const winnerCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  const stateOfGame = {
    running: true,
    current: 'circle',
    compt: 0
  }
  const cells = document.querySelectorAll('.cell');
  document.querySelector('.game').classList.add(stateOfGame.current);
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', e => {
      handleClick(e, stateOfGame, cells, winnerCombinations);
    }, { once: true });
  }
}

const restartGame = () => {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.classList.remove('circle');
    cell.classList.remove('cross');
    cell.removeEventListener('click', handleClick);
  });
  document.querySelector('.win-message').classList.remove('show');
  main()
}

main();
document.getElementById('restartButton').addEventListener('click', restartGame);