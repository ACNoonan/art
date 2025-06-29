function setup() {
    createCanvas(600, 600);
    colorMode(HSB);
    noLoop();
}

function draw() {
    background(255);
    stroke(0); // Set line color to black

    const centerX = width / 2;
    const centerY = height / 2;
    const numLines = 54;
    const baseLen = 100;
    const waveAmplitude = 10; // Controls the height of the wave
    const waveFrequency = 12;  // Controls the number of waves

    // Draw the lines
    for (let i = 0; i < numLines; i++) {
        const angle = map(i, 0, numLines, 0, TWO_PI);
        
        // Calculate length using a sine wave
        const len = baseLen + sin(angle * waveFrequency) * waveAmplitude;

        const x = centerX + len * cos(angle);
        const y = centerY + len * sin(angle);
        line(centerX, centerY, x, y);
    }

    // Draw the ellipse on top
    ellipse(centerX, centerY, 25, 25);
}