function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    noLoop();
    //frameRate(5);
    }
    
    
    // Euclid's 1st Proposition:
    // Given a line (AB), use two circles (ACE & BCD) to create an equilateral triangle (ABC).
    
    
    function draw() {
    background(0,0,90);
    noFill();
    strokeWeight(2);
    
    
    for(x=.5;x<6;x++) {
      for(y=.5;y<windowHeight;y++) {
    
        let AB = 60;
        let Ax = x*60;
        let Ay = y*60;
        let Bx = Ax + AB/2;
        let By = Ay;
        let Cx = (Ax + Bx)/2;
        let Cy = Ay - AB/2 + 5;
        let Dx = Cx;
        let Dy = Ay + AB/2 - 5;
        
        let z = random([0,1,2]);
        
        ellipse(Ax,Ay,AB);
        ellipse(Bx,By,AB);
        if(z == 0 || z == 1) {
          line(Ax,Ay,Bx,By);
          line(Ax,Ay,Cx,Cy);
          line(Cx,Cy,Bx,By);
          line(Ax,Ay,Dx,Dy);
          line(Dx,Dy,Bx,By);
        }
      } 
    }
    }