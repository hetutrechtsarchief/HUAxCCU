class Polygon {
  
  constructor() {
    this.points = [];
  }

  addPoint(x, y) {
    this.points.push(createVector(x,y))
  }

  getBounds() {
    let minX = Number.MAX_VALUE;
    let maxX = -Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;
    for (let p of this.points) {
      minX = min(minX, p.x);
      maxX = max(maxX, p.x);
      minY = min(minY, p.y);
      maxY = max(maxY, p.y);
    }
    return new Rectangle(minX,minY,maxX-minX,maxY-minY);
  }

}