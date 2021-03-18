let loaded;
let books = [];

let imgGuideIntro, imgGuideLogin, imgGuideDocs, imgGuidePage;
let textLines = [];
let view = undefined;
let textInput = "test";
let itemIndex = 0;

const API="/api/index.php";

function preload() {
  imgGuideIntro = loadImage("img/imgGuideIntro.jpg");
  imgGuideLogin = loadImage("img/imgGuideLogin.jpg");
  imgGuideDocs = loadImage("img/imgGuideDocs.jpg");
  imgGuidePage = loadImage("img/imgGuidePage.jpg");
}

function setup() {
  frameRate(40);
  createCanvas(1340, 800);
    
  print("enter Page")

  let colWidths = [ 125, 652, 203, 203, 203, 145, 399, 383, 299, 166, 163, 338+10,
                    217, 163, 156, 364, 229, 184, 185, 187, 187, 580, 408, 442 ];

  let rowHeight = 719;
  let rowHeights = [ rowHeight, rowHeight, rowHeight, rowHeight, rowHeight, rowHeight ];

  let offsetX = 505; //470;
  let offsetY = 453 + 544;
  tbl = createTable(offsetX, offsetY, colWidths, rowHeights);
  tbl.skipColumn(11);
  tbl.skipColumn(14);
  tbl.skipColumn(15);
  tbl.skipColumn(16);
  tbl.skipColumn(17);
  tbl.skipColumn(18);
  tbl.skipColumn(19);
  tbl.skipColumn(20);
  tbl.skipColumn(21);
  tbl.skipColumn(22);
  tbl.skipColumn(23);

  loadingStarted = millis();

  // var self = this;
  // print(self);

  loadJSON(API+'?action=getPageInfo&coll_id=87815&doc_id=469657&page=1', function(json) {
    print(json);

    if (!json.status) {
      alert("Error: " + json.data);
      return;
    }

    const imgUrl = "img/view_02.jpg"; //json.data.url; //"https://files.transkribus.eu/Get?id=GVCQVDZRFSOOGXUHMZCJGPZK&fileType=view";
    thumb = loadImage(json.data.thumbUrl); //"https://files.transkribus.eu/Get?id=GVCQVDZRFSOOGXUHMZCJGPZK&fileType=thumb");
    imgWidth = 9130;
    imgHeight = 6720;
    view = new Viewport(22, 340, 1130-22, 350, imgWidth, imgHeight);
    img = loadImage(imgUrl, (img)=>{
      view.contentWidth = img.width;
      view.contentHeight= img.height;
      loaded = true;
    });

    loadXML(json.data.tsList.transcripts[0].url, function(xml) {
      parsePageXML(xml);

      //find cell for textline
      for (let line of textLines) {          
        let c = tbl.getCellWithMostOverlap(line);
        if (c!=null) {
          line.clr = c.clr;
          line.cell = c;
        }
      }

      //removeIf
      textLines = textLines.filter(line => line.cell!=null && !line.cell.skip);

      //sort textLines by row,col,y
      textLines.sort(function(a, b) {
        let c = a.cell.row < b.cell.row ? -1 : a.cell.row > b.cell.row ? 1 : 0;
        if (c == 0) c = a.cell.col < b.cell.col ? -1 : a.cell.col > b.cell.col ? 1 : 0;
        if (c == 0) c = a.getBounds().y < b.getBounds().y ? -1 : a.getBounds().y > b.getBounds().y ? 1 : 0;
        return c;
      });

      //selectedItem
      selectedItem = textLines[0];

    })
  });
   
}

function mouseWheel(event) { //WheelEvent in not supplied by sceneManager
  let fn = sceneManager.scene.oScene["mouseWheel"];
  if (fn) fn.call(sceneManager.scene.oScene, event);
}

function draw() {
  background(0);
  image(imgGuidePage,0,0);
  fill(0);

  if (view) {

    rect(view.bounds.x, view.bounds.y, view.bounds.width, view.bounds.height);

    if (!loaded) {
      const ratio = imgWidth/imgHeight;
      image(thumb,view.bounds.x+view.bounds.width/2 - (view.bounds.height*ratio/2), view.bounds.y, view.bounds.height*ratio, view.bounds.height);
    } else {
      view.begin();
      image(img,0,0);

      //draw table cell
      for (let c of tbl.cells) {
        if (c.skip) continue;
        noStroke();
        fill(c.clr);
        rect(c.bounds.x, c.bounds.y, c.bounds.width, c.bounds.height);
      }
      stroke(255,0,0);
      noFill();
      ellipse(tbl.x, tbl.y, 30, 30);
      fill(255,0,0);
      ellipse(tbl.x, tbl.y, 10, 10);

      //draw textline bounds
      if (textLines) {
        for (let line of textLines) {
          // if (line.cell && !line.cell.skip) {

          if (line == selectedItem) {
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
    
      view.end();
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
    text(textInput, 70, 710+35);
  }

  //loader
  if (!loaded) {
    fill(255);
    rect(427,419,30+(millis()-loadingStarted)/1000*100,30);
  }
}

function focus() {
  // let selectedItem = lines.get(itemIndex);
  if (selectedItem==null) return;
  
  print("x,y",selectedItem.cell.bounds.x, selectedItem.cell.bounds.y);

  view.moveToViewCoords(selectedItem.cell.bounds.x, selectedItem.cell.bounds.y);
  // view.moveToViewCoords(0,0);
  view.moveBy(200, 5);
}

function selectLine(i) {
  itemIndex = i;
  //FIXME: limit/constrain/wrap
  selectedItem = textLines[itemIndex];
}

function keyTyped() {
  if (keyCode==9) { //TAB
    print("keyTyped TAB")
    return false;
  }
}

function keyReleased() {
  if (keyCode==9) { //TAB
    print("keyReleased TAB")
    return false;
  }
}

function isShiftDown() {
  return keyIsDown(16);
}

function keyPressed() { 


  //backspace
  if (keyCode==8 && textInput.length>0) {
    textInput = textInput.substr(0,textInput.length-1);
  }
  
  if (keyCode==9) { //TABboolean shiftDown = false;
    print("keyPressed TAB")
    
    selectLine(itemIndex + (isShiftDown() ? -1 : 1));
    focus();

    return false;
  }

  // if (key=='1') {
    
  //   // view.moveToViewCoords(0,0);
  // }

  //normal characters
  let ch = unchar(key);
  if (ch>=32 && ch<=128 ) {
    textInput += key;
  }

  print(keyCode,key);

}

function mousePressed() {
  print(int(mouseX),int(mouseY));

  updateMouse();
  down = view.fromScreenToView(mouseX, mouseY); //in Viewport coordinates
  print("down",down);
}

function mouseDragged() {
  updateMouse();

  let d = dist(tbl.x, tbl.y, mouse.x, mouse.y);
  if (d<15) { 
    tbl.setLocation(mouse.x, mouse.y);
  } else {
    view.moveBy(movedX, movedY);
  }
}

function mouseWheel(event) {
  // print("mouseWheel",event)
  view.zoomBy(-event.delta * .01)
}

function updateMouse() {
  if (view) {
    mouse = view.fromScreenToView(mouseX, mouseY);
  }
}

function parsePageXML(xml) {   //this is the P5js XML approach. Consider to switch to native DOM xml
  for (let page of xml.getChildren("Page")) {
    let w = page.getString("imageWidth");
    let h = page.getString("imageHeight");
    for (let textRegion of page.getChildren("TextRegion")) {
      let textRegionId = textRegion.getString("id");
      for (let textLineXML of textRegion.getChildren("TextLine")) {
        let textLine = new TextLine();

        textLine.id = textLineXML.getString("id");

        for (let coordXML of textLineXML.getChildren("Coords")) {
          let coords = coordXML.getString("points").split(" ");
          for (let c of coords) {
            let xy = c.split(",");
            textLine.coords.addPoint(int(xy[0]), int(xy[1]));
          }
        }

        for (let textEquivXML of textLineXML.getChildren("TextEquiv")) {
          for (let unicodeXML of textEquivXML.getChildren("Unicode")) {
            textLine.text = unicodeXML.getContent();
            break; //break after first child
          }
        }

        textLines.push(textLine);
      }
    }
  }
}
