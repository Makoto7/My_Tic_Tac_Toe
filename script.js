const isWinner = (cells, current, winnerCombinations) => (
  winnerCombinations.some(combination => (
    combination.every(i => cells[i].classList.contains(current))
  ))
);

const drawMsg = (stateOfGame, msg) => {
  stateOfGame['running'] = false;
  document.querySelector('[data-win-message-text]').textContent = msg;
  document.querySelector('.win-message').classList.add('show');
}

const handleClick = (event, stateOfGame, cells, winnerCombinations) => {
  const { parentNode } = event;
  const { current, running } = stateOfGame;
  if ((parentNode.classList.contains('circle') ||
    parentNode.classList.contains('cross')) && running) {
      stateOfGame['compt'] += 1;
      const player = current === 'circle' ? 'cross' : 'circle';
      event.classList.add(current);
      parentNode.classList.remove(current);
      if (stateOfGame.compt > 4) {
        if (isWinner(cells, current, winnerCombinations)) {
          const msg = `${current === 'circle' ? 'O' : 'X'} wins`
          return drawMsg(stateOfGame, msg);
        }
      }
      parentNode.classList.add(player);
      stateOfGame['current'] = player;
  }
  if (stateOfGame.compt > 8 && running) {
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
    cells[i].addEventListener('click', e => (
      handleClick(e.target, stateOfGame, cells, winnerCombinations)
    ), { once: true });
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