function setup() {
  createCanvas(540, 900);
  noLoop();
}

function draw() {
  background(220);
  const cellSize = 15;
  const cols = width / cellSize;
  const rows = height / cellSize;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cellSize;
      const y = row * cellSize;

      // Use sine function to create a wave effect
      const wave = sin((col + row) * 0.3) * 0.5 + 0.5; // Normalize to 0-1

      // Determine color based on wave value
      const isGreen = wave > 0.5;

      fill(isGreen ? color(4, 128, 6) : color(255));
      rect(x, y, cellSize, cellSize);
    }
  }
}