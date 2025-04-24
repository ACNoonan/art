
function setup() {
   createCanvas(windowWidth, windowHeight);
   colorMode(HSB);
   frameRate(1);
}

function draw() {
background(0,0,162);
//noLoop();
  
for(v=0;v<800;v++) {
   let xdelta = random(-200,200);
   let ydelta = random(-200,200);
   let size = 100;
   let x = random(300);
   let y = random(600);
   

   fill(0,0,360);  rect(x,y,size,size*1.3);

   
   ellipse(x-xdelta,y-ydelta,size);
   }    
}
