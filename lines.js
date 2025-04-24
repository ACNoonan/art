function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
}

function draw() {
    background(0,0,162);

    for(v=0;v<800;v++) {
       let x1 = 0;
       let y1 = v;
       let x2 = windowWidth;
       let y2 = v;

       stroke(0+v/2,100,0+v);
       line(x1,y1,x2,y2);
} 
}