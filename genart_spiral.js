function setup () {
    size(screenWidth, screenHeight);
    background(255);
    strokeWeight(5);
    smooth();


    let radius = 100;
    let centX = screenWidth / 2;
    let centY = screenHeight / 2;

    stroke(0,20);
    noFill();
    ellipse(centX, centY, radius*2, radius*2);
 
 
    stroke(20,50,70);
    let x,y;
    let lastX = -999;
    let lastY = -999;
    
 
    for (let ang=0; ang<=360; ang+=5) {
        let radiusNoise = random(20);
        radiusNoise += 5;
        radius += 0.5;
 
        let rad = radians(ang);
        
        x = centx + (radius*cos(rad));
        y = centy + (radius*sin(rad));
        if (lastX > -999){
            line(x,y,lastX,lastY);
        }
        lastX = x;
        lastY = y;
 }

}
