const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


const resolution = 20;
canvas.width = 800;
canvas.height = 800;

const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;

function buildGrid() {
    return new Array(COLS).fill(null)
        .map(() => new Array(ROWS).fill(null)
            .map(() => Math.floor(Math.random() * 2)));
}

let grid = buildGrid();

setInterval(update,100);  

function update() {
    grid = nextGen(grid);
    render(grid);
}

function isValidCell(i, j) {
    if (i >= 0 && i < ROWS && j >= 0 && j < COLS) {
        return true;
    }
    return false;
}

function nextGen(grid) {
    const nextGen = grid.map(arr => [...arr]);

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            let numNbrs = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i == 0 && j == 0) {
                        continue;
                    }
                    if(isValidCell(col + i, row + j)){
                        numNbrs += grid[col + i][row + j];
                    }
                    
                }
            }
            if (cell === 1) {
                if (numNbrs < 2 || numNbrs > 3) {
                    nextGen[col][row] = 0;
                }
            }
            else
                if (numNbrs === 3) {
                    nextGen[col][row] = 1;
                }
        }
    }
    return nextGen;
}

function render(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

            ctx.beginPath();
            ctx.rect(col * resolution, row * resolution, resolution, resolution);
            ctx.fillStyle = cell ? 'black' : 'white';
            ctx.fill();
            ctx.stroke();
        }
    }
}

