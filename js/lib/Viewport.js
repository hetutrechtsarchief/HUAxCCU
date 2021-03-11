class Viewport {

  constructor(x, y, w, h, contentWidth, contentHeight) {
    this.minScale = 0.5;
    this.maxScale = 40;
    this.bounds = new Rectangle(x, y, w, h);
    this.contentWidth = contentWidth;
    this.contentHeight = contentHeight;
    this.reset();
  }

  reset() {
    this.scale = 1;
    this.x = this.y = 0;
  }

  begin() {
    noStroke();

    //clipping
    //in Processing you can do: // clip(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    //in P5js we can use this: https://github.com/processing/p5.js/issues/3998#issuecomment-670270414
    drawingContext.save(); // Save before clipping mask so you can undo it later on. ALWAYS DO THIS BEFORE TRANSLATIONS.
    noFill();
    stroke(255)
    rect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    drawingContext.clip();
    

    push();
    translate(this.bounds.x, this.bounds.y);
    scale(this.scale);
    translate(-this.x, -this.y);

    //content
    translate(this.bounds.width/2, this.bounds.height/2); //center in viewport
    scale(min(this.bounds.width/this.contentWidth, this.bounds.height/this.contentHeight)); //scale to fit content
    translate(-this.contentWidth/2, -this.contentHeight/2); //imageMode center

    fill(255, 255, 255);
    ellipse(0, 0, 50, 50);

    //this.toScreenScale = 1 / (scale * min(bounds.width/this.contentWidth, bounds.height/this.contentHeight));
  }

  getTransformed(p) {
    let m = new Matrix();
    m.translate(this.bounds.x, this.bounds.y);
    m.scale(this.scale);
    m.translate(-this.x, -this.y);
    //content
    m.translate(this.bounds.width/2, this.bounds.height/2); //center in viewport
    m.scale(min(this.bounds.width/this.contentWidth, this.bounds.height/this.contentHeight)); //scale to fit content
    m.translate(-this.contentWidth/2, -this.contentHeight/2); //imageMode center
    return m.mult(p);
  }

  getScale() {
    return this.getTransformed(createVector(1,1))
      .sub(this.getTransformed(createVector(0,0))).mag();
  }

  fromScreenToView(_x, _y) {
    let contentTopLeftInScreenCoords = this.getTransformed(createVector());
    let contentBottomRightInScreenCoords = this.getTransformed(createVector(this.contentWidth, this.contentHeight));
    let x = map(_x, contentTopLeftInScreenCoords.x, contentBottomRightInScreenCoords.x, 0, this.contentWidth);
    let y = map(_y, contentTopLeftInScreenCoords.y, contentBottomRightInScreenCoords.y, 0, this.contentHeight);
    return createVector(x, y);
  }

  end() {
    pop();
    drawingContext.restore(); //=noClip() Remove the clippping mask and go back to normal.
  }

  zoomBy(delta) {   //delta is a small negative or positive value for example 0.01

    //mouse in viewport in screen coordinates 
    var mx = mouseX - this.bounds.x;
    var my = mouseY - this.bounds.y;

    //zoom factor needs to be between about 0.99 and 1.01 to be able to multiply so add 1
    var zoomFactor = delta + 1.0;
    var newScale = constrain(this.scale * zoomFactor, this.minScale, this.maxScale);

    //next two lines are the most important lines of the code.
    //subtract mouse in 'old' scale from mouse in 'new' scale and apply that to position.
    this.x -= (mx/newScale - mx/this.scale);
    this.y -= (my/newScale - my/this.scale);

    //apply the new scale
    this.scale = newScale;
  }

  moveBy(deltaX, deltaY) {
    this.x += -deltaX / this.scale;
    this.y += -deltaY / this.scale;
  }


}