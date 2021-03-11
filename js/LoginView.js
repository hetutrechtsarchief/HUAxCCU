class LoginView {

  constructor() {
    this.naam = "";
  }

  enter() {
    // prompt("Wat is je naam?");
    // let txtName = createInput("");
    // txtName.id("txtName"); 
    // inp.input(myInputEvent);
  }

  draw() {
  	background(0);
    image(imgGuideLogin,0,0);

    // prompt("Wat is je naam?");
  
    // textAlign(CENTER,CENTER);
    // fill(255);
    // textSize(30);
    // text("Wat is je naam?", width/2,height/2-100);

    fill(255);
    textSize(25);
    text(this.naam, 686, 293);
  }

  mousePressed() {
    this.sceneManager.showScene(DocumentsView);
  }

  keyTyped() {

    if (key=='Enter') {
      this.sceneManager.showScene(DocumentsView);
      return;
    }

    // // if (char(key)>;

    this.naam+=key;

    return false;
  }

}
