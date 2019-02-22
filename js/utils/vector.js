class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static from_to(a, b) {
    return new Vector(b.x-a.x, b.y-a.y);
  }
  length() {
    return Math.sqrt(this.x**2 + this.y**2);
  }
  normalize() {
    var length = this.length();
    this.x /= length;
    this.y /= length;
    return this;
  }
  multiply(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }
}
