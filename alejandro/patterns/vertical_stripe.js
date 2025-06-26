let cellSize = 10;
let colors = [];
let stripeDefinitions = []; // Stores the type and width of each stripe

function setup() {
  createCanvas(600, 600);
  colors = [color(255), color(178, 34, 34)]; // White, Red
  noLoop();
  generateNewPattern();
}

function generateNewPattern() {
  stripeDefinitions = [];
  let currentX = 0;
  let numCols = width / cellSize;

  // Generate a random sequence of stripes until the canvas is full
  while (currentX < numCols) {
    // Randomly choose a stripe type: 0 for alternating, 1 for solid
    let stripeType = floor(random(2)); 
    // Randomly choose a width for this stripe
    let stripeWidth = floor(random(2, 10));

    stripeDefinitions.push({ type: stripeType, width: stripeWidth });
    currentX += stripeWidth;
  }

  redraw();
}

function draw() {
  background(220);
  
  let currentStripeDefIndex = 0;
  let countInStripe = 0;

  // Iterate through columns
  for (let col = 0; col < width / cellSize; col++) {
    let currentStripe = stripeDefinitions[currentStripeDefIndex];
    
    // Iterate through rows for each column
    for (let row = 0; row < height / cellSize; row++) {
      let x = col * cellSize;
      let y = row * cellSize;
      
      // CORE LOGIC: Determine color based on stripe type
      if (currentStripe.type === 1) {
        // Solid stripe
        fill(colors[1]);
      } else {
        // Alternating (plain weave) stripe
        // The color is based on the row number
        fill(colors[row % 2]);
      }
      
      noStroke();
      rect(x, y, cellSize, cellSize);
    }
    
    // Logic to move to the next stripe definition
    countInStripe++;
    if (countInStripe >= currentStripe.width) {
      currentStripeDefIndex++;
      countInStripe = 0;
      // Safety check to prevent running out of definitions
      if (currentStripeDefIndex >= stripeDefinitions.length) {
        break; // Stop if we've drawn all our defined stripes
      }
    }
  }
}

function mousePressed() {
  generateNewPattern();
}