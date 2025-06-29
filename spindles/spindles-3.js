function setup() {
    createCanvas(600, 600);
    colorMode(HSB);
    noLoop();
}

function draw() {
    background(255);

    // --- Configuration for the generative process ---
    const paramRanges = {
        numLines: { min: 20, max: 40 },
        baseLen: { min: 40, max: 60 },
        waveAmplitude: { min: 10, max: 25 },
        waveFrequency: { min: 3, max: 8 }
    };
    const rowHeight = 120; // How far to move down after each row
    const margin = 50;     // Distance from canvas edges
    const maxIterations = 500; // A safety break to prevent infinite loops
    // ------------------------------------------------

    let currentCx = margin;
    let currentCy = margin;
    let direction = 1; // 1 for right, -1 for left
    let previousSpindleLines = [];

    // Keep generating until we go off the bottom of the screen
    for (let i = 0; i < maxIterations && currentCy < height - margin; i++) {
        // Randomize parameters for each spindle in the chain
        const numLines = floor(random(paramRanges.numLines.min, paramRanges.numLines.max));
        const baseLen = random(paramRanges.baseLen.min, paramRanges.baseLen.max);
        const waveAmplitude = random(paramRanges.waveAmplitude.min, paramRanges.waveAmplitude.max);
        const waveFrequency = floor(random(paramRanges.waveFrequency.min, paramRanges.waveFrequency.max));

        // Draw the spindle and get the starting position for the next one
        const result = drawSpindleAndGetNextPos(currentCx, currentCy, numLines, baseLen, waveAmplitude, waveFrequency, direction, previousSpindleLines);
        
        // Update the position for the next iteration
        currentCx = result.nextPos.cx;
        currentCy = result.nextPos.cy;
        previousSpindleLines = result.lines;

        // Check for boundary conditions to change direction
        if (direction === 1 && currentCx >= width - margin) {
            currentCy += rowHeight;
            direction = -1;
        } else if (direction === -1 && currentCx <= margin) {
            currentCy += rowHeight;
            direction = 1;
        }
    }
}

function drawSpindleAndGetNextPos(cx, cy, numLines, baseLen, waveAmplitude, waveFrequency, direction, previousLines) {
    const currentSpindleLines = [];
    push();
    translate(cx, cy);

    stroke(0);
    
    // Draw the lines, checking for collisions
    for (let i = 0; i < numLines; i++) {
        const angle = map(i, 0, numLines, 0, TWO_PI);
        const len = baseLen + sin(angle * waveFrequency) * waveAmplitude;
        const x = len * cos(angle);
        const y = len * sin(angle);

        // Define the new line in global coordinates
        const line1 = { x1: cx, y1: cy, x2: cx + x, y2: cy + y };
        
        let hasCollision = false;
        for (const line2 of previousLines) {
            if (lineIntersect(line1.x1, line1.y1, line1.x2, line1.y2, line2.x1, line2.y1, line2.x2, line2.y2)) {
                hasCollision = true;
                break;
            }
        }

        if (!hasCollision) {
            line(0, 0, x, y);
            currentSpindleLines.push(line1);
        }
    }

    // Draw the ellipse on top
    noStroke();
    ellipse(0, 0, 8, 8);
    
    // --- Calculate the next position based on the current direction ---
    // Add a little randomness to the angle to make the path less rigid
    const nextAngle = (direction === 1 ? 0 : PI);
    
    // Calculate the length of the step in that direction
    const stepLen = baseLen + sin(nextAngle * waveFrequency) * waveAmplitude;
    
    // Calculate the absolute coordinates for the next spindle's center
    const nextCx = cx + stepLen * cos(nextAngle);
    const nextCy = cy + stepLen * sin(nextAngle);

    pop();
    
    // Return the calculated position and the lines that were actually drawn
    return { 
        nextPos: { cx: nextCx, cy: nextCy },
        lines: currentSpindleLines 
    };
}

// Checks if two line segments intersect.
// Based on: https://stackoverflow.com/a/24392281
function lineIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
	if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
		return false;
	}
	const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
	if (denominator === 0) {
		return false;
	}
	let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
	let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

	// Check if the intersection is within both line segments
	if (ua > 0 && ua < 1 && ub > 0 && ub < 1) {
		return true;
	}
	return false;
}