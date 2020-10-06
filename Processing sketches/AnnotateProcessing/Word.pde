//class Type {
//  String[] types;
//}

//class Adres extends Type {
//  //String[] types = { "straat", "huisnummer", "wijk", "wijkhuisnummer", "plaats" };
//  String id;
//  String straat, huisnummer, wijk, wijkhuisnummer, plaats;
//}

//Adres adres = new Adres("http://hualab.nl/id/nieuwadres123234");

class Word {
  String id, txt, coords;
  //Type type;
  String target;
  
  boolean selected; //currently selected 
  boolean hover; //under mouse of block select
  Polygon poly = new Polygon();
  //Rect bounds = new Rect();

  Word(String id, String txt) {
    this.id = id;
    this.txt = txt;
    //this.coords = coords;
    //# this.color = color(0)
    //this.type = null;
    this.selected = false;   
    this.hover = false;
    /*# eigenschappen:
     # startsWithCaptial
     # containsNumber
     # endsWith dot
     # endsWith comma
     # endsWith dash (afbreekteken?)
     # length
     # wordLeft, wordRight (link naar ander Word)
     # wordOnNextLine??
     */
  }
  
  //void setBoundsFromQuad(float coords[][]) {
  //  bounds = new Rect(coords[0][0], coords[0][1], 
  //    coords[2][0]-coords[0][0], coords[2][1]-coords[0][1]);
  //}


}
