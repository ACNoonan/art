
function setup() {
    createCanvas(windowWidth, windowHeight);
    //noLoop();
    frameRate(1);
    colorMode(HSB);
}

function draw() {
   background(0,0,164);

   // Number of circles
   for(n=0;n<300;n++) {
    let x = random(0,windowWidth);
    let y = random(0,windowHeight);
    let size = random([100,50,150]);
    let layers;
    if(size == 100) {
       layers = 27; 
    } else if(size == 50) {
       layers = 15;
    } else { 
       layers = 38;
    }

    // Circle Layers
    for(z=0;z<layers;z++) {
       ellipse(x,y,size-z*4);
    }
   }
}