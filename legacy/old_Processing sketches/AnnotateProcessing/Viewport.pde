//package viewport;
import processing.core.*;
import processing.event.*;
import java.awt.Rectangle;

public class Viewport {
  float x, y, scale = 1; /*1=fit content to bounds*/
  //int mouseX, mouseY, pmouseX, pmouseY; //mouse values in this viewport
  int mx, my; //mouse values (in viewport?)
  Rectangle bounds;
  boolean dragging, mouseEnabled = true;
  float contentWidth, contentHeight;
  float minScale = 0.5f, maxScale = 40.0f;
  boolean enableDrag = true;
  boolean enableZoom = true;
  PVector contentTopLeftInScreenCoords = new PVector();
  PVector contentBottomRightInScreenCoords = new PVector();
  float toScreenScale;

  Viewport(int x, int y, int w, int h, int contentWidth, int contentHeight) {
    registerMethod("mouseEvent", this);
    this.bounds = new Rectangle(x, y, w, h);
    this.contentWidth = contentWidth;
    this.contentHeight = contentHeight;
    reset();
  }

  Viewport(PApplet applet, int x, int y, int w, int h) {
    this(x, y, w, h, w, h);
  }

  void begin() {
    noStroke();
    clip(bounds.x, bounds.y, bounds.width, bounds.height);
    pushMatrix();
    translate(bounds.x, bounds.y);
    scale(scale);
    translate(-x, -y);

    //content
    translate(bounds.width/2, bounds.height/2); //center in viewport

    scale(min(bounds.width/contentWidth, bounds.height/contentHeight)); //scale to fit content

    translate(-contentWidth/2, -contentHeight/2); //imageMode center

    fill(255, 255, 255);
    ellipse(0, 0, 50, 50);

    contentTopLeftInScreenCoords.set(new PVector(screenX(0, 0), screenY(0, 0)));
    contentBottomRightInScreenCoords.set(new PVector(screenX(contentWidth, contentHeight), screenY(contentWidth, contentHeight)));
    toScreenScale = 1 / (scale * min(bounds.width/contentWidth, bounds.height/contentHeight));
  }

  PVector fromScreenToView(float x, float y) {
    x = map(x, contentTopLeftInScreenCoords.x, contentBottomRightInScreenCoords.x, 0, contentWidth);
    y = map(y, contentTopLeftInScreenCoords.y, contentBottomRightInScreenCoords.y, 0, contentHeight);
    return new PVector(x, y);
  }

  void end() {
    popMatrix();
    noClip();
  }

  //public void mouseDragged() {
  //  if (!enableDrag) return;
  //  x -= (mouseX-pmouseX)/scale;
  //  y -= (mouseY-pmouseY)/scale;
  //}

  public void mouseWheel(MouseEvent event) {
    boolean horizontal = event.getModifiers()==33;
    boolean vertical = event.getModifiers()==32;

    if (keyShiftDown) {   //.isShiftDown() does not work. because it is triggered by TrackPad horizontal scroll
      //zoom factor needs to be between about 0.99 and 1.01 to be able to multiply so add 1
      float zoomFactor = -event.getCount()*.01f + 1.0f;
      float newScale = PApplet.constrain(scale * zoomFactor, minScale, maxScale);

      //next two lines are the most important lines of the code.
      //subtract mouse in 'old' scale from mouse in 'new' scale and apply that to position.
      x -= (mx/newScale - mx/scale);
      y -= (my/newScale - my/scale);

      //apply the new scale
      scale = newScale;
    } else if (horizontal) x += event.getCount()/scale;
    else if (vertical) y += event.getCount()/scale;
  }

  public void zoom100() {
    zoomTo(2.5); //hmmm werkt niet 1/min(bounds.width/contentWidth, bounds.height/contentHeight));
  }
  
  public void zoomBy(float sc) {
    zoomTo(scale + sc);
  }
  
  public void zoomTo(float newScale) {
    x -= (mx/newScale - mx/scale);
    y -= (my/newScale - my/scale);
    scale = newScale;
  }

  public void mouseEvent(MouseEvent event) {

    if (!mouseEnabled) return;
    boolean mouseOver = bounds.contains(event.getX(), event.getY());
    //pmouseX = mouseX;
    //pmouseY = mouseY;
    mx = event.getX() - bounds.x;
    my = event.getY() - bounds.y;

    if (event.getAction()==MouseEvent.WHEEL) {
      this.mouseWheel(event);
    }
  }

  void reset() {
    scale = 1;
    x = y = 0;
  }
}
