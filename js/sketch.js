let obstacles = [];
let rays = [];
let ray1;
let ray2;

let x1;
let y1;
let playerStep = 4;

let rayLength = 600;
let factor = 20;

let viewWidth = 600;

let genDir = -0;
let Yoffset = 0;
// let FOV = 60;
let FOV = 30;

let sunXoffset;

let show2D = true;



function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("canvas1");
  for (let i=genDir-FOV/2; i<genDir+FOV/2;i+=0.5) {
    rays.push(new Ray(i));
  }
  // frameRate(30);
  // rays.push(new Ray(genDir));

  // obstacles.push(new Obstacle(0, 300, width/3, height/3));
  // obstacles.push(new Obstacle(0, -300, width-width/3, height-height/3));
  // obstacles.push(new Obstacle(45, -300, width-30, height-height/2));
  let cubeSize = 100;

  obstacles.push(new Obstacle(90, cubeSize, width/3+cubeSize, height/3+cubeSize));
  obstacles.push(new Obstacle(180, cubeSize, width/3+cubeSize, height/3));
  obstacles.push(new Obstacle(-90, cubeSize, width/3, height/3));
  obstacles.push(new Obstacle(0, cubeSize, width/3, height/3+cubeSize));

  obstacles.push(new Obstacle(90, cubeSize, width/2+cubeSize, height/3+cubeSize));
  obstacles.push(new Obstacle(180, cubeSize, width/2+cubeSize, height/3));
  obstacles.push(new Obstacle(-90, cubeSize, width/2, height/3));
  obstacles.push(new Obstacle(0, cubeSize, width/2, height/3+cubeSize));

  obstacles.push(new Obstacle(90, cubeSize, width-cubeSize, height/3+cubeSize));
  obstacles.push(new Obstacle(180, cubeSize, width-cubeSize, height/3));
  obstacles.push(new Obstacle(-90, cubeSize, width, height/3));
  obstacles.push(new Obstacle(0, cubeSize, width, height/3+cubeSize));

  obstacles.push(new Obstacle(90, cubeSize, width/2-cubeSize, height/3+cubeSize));
  obstacles.push(new Obstacle(180, cubeSize, width/2-cubeSize, height/3));
  obstacles.push(new Obstacle(-90, cubeSize, cubeSize, height/3));
  obstacles.push(new Obstacle(0, cubeSize, cubeSize, height/3+cubeSize));



  x1 = width/2;
  y1 = height/2;
  sunXoffset = width/2+ 50;
}

function draw() {
  keyboardInput();

  rays.forEach(ray => {
    ray.dir = ray.initDir + genDir;
  });

  background(166, 200, 255);

  stroke(0,0,0);

  fill(color("gray"));
  rect(0, height / 2 + Yoffset, width, height);
  text("This is a sun, it does now move horizontally", sunXoffset, -100 + Yoffset);
  text("This is a sun, it does now move horizontally", sunXoffset + 6 * width, -100 + Yoffset);
  text("This is a sun, it does now move horizontally", sunXoffset - 6 * width, -100 + Yoffset);

  rays.forEach((ray, index) => {
    let intersection, currentRectX, currentRectH;
    let inTheWay = [];
    obstacles.forEach(obstacle => {
      noStroke();
      let intersection = processInterection(ray, obstacle);
      let currentRectX = (viewWidth / rays.length) * index;
      let currentRectH = intersection.displayHeight;

      if (intersection.distance) {
        inTheWay.push(intersection);
      }
      stroke(0);
      fill(255);
      ray.update(x1, y1);
      if (show2D) {
        obstacle.draw();
        ray.draw();
      }
      fill(-7/30*intersection.distance+100);
      noStroke();
      rect(currentRectX, (height - currentRectH) / 2 + Yoffset, 10, currentRectH);
    });


  });
}



function processInterection(ray, obstacle){
  let intersection = intersects(ray.x1, ray.y1, ray.x2, ray.y2,
    obstacle.x1, obstacle.y1, obstacle.x2, obstacle.y2);
  if (!intersection) {
    return false;
  }
  let x2 = intersection[0];
  let y2 = intersection[1];
  let dist = sqrt(pow((x1-x2), 2)+ pow((y1-y2), 2));
  let displayHeight = (height-10)/dist*14;

  let output = { "distance" : dist,
              "displayHeight" : displayHeight,
              "x2" : x2,
              "y2" : y2
            };

  return output;
}


function keyboardInput() {
  if (keyIsDown(LEFT_ARROW)) {
    genDir -=radians(-2);
    sunXoffset += 20;
    // if (genDir == radians(300)) {
    //   sunXoffset -= 6*width;
    //   console.log(sunXoffset);
    // }


    if (genDir >= PI*2) {
      genDir -= PI*2;
      sunXoffset -= 6*width;
    }
    // sunXoffset += 20;
    // console.log(degrees(genDir));
  }
  if (keyIsDown(RIGHT_ARROW)) {
    genDir -=radians(2);
    sunXoffset -= 20;
    // if (genDir == radians(-300)) {
    //   sunXoffset += 6*width;
    //   console.log(sunXoffset);
    // }


    if (genDir <= -PI*2) {
      genDir += PI*2;
      sunXoffset += 6*width;
    }
    // sunXoffset -= 20;
    // console.log(degrees(genDir));
  }
  if (keyIsDown(UP_ARROW)) {
    if (Yoffset < 220) {
      Yoffset +=10;
    }
    // console.log(Yoffset);
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (Yoffset > -200) {
      Yoffset -=10;
    }
    // console.log(Yoffset);
  }
  if (keyIsDown(87)) { // W
    // console.log("w");
    x1 = round(x1 + cos(genDir)*playerStep);
    y1 = round(y1 + sin(genDir)*playerStep);
  }
  if (keyIsDown(83)) { // S
    // console.log("s");
    x1 = round(x1 - cos(genDir)*playerStep);
    y1 = round(y1 - sin(genDir)*playerStep);
  }
  if (keyIsDown(65)) { // A
    // console.log("a");
    x1 = round(x1 + cos(genDir +PI/2)*playerStep/2);
    y1 = round(y1 + sin(genDir +PI/2)*playerStep/2);
  }
  if (keyIsDown(68)) { // D
    // console.log("d");
    x1 = round(x1 + cos(genDir -PI/2)*playerStep/2);
    y1 = round(y1 + sin(genDir -PI/2)*playerStep/2);
  }
}