class TextLine {

  constructor(id, txt) {
    this.id = id;
    this.text = txt;
    // this.selected = false;   
    this.hover = false;
    this.coords = new Polygon();
    this.cell = undefined; 
  }

  getBounds() {
    return this.coords.getBounds()
  }

  // draw() {
  //   noFill();
  //   stroke(0);
  //   strokeWeight(1);

  //   let r = this.getBounds();
  //   stroke(0,255,255);
  //   rect(r.x, r.y, r.width, r.height);
  //   // fill(255,255,0);
  //   // text(this.cell.row + " " + this.cell.col, r.x, r.y);
  // }

}