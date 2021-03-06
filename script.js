//let field = document.querySelectorAll('.point')

/*
for(let i = 0; i < field.length; i++)
    field[i].textContent = i + 1

let correctFielt = []

let container = document.querySelector('.container')

let upBtn = document.querySelector('#right')
let downBtn = document.querySelector('#left')

let firstStep = false;

let start = 0;

let filedArr = [
    [1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0]
]

let up = false

let moveStage;
//field[start].classList.toggle('pointFill')

// formula i * 12 + j dl9 vibora nujnogo elementa nodelist

if(up) {
    setInterval(qwe(),1000)
    console.log(start);
}

function stepRight() {
    if(start === 12) {
         field[start - 1].classList.toggle('pointFill')
         filedArr[0][start - 1] = 0;
         start = 0;
    }
    if(start != 0) {
        field[start-1].classList.toggle('pointFill')
        field[start].classList.toggle('pointFill')
        filedArr[0][start - 1] = 0;
        filedArr[0][start] = 1;
    } else if(start === 0 && firstStep) {
        field[start].classList.toggle('pointFill')
        filedArr[0][start] = 1;
    }
    console.log(filedArr); 
    start++
    firstStep = true;
}

function stepLeft() {
    if(start > 0) {
        field[start].classList.toggle('pointFill')
        field[start - 1].classList.toggle('pointFill')
    }
    if(start === 0 ) {
        field[start].classList.toggle('pointFill') 
        start = 12;
        field[start - 1].classList.toggle('pointFill') 
    }
    start--
    firstStep = true;
}

function upKey () {
    moveStage = setInterval(stepRight,2000);
}

function downKey () {
    moveStage =  setInterval(stepLeft,2000)
}

upBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clearInterval(moveStage);
    moveStage = null;
    upKey();
})

downBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clearInterval(moveStage);
    moveStage = null;
    downKey();
})*/

//our field

let field = document.querySelector('.container')

let scoreValue = 0;

let score = document.querySelector('.score-title')

for(let i = 1; i < 101; i++) {
    let point = document.createElement('div')
    point.classList.add('point')
    field.append(point)
}

let excelArr = document.querySelectorAll('.point')

let x = 1
let y = 10

for(let i = 0; i < 100; i++) {
    if(x === 11) {
        x = 1
        y--
    } 
    excelArr[i].setAttribute('posX',x)
    excelArr[i].setAttribute('posY', y)
    x++
}

//snake

function generateSnake () {
    let posX = Math.round(Math.random() * (10 - 3) + 3)
    let posY = Math.round(Math.random() * (10 - 1) + 1)
    return [posX, posY]
}

let beginGame = generateSnake();

let snakeBody = [document.querySelector(`[posX = "` + beginGame[0] + `"][posY = "` + beginGame[1] + `"]`),
document.querySelector(`[posX = "` + (beginGame[0] - 1) + `"][posY = "` + beginGame[1] + `"]`),
document.querySelector(`[posX = "` + (beginGame[0] - 2) + `"][posY = "` + beginGame[1] + `"]`)]

snakeBody[0].classList.add('snakeHead')
for(let i = 0 ; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('bodysnake')
}


//mouse

let mouse;

function createMouse () {
    function generateMouse () {
        let posX = Math.round(Math.random() * (10 - 1) + 1)
        let posY = Math.round(Math.random() * (10 - 1) + 1)
        return [posX, posY]
    }
    let mouseCords = generateMouse();
    mouse = document.querySelector(`[posX = "` + (mouseCords[0]) + `"][posY = "` + mouseCords[1] + `"]`) 
    
    while(mouse.classList.contains('bodysnake')) {
        mouseCords = generateMouse();;
        mouse = document.querySelector(`[posX = "` + (mouseCords[0]) + `"][posY = "` + mouseCords[1] + `"]`) 
    }
    mouse.classList.add('mouse')
}

createMouse();

//move

let direction = 'right';

function move () {
    let snakeCoord = [snakeBody[0].getAttribute('posX'),snakeBody[0].getAttribute('posY')]
    
    snakeBody[0].classList.remove('snakeHead');
    snakeBody[snakeBody.length - 1].classList.remove('bodysnake');
    snakeBody.pop();

    if(direction == 'right') {
        if(snakeCoord[0] < 10) {
            snakeBody.unshift(document.querySelector(`[posX = "` + (Number(snakeCoord[0]) + 1) + `"][posY = "` + snakeCoord[1] + `"]`))
        } else {
            snakeBody.unshift(document.querySelector(`[posX = "1"][posY = "` + snakeCoord[1] + `"]`))
        }
    } else if(direction == 'left') {
        if(snakeCoord[0] > 1) {
            snakeBody.unshift(document.querySelector(`[posX = "` + (Number(snakeCoord[0]) - 1) + `"][posY = "` + snakeCoord[1] + `"]`))
        } else {
            snakeBody.unshift(document.querySelector(`[posX = "10"][posY = "` + snakeCoord[1] + `"]`))
        }
    } else if(direction == 'up') {
        if(snakeCoord[1] < 10) {
            snakeBody.unshift(document.querySelector(`[posX = "` + snakeCoord[0] + `"][posY = "` + (Number(snakeCoord[1]) + 1) + `"]`))
        } else {
            snakeBody.unshift(document.querySelector(`[posX = "` + snakeCoord[0] + `"][posY = "1"]`))
        }
    } else if(direction == 'down') {
        if(snakeCoord[1] > 1) {
            snakeBody.unshift(document.querySelector(`[posX = "` + snakeCoord[0] + `"][posY = "` + (Number(snakeCoord[1]) - 1) + `"]`))
        } else {
            snakeBody.unshift(document.querySelector(`[posX = "` + snakeCoord[0] + `"][posY = "10"]`))
        }
    }
    
    if(snakeBody[0].getAttribute('posX')  == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY')  == mouse.getAttribute('posY')) {
        mouse.classList.remove('mouse')
        let a = snakeBody[snakeBody.length - 1].getAttribute('posX')
        let b = snakeBody[snakeBody.length - 1].getAttribute('posY')
        snakeBody.push(document.querySelector(`[posx = "` +a+ `"][posY = "`+ b + `"]`))
        createMouse();
        scoreValue++
        score.textContent = 'Collection point have: ' + scoreValue 
    }

    if(snakeBody[0].classList.contains('bodysnake')) { 
        clearInterval(interval);
    }
    
    snakeBody[0].classList.add('snakeHead')
    
    for(let i = 1 ; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('bodysnake')
    }
}

let interval = setInterval(move, 100)

window.addEventListener('keydown', (event) => {
    event.preventDefault();
    if(event.keyCode == 37 && direction != 'right')
        direction ='left';
    if(event.keyCode == 38 && direction != 'down')
        direction ='up';
    if(event.keyCode == 39 && direction != 'left')
        direction ='right';
    if(event.keyCode == 40 && direction != 'up')
        direction ='down';
})

let newGameBtn = document.querySelector('.reset')

newGameBtn.addEventListener('click', event => {
    event.preventDefault();
    location.reload();
})