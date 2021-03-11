//import js.window;

import viewport.Viewport;
import java.awt.Polygon;
import java.awt.Rectangle;
import java.awt.event.KeyEvent;
import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.Transferable;
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.UnsupportedFlavorException;


PApplet app = this;
Viewport view;
Page p = new Page();
PVector down = new PVector(); //in viewport coords
PVector mouse = new PVector(); //in viewport coords
Rectangle area = new Rectangle();
boolean selecting = false;
boolean keyCmdDown = false;
boolean keyAltDown = false;
boolean keyShiftDown = false;
ArrayList<Annotation> annotations = new ArrayList();
boolean showContent = false;

Word focussedWord = null;

void setup() {
  size(1600, 900, P2D);

  //String basename = "BIBLIO_STIJD_58-16104_Het-adresboek_1931_00041";
  //String basename = "MMUTRA01_001491001_01000_access";
  //p.loadImage(basename+".jpg");
  //p.loadXML(basename+"_alto.xml");
  p.loadImage("02.jpg");
  p.loadXML("alto/02.xml");

  textFont(loadFont("AllianzNeo-Regular-30.vlw"));


  if (p.words.size()>0) {
    focussedWord = p.words.get(0);
  }

  view = new Viewport(0, 0, width, height, p.img.width, p.img.height);
  //view.enableDrag = false;

  view.zoom100();
}

void draw() {
  background(0);
  view.begin();
  image(p.img, 0, 0);
  strokeWeight(view.toScreenScale);

  //println(selecting);
  for (Annotation a : annotations) {
    stroke(0, 255, 0);
    noFill(); //fill(255, 0, 0, 30);
    Rectangle l = a.getBounds();
    rect(l.x, l.y, l.width, l.height);
  }


  for (TextLine l : p.lines) {
    noStroke();
    fill(255, 0, 0, 30);
    rect(l.x, l.y, l.w, l.h);
  }


  for (Word w : p.words) {
    w.hover = w.poly.contains(mouse.x, mouse.y) || (selecting && w.poly.intersects(area));

    noStroke();
    if (!w.selected && w.hover) { //selecting
      fill(0, 255, 255, 30);
      //stroke(0);
    } else if (w.selected && w.hover && keyAltDown) { //deselecting
      //fill(0, 255, 255, 30);
      noFill();
      //stroke(0);
    } else if (w.selected) { //selected
      fill(0, 255, 255, 60);
    } else { //not selected
      noFill();
      stroke(0, 50);
    }

    if (w==focussedWord) {
      stroke(255, 255, 0);
    }

    Rectangle r = w.poly.getBounds();
    //fill(255, 0, 0);
    rect(r.x, r.y, r.width, r.height);

    if (showContent) {
      fill(255);
      textSize(constrain(view.toScreenScale*30, 20, 60));
      //textSize(view.toScreenScale*r.height);
      //println(r.height);
      text(w.txt, r.x, r.y);
    }
  }



  if (selecting) {
    noFill();
    stroke(0, 255, 255);
    rect(area.x, area.y, area.width, area.height);
  }

  view.end();
}
