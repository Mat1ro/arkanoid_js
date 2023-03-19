function drawBall(x, y, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, 2 * Math.PI)
    canvasContext.fill();
}

function drawRocket(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

function updateBall(ball, game, rocket) {
    ball.x += ball.xDirection;
    ball.y += ball.yDirection;

    // (ball.y + ball.radius > game.height)
    if (ball.y - ball.radius < 0) {
        ball.yDirection = -ball.yDirection;
    }
    if ((ball.x + ball.radius > game.width) || (ball.x - ball.radius < 0)) {
        ball.xDirection = -ball.xDirection;
    }
    if (ball.y + ball.radius > rocket.y && ball.x > rocket.x && ball.x < rocket.x + rocket.width) {
        ball.yDirection = -ball.yDirection;
        ball.xDirection *= 1.05;
        ball.yDirection *= 1.05;
        counter += 1
    }
    if (ball.y - rocket.height - ball.radius > rocket.y && ball.x > rocket.x && ball.x < rocket.x + rocket.width) {
        ball.yDirection = -ball.yDirection;
    }
    if (ball.x + ball.radius >= rocket.x && ball.y >= rocket.y && ball.y <= rocket.y + rocket.height) {
        ball.xDirection = -ball.xDirection;
    }
    if (ball.x - ball.radius <= rocket.x + rocket.width && ball.y >= rocket.y && ball.y <= rocket.y + rocket.height) {
        ball.xDirection = -ball.xDirection;
    }
}


function drawScore() {
    canvasContext.font = "30px Arial";
    canvasContext.fillStyle = "#000000"
    canvasContext.fillText(`Score: ${counter}`, 10, 50);
}

function drawBackground() {
    canvasContext.fillStyle = game.background;
    canvasContext.fillRect(0, 0, game.width, game.height);
    drawScore()
}

function drawFrame() {
    canvasContext.clearRect(0, 0, game.width, game.height);
    drawBackground();
    drawBall(ball.x, ball.y, ball.radius, ball.color);
    drawRocket(rocket.x, rocket.y, rocket.width, rocket.height, rocket.color);
}

function InitEventsListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove);
    window.addEventListener('keydown', onCanvasKeyDown);
}

function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        rocket.x -= rocket.xDirection;
    }
    if (event.key === "ArrowRight") {
        rocket.x += rocket.xDirection;
    }
    clampRacketPosition();

}

function onCanvasMouseMove(event) {
    rocket.x = event.clientX - rocket.width / 2;
    clampRacketPosition();
}

function clampRacketPosition() {
    if (rocket.x < 0) {
        rocket.x = 0;
    }
    if (rocket.x + rocket.width > game.width) {
        rocket.x = game.width - rocket.width;
    }
}

function isLose(y) {
    if (ball.y - ball.radius > game.height) {
        alert(`Ты проиграл, твой счет ${counter}, чтобы попробовать заново перезагрузи страницу`)
        return false
    }
    return true
}

function play() {
    if (isLose()) {
        drawFrame();
        drawRocket(rocket.x, rocket.y, rocket.width, rocket.height, rocket.color);
        updateBall(ball, game, rocket);
        requestAnimationFrame(play);
    }
}

