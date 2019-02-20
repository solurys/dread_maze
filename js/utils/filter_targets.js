class FilterTargets {
  constructor(self, targets) {
    this.self = self;
    this.poss = [];
    for (var t of targets) {
      if      (t instanceof Phaser.Group)  this.poss.push(...t.children);
      else if (t instanceof Array)         this.poss.push(...t);
      else if (t instanceof FilterTargets) this.poss.push(...t.poss);
      else                                 this.poss.push(t);
    }
    // enlever les duplications des targets et self
    var set = new Set(this.poss);
    set.delete(self);
    this.poss = [...set];
  }
  clone() {
    return new FilterTargets(this.self, [this.poss]);
  }
  split() {
    return this.clone();
  }
  static merge(...filterResults) {
    return new FilterTargets(this.self, filterResults);
  }
  // accesseurs
  first() {
    return this.poss[0];
  }
  last() {
    return this.poss[this.poss.length - 1];
  }
  toArray() {
    return this.poss;
  }
  // operations de base
  filter(f) {
    this.poss = this.poss.filter(f);
    return this;
  }
  sort(f) {
    this.poss.sort(f);
    return this;
  }
  shuffle() {
    for (var i = this.poss.length - 1; i > 0; i--) {
      var j = Math.random() * (i-1);
      var temp = this.poss[i];
      this.poss[i] = this.poss[j];
      this.poss[j] = temp;
    }
    return this;
  }
  // filtres
  alive() {
    return this.filter(e => e.alive);
  }
  dead() {
    return this.filter(e => !e.alive);
  }
  ofType(type) {
    return this.filter(e => e instanceof type);
  }
  nearby(range) {
    var s = this.self;
    return this.filter(e => Math2D.pixelDistance2(s, e) <= range**2);
  }
  // tris
  sortByDistance(ascending = true) {
    var s = this.self;
    if (ascending) { // plus proche en premier
      this.sort((e1, e2) =>
        Math2D.pixelDistance2(s, e1)
      - Math2D.pixelDistance2(s, e2)
      );
    }
    else { // plus loin en premier
      this.sort((e1, e2) =>
        Math2D.pixelDistance2(s, e2)
      - Math2D.pixelDistance2(s, e1)
      );
    }
    return this;
  }
}

function filterTargets(self, targets) {
  return new FilterTargets(self, targets);
}
