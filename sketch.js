let cellSize = 8;
let asciiChar = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,^`'. ";
let video;
let colorize = false;

function setup() {
    createCanvas(windowWidth, windowHeight);

    textFont('monospace');
    textSize(cellSize);

    video = createCapture(VIDEO);
    video.size(100, 75);
    video.hide();

    let button = createButton('colorize');
    button.position(200, 100);
    button.mousePressed(toggleColorize);
}

function draw() {
    background(220);

    video.loadPixels();

    let cols = video.width;
    let rows = video.height;

    let offsetX = (width - cols * cellSize) / 2;
    let offsetY = (height - rows * cellSize) / 2;

    // let offsetX = displayWidth / 5.5;

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

            let char = asciiChar[charIndex];

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