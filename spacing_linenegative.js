function setup() {
    createCanvas(windowWidth, windowHeight);
   colorMode(HSB);
   frameRate(.5);
   //noLoop();
}

function draw() {

background(0,0,162);
noFill();

for(v=0;v<1;v++) {
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


   for(rf=0;rf<windowHeight;rf++) {
   
   let r = random([0,1]);
   if(r==0) {
   rect(x-rf*2,y-rf*2,size+rf*4,(size*1.3)+rf*4);
   }}
   
   
   for(ef=0;ef<windowHeight;ef++) {

   let rr = random([0,1]);
   if(rr==0) {
   ellipse(x-xdelta,(y-ydelta) % windowHeight,size+ef*4);
   }}
}
}