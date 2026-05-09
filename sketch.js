let cellSize = 8;
let defaultChar = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,^`'. ";
let asciiChar = defaultChar;
let video;
let colorize = false;

let charsetInput;

function setup() {
    createCanvas(windowWidth, windowHeight);

    charsetInput = createInput(defaultChar);
    charsetInput.position(CENTER, 100);
    charsetInput.size(400);

    textFont('monospace');
    textSize(cellSize);

    video = createCapture(VIDEO);
    video.size(100, 75);
    video.hide();

    let button = createButton('colorize');
    button.position(200, 160);
    button.addClass('button');
    button.mousePressed(toggleColorize);
}

function draw() {
    background(255);

    createTitle();
    updateCharset();

    video.loadPixels();

    let chars = Array.from(asciiChar);

    let cols = video.width;
    let rows = video.height;

    let offsetX = (width - cols * cellSize) / 2;
    let offsetY = (height - rows * cellSize) / 2 + 50;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            // flip horizontal (mirror)
            let x = cols - i - 1;

            // pos of pixel's data in pixels array
            // [R, G, B, A, R, G, B, A, R, G, B, A, ...]
            // pixel 0 → [R,G,B,A], each pixel occupies 4 slots
            let index = (x + j * cols) * 4;

            let r = video.pixels[index];
            let g = video.pixels[index + 1];
            let b = video.pixels[index + 2];

            // avg intensity of 3 channels
            let brightnessVal = (r + g + b) / 3;
            let charIndex = floor(map(brightnessVal, 0, 255, 0, asciiChar.length - 1));

            let char = chars[charIndex];

            if (colorize) {
                fill(r, g, b);
            } else {
                fill(0);
            }

            text(char, i * cellSize + offsetX, j * cellSize + offsetY);
        }
    }
}

function toggleColorize() {
    colorize = !colorize;
}

function createTitle() {
    push();
        fill(0);
        textSize(12);
        textFont('monospace');
        textAlign(CENTER);
        text('a little ascii camera', width / 2, 75);

        text('insert characters to use for the camera!', width / 2, 90);
    pop();
}

function updateCharset() {
    let value = charsetInput.value();

    if (value.length === 0) {
        asciiChar = defaultChar;
        return;
    }

    asciiChar = value;
}