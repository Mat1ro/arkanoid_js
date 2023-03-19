let canvas = document.getElementById("picture");

let canvasWidth = 1423;
let canvasHeight = 1423;


canvas.width = game.width;
canvas.height = game.height;

let canvasContext = canvas.getContext("2d");

canvasContext.fillStyle = "#F5F0F1";
canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

InitEventsListeners();
play();