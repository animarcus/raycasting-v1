class Ray {
  constructor(initDir, r=rayLength) {
    this.initDir = radians(-initDir);
    this.dir = this.initDir;
    this.r = r;
  }
  update(x1, y1) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = round(x1 + cos(this.dir)*this.r);
    this.y2 = round(y1 + sin(this.dir)*this.r);
  }
  draw() {
    stroke(255);
    line(this.x1, this.y1, this.x2, this.y2);
    ellipse(this.x1,this.y1, 5,5);
    stroke(0);
  }
}



function intersects(a,b,c,d,p,q,r,s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    let intersectionX = a + (lambda * (c-a));
    let intersectionY = b + (lambda * (d-b));

    let output = (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    if (output){
      // stroke(255,0,0);
      // ellipse(intersectionX,intersectionY, 5, 5);
      return [intersectionX, intersectionY];
    } else {
      return false;
    }
  }
}