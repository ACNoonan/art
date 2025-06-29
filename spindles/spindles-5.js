function setup() {
    createCanvas(600, 600);
    colorMode(HSB);
    noLoop();
}

function draw() {
    background(255);
    stroke(0);
    noFill();

    // --- Configuration ---
    const centerX = width / 2;
    const centerY = height / 2;
    const numLines = 22;
    const straightLen = 120; // How far to go straight before curving
    const stepSize = 5;      // How far to move each step
    const turnFactor = 0.05; // How sharply to curve
    const gridSize = 4;      // For collision detection (smaller is more precise)
    // ---------------------

    // Create a grid to track occupied space
    const cols = floor(width / gridSize);
    const rows = floor(height / gridSize);
    const grid = Array(cols).fill(0).map(() => Array(rows).fill(false));

    // Mark the center as occupied
    grid[floor(centerX / gridSize)][floor(centerY / gridSize)] = true;

    // Generate each path
    for (let i = 0; i < numLines; i++) {
        const path = [];
        let angle = map(i, 0, numLines, 0, TWO_PI);
        let x = centerX;
        let y = centerY;
        path.push({x, y});

        // Loop until the path goes off-screen or collides
        for (let step = 0; step < 1000; step++) {
            const distFromCenter = dist(centerX, centerY, x, y);

            // Start curving after reaching the straight length
            if (distFromCenter > straightLen) {
                angle += random(-turnFactor, turnFactor);
            }

            // Calculate next position
            const nextX = x + stepSize * cos(angle);
            const nextY = y + stepSize * sin(angle);
            
            // Get grid coordinates
            const gridX = floor(nextX / gridSize);
            const gridY = floor(nextY / gridSize);

            // Stop if off-screen or if the spot is taken
            if (gridX < 0 || gridX >= cols || gridY < 0 || gridY >= rows || grid[gridX][gridY]) {
                break;
            }
            
            // Mark new spot as taken
            grid[gridX][gridY] = true;
            x = nextX;
            y = nextY;
            path.push({x, y});
        }
        
        // Draw the generated path
        if (path.length > 1) {
            beginShape();
            for (const p of path) {
                vertex(p.x, p.y);
            }
            endShape();
        }
    }

    // Draw the ellipse on top
    fill(255); // White fill to cover the line starts
    stroke(0); // Ensure the ellipse has a black outline
    ellipse(centerX, centerY, 25, 25);
}