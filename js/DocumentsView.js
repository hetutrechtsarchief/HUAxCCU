class DocumentsView {

  constructor() {
    
  }

  enter() {
    print("enter Documents")

    var self = this;
    loadJSON(API+'?action=getDocuments&coll_id=54631', function(res) {
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
    this.sceneManager.showScene(PageView);
  }

  keyPressed() {
    this.sceneManager.showScene(PageView);
  }

}
