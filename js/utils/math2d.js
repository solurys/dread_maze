class Math2D {
  static pixelDistance2(a, b) {
    return (a.x - b.x)**2 + (a.y - b.y)**2;
  }
  static pixelDistance(a, b) {
    return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
  }
}

// limite n entre min et max
function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}
