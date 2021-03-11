class Intro {

  constructor() {

  }

  enter() {
    print("enter Intro")
  }

  draw() {
    background(0);
    image(imgGuideIntro,0,0);
  }

  mousePressed() {
    this.sceneManager.showScene(Login);
  }

}
