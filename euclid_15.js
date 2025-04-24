
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    noFill();
    background(0,0,162);
    frameRate(3);
    //noLoop();
    }
    
    
    // Euclid's Propositions 1.2 & 1.3: Create a line of equal length given a line (CD) and a random starting point (A)
    
    function draw() {
    
    let Ax = random(50,windowWidth -50);
    let Ay = random(50,windowHeight -50);
    let Bx = Ax + random(-20,20);
    let By = Ay + random(-20,20);
    let Cx = Bx + random(-40,40);
    let Cy = By + random(-40,40);
    
    // Draw point A & line CB. 
    strokeWeight(2);
    stroke(0,0,0);
    point(Ax,Ay);
    line(Bx,By,Cx,Cy);
    
    // Draw a line from A to B
    strokeWeight(1);
    stroke(0,0,0);
    line(Ax,Ay,Bx,By);
    
    // Draw a circle with B at the center with a radius equal to BC
    strokeWeight(2);
    stroke(0,100,100);
    
    // dist=sqrt[(x2-x1)^2+(y2-y1)^2]
    let radius = dist(Bx,By,Cx,Cy);
    ellipse(Bx,By,radius*2);
    
    let Gx;
    let Gy;
    
    
    
    
    }
    