
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
   let rh = random(210,260);
   let rs = 100;
   let rb = 100;
   let eh = random(15);
   let es = 100;
   let eb = 100;

   fill(rh,rs,rb);  rect(x,y,size,size*1.3);

   fill(eh,es,eb);
   ellipse(x-xdelta,y-ydelta,size);
   }    
}
