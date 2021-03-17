let loaded;
let books = [];

let imgGuideIntro, imgGuideLogin, imgGuideDocs, imgGuidePage;
let sceneManager;

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
    
  sceneManager = new SceneManager();
  sceneManager.wire();
  sceneManager.showScene(PageView);
}

function mouseWheel(event) { //WheelEvent in not supplied by sceneManager
  let fn = sceneManager.scene.oScene["mouseWheel"];
  if (fn) fn.call(sceneManager.scene.oScene, event);
}


