class PageView extends PageData {

  constructor() {
    super();
    this.textInput = "test";
    this.selectedItem = null;
  }

  enter() {
    print("enter Page")

    let colWidths = [ 125, 652, 203, 203, 203, 145, 399, 383, 299, 166, 163, 338+10,
                      217, 163, 156, 364, 229, 184, 185, 187, 187, 580, 408, 442 ];

    let rowHeight = 719;
    let rowHeights = [ rowHeight, rowHeight, rowHeight, rowHeight, rowHeight, rowHeight ];

    let offsetX = 505; //470;
    let offsetY = 453 + 544;
    this.tbl = createTable(offsetX, offsetY, colWidths, rowHeights);
    this.tbl.skipColumn(11);
    this.tbl.skipColumn(14);
    this.tbl.skipColumn(15);
    this.tbl.skipColumn(16);
    this.tbl.skipColumn(17);
    this.tbl.skipColumn(18);
    this.tbl.skipColumn(19);
    this.tbl.skipColumn(20);
    this.tbl.skipColumn(21);
    this.tbl.skipColumn(22);
    this.tbl.skipColumn(23);

    this.loadingStarted = millis();

    var self = this;

    loadJSON(API+'?action=getPageInfo&coll_id=87815&doc_id=469657&page=1', function(json) {
      print(json);

      if (!json.status) {
        alert("Error: " + json.data);
        return;
      }

      const imgUrl = "img/view_02.jpg"; //json.data.url; //"https://files.transkribus.eu/Get?id=GVCQVDZRFSOOGXUHMZCJGPZK&fileType=view";
      self.thumb = loadImage(json.data.thumbUrl); //"https://files.transkribus.eu/Get?id=GVCQVDZRFSOOGXUHMZCJGPZK&fileType=thumb");
      self.imgWidth = 9130;
      self.imgHeight = 6720;
      self.view = new Viewport(22, 340, 1130-22, 350, self.imgWidth, self.imgHeight);
      self.img = loadImage(imgUrl, (img)=>{
        self.view.contentWidth = img.width;
        self.view.contentHeight= img.height;
        self.loaded = true;
      });

      loadXML(json.data.tsList.transcripts[0].url, function(xml) {
        self.parsePageXML(xml);

        //find cell for textline
        for (let line of self.textLines) {          
          let c = self.tbl.getCellWithMostOverlap(line);
          if (c!=null) {
            line.clr = c.clr;
            line.cell = c;
          }
        }

        //removeIf
        self.textLines = self.textLines.filter(line => line.cell!=null && !line.cell.skip);

        //sort textLines by row,col,y
        self.textLines.sort(function(a, b) {
          let c = a.cell.row < b.cell.row ? -1 : a.cell.row > b.cell.row ? 1 : 0;
          if (c == 0) c = a.cell.col < b.cell.col ? -1 : a.cell.col > b.cell.col ? 1 : 0;
          if (c == 0) c = a.getBounds().y < b.getBounds().y ? -1 : a.getBounds().y > b.getBounds().y ? 1 : 0;
          return c;
        });

        //selectedItem
        self.selectedItem = self.textLines[0];

      })
    });
  }

  draw() {
    background(0);
    image(imgGuidePage,0,0);
    fill(0);

    if (this.view) {

      rect(this.view.bounds.x, this.view.bounds.y, this.view.bounds.width, this.view.bounds.height);

      if (!this.loaded) {
        const ratio = this.imgWidth/this.imgHeight;
        image(this.thumb,this.view.bounds.x+this.view.bounds.width/2 - (this.view.bounds.height*ratio/2), this.view.bounds.y, this.view.bounds.height*ratio, this.view.bounds.height);
      } else {
        this.view.begin();
        image(this.img,0,0);

        //draw table cell
        for (let c of this.tbl.cells) {
          if (c.skip) continue;
          noStroke();
          fill(c.clr);
          rect(c.bounds.x, c.bounds.y, c.bounds.width, c.bounds.height);
        }
        stroke(255,0,0);
        noFill();
        ellipse(this.tbl.x, this.tbl.y, 30, 30);
        fill(255,0,0);
        ellipse(this.tbl.x, this.tbl.y, 10, 10);

        //draw textline bounds
        if (this.textLines) {
          for (let line of this.textLines) {
            // if (line.cell && !line.cell.skip) {

            if (line == this.selectedItem) {
              stroke(0, 255, 255);
              strokeWeight(4);
             } else {
              stroke(0, 255, 255);
              strokeWeight(1);
             }

             // line.draw();
             noFill();
             drawRect(line.getBounds());
             
             if (line.text) {
               fill(255,255,0);
               noStroke();
               text(line.text, line.getBounds().x, line.getBounds().y);
             }
          }
        }
      
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

      //textinput
      fill(255);
      rect(62, 710, 300, 50);
      fill(0);
      textSize(40);
      textAlign(LEFT);
      text(this.textInput, 70, 710+35);
    }

    //loader
    if (!this.loaded) {
      fill(255);
      rect(427,419,30+(millis()-this.loadingStarted)/1000*100,30);
    }
  }

  focus() {
    // let selectedItem = lines.get(itemIndex);
    if (this.selectedItem==null) return;
    //this.view.moveToViewCoords(this.selectedItem.cell.bounds.x, this.selectedItem.cell.bounds.y);
    // this.view.moveBy(200, 5);
    this.view.moveToViewCoords(0,0);
  }

  selectLine(i) {
    this.itemIndex = i;
    //FIXME: limit/constrain/wrap
    this.selectedItem = this.textLines[this.itemIndex];
  }


  keyTyped() {
    if (keyCode==9) { //TAB
      print("keyTyped TAB")
      return false;
    }
  }

  keyReleased() {
    if (keyCode==9) { //TAB
      print("keyReleased TAB")
      return false;
    }
  }

  keyPressed() {
    
    //backspace
    if (keyCode==8 && this.textInput.length>0) {
      this.textInput = this.textInput.substr(0,this.textInput.length-1);
    }
    
    if (keyCode==9) { //TAB
      print("keyPressed TAB")
      return false;
    }

    if (key=='1') {
      this.selectLine(0); //itemIndex + (shiftDown ? -1 : 1));
      this.focus();
    }

    //normal characters
    let ch = unchar(key);
    if (ch>=32 && ch<=128 ) {
      this.textInput += key;
    }

    print(keyCode,key);

  }

  mousePressed() {
    print(int(mouseX),int(mouseY));

    this.updateMouse();
    this.down = this.view.fromScreenToView(mouseX, mouseY); //in Viewport coordiates
    print("this.down",this.down);
  }

  mouseDragged() {
    this.updateMouse();

    let d = dist(this.tbl.x, this.tbl.y, this.mouse.x, this.mouse.y);
    if (d<15) { 
      this.tbl.setLocation(this.mouse.x, this.mouse.y);
    } else {
      this.view.moveBy(movedX, movedY);
    }
  }

  mouseWheel(event) {
    // print("mouseWheel",event)
    this.view.zoomBy(-event.delta * .01)
  }

  updateMouse() {
    if (this.view) {
      this.mouse = this.view.fromScreenToView(mouseX, mouseY);
    }
  }


}
