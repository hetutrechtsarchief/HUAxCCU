class Cell {
  constructor(col, row) {
    this.table = undefined; //parent table of this cell
    this.skip = false;
    this.x = 0;
    this.y = 0;
    this.bounds = new Rectangle();
    this.col = col;
    this.row = row;
    this.clr = (col%2==0) ? color(0,255,255,10) : color(0,255,255,20); ///color(0,255,255,50); //color(random(255),random(255),random(255),100);
    this.title = "";
    //(col%2==0) ? color(0,255,255,10) : color(0,255,255,20);
  }

  setLocation(x, y) {
    this.x = x;
    this.y = y;
  }

  getBounds() {
    return bounds;
  }

  // calcCellBounds(t, col, row)
  updateCellBounds() {
    if (this.col<0 || this.col>=this.table.colWidths.length) return new Rectangle();
    let xa = this.table.x;
    for (let i=0; i<this.col; i++) {
      xa+=this.table.colWidths[i];
    }
    let ya = this.table.y;
    for (let i=0; i<this.row; i++) {
      ya += this.table.rowHeights[i];
    }
    this.bounds = new Rectangle(int(xa), int(ya), this.table.colWidths[this.col], this.table.rowHeights[this.row]);
  }
}