class Obstacle {
  constructor(initDir, l, x1, y1) {
    this.length = l;

    this.dir = radians(-initDir);

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = round(x1 + cos(this.dir)*this.length);
    this.y2 = round(y1 + sin(this.dir)*this.length);
  }
  draw() {
    line(this.x1, this.y1, this.x2, this.y2);
    // ellipse(this.x1,this.y1, 5,5);
  }
}