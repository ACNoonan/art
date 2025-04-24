
function setup() {
    createCanvas(windowWidth, windowHeight);
   colorMode(HSB);
   frameRate(10);
}

function draw() {

background(0,0,162);
noLoop();
noFill();

  
for(v=0;v<2;v++) {

   let xdelta = random(-200,200);
   let ydelta = random(-200,200);
   let size = 120;
   let x = random(200);
   let y = random(600);
   let rh = random(210,260);
   let rs = 100;
   let rb = 100;
   let eh = random(15);
   let es = 100;
   let eb = 100;

   for(rf=0;rf<431;rf++) {
   //rect(x+rf*2,y+rf*2,size-rf*4,(size*1.3)-rf*4);

   rect(x-rf*2,y-rf*2,size+rf*4,(size*1.3)+rf*4);
   }
   
   for(ef=0;ef<431;ef++) {
   ellipse(x-xdelta,y-ydelta,size+ef*4);
   }
}
}