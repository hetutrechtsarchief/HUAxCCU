class Documents {

  constructor() {
    
  }

  enter() {
    print("enter Documents")

    var self = this;
    httpGet(API+'?action=getDocuments&coll_id=54631', 'json', function(res) {
      if (res.status) {
        self.data = res.data;
      }
    });
  }

  draw() {
  	background(0);
    image(imgGuideDocs,0,0);

    if (!this.data) return;

    for (let i=0; i<this.data.length; i++) {
      fill(255);
      textAlign(LEFT);
      textSize(20);
      text(this.data[i].title, 50, i*20 + 50);
    }

  }

  mousePressed() {
    this.sceneManager.showScene(Page);
  }

  keyPressed() {
    this.sceneManager.showScene(Page);
  }

}
