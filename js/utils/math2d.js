class Math2D {
  static pixelDistance2(a, b) {
    return (a.x - b.x)**2 + (a.y - b.y)**2;
  }
  static pixelDistance(a, b) {
    return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
  }
}
