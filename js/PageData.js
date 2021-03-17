class PageData {
  
  constructor() {
    this.textLines = [];
  }

  parsePageXML(xml) {   //this is the P5js XML approach. Consider to switch to native DOM xml
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

          this.textLines.push(textLine);
        }
      }
    }
  }
}
