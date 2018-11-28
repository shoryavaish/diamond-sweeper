global.startApp = function(container) {
	console.log("Here is the container:", container);
  	init();
}

var diamondsRowWise = {};
var diamondsColumnWise = {};
var count = 0;
var openDiamonds = 0;
var sizeOfBox = 0;
var rowDiff = null, columnDiff = null;
var rowIndex = null, columnIndex = null;

document.addEventListener('click', clickBox);

function init(){
	sizeOfBox = document.getElementsByTagName('tr').length;

	while(count!==sizeOfBox){
		var a = getRandomInt(sizeOfBox);
		var b = getRandomInt(sizeOfBox);
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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRowDiffrenceAndIndex(row, column){
	var diamondsInColumn = Object.keys(diamondsRowWise[row]);
	
	for(let i = 0; i < diamondsInColumn.length; i++){
		var temp = Math.abs(column - diamondsInColumn[i]);
		if(rowDiff == null || rowDiff > temp){
			rowDiff = temp;
			rowIndex = parseInt(diamondsInColumn[i]);
		}
	}
}

function getColumnDiffrenceAndIndex(row, column){
	var diamondsInRow = Object.keys(diamondsColumnWise[column]);
	
	for(let i = 0; i < diamondsInRow.length; i++){
		var temp = Math.abs(row - diamondsInRow[i]);
		if(columnDiff == null || columnDiff > temp){
			columnDiff = temp;
			columnIndex = parseInt(diamondsInRow[i]);
		}
	}
}

function rotateArrowRowWise(ev, column){
	if(rowIndex < column)
		ev.target.style.transform = 'rotate(180deg)';
	else
		ev.target.style.transform = 'rotate(0deg)';
}

function rotateArrowColumnWise(ev, row){
	if(columnIndex < row)
		ev.target.style.transform = 'rotate(270deg)';
	else
		ev.target.style.transform = 'rotate(90deg)';
}

function clickBox(ev){
	if(ev.target.className.includes('cell')){
		var row = ev.target.parentNode.parentNode.rowIndex;
		var column = ev.target.parentNode.cellIndex;
		if(checkDiamond(row, column)){
			if(ev.target.classList.contains('unknown')){
				ev.target.classList.remove('unknown');
				ev.target.classList.add('diamond');
				openDiamonds++;
				
				if(openDiamonds===sizeOfBox){
					document.getElementsByClassName('messages')[0].innerHTML = 'Hurray! you got all the diamonds.';
				}
			}
		}else{
			if(ev.target.classList.contains('unknown'))
				ev.target.classList.remove('unknown');
			else{

				if(document.getElementsByClassName('arrow')[0])
					document.getElementsByClassName('arrow')[0].classList.remove('arrow');
				
				rowDiff = null;
				columnDiff = null;
				rowIndex = null;
				columnIndex = null;

				if(diamondsRowWise[row])
					getRowDiffrenceAndIndex(row, column);
				if(diamondsColumnWise[column])
					getColumnDiffrenceAndIndex(row, column);

				if(rowDiff != null  || columnDiff != null){
					ev.target.classList.add('arrow');

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

function checkDiamond(row, column){
	return diamondsRowWise[row] && diamondsRowWise[row][column];
}