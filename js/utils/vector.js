class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static from(a, b) {
    return new Vector(b.x-a.x, b.y-a.y);
  }
  normalize() {
    var dist = Math.sqrt(this.x**2 + this.y**2);
    this.x /= dist;
    this.y /= dist;
    return this;
  }
  multiply(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }
}
