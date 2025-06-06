
let shapes = [];
let maxCollisions = 4;
let collisionCount = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);  
   colorMode(HSB);
   frameRate(.4);
}

function draw() {
   background(0,0,162);
   //noLoop();
   noFill();
  
   // v = number of rects & ellipses to draw
   for(v=0;v<11;v++) {
      let xdelta = random(-200,200);
      let ydelta = random(-200,200);
      let size = 120;
      let x = random(300);
      let y = random(600);

      let rh = random(210,260);
      let rs = 100;
      let rb = 100;
      let eh = random(15);
      let es = 100;
      let eb = 100;

      // rf = delta to create internal rects
      for (rf=0;rf<31;rf++) {
         rect(x+rf*2,y+rf*2,size-rf*4,(size*1.3)-rf*4);
      }

      // ef = delta to create internal ellipses
      for (ef=0;ef<31;ef++) {
         ellipse(x-xdelta,y-ydelta,size-ef*4);
      }
   }
}
