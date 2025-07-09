/**
 * Pattern Renderer for Weave Draft Visualization
 * Loads JSON pattern data and renders with interactive controls
 */

// Global variables
let patternData = null;
let currentMatrix = null;
let cellSize = 8;
let scale1 = 1.0;
let scale2 = 1.2;
let rotation = 0.0;
let showMoire = false;
let warpColor, weftColor;
let controls = {};

// Pattern loading and setup
function preload() {
  // Load pattern data from JSON file
  // This would typically be loaded from a file or API
  // For now, we'll use a placeholder
}

function setup() {
  createCanvas(1200, 800);
  
  // Default colors
  warpColor = color(240, 240, 240); // Light gray
  weftColor = color(60, 90, 140);   // Deep blue
  
  // Create UI controls
  createControls();
  
  // Load default pattern if available
  loadDefaultPattern();
}

function draw() {
  background(200);
  
  if (currentMatrix) {
    // Render the pattern
    renderPattern();
    
    // Render UI
    renderUI();
  } else {
    // Show loading message
    fill(0);
    textAlign(CENTER);
    textSize(16);
    text("Load a pattern file or use default pattern", width/2, height/2);
  }
}

function loadDefaultPattern() {
  // Create a simple shadow weave pattern as default
  const defaultPattern = {
    name: "Default Shadow Weave",
    matrix: [
      [0, 1, 0, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 0, 1, 0, 1],
      [0, 1, 0, 1, 1, 0, 1, 0],
      [0, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 1, 0, 1, 1, 0],
      [0, 1, 1, 0, 1, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 0],
      [1, 1, 0, 1, 0, 0, 1, 0]
    ],
    colors: {
      "1": [240, 240, 240], // Warp color
      "2": [60, 90, 140]    // Weft color
    },
    metadata: {
      shafts: 4,
      treadles: 4
    }
  };
  
  loadPattern(defaultPattern);
}

function loadPattern(data) {
  patternData = data;
  currentMatrix = data.matrix;
  
  // Update colors if provided
  if (data.colors) {
    const colors = data.colors;
    if (colors["1"]) warpColor = color(colors["1"][0], colors["1"][1], colors["1"][2]);
    if (colors["2"]) weftColor = color(colors["2"][0], colors["2"][1], colors["2"][2]);
  }
  
  console.log("Pattern loaded:", data.name);
}

function renderPattern() {
  const matrix = showMoire ? generateMoireMatrix() : currentMatrix;
  
  if (!matrix || matrix.length === 0) return;
  
  const rows = matrix.length;
  const cols = matrix[0].length;
  
  // Calculate pattern area
  const patternWidth = cols * cellSize;
  const patternHeight = rows * cellSize;
  const startX = 50;
  const startY = 50;
  
  // Render pattern grid
  noStroke();
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const value = matrix[row][col];
      
      // Set fill color based on value
      if (value === 1) {
        fill(weftColor); // Weft visible
      } else {
        fill(warpColor); // Warp visible
      }
      
      const x = startX + col * cellSize;
      const y = startY + row * cellSize;
      
      rect(x, y, cellSize, cellSize);
    }
  }
  
  // Draw pattern border
  stroke(0);
  strokeWeight(2);
  noFill();
  rect(startX, startY, patternWidth, patternHeight);
}

function generateMoireMatrix() {
  if (!currentMatrix) return null;
  
  const height = currentMatrix.length;
  const width = currentMatrix[0].length;
  const moireMatrix = [];
  
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      // Sample from two different scales
      const x1 = Math.floor((x * scale1) % width);
      const y1 = Math.floor((y * scale1) % height);
      
      let x2 = Math.floor((x * scale2) % width);
      let y2 = Math.floor((y * scale2) % height);
      
      // Apply rotation to second pattern
      if (rotation !== 0) {
        const cosR = Math.cos(rotation);
        const sinR = Math.sin(rotation);
        const x2Rot = Math.floor((x2 * cosR - y2 * sinR) % width);
        const y2Rot = Math.floor((x2 * sinR + y2 * cosR) % height);
        x2 = x2Rot >= 0 ? x2Rot : width + x2Rot;
        y2 = y2Rot >= 0 ? y2Rot : height + y2Rot;
      }
      
      // Combine patterns for moire effect
      const value1 = currentMatrix[y1][x1];
      const value2 = currentMatrix[y2][x2];
      
      // Create interference pattern
      const moireValue = (value1 + value2) % 2;
      row.push(moireValue);
    }
    moireMatrix.push(row);
  }
  
  return moireMatrix;
}

function createControls() {
  // Create sliders for moire parameters
  controls.cellSizeSlider = createSlider(4, 20, cellSize);
  controls.cellSizeSlider.position(20, height - 150);
  
  controls.scale1Slider = createSlider(0.5, 3.0, scale1, 0.1);
  controls.scale1Slider.position(20, height - 120);
  
  controls.scale2Slider = createSlider(0.5, 3.0, scale2, 0.1);
  controls.scale2Slider.position(20, height - 90);
  
  controls.rotationSlider = createSlider(0, Math.PI, rotation, 0.01);
  controls.rotationSlider.position(20, height - 60);
  
  // Create checkbox for moire toggle
  controls.moireCheckbox = createCheckbox('Show Moire', showMoire);
  controls.moireCheckbox.position(20, height - 30);
  
  // Create buttons
  controls.exportButton = createButton('Export Pattern');
  controls.exportButton.position(200, height - 60);
  controls.exportButton.mousePressed(exportPattern);
  
  controls.loadButton = createButton('Load Pattern');
  controls.loadButton.position(200, height - 30);
  controls.loadButton.mousePressed(() => {
    const input = createFileInput(handleFile);
    input.elt.click();
  });
}

function updateControls() {
  // Update values from sliders
  cellSize = controls.cellSizeSlider.value();
  scale1 = controls.scale1Slider.value();
  scale2 = controls.scale2Slider.value();
  rotation = controls.rotationSlider.value();
  showMoire = controls.moireCheckbox.checked();
}

function renderUI() {
  updateControls();
  
  // Draw control labels
  fill(0);
  textAlign(LEFT);
  textSize(12);
  
  text('Cell Size: ' + cellSize, 160, height - 140);
  text('Scale 1: ' + scale1.toFixed(1), 160, height - 110);
  text('Scale 2: ' + scale2.toFixed(1), 160, height - 80);
  text('Rotation: ' + (rotation * 180 / Math.PI).toFixed(1) + '°', 160, height - 50);
  
  // Draw pattern info
  if (patternData) {
    textAlign(LEFT);
    textSize(16);
    fill(0);
    text(patternData.name, 50, 30);
    
    textSize(12);
    if (patternData.metadata) {
      text(`Shafts: ${patternData.metadata.shafts}, Treadles: ${patternData.metadata.treadles}`, 50, 45);
    }
  }
}

function handleFile(file) {
  if (file.type === 'application/json') {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        loadPattern(data);
      } catch (error) {
        console.error('Error loading pattern:', error);
        alert('Error loading pattern file');
      }
    };
    reader.readAsText(file.file);
  }
}

function exportPattern() {
  if (!patternData) return;
  
  const exportData = {
    ...patternData,
    matrix: showMoire ? generateMoireMatrix() : currentMatrix,
    name: patternData.name + (showMoire ? ' - Moire' : ''),
    export_settings: {
      cellSize: cellSize,
      scale1: scale1,
      scale2: scale2,
      rotation: rotation,
      showMoire: showMoire
    }
  };
  
  // Create download link
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = patternData.name.toLowerCase().replace(/\s+/g, '_') + '.json';
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

// Key controls
function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas(patternData?.name || 'pattern', 'png');
  }
  
  if (key === 'm' || key === 'M') {
    showMoire = !showMoire;
    controls.moireCheckbox.checked(showMoire);
  }
  
  if (key === 'r' || key === 'R') {
    // Reset values
    scale1 = 1.0;
    scale2 = 1.2;
    rotation = 0.0;
    showMoire = false;
    
    controls.scale1Slider.value(scale1);
    controls.scale2Slider.value(scale2);
    controls.rotationSlider.value(rotation);
    controls.moireCheckbox.checked(showMoire);
  }
}

// Mouse interaction
function mouseDragged() {
  // Allow dragging to adjust rotation
  if (mouseX > 50 && mouseX < width - 50 && mouseY > 50 && mouseY < height - 200) {
    rotation = map(mouseX, 50, width - 50, 0, Math.PI);
    controls.rotationSlider.value(rotation);
  }
}

// Pattern generation utilities
function generateShadowWeavePattern(width, height, blockSize = 4) {
  const matrix = [];
  
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      // Create shadow weave pattern
      const blockX = Math.floor(x / blockSize) % 2;
      const blockY = Math.floor(y / blockSize) % 2;
      const value = (blockX + blockY) % 2;
      row.push(value);
    }
    matrix.push(row);
  }
  
  return matrix;
}

function generateAdvancingTwill(width, height, shafts = 4) {
  const matrix = [];
  
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      // Create advancing twill pattern
      const shaft = (x + y) % shafts;
      const value = shaft < 2 ? 1 : 0; // 2/2 twill
      row.push(value);
    }
    matrix.push(row);
  }
  
  return matrix;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadPattern,
    generateMoireMatrix,
    generateShadowWeavePattern,
    generateAdvancingTwill
  };
}