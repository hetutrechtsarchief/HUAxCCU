class PageData {
  
  constructor() {
    print("PageData constructor")
    this.textLines = [];
  }

  parsePageXML(xml) {   //this is the P5js XML approach. Consider to switch to native DOM xml
    for (let page of xml.getChildren("Page")) {
      let w = page.getString("imageWidth");
      let h = page.getString("imageHeight");
      for (let textRegion of page.getChildren("TextRegion")) {
        let textRegionId = textRegion.getString("id");
        for (let textLineXML of textRegion.getChildren("TextLine")) {
            let textLine = new TextLineData();

            textLine.id = textLineXML.getString("id");

            for (let coordXML of textLineXML.getChildren("Coords")) {
              let coords = coordXML.getString("points").split(" ");
              for (let c of coords) {
                let xy = c.split(",");
                textLine.coords.addPoint(int(xy[0]), int(xy[1]));
              }
            }

            for (let textEquivXML of textLineXML.getChildren("TextEquiv")) {
              textLine.txt = textEquivXML.getContent("Unicode");
            }

            this.textLines.push(textLine);


          // for (let wordXML of textLine.getChildren("Word")) {
          //   let id = wordXML.getString("id");
          //   let word = new Word(id, "");
          //   this.words.push(word);
            
          //   for (let coordXML of wordXML.getChildren("Coords")) {
          //     let coords = coordXML.getString("points").split(" ");
              
          //     for (let c of coords) {
          //       let xy = c.split(",");
          //       word.poly.addPoint(int(xy[0]), int(xy[1]));
          //     }

          //     for (let textEquiv of wordXML.getChildren("TextEquiv")) {
          //       word.txt = textEquiv.getContent("Unicode");
          //     }
          //   }
          // }
        }
      }
    }
  }
}

  // parseXML(xml) {
  //   if (xml.getName()=="PcGts") this.parsePageXML(xml);
  //   else if (xml.getName()=="alto") this.parseAltoXML(xml);
  //   else print("invalid xml format",xml.getName())
  // }

  // parsePageXML(xml) {
    // if (!xml) return;
    // this.textLines = [];

    // print("parsePageXML")

    // for (let page of xml.getChildren("Page")) {
    //   let w = page.getString("imageWidth");
    //   let h = page.getString("imageHeight");
    //   for (let textRegion of page.getChildren("TextRegion")) {
    //     let textRegionId = textRegion.getString("id");
    //     for (let textLine of textRegion.getChildren("TextLine")) {
    //       let textLineId = textLine.getString("id");

    //       const coords = line.Coords._attributes.points.split(' ').map((p) => {
    //         return p.split(',').map(c => parseInt(c));
    //       });

    //       this.textLines.push({
    //         "id": line._attributes.id,
    //         "coords" : coords,
    //         "text" : line?.TextEquiv?.Unicode._text
    //       });
    //     }
    //   }
    // }

        // for (const region of this.page.TextRegion) {
        //     // TODO: does this actally happen?
        //     if (!Array.isArray(region.TextLine)) {
        //         region.TextLine = [ region.TextLine ];
        //     }

        //     for (const line of region.TextLine) {
        //         const coords = line.Coords._attributes.points.split(' ').map((p) => {
        //             return p.split(',').map(c => parseInt(c));
        //         });

        //         lines.push({
        //             "coordinates" : coords,
        //             "id" : line._attributes.id,
        //             "text" : line?.TextEquiv?.Unicode._text
        //         });
        //     }

    // for (let page of xml.getChildren("Page")) {
    //   let w = page.getString("imageWidth");
    //   let h = page.getString("imageHeight");
    //   for (let textRegion of page.getChildren("TextRegion")) {
    //     let textRegionId = textRegion.getString("id");
    //     for (let textLine of textRegion.getChildren("TextLine")) {
    //       let textLineId = textLine.getString("id");
    //       for (let wordXML of textLine.getChildren("Word")) {
    //         let id = wordXML.getString("id");
    //         let word = new Word(id, "");
    //         this.words.push(word);
            
    //         for (let coordXML of wordXML.getChildren("Coords")) {
    //           let coords = coordXML.getString("points").split(" ");
              
    //           for (let c of coords) {
    //             let xy = c.split(",");
    //             word.poly.addPoint(int(xy[0]), int(xy[1]));
    //           }

    //           for (let textEquiv of wordXML.getChildren("TextEquiv")) {
    //             word.txt = textEquiv.getContent("Unicode");
    //           }
    //         }
    //       }
    //     }
    //   }
    //}
  // }

  // parseAltoXML(xml) {
  //   this.words = [];
  //   if (!xml) return;

  //   for (let layout of xml.getChildren("Layout")) {
  //     for (let page of layout.getChildren("Page")) {
  //       for (let printspace of page.getChildren("PrintSpace")) {
  //         for (let textblock of printspace.getChildren("TextBlock")) {
  //           for (let textline of textblock.getChildren("TextLine")) {
  //             let strings = textline.getChildren("String");
  //             for (let i=0; i<strings.length; i++) {
  //               let id = strings[i].getString("ID");
  //               let txt = strings[i].getString("CONTENT");
  //               let x = int(strings[i].getString("HPOS"));
  //               let y = int(strings[i].getString("VPOS"));
  //               let w = int(strings[i].getString("WIDTH"));
  //               let h = int(strings[i].getString("HEIGHT"));
                
  //               let word = new Word(id, txt);
  //               word.poly.addPoint(x,y);
  //               word.poly.addPoint(x+w,y+h);
  //               this.words.push(word);                
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }

  // }


// }