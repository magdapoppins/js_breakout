
// Canvas ja siitä 2d-konteksti, jolle piirretään
var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d")
var ballRadius = 10

// Pallon muuttujat
var x = canvas.width / 2
var y = canvas.heigth - 20
var dx = 2
var dy = -2

// Lyömätason muuttujat 
var baseWidth = 80 
var baseHeight = 10
var baseX = (canvas.width-baseWidth)/2

// Näppäinten aloitustilat
var rightPressed = false
var leftPressed = false

// Rikottavien tiilten muuttujat
var bricksPerRow = 12
var brickRows = 3
var brickHeight = 10
var brickWidth = 60
var brickPadding = 10
var brickOffsetTop = 30
var brickOffsetLeft = 30
var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;

// Pisteidenlaskenta
var score = 0

// Asetetaan näppämille kuuntelijat
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Luodaan tiilet kokoelmaan
var bricks = [];
for(var c=0; c<bricksPerRow; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRows; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Pisteiden kirjaaminen 
function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Pisteet: "+score, 10, 20);
}

// Pallon törmäys rikottaviin tiiliin
function collisionDetection() {
    for(var c=0; c<bricksPerRow; c++) {
        for(var r=0; r<brickRows; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRows*bricksPerRow) {
                        alert("VOITIT PELIN!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Nuolinäppäinten painallukset
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

// Piirtofunktiot
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
function drawBase() {
    ctx.beginPath();
    ctx.rect(baseX, canvas.height-baseHeight, baseWidth, baseHeight);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<bricksPerRow; c++) {
        for(var r=0; r<brickRows; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Itse kentän piirtämisen funktio
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBase();
    drawScore();
    collisionDetection();
    drawBricks();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > baseX && x < baseX + baseWidth) {
            dy = -dy;
        }
        else {
            alert("KUOLIT");
            document.location.reload();
        }
    }
    
    if(rightPressed && baseX < canvas.width-baseWidth) {
        baseX += 7;
    }
    else if(leftPressed && baseX > 0) {
        baseX -= 7;
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, 10);





