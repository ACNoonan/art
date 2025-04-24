
function setup() {
    createCanvas(windowWidth, windowHeight);
   colorMode(HSB);
   frameRate(1);
   //noLoop();
}

function draw() {
background(0,0,162);
  
for(v=0;v<600;v++) {
   let xdelta = random(-200,200);
   let ydelta = random(-200,200);
   let size = 100;
   let x = random(300);
   let y = random(600);
   let rh = random(360);
   let rs = 100;
   let rb = 100;
   let eh = (rh + 180) % 360;
   let es = (rs + 180) % 360;
   let eb = (rb + 180) % 360;

   fill(rh,rs,rb);  rect(x,y,size,size*1.3);

   fill(eh,es,eb);
   ellipse(x-xdelta,y-ydelta,size);
   }    
}