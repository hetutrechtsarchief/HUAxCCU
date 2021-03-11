class Page {

  constructor() {

  }

  enter() {
    print("enter Page")
    //const imgUrl = "https://iiif2.hualab.nl/iiif/2/gevangenisregisters%2f18-4.573%2fNL-UtHUA_18-4_573_000004.jpg/450,990,6594,708/max/0/default.jpg";
    //const imgUrl = "https://files.transkribus.eu/iiif/2/PMLIQCQYLTEDZNCWCYBCOCKP/full/,1000/0/default.jpg";
    const imgUrl = "https://files.transkribus.eu/Get?id=GVCQVDZRFSOOGXUHMZCJGPZK&fileType=view";
    this.thumb = loadImage("https://files.transkribus.eu/Get?id=GVCQVDZRFSOOGXUHMZCJGPZK&fileType=thumb");
    this.imgWidth = 9130;
    this.imgHeight = 6720;
    this.view = new Viewport(22, 148, 1130-22, 772-148, this.imgWidth, this.imgHeight);
    this.img = loadImage(imgUrl, (img)=>{
      print(img.width, img.height)
      this.loaded = true;
    });

  }

  draw() {
    background(128);
    image(imgGuidePage,0,0);
    fill(0);

    rect(this.view.bounds.x, this.view.bounds.y, this.view.bounds.width, this.view.bounds.height);

    if (!this.loaded) {
      const ratio = this.imgWidth/this.imgHeight;
      image(this.thumb,this.view.bounds.x+this.view.bounds.width/2 - (this.view.bounds.height*ratio/2), this.view.bounds.y, this.view.bounds.height*ratio, this.view.bounds.height);
      push();
      fill(0);
      translate(this.view.bounds.getCenterX(), this.view.bounds.getCenterY());
      rotate(frameCount);
      rect(-15,-15,30,30);
      pop();
    } else {
      this.view.begin();
      image(this.img,0,0);
      this.view.end();
    }

    // info button
    fill(255,128,0);
    noStroke();
    ellipse(1104, 176, 35, 35);
    fill(255);
    textSize(25);
    textAlign(CENTER);
    text("?", 1104, 176+10);
  }

  keyPressed() {
    // this.sceneManager.showScene(Main);
  }
  mousePressed() {
    print(mouseX,mouseY);
  }

  mouseDragged() {
    this.view.moveBy(movedX, movedY);
  }

  mouseWheel(event) {
    // print("mouseWheel",event)
    this.view.zoomBy(-event.delta * .01)
  }


}
