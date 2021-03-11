class Matrix {
  
  constructor() {
    this.m = [1.0,0.0,0.0,0.0,  0.0,1.0,0.0,0.0,  0.0,0.0,1.0,0.0,  0.0,0.0,0.0,1.0];
  }

  translate(x,y,z) {
    z = z || 0;
    this.m[12] += this.m[0] * x + this.m[4] * y + this.m[8] * z;
    this.m[13] += this.m[1] * x + this.m[5] * y + this.m[9] * z;
    this.m[14] += this.m[2] * x + this.m[6] * y + this.m[10] * z;
    this.m[15] += this.m[3] * x + this.m[7] * y + this.m[11] * z;
  }

  scale(x,y,z) {
    if (y==undefined) y=x;
    if (z==undefined) z=1; //?
    this.m[0] *= x; this.m[1] *= x; this.m[2] *= x; this.m[3] *= x; 
    this.m[4] *= y; this.m[5] *= y; this.m[6] *= y; this.m[7] *= y;
    this.m[8] *= z; this.m[9] *= z; this.m[10] *= z; this.m[11] *= z;
  }

  mult(v) {
    var _dest = createVector();
    _dest.x = this.m[0] * v.x + this.m[4] * v.y + this.m[8] * v.z + this.m[12];
    _dest.y = this.m[1] * v.x + this.m[5] * v.y + this.m[9] * v.z + this.m[13];
    _dest.z = this.m[2] * v.x + this.m[6] * v.y + this.m[10] * v.z + this.m[14];
    var w = this.m[3] * v.x + this.m[7] * v.y + this.m[11] * v.z + this.m[15];

    if (Math.abs(w) > Number.EPSILON) {
      _dest.mult(1.0 / w);
    }
    return _dest;
  }

}