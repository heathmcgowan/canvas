const hideControlsBtn = document.getElementById('hide-controls');
const controlPanel = document.getElementById('controls');
const canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var backgroundColor = "#000000";
var linesEnabled = false;
var circlesEnabled = false;
var rectanglesEnabled = false;
var lineSpeed = 50;
var rectangleSpeed = 50;
var circleSpeed = 50;
var strokeMin = 0.05;
var strokeMax = 3;
var radMin = 1;
var radMax = 50;

hideControlsBtn.addEventListener('click', function() {
    if (controlPanel.classList.contains('controls-hidden')) {
        controlPanel.classList.remove('controls-hidden');
        hideControlsBtn.innerHTML = 'Hide';
    } else {
        controlPanel.classList.add('controls-hidden')
        hideControlsBtn.innerHTML = '&nbsp &nbsp &nbsp >';
    };
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomX() {
    var x = (Math.random() * window.innerWidth);
    return x;
}

function getRandomY() {
    var y = (Math.random() * window.innerHeight);
    return y;
}

function getRandomDimension() {
    var dimension = (Math.random() * 40);
    return dimension;
}

function getRandomStrokeWidth() {
    var strokeWidth = (Math.random() * 0.1);
    return strokeWidth;
}

function getRandomNumber() {
    var number = (Math.random() * 2);
    return number;
}

function randomIntFromInterval(min, max) {
    min = min * 100;
    max = max * 100;
    return Math.floor(Math.random() * (max - min + 1) + min) / 100;    
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.fillStyle = backgroundColor;
c.fillRect(0, 0, canvas.width, canvas.height);

var lineLoop = window.setInterval(function(){
    drawLines();
}, lineSpeed);

var rectangleLoop = window.setInterval(function(){
    drawRectangles();
}, rectangleSpeed);

var circleLoop = window.setInterval(function(){
    drawCircles();
}, circleSpeed);

function drawLines() {  
    if (linesEnabled == true) {
        for (var i = 0; i < getRandomNumber(); i++) {
            c.beginPath();
            c.moveTo(getRandomX(), getRandomY());
            for (var z = 0; z < (Math.random() * 4); z++) {
                c.lineTo(getRandomX(), getRandomY());
            };
            c.strokeStyle = getRandomColor();
            c.lineWidth = randomIntFromInterval(strokeMin, strokeMax);
            c.stroke();
        };
    }
};

function drawRectangles() {
    if (rectanglesEnabled == true) {
        for (var i = 0; i < getRandomNumber(); i++) {
            c.fillStyle = getRandomColor();
            c.fillRect(getRandomX(), getRandomY(), getRandomDimension(), getRandomDimension());
        };
    };
};

function drawCircles() {
    if (circlesEnabled == true) {
        for (var i = 0; i < getRandomNumber(); i++) {
            c.beginPath();
            c.arc(getRandomX(), getRandomY(), randomIntFromInterval(radMin, radMax), 0, Math.PI * 2, false);
            c.fillStyle = getRandomColor();
            c.fill();
        };
    };
};



// Controls
var colorPicker = document.querySelectorAll('.jscolor');
var controlButton = document.querySelectorAll('.control-button');
var slider = document.querySelectorAll('.slider');

colorPicker.forEach(input => input.addEventListener('change', updateColor));
controlButton.forEach(input => input.addEventListener('click', controlButtonClicked));
slider.forEach(input => input.addEventListener('input', sliderChanged));

function updateColor() {
    let contentToColor = this.dataset.contenttocolor;
    let selectedColor = this.value;
    if (contentToColor == 'background') {
        backgroundColor = `#${selectedColor}`;
        c.fillStyle = backgroundColor;
        c.fillRect(0, 0, canvas.width, canvas.height);
    };
}

function controlButtonClicked() {
    let clickedButton = this.dataset.buttontype;
    updateButtonClass(this);
    if (clickedButton == 'lines') {
        linesEnabled = !linesEnabled;
    } else if (clickedButton == 'rectangles') {
        rectanglesEnabled = !rectanglesEnabled;
    } else if (clickedButton == 'circles') {
        circlesEnabled = !circlesEnabled;
    }
}

function updateButtonClass(clickedButton) {
    if (clickedButton.classList.contains('active-button')) {
        clickedButton.classList.remove('active-button');
    } else {
        clickedButton.classList.add('active-button')
    };
}

function sliderChanged() {
    let sliderType = this.dataset.slidertype;
    let sliderValue = this.value;
    let suffix = this.dataset.suffix;
    document.getElementById(`${sliderType}-value`).innerHTML = sliderValue + suffix;
    if (sliderType == 'stroke-max') {
        strokeMax = sliderValue;
    } else if (sliderType == 'radius-max') {
        radMax = sliderValue;
    } else if (sliderType == 'line-speed') {
        document.getElementById(`${sliderType}-value`).innerHTML = 101 - sliderValue;
        clearInterval(lineLoop);
        lineSpeed = sliderValue;
        lineLoop = window.setInterval(function(){
            drawLines();
        }, lineSpeed);
    } else if (sliderType == 'rectangle-speed') {
        document.getElementById(`${sliderType}-value`).innerHTML = 101 - sliderValue;
        clearInterval(rectangleLoop);
        rectangleSpeed = sliderValue;
        rectangleLoop = window.setInterval(function(){
            drawRectangles();
        }, rectangleSpeed);
    } else if (sliderType == 'circle-speed') {
        document.getElementById(`${sliderType}-value`).innerHTML = 101 - sliderValue;
        clearInterval(circleLoop);
        circleSpeed = sliderValue;
        circleLoop = window.setInterval(function(){
            drawCircles();
        }, circleSpeed);
    };
}