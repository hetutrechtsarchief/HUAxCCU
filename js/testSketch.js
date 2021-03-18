function preload() {
  img = loadImage("img/view_02.jpg");
}

function setup() {
  createCanvas(1000,500);
  print(img.width, img.height);
  view = new Viewport(0,100,width,height, img.width, img.height);
}

function draw() {
  background(0);
  view.begin();
  image(img,0,0);
  view.end();
}

function mouseDragged() {
  view.moveBy(movedX, movedY);
}
 
function mouseWheel(event) {
  view.zoomBy(-event.delta * .01)
}

function keyPressed() {
  if (key==' ') {
    view.moveToViewCoords(0,0);
  }

  return false;
}