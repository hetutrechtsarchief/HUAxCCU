class Page {
  PImage img;
  ArrayList<Word> words = new ArrayList();
  ArrayList<TextLine> lines = new ArrayList();

  void loadImage(String filename) {
    img = app.loadImage(filename);
  }

  Word getPreviousWord(Word w) {
    int i = words.indexOf(w);
    if (i>0) {
      return words.get(i-1);
    }
    return null;
  }

  Word getNextWord(Word w) {
    int i = words.indexOf(w);
    if (i>-1 && i<words.size()-1) {
      return words.get(i+1);
    }
    return null;
  }

  void loadXML(String filename) {
    XML xml = app.loadXML(filename);
    if (xml.getName().toLowerCase().equals("pcgts")) parsePageXML(xml);
    else if (xml.getName().toLowerCase().equals("alto")) parseAltoXML(xml);
    else println("Invalid XML format. Expecting PcGts or Alto XML");
  }

  void parseAltoXML(XML xml) {
    for (XML layout : xml.getChildren("Layout")) {
      for (XML page : layout.getChildren("Page")) {
        for (XML printspace : page.getChildren("PrintSpace")) {
          for (XML textblock : printspace.getChildren("TextBlock")) {
            for (XML textline : textblock.getChildren("TextLine")) {
              XML strings[] = textline.getChildren("String");
              for (int i=0; i<strings.length; i++) {
                String id = strings[i].getString("ID");
                String txt = strings[i].getString("CONTENT");
                int x = int(strings[i].getString("HPOS"));
                int y = int(strings[i].getString("VPOS"));
                int w = int(strings[i].getString("WIDTH"));
                int h = int(strings[i].getString("HEIGHT"));
                Word word = new Word(id, txt);
                word.poly.addPoint(x,y);
                word.poly.addPoint(x+w,y+h);
                words.add(word);
              }
            }
          }
        }
      }
    }
  }

  void parsePageXML(XML xml) {
    for (XML page : xml.getChildren("Page")) {
      String w = page.getString("imageWidth");
      String h = page.getString("imageHeight");
      for (XML textRegion : page.getChildren("TextRegion")) {
        String textRegionId = textRegion.getString("id");
        for (XML textLine : textRegion.getChildren("TextLine")) {
          String textLineId = textLine.getString("id");
          for (XML wordXML : textLine.getChildren("Word")) {
            Word word = new Word(wordXML.getString("id"), "");
            words.add(word);
            for (XML coordXML : wordXML.getChildren("Coords")) {
              String coords[] = coordXML.getString("points").split(" ");

              for (String c : coords) {
                String xy[] = c.split(",");
                word.poly.addPoint(int(xy[0]), int(xy[1]));
              }
              for (XML textEquiv : wordXML.getChildren("TextEquiv")) {
                word.txt = textEquiv.getContent("Unicode");
              }
            }
          }
        }
      }
    }
  }
}
