
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    //frameRate(1);
    noLoop();
    }
    
    function draw() {
    background(0, 0, 164);
    
    let step = 4; 
    for(let n = 0; n < 300; n++) {
       let x = random(0, windowWidth);
       let y = random(0, windowHeight);
       let size = random([50, 99, 150]); 
    
       // Calculate the number of layers
       let layers = floor(size / step+1);
       // Determine shape
       let shape = random([0,1])
    
       if(shape==1) {
          // Circle Layers
          for(z=0;z<layers;z++) {
             ellipse(x,y,size-z*step);
          } 
       }
       else {
         // Rect Layers
          for(z=0;z<layers;z++) {
           rect(x+z*step,y+z*step,size-z*step,size-z*step);
          }
       }
    }
    }