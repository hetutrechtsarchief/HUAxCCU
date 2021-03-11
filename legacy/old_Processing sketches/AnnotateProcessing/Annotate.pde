class Annotation {
  ArrayList<Word> words = new ArrayList();
  String type;

  Rectangle getBounds() {
    Rectangle rect = new Rectangle();
    for (Word w: words) {
      if (rect.isEmpty()) rect = w.poly.getBounds();
      else rect.add(w.poly.getBounds()); 
    }
    return rect;
  }
}


////class URI extends String {
////  URI(String s) {
////    this(s);
////  }
////}

////class Prefix {
////  String prefix, uri;
////}

//////class Subject extends URI {
//////  String id, value;
//////}

//////class Predicate extends URI {
//////  String id, value;
//////}

//////class Object extends URI {
//////  String id, value;
//////}

////class Triple {
////  URI s,p,o;
////  //Subject s;
////  //Predicate p;
////  //Object o;
  
////  Triple(URI s, URI p, URI o) { //o can also be a literal
////    this.s = s;
////    this.p = p;
////    this.o = o;
////  }
////}
 
//class Triple {
//  String s,p,o;
//  Triple(String s, String p, String o) {
//    this.s = s;
//    this.p = p;
//    this.o = o;
//  }
//}


//void selectionToAnnotations() {
//  for (Word w: p.words) {
//    if (w.selected) {
//      Annotation a = new Annotation();
//      annotations.add(a);
      
//      //a.type = "huisnummer"; //annotation type
//      a.bounds = w.poly.getBounds();
//      a.bodyId = "http://hualab.nl/id/HUA123123.jpg";
//      a.targetId = "hualab.nl/id/adres-Abraham Bloemaertstraat-25-x0001";
      
//      //oa:hasSelector
      
//      //a.label = "Abraham Bloemaertstraat" + w.txt;
//    }
//  }
//}

//void saveAnnotations() {
//  PrintWriter out = createWriter("annotations.ttl");
  
//  out.println("<http://www.w3.org/ns/oa#hasSelector> [" + a.targetId;
    
//  //  Annotation a = new Annotation();
//  //  a.type = "hualab.nl/def/adres"; //AdrfesInAdresboek1860
        
      
//  //    bodyId = "http://hualab.nl/123123.jpg";
//  //    rdfType = "http://hualab.nl/def/huisnummer";
      
      
//  //    a.subject = "http://hualab.nl/id/adres2345234"
//  //    a.predicate = "http://hualab.nl/def/huisnummer";
//  //    a.object = w.txt; //literal 
//  //  }
//  //}
//}

//ArrayList<String> uris = new ArrayList();

//class Triples extends ArrayList<Triple> {
   
//}
