const cols = 3;
const rows = 3;
let matrix = [];
let stepCount = 0;
let mark = "X";

const initState = () => {
  matrix = [];
  for (let row = 0; row < rows; row += 1) {
    const row = [];
    for (let column = 0; column < cols; column++) {
      row.push(null);
    }
    matrix.push(row);
  }
  /* matrix = Array.from(Array(rows), () => Array(cols).fill(null)); */
}

const changeMatrixValue = (element) => {
  const row = parseInt(element.dataset.row, 10);
  const cell = parseInt(element.dataset.cell, 10);
  matrix[row][cell] = element.innerHTML;
}

/**
Fejtsd ki a deleteSigns elnevezésű függvényt, 
amely kiválasztja az összes cellát, 
és mindegyik elemben elhelyez egy üres string-et.
*/
const deleteSigns = () => {
  const allCells = document.getElementsByClassName("cell");
  for (let i = 0; i < allCells.length; i++) {
    allCells[i].innerHTML = "";
  }
}

/**
Fejtsd ki az increaseCounter elnevezésű függvényt, 
amely a megtett lépések számát növeli eggyel.
*/
const increaseCounter = () => stepCount++;

/**
Fejtsd ki a modifyCell elnevezésű függvényt, 
amely beállítja az elem tartalmának a használt jelet,
majd kattintásra (esemény) eltávolítja a handleClick függvényt. 
*/
const modifyCell = (element) => {
  element.innerHTML = mark;
  element.removeEventListener('click', handleClick);
}

/**
Fejtsd ki a setMark elnevezésű függvényt,
amely a jelre beállítja a következő lépésnél használt jelet úgy, 
hogy ha az X-et használtuk éppen, azaz a jel === X, 
akkor beállítja a 0-t, hiszen a másik játékos azzal fog tenni egy jelet,
ha pedig a 0-t használtuk, beállítja az X-et.
*/
const setMark = () => {
  mark = mark === 'X' ? 'O' : 'X';
}

/**
Fejtsd ki a handleClick elnevezésű függvényt, 
amely meghívja a következő függvényeket:
- increaseCounter()
- modifyCell(event.target)
- setMark()
- changeMatrixValue(event.target)
- checkWinner()
*/
const handleClick = (event) => {
  increaseCounter();
  modifyCell(event.target);
  setMark();
  changeMatrixValue(event.target);
  checkWinner();
}

/**
Fejtsd ki az addClickListener elnevezésű függvényt, 
amely kiválasztja a cellákat, 
és kattintásra (esemény) mindegyikhez hozzáadja a handleClick függvényt.
*/
const addClickListener = () => {
  const allCells = document.getElementsByClassName("cell");
  for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener('click', handleClick);
  }
}

/**
Fejtsd ki a removeAllClickListeners elnevezésű függvényt, 
amely kiválasztja a cellákat, 
és kattintásra (esemény) mindegyikről eltávolítja a handleClick függvényt.
*/
const removeAllClickListeners = () => {
  const allCells = document.getElementsByClassName("cell");
  for (let i = 0; i < allCells.length; i++) {
    allCells[i].removeEventListener('click', handleClick);
  }
}

/**
Fejtsd ki a checkValues elnevezésű függvényt, 
amely végigmegy a kapott tömb sorain,
és a sor minden EGYES elemének értéke esetében megvizsgálja, 
hogy az 0 vagy X. 
Ha a sor minden egyes eleme 0 vagy X, 
akkor a 0 vagy az X győzött.
Ha valaki győzött, akkor pl. egy ilyen tömböt kapunk: [true, false, false]
*/
const checkValues = (array) => {
  return array.map(row => {
    const prevMark = row[0];
    let match = true;
    for (let i = 1; i < row.length; i++) {
      const currMark = row[i];
      match = match && currMark && prevMark && (currMark === prevMark);
    }

    return match;
  }).indexOf(true) !== -1;
}
/*
Ha true-t kapunk visza adott sorra, akkor 
annak indexét vizsgálva nem kaphatunk -1-et.
Azaz az elem benne van a tömbben.
*/
const checkColumnValues = () =>
  checkValues(matrix.map((array, i) =>
    array.map((item, j) => matrix[j][i])));

const checkDiagonalValues = () =>
  checkValues([
    matrix.map((array, i) => matrix[i][i]),
    matrix.map((array, i) => matrix[i][matrix[i].length - i - 1])

    /*
    Miután az első függvénnyel leellenőriztük a sorok tartalmát,
    a fentiekkel megvizsgáljuk az oszlopok és az átlókban lévő mezők tartalmát.
    Ez azért fontos, mert így tudhatjuk meg, 
    hogy lesz-e három azonos jel egymás mellett/alatt/átlósan.
    */
  ]);

/*
Fejtsd ki a checkWinner elnevezésű függvényt, 
amely...
*/
const checkWinner = () => {
  // ...kiírja a konzolra a checkColumnValues()t és a checkDiagonalValues()-t,
  /*
  majd meghívja az endGame()-et, ha hogy HA
  a checkValues(matrix) vagy a checkColumnValues() vagy a checkDiagonalValues() igaz.
  */
  const rowCheck = checkValues(matrix);
  const colCheck = checkColumnValues();
  const diagCheck = checkDiagonalValues();
  console.log(rowCheck, colCheck, diagCheck);
  if (rowCheck || colCheck || diagCheck) {
    endGame();
  } 
}

/**
A HTML-ben a játékteret követően vegyél fel egy divet message osztállyal,
'Let's play.' tartalommal.

Fejtsd ki a setMessage elnevezésű függvényt, 
amely kiválasztja a message osztályú elemet, 
és az üzenetet állítja be a div tartalmának.
*/
const setMessage = (message) => {
  const msgElement = document.querySelector('.message');
  msgElement.innerHTML = message;
}

/**
Fejtsd ki a startGame elnevezésű függvényt, 
amely meghívja a következő függvényeket:
- initState()
- addClickListener()
- newGame()
*/
const startGame = () => {
/*   initState();
  addClickListener(); */
  newGame();
}

/**
Fejtsd ki az endGame elnevezésű függvényt, 
amely a setMessage nevű függvény segítségével beállítja az üzenetet, 
amelynek tartalma:
'The winner is Player ' 
plusz: 
(mark === 'X' ? 'O' : 'X') + '.')

Ez az utóbbi kódrészlet kiválasztja azt a jelet, amellyel a nyertes játszott
(és egy pontot helyez el a mondat végén).

Ezután a függvény meghívja a removeAllClickListeners() nevű függvényt.
*/
const endGame = () => {
  const msg = `The winner is Player ${mark === 'X' ? 'O' : 'X'}.`
  setMessage(msg);
  removeAllClickListeners();
}

/*
Indíts el egy új játékot az alábbi függvény segítségével!

Hozz létre a HTML-ben a játéktéren kívül egy gombot!
*/
const newGame = () => {
  // Válaszd ki a gombot!
  const newGameBtn = document.querySelector('.button');
  newGameBtn.addEventListener('click', () => {
    initState();
    addClickListener();
    deleteSigns();
    setMessage('Playing...');
    setMark();
  })
  /*
  Tegyél rá/adj hozzá egy eseményfigyelőt, 
  amely kattintásra meghívja a következő függvényeket:
      - initState()
      - addClickListener()
      - deleteSigns()
      - setMessage('Playing...')
      - setMark()
      */
}

startGame();
