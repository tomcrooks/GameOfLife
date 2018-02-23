$(document).ready(function() {

function zeros(dimensions) {
    var array = [];

    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }

    return array;
}

var arr = zeros([15, 15]);

$('.box').click(function(evt) { 
    var divColor = $(evt.currentTarget).css('background-color'); 

    if ($(evt.currentTarget).text() == "0") {
        $(evt.currentTarget).text("1");
    } else {
        $(evt.currentTarget).text("0");
    }
        
    if (divColor === 'rgb(255, 255, 255)') {
            $(evt.currentTarget).css('background-color', '#34495e');
            $(evt.currentTarget).css('color', '#fff');
    } else {
            $(evt.currentTarget).css('background-color', '#fff');
            $(evt.currentTarget).css('color', '#34495e');
    }

    var posX = $(this).data("gridx");
    var posY = $(this).data("gridy");
        
    if (arr[posX][posY] === 0) {
        arr[posX][posY] = 1;
    } else {
        arr[posX][posY] = 0;
    }
});
 

$('#evolve').click(function () {
    $('#stop').click(function () {clearInterval(evolveInterval)});

    var evolveInterval = setInterval(function(){
        var grid = arr;
        //console.log(grid);
        var nextGrid = evolve(grid);
        arr = nextGrid;
        //displayNextGrid(nextGrid);
        updateGrid(nextGrid);
    }, 1000);
});


function updateGrid(nextGrid) {
    for (i = 0; i < nextGrid.length; i++){
        for (j = 0; j < nextGrid[i].length; j++){
            var element = $('[data-gridx="' + i + '"][data-gridy="' + j +'"]');
            element.text(nextGrid[i][j]);
            if (element.text() === "1") {
                element.css("background-color", "#34495e")
                element.css('color', '#fff');
            } else {
                element.css("background-color", "white")
                element.css('color', '#34495e');
            }
            //console.log(nextGrid[i][j]);
            console.log(element);
        }
    }
}


function evolve(grid){
    var nextState = zeros([15, 15]);
    nextState.forEach(function(element) {
        element.push(0);
    }, this);
 
    for (i = 0; i < grid.length; i++){
        for (j = 0; j < grid[i].length; j++){
            
            var aliveCells = aliveNeighbors(grid, i, j);
            var isCurrentCellAlive = isAlive(grid, i, j);
            
            if (aliveCells < 2) {
                nextState[i][j] = 0;
            }
            if (aliveCells > 3) {
                nextState[i][j] = 0;
            }
            if  (isCurrentCellAlive === false && (aliveCells === 3)) {
                nextState[i][j] = 1;
            }
            if (isCurrentCellAlive === true && (aliveCells === 2 || aliveCells === 3)){
                nextState[i][j] = 1;
            }
        }
    }
    return nextState;
}


function aliveNeighbors(grid, x, y) {
    if(x >= 0 && y >= 0) {
        try {
            var totalAlive = 0; 
            totalAlive += grid[x - 1][y - 1]; //top left
            totalAlive += grid[x - 1][y]; //top center
            totalAlive += grid[x - 1][y + 1]; //top right

            totalAlive += grid[x][y - 1]; //middle left
            totalAlive += grid[x][y + 1]; //middle right

            totalAlive += grid[x + 1][y - 1]; //bottom left
            totalAlive += grid[x + 1][y]; //bottom center
            totalAlive += grid[x + 1][y + 1]; //bottom right
                
            return totalAlive;
        }
        catch(err) {
        }
            
        } else {
            return 0;
        }
}

// Check to see if adjacent cells are alive
function isAlive(grid, x, y){
    var cell = grid[x][y];

    if (cell === 1) {
        return true 
    } else {
        return false 
    };
}

});