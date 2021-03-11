class TextLineData {

  constructor(id, txt) {
    this.id = id;
    this.text = txt;
    // this.selected = false;   
    this.hover = false;
    this.coords = new Polygon();
  }
}