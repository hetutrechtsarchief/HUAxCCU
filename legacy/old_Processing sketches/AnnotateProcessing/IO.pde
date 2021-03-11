
void mousePressed() {
  down = view.fromScreenToView(mouseX, mouseY);
  area.setLocation((int)down.x, (int)down.y);
  //if (keyPressed && (keyCmdDown || key==' ' || key=='h')) {
  //  view.enableDrag = dragging = true;
  //}
}

void updateMouse() {
  mouse = view.fromScreenToView(mouseX, mouseY);
  float x1 = min(down.x, mouse.x);
  float y1 = min(down.y, mouse.y);
  float x2 = max(down.x, mouse.x);
  float y2 = max(down.y, mouse.y);
  area.setFrameFromDiagonal(x1, y1, x2, y2);
}

void mouseMoved() {
  updateMouse();
}

void mouseDragged() {
  updateMouse();
  selecting = true;
}

void mouseClicked() {
  updateMouse();
  for (Word w : p.words) {
    if (w.hover) {
      w.selected = !w.selected;
    }
  }
}

void mouseReleased() {
  updateMouse();
  if (selecting) {
    for (Word w : p.words) {
      if (w.hover) {
        w.selected = !keyAltDown;
        w.hover = false;
      }
    }
  }

  //view.enableDrag = dragging = false;
  selecting = false;
  //deselecting = false;
  //view.enableZoom = true;
}

//void checkKeys() {
//   if (keyCmdDown && keyCode=='-') view.zoomBy(-.2);
//  else if (keyCmdDown && keyCode=='=') view.zoomBy(.2);
//}

void keyPressed() {
  //if (key==CODED) {
  if (keyCode==KeyEvent.VK_META) keyCmdDown = true;
  else if (keyCode==KeyEvent.VK_ALT) keyAltDown = true;
  else if (keyCode==KeyEvent.VK_SHIFT) keyShiftDown = true;
  //} else {
  if (keyCmdDown && keyCode=='D') deselectAll();
  else if (keyCmdDown && keyCode=='A') selectAll();
  else if (keyCmdDown && keyCode=='0') view.zoom100();
  else if (keyCmdDown && keyCode=='V') {
    Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
    Transferable contents = clipboard.getContents(null);
    try {
      String s = (String)contents.getTransferData(DataFlavor.stringFlavor);
      println(s);
    }
    catch (UnsupportedFlavorException e) {
      println("UnsupportedFlavorException");
    }
    catch (java.io.IOException e2) {
      println("IOException");
    }
  } else if (keyCmdDown && key=='-') view.zoomBy(-.5);
  else if (keyCmdDown && key=='=') view.zoomBy(.5);

  else if (keyCode==TAB) if (keyShiftDown) previousWord();
  else nextWord();
  //}
  //else println(keyCode);
  //}
}

void keyReleased() {
  if (key==CODED) {
    if (keyCode==KeyEvent.VK_META) keyCmdDown = false;
    else if (keyCode==KeyEvent.VK_ALT) keyAltDown = false;
    else if (keyCode==KeyEvent.VK_SHIFT) keyShiftDown = false;
  } else if (!keyCmdDown && key=='1') { //merge into a single annotation
    String type = window.prompt("Please enter type for this Annotation (for example: address)");
    if (type==null) return;
    Annotation a = new Annotation();
    annotations.add(a);
    a.type = type;
    for (Word w : p.words) {
      if (w.selected) a.words.add(w);
    }
    deselectAll();
  } else if (!keyCmdDown && key=='n') { //for each word create an annotation
    String type = window.prompt("Creating multiple annotations");
    if (type==null) return;
    for (Word w : p.words) {
      if (w.selected) {
        Annotation a = new Annotation();
        annotations.add(a);
        a.type = type;
        a.words.add(w);
      }
    }
    deselectAll();
  } else if (!keyCmdDown && key=='i') showContent=!showContent;
}
