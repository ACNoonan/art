function setup() {
    createCanvas(540, 900);
    noLoop();
  }

function draw() {
  background(220);
  const cellSize = 15;
  const cols = width / cellSize;
  const rows = height / cellSize;

  // Generate the diagonal pattern once
  const tilePattern = generateDiagonalPattern(18, 30);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cellSize;
      const y = row * cellSize;

      // Use modulo to repeat the pattern across the entire canvas
      const patternRow = row % tilePattern.length;
      const patternCol = col % tilePattern[0].length;

      // Determine color based on the generated pattern
      const isGreen = tilePattern[patternRow][patternCol] === 1;

      fill(isGreen ? color(4, 128, 6) : color(255));
      rect(x, y, cellSize, cellSize);
    }
  }
}

function generateDiagonalPattern(tileWidth, tileHeight) {
  const pattern = Array.from({ length: tileHeight }, () => Array(tileWidth).fill(0));
  const cellSize = 15;

  let currentCol = 0;
  let currentRow = 0;

  while (currentRow < tileHeight) {
    // Determine the number of white squares before the next green line
    const whiteSpaces = Math.floor(Math.random() * 5) + 2; // Between 2 and 6
    currentCol += whiteSpaces;

    if (currentCol >= tileWidth) {
      break; // Stop if we exceed the grid width
    }

    // Determine the number of green squares in the column
    const greenColumnHeight = Math.random() < 0.1 ? 1 : Math.random() < 0.3 ? 3 : 2; // 10% chance for 1, 30% for 3, otherwise 2

    // Place the green squares
    for (let i = 0; i < greenColumnHeight; i++) {
      if (currentRow + i < tileHeight) {
        pattern[currentRow + i][currentCol] = 1;
      }
    }

    // Move diagonally: one left and one down
    currentCol--;
    currentRow++;
  }

  return pattern;
}
