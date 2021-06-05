class Viewport {

  constructor(x, y, w, h, contentWidth, contentHeight) {
    this.minScale = 1;
    this.maxScale = 9;
    this.bounds = new Rectangle(x, y, w, h);
    this.contentWidth = contentWidth;
    this.contentHeight = contentHeight;
    this.reset();
    this.doClipping = true;
    this.smoothing = .4;
    this.reset();
  }

  reset() {
    this.toX = 0; //(to value)
    this.toY = 0; //(to value)
    this.toScale = 1; //(to value)
    this.x = 0; //tween (current value)
    this.y = 0; //tween (current value)
    this.scale = 1; //tween (current value)
  }

  begin() {
    noStroke();

    this.x = lerp(this.x, this.toX, this.smoothing);
    this.y = lerp(this.y, this.toY, this.smoothing);
    this.scale = lerp(this.scale, this.toScale, this.smoothing);

    // print(this.x,this.y,this.scale);
    
    //clipping
    //in Processing you can do: // clip(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    //in P5js we can use this: https://github.com/processing/p5.js/issues/3998#issuecomment-670270414
    
    if (this.doClipping) {
      drawingContext.save(); // Save before clipping mask so you can undo it later on. ALWAYS DO THIS BEFORE TRANSLATIONS.
      noFill();
      stroke(255)
      rect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
      drawingContext.clip();
    }

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

  end() {
    pop();
    if (this.doClipping) {
      drawingContext.restore(); //=noClip() Remove the clippping mask and go back to normal.
    } else {
      noFill();
      stroke(255)
      rect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    }
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

  fromViewToScreen(_x, _y) {
    ////FIXME ZIT HIER EEN FOUT??
    //bij moveToViewCoords(0,0) zou de links bovenhoek van de scan linksboven in de viewport moeten zitten.
    let contentTopLeftInScreenCoords = this.getTransformed(createVector());
    let contentBottomRightInScreenCoords = this.getTransformed(createVector(this.contentWidth, this.contentHeight));
    let x = map(_x, 0, this.contentWidth, contentTopLeftInScreenCoords.x, contentBottomRightInScreenCoords.x);
    let y = map(_y, 0, this.contentHeight, contentTopLeftInScreenCoords.y, contentBottomRightInScreenCoords.y);
    return createVector(x, y);
  }

  zoomBy(delta, ax, ay) {   //delta is a small negative or positive value for example 0.01
    if (ax==undefined) ax = mouseX;
    if (ay==undefined) ay = mouseY;

    //mouse in viewport in screen coordinates 
    var mx = ax - this.bounds.x;
    var my = ay - this.bounds.y;

    //zoom factor needs to be between about 0.99 and 1.01 to be able to multiply so add 1
    var zoomFactor = delta + 1.0;
    var newScale = constrain(this.scale * zoomFactor, this.minScale, this.maxScale);

    //next two lines are the most important lines of the code.
    //subtract mouse in 'old' scale from mouse in 'new' scale and apply that to position.
    this.toX -= (mx/newScale - mx/this.toScale);
    this.toY -= (my/newScale - my/this.toScale);

    //apply the new scale
    this.toScale = newScale;
  }

  moveBy(deltaX, deltaY) { //screen coords
    this.toX += -deltaX / this.toScale;
    this.toY += -deltaY / this.toScale;
  }

  // moveTo(deltaX, deltaY) { //screen coords
  //   this.toX = deltaX / this.toScale;
  //   this.toX = deltaY / this.toScale;
  // }

  moveToViewCoords(x, y) { //View coords == Content coords
    let toScreen = this.fromViewToScreen(x, y);
    this.moveBy(-toScreen.x, -toScreen.y);
    this.moveBy(this.bounds.x, this.bounds.y); //hmm.. why? but it helps
  }

}