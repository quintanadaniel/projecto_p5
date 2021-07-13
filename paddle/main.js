let playerScore = 0
let paddle
let ball
let bricks
let gameState

//añadimos musica
var songWin
var songLose
var music


function preload() {
    songWin = loadSound("sounds/applause.mp3")
    songLose = loadSound("sounds/voice-Cartoon-Laugh-01.mp3")
    music = loadSound("sounds/Music - 01.mp3")
}

function setup(){
    createCanvas(1100,600)

    let colors = createColors()
    music.play()
    gameState = 'playing'
    paddle = new Paddle()
    ball = new Ball(paddle)

    bricks = createBricks(colors)
    
}



function createColors(){
    const colors = []
    colors.push(color(265,165,0))
    colors.push(color(135,206,250))
    colors.push(color(147,112,219))
    for (let i = 0; i < 10; i++) {
        colors.push(color(random(0,255),random(0,255),random(0,255)))
    }
    return colors
}

function createBricks(colors){
    const bricks = []
    const rows = 5
    const bricksPerRow = 5
    const brickWidth = width / bricksPerRow
    for (let row = 0; row < rows; row++){
        for (let i = 0; i < bricksPerRow;i++){
            brick = new Brick(createVector(brickWidth * i,25 * row),brickWidth,25,colors[Math.floor(random(0,colors.length))])
            bricks.push(brick)
        }
    }
    return bricks
}


function draw(){
    if (gameState === 'playing'){
        
        background(0)
        
        ball.bounce()
        ball.bouncePaddle()
        ball.update()
        
        if (keyIsDown(LEFT_ARROW)){
            paddle.move('left')
        } 
        if (keyIsDown(RIGHT_ARROW)){
            paddle.move('right')
        }
        
        for (let i = bricks.length - 1; i >= 0; i--) {
            const brick = bricks[i]
            if (brick.colition(ball)) {
                ball.reverse('y')
                bricks.splice(i, 1)
                playerScore += brick.points
            } else {
                brick.display()
            }
        }
        
        paddle.display()
        ball.display()
        
        textSize(32)
        fill(255)
        text(`Score:${playerScore}`,width -150,50)
    
        if (ball.outScreen()) {
            music.stop()
            gameState = 'Lose!, Ha Ha Ha'
            songLose.play()
        }
    
        if (bricks.length === 0) {
            music.stop()
            gameState = ' Win!!, Brutality'
            songWin.play()
        }

    }else{
        textSize(100)
        player = false
        fill(255)
        text(`You ${gameState}!!!`, width / 2 -500, height / 2)
    }
}


