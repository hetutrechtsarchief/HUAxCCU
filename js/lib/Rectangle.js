class Rectangle {

  constructor(x,y,w,h) {
    this.setBounds(x,y,w,h);
  }

  setBounds(x,y,w,h) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = w || 0;
    this.height = h || 0;
  }

  setFrom(r) {
    this.setBounds(r.x,r.y,r.width,r.height);
  }

  copy() {
    return new Rectangle(this.x,this.y,this.width,this.height);
  }

  intersects(other) {
    return !(
    (other.x                > this.x + this.width)  || 
    (other.x + other.width  < this.x         )      ||
    (other.y                > this.y + this.height) ||
    (other.y + other.height < this.y         ));
  }

  contains(other) { //Rectangle!
    return ( //haakje belangrijk, anders return undefined
      this.x <= other.x &&
      this.y <= other.y &&
      this.x + this.width >= other.x + other.width &&
      this.y + this.height >= other.y + other.height);
  }
   
  containsPoint(x,y) {
    return x>=this.x && 
           y>=this.y && 
           x<=this.x+this.width && 
           y<=this.y+this.height;
  }

  getArea() {
    return this.width * this.height;
  }

  getCenterX() {
    return lerp(this.x, this.width,.5);
  }

  getCenterY() {
    return lerp(this.y, this.height,.5);
  }

  getIntersection(other) {
    let x1 = max(this.x, other.x);
    let y1 = max(this.y, other.y);
    let x2 = min(this.x + this.width, other.x + other.width);
    let y2 = min(this.y + this.height, other.y + other.height);
    return new Rectangle(x1,y1,x2-x1,y2-y1);
  }

  getUnion(other) {
    let x1 = min(this.x, other.x);
    let y1 = min(this.y, other.y);
    let x2 = max(this.x + this.width, other.x + other.width);
    let y2 = max(this.y + this.height, other.y + other.height);
    return new Rectangle(x1,y1,x2-x1,y2-y1);
  }

  grow(other) {
    this.setFrom(this.getUnion(other));
  }

}