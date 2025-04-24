 function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(130,130,130);
    for(x=0;x<windowWidth;x++) {
     for(y=0;y<windowHeight;y++) {
       let z = random([0,1,2]);
       let r = random(255);
       let g = random(255);
       let b = random(255);
       if(z == 0 || z == 1) {
          rect(x*20,y*20,10,10);
          fill(r,g,b);
          rect(x*20,y*20,5,5);
          fill(b,g,r);
          rect((x*20)+5,(y*20)+5,5,5);
       }
}
    }
}
