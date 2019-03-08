class Math2D {
  static pixelDistance2(a, b) {
    return (a.x - b.x)**2 + (a.y - b.y)**2;
  }
  static pixelDistance(a, b) {
    return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
  }
  static guessDirection(vector) {
         if (vector.y >= vector.x && vector.y >= -vector.x) return 'down';
    else if (vector.y >= vector.x && vector.y <= -vector.x) return 'left'
    else if (vector.y <= vector.x && vector.y <= -vector.x) return 'up';
    else if (vector.y <= vector.x && vector.y >= -vector.x) return 'right';
  }
  static rangeCheck(self, other, range) {
    return self.left - range <= other.right
        && self.right + range >= other.left
        && self.top - range <= other.bottom
        && self.bottom + range >= other.top;
  }
}

// limite n entre min et max
function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}
