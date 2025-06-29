function setup() {
    createCanvas(600, 600);
    colorMode(HSB);
    noLoop();
}

function draw() {
    background(255);
    
    const cols = 3;
    const rows = 3;
    const cellW = width / cols;
    const cellH = height / rows;
    const waveFrequency = 12; // Used to calculate the rotation

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const cx = i * cellW + cellW / 2;
            const cy = j * cellH + cellH / 2;
            
            let rotation = 3.14;
            // Apply rotation in a checkerboard pattern
            if ((i + j) % 2 === 1) {
                // Rotate to align peaks with troughs
                rotation = PI / waveFrequency;
            }
            
            drawSpindle(cx, cy, rotation, waveFrequency);
        }
    }
}

function drawSpindle(cx, cy, rot, waveFrequency) {
    const numLines = 25;
    const baseLen = 60;
    const waveAmplitude = 24;

    push();
    translate(cx, cy);
    rotate(rot);

    stroke(0);
    
    // Draw the lines
    for (let i = 0; i < numLines; i++) {
        const angle = map(i, 0, numLines, 0, TWO_PI);
        const len = baseLen + sin(angle * waveFrequency) * waveAmplitude;
        const x = len * cos(angle);
        const y = len * sin(angle);
        line(0, 0, x, y);
    }

    // Draw the ellipse on top
    noStroke();
    ellipse(0, 0, 8, 8);

    pop();
}