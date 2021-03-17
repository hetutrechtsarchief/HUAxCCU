class Table {

  constructor() {
    this.cells = [];
    this.cols = 0;
    this.rows = 0;
    this.colWidths = 0;
    this.rowHeights = 0;
  }

  setLocation(x, y) {
    this.x = x;
    this.y = y;
    //TODO update cell positions
    for (let c of this.cells) {
      c.updateCellBounds();
    }
  }

  skipColumn(col) {
    // for (let i=0; i<this.cells.length; i++) {
    for (let c of this.cells) {
      if (c.col==col) c.skip = true;
    }
  }

  add(cell) {
    this.cells.push(cell);
  }

  getCellWithMostOverlap(line) {
    let result = null;
    let maxOverlap = 0;
    for (let c of this.cells) {
      if (c.bounds.intersects(line.getBounds())) {
        let intersection = c.bounds.getIntersection(line.getBounds());
        let overlap = (intersection.width*intersection.height)/(line.getBounds().width*line.getBounds().height);
        if (overlap>maxOverlap) {
          result = c;
          maxOverlap = overlap;
        }
      }
    }
    return result;
  }
}

function createTable(x, y, colWidths, rowHeights) {
  let t = new Table();
  t.setLocation(x,y);
  t.colWidths = colWidths;
  t.rowHeights = rowHeights;
  for (let row=0; row<rowHeights.length; row++) {
    for (let col=0; col<colWidths.length; col++) {
      let bounds = new Rectangle();
      let c = new Cell(col, row);
      c.table = t; //set parent of cell
      c.updateCellBounds();
      t.add(c);
    }
  }
  return t;
}

