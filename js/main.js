const hideControlsBtn = document.getElementById('hide-controls');
const controlPanel = document.getElementById('controls');
const canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var canvasWidth = 1920;
var canvasHeight = 1080;
var backgroundColor = "#000000";
var lineColor = "#FFFFFF";
var rectangleColor = "#FFFFFF";
var circleColor = "#FFFFFF";
var linesEnabled = false;
var circlesEnabled = false;
var rectanglesEnabled = false;
var randomLineColor = true;
var randomRectangleColor = true;
var randomCircleColor = true;
var lineSpeed = 50;
var rectangleSpeed = 50;
var circleSpeed = 50;
var strokeMin = 0.05;
var strokeMax = 2;
var radMin = 1;
var radMax = 50;
var circleStrokeWidth = 2;
var rectangleStrokeWidth = 2;
var filledCircles = false;
var filledRectangles = false;
var rectWidthMin = 1;
var rectWidthMax = 50;
var rectHeightMin = 1;
var rectHeightMax = 50;

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
    var x = (Math.random() * (canvasWidth + 200)) - 100;
    return x;
}

function getRandomY() {
    var y = (Math.random() * (canvasHeight + 200)) - 100;
    return y;
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

canvas.width = canvasWidth;
canvas.height = canvasHeight;
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
            if (randomLineColor == true) {
                c.strokeStyle = getRandomColor();
            } else {
                c.strokeStyle = lineColor;
            };
            c.lineWidth = randomIntFromInterval(strokeMin, strokeMax);
            c.stroke();
        };
    }
};

function drawRectangles() {
    if (rectanglesEnabled == true) {
        if (randomRectangleColor == true) {
            var fillColor = getRandomColor();
        } else {
            var fillColor = rectangleColor;
        };
        for (var i = 0; i < getRandomNumber(); i++) {
            if (filledRectangles == true) {
                c.fillStyle = fillColor;
                c.fillRect(getRandomX(), getRandomY(), randomIntFromInterval(rectWidthMin, rectWidthMax), randomIntFromInterval(rectHeightMin, rectHeightMax));    
            } else {
                c.strokeStyle = fillColor;
                c.lineWidth = rectangleStrokeWidth;
                c.strokeRect(getRandomX(), getRandomY(), randomIntFromInterval(rectWidthMin, rectWidthMax), randomIntFromInterval(rectHeightMin, rectHeightMax));
            };
        };
    };
};

function drawCircles() {
    if (circlesEnabled == true) {
        if (randomCircleColor == true) {
            var fillColor = getRandomColor();
        } else {
            var fillColor = circleColor;
        };
        for (var i = 0; i < getRandomNumber(); i++) {
            if (filledCircles == true) {
                c.beginPath();
                c.arc(getRandomX(), getRandomY(), randomIntFromInterval(radMin, radMax), 0, Math.PI * 2, false);
                c.fillStyle = fillColor;
                c.fill();      
            } else {
                c.beginPath();
                c.arc(getRandomX(), getRandomY(), randomIntFromInterval(radMin, radMax), 0, Math.PI * 2, false);
                c.strokeStyle = fillColor;
                c.lineWidth = circleStrokeWidth;
                c.stroke();
            };
        };
    };
};



// Controls
var colorPicker = document.querySelectorAll('.jscolor');
var controlButton = document.querySelectorAll('.control-button');
var slider = document.querySelectorAll('.slider');
var randomLineColorCheckbox = document.getElementById('random-line-color-checkbox');
var randomRectangleColorCheckbox = document.getElementById('random-rectangle-color-checkbox');
var randomCircleColorCheckbox = document.getElementById('random-circle-color-checkbox');
var fillCircleCheckbox = document.getElementById('fill-circle-checkbox');
var fillRectangleCheckbox = document.getElementById('fill-rectangle-checkbox');

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
    } else if (contentToColor == 'line-color') {
        lineColor = `#${selectedColor}`;
        randomLineColor = false;
        randomLineColorCheckbox.checked = false;
    } else if (contentToColor == 'rectangle-color') {
        rectangleColor = `#${selectedColor}`;
        randomRectangleColor = false;
        randomRectangleColorCheckbox.checked = false;
    } else if (contentToColor == 'circle-color') {
        circleColor = `#${selectedColor}`;
        randomCircleColor = false;
        randomCircleColorCheckbox.checked = false;
    };
}

randomLineColorCheckbox.addEventListener('change', function() {
    if (this.checked) {
        randomLineColor = true;
    } else {
        randomLineColor = false;
    };
});

randomRectangleColorCheckbox.addEventListener('change', function() {
    if (this.checked) {
        randomRectangleColor = true;
    } else {
        randomRectangleColor = false;
    };
});

randomCircleColorCheckbox.addEventListener('change', function() {
    if (this.checked) {
        randomCircleColor = true;
    } else {
        randomCircleColor = false;
    };
});

fillCircleCheckbox.addEventListener('change', function() {
    if (this.checked) {
        filledCircles = true;
    } else {
        filledCircles = false;
    };
});

fillRectangleCheckbox.addEventListener('change', function() {
    if (this.checked) {
        filledRectangles = true;
    } else {
        filledRectangles = false;
    };
});

function controlButtonClicked() {
    let clickedButton = this.dataset.buttontype;
    updateButtonClass(this);
    if (clickedButton == 'lines') {
        linesEnabled = !linesEnabled;
    } else if (clickedButton == 'rectangles') {
        rectanglesEnabled = !rectanglesEnabled;
    } else if (clickedButton == 'circles') {
        circlesEnabled = !circlesEnabled;
    };
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
    } else if (sliderType == 'circle-stroke-width') {
        circleStrokeWidth = sliderValue;
    } else if (sliderType == 'rectangle-stroke-width') {
        rectangleStrokeWidth = sliderValue;
    } else if (sliderType == 'radius-max') {
        radMax = sliderValue;
    } else if (sliderType == 'rect-width-max') {
        rectWidthMax = sliderValue;
    } else if (sliderType == 'rect-height-max') {
        rectHeightMax = sliderValue;
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
var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
});