function setup() {
    createCanvas(600, 600);
    colorMode(HSB);
    noLoop();
}

function draw() {
    background(255);
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // --- 1. Draw the Inner Spindle ---
    const numLines = 54;
    const baseLen = 100;
    const waveAmplitude = 10;
    const waveFrequency = 12;

    stroke(0);
    strokeWeight(1); // Reset stroke weight for the lines
    for (let i = 0; i < numLines; i++) {
        const angle = map(i, 0, numLines, 0, TWO_PI);
        const len = baseLen + sin(angle * waveFrequency) * waveAmplitude;
        const x = centerX + len * cos(angle);
        const y = centerY + len * sin(angle);
        line(centerX, centerY, x, y);
    }

    // Draw the central ellipse on top
    noStroke();
    ellipse(centerX, centerY, 25, 25);

    // --- 2. Draw the Thick Outer Circle ---
    const maxInnerRadius = baseLen + waveAmplitude;
    const circlePadding = 20;
    const circleRadius = maxInnerRadius + circlePadding;

    stroke(0);
    strokeWeight(12); // Make the circle thick
    noFill();
    circle(centerX, centerY, circleRadius * 2);

    // --- 3. Draw the Wave around the Circle ---
    const outerWaveBaseRadius = circleRadius + 25; // Add more space
    const outerWaveAmplitude = 9;
    const outerWaveFrequency = 15;
    
    strokeWeight(4); // A medium thickness for the final wave
    beginShape();
    // Loop 360 degrees to draw a continuous line
    for (let i = 0; i < 360; i++) {
        const angle = radians(i);
        const r = outerWaveBaseRadius + sin(angle * outerWaveFrequency) * outerWaveAmplitude;
        const x = centerX + r * cos(angle);
        const y = centerY + r * sin(angle);
        vertex(x, y);
    }
    endShape(CLOSE);
}