let loaded;
let books = [];

let imgGuideIntro, imgGuideLogin, imgGuideDocs, imgGuidePage;
let sceneManager;

const API="/api/index.php";

function preload() {
  imgGuideIntro = loadImage("img/imgGuideIntro.svg");
  imgGuideLogin = loadImage("img/imgGuideLogin.svg");
  imgGuideDocs = loadImage("img/imgGuideDocs.svg");
  imgGuidePage = loadImage("img/imgGuidePage.svg");
}

function setup() {
  frameRate(40);
  createCanvas(1340, 800); 
  // createCanvas(windowWidth, windowHeight);
  
  sceneManager = new SceneManager();
  sceneManager.wire();
  sceneManager.showScene(Intro);

  // let inp = createInput('');
}

function mouseWheel(event) { //hack because sceneManager does not supply WheelEvent
  let fn = sceneManager.scene.oScene["mouseWheel"];
  if (fn) fn.call(sceneManager.scene.oScene, event);
}



  // window.touchMoved = function() {
  //   return false;
  // }


  // xml = loadXML("data/wolvenplein1919-page5.xml", ()=>{

  //   for (let page of xml.getChildren("Page")) {
  //     let w = page.getString("imageWidth");
  //     let h = page.getString("imageHeight");
  //     // print(w,h);
  //     for (let textRegion of page.getChildren("TextRegion")) {
  //       let textRegionId = textRegion.getString("id");
  //       for (let textLine of textRegion.getChildren("TextLine")) {
  //         let textLineId = textLine.getString("id");
  //         // print(textLineId);
  //         for (let textEquiv of textLine.getChildren("TextEquiv")) {
  //           let unicode = textEquiv.getChild("Unicode");
  //           if (unicode) {
  //             content = unicode.getContent();
  //             // if (content!="") {
  //             print(content);
  //             unicode.setContent("asdf");
  //             print(unicode.getContent());
  //           } 
  //         }
  //       }
  //     }
  //   }

  //   print(xml.serialize());
  // });

          
  // print(xml);

  // books = loadJSON("/api/book.php", (b)=>{
  //   print(b);
  // });

  // const imgUrl = "https://iiif2.hualab.nl/iiif/2/gevangenisregisters%2f18-4.573%2fNL-UtHUA_18-4_573_000004.jpg/450,990,6594,708/max/0/default.jpg";

  // img = loadImage(imgUrl, ()=>{
  //   view = new Viewport(0, height/2, width, height/2, img.width, img.height);
  //   loaded = true;
  // });

  // let inp = createInput('');
  // inp.input(myInputEvent);

// http://localhost:8000/api/book/?id=2

  // api.get("book")
  
  

  //


  // books.push(new Book("Gansstraat 1919"));
  // books.push(new Book("Wolvenplein 1919"));

  // print(books);
// }

// function myInputEvent() {
//   console.log('you are typing: ', this.value());
// }

// function draw() {
//   if (!loaded) return;
//   background(0);

//   view.begin();
//   image(img,0,0);
//   view.end()
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }


