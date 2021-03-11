class TextLine {
  //Rectangle bounds = new Rectangle();
  String txt, id;
  ArrayList<Word> words = new ArrayList();
  int x,y,w,h;
  //Polygon poly = new Polygon();

  TextLine() {
  }

  String toString() {
    return id + ": " + x + "," + y + "," + w + " " + h + "  " + txt;
  }
}
