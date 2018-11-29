global.startApp = function(container) {
	console.log("Here is the container:", container);
  	init();
}

var diamondsRowWise = {}; // object that stores all the randomly generated diamonds according to row 
var diamondsColumnWise = {}; // object that stores all the randomly generated diamonds according to column
var count = 0; // counter to check all diamond must be placed at diffrent positions
var openDiamonds = 0; // counter to check number of diamonds found
var sizeOfBox = 0; // matrix size
var rowDiff = null; // save the nearest distance of diamond in a row 
var columnDiff = null; // save the nearest distance of diamond in a column 
var rowIndex = null; // nearest index of diamond in a row
var columnIndex = null; // nearest index of diamond in a column

document.addEventListener('click', clickBox); // added a listner to get all the click events over boxes

function init(){
	sizeOfBox = document.getElementsByTagName('tr').length; // get size of box

	while(count!==sizeOfBox){
		var a = getRandomInt(sizeOfBox); // random row number
		var b = getRandomInt(sizeOfBox); // random column number
		if(!diamondsRowWise[a])
			diamondsRowWise[a] = {};
		if(!diamondsColumnWise[b])
			diamondsColumnWise[b] = {};
		if(!diamondsRowWise[a][b] && !diamondsColumnWise[b][a]){
			diamondsRowWise[a][b] = 'diamond';
			diamondsColumnWise[b][a] = 'diamond';
			count++;
		}
	}
}

function getRandomInt(max) { // generate rondom value b/w 0-sizeOfBox
  return Math.floor(Math.random() * Math.floor(max));
}

function getRowDiffrenceAndIndex(row, column){ // this calculates the shortest distance and index of diamond in a row
	var diamondsInColumn = Object.keys(diamondsRowWise[row]);
	
	for(let i = 0; i < diamondsInColumn.length; i++){
		var temp = Math.abs(column - diamondsInColumn[i]);
		if(rowDiff == null || rowDiff > temp){
			rowDiff = temp;
			rowIndex = parseInt(diamondsInColumn[i]);
		}
	}
}

function getColumnDiffrenceAndIndex(row, column){ // this calculates the shortest distance and index of diamond in a column
	var diamondsInRow = Object.keys(diamondsColumnWise[column]);
	
	for(let i = 0; i < diamondsInRow.length; i++){
		var temp = Math.abs(row - diamondsInRow[i]);
		if(columnDiff == null || columnDiff > temp){
			columnDiff = temp;
			columnIndex = parseInt(diamondsInRow[i]);
		}
	}
}

function rotateArrowRowWise(ev, column){ // function to rotate an arrow in a row i.e. left and right direction 
	if(rowIndex < column)
		ev.target.style.transform = 'rotate(180deg)';
	else
		ev.target.style.transform = 'rotate(0deg)';
}

function rotateArrowColumnWise(ev, row){ // function to rotate an arrow in a column i.e. up and down direction 
	if(columnIndex < row)
		ev.target.style.transform = 'rotate(270deg)';
	else
		ev.target.style.transform = 'rotate(90deg)';
}

function checkDiamond(row, column){ // function to return whether diamond is hidden in that block or not
	return diamondsRowWise[row] && diamondsRowWise[row][column];
}

function clickBox(ev){ 
	if(ev.target.className.includes('cell')){
		// get row and column where player clicked
		var row = ev.target.parentNode.parentNode.rowIndex; 
		var column = ev.target.parentNode.cellIndex;

		if(checkDiamond(row, column)){ // check for a diamond in the clicked row and column
			if(ev.target.classList.contains('unknown')){
				ev.target.classList.remove('unknown');
				ev.target.classList.add('diamond');
				openDiamonds++; // increase the counter of diamonds found
				
				if(openDiamonds===sizeOfBox){ // check if we get all the diamonds
					document.getElementsByClassName('messages')[0].innerHTML = 'Hurray! you got all the diamonds.';
					
					// open all the boxes
					var unknownClassNode = document.querySelectorAll('.unknown');
					unknownClassNode.forEach((el) => {
						if(el.classList.contains('unknown'))
							el.classList.remove('unknown');
					});
					
					// hide arrow
					if(document.getElementsByClassName('arrow')[0])
						document.getElementsByClassName('arrow')[0].classList.remove('arrow');
				}
			}
		}else{ // shows empty box if there is no diamond
			if(ev.target.classList.contains('unknown'))
				ev.target.classList.remove('unknown');
			else{
				// if clicked on empty box

				// remove previous arrow from the board
				if(document.getElementsByClassName('arrow')[0])
					document.getElementsByClassName('arrow')[0].classList.remove('arrow');
				
				// initialize all variables to initial value
				rowDiff = null;
				columnDiff = null;
				rowIndex = null;
				columnIndex = null;

				if(diamondsRowWise[row]) // here we check diamond in a row
					getRowDiffrenceAndIndex(row, column);
				if(diamondsColumnWise[column]) // here we check diamond in a column
					getColumnDiffrenceAndIndex(row, column);

				if(rowDiff != null  || columnDiff != null){
					ev.target.classList.add('arrow'); // add an arrow if diamond(s) is/are found in respective row and column

					// check for the nearest distance and rotate according to it

					if(columnDiff != null && rowDiff != null){
						if(rowDiff <= columnDiff)
							rotateArrowRowWise(ev, column);
						else
							rotateArrowColumnWise(ev, row);
					}else if(rowDiff != null)
						rotateArrowRowWise(ev, column);
					else if(columnDiff != null)
						rotateArrowColumnWise(ev, row);
				}
			}
		}
	}else
		return;
}
