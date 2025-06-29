function setup() {
    createCanvas(600, 800);
    noStroke();
    
    // Alternate light/dark based on block zones
    let blockSize = 8;
    let motif = [
        [0, 1, 0, 0],
        [1, 0, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 1]
      ];
    
    // Loop through and draw motif repeatedly
    for (let x = 0; x < width; x += blockSize) {
      for (let y = 0; y < height; y += blockSize) {
        let motifX = (x / blockSize) % motif.length;
        let motifY = (y / blockSize) % motif.length;
        
        if (motif[motifY][motifX] === 0) {
          fill(240); // light
        } else {
          fill(50); // dark
        }
        rect(x, y, blockSize, blockSize);
      }
    }
}