class FilterTargets {
  constructor(self, targets) {
    this.self = self;
    this.poss = [];
    this.filters = [];
    for (var t of targets) {
      if      (t instanceof Phaser.Group) this.poss.push(...t.children);
      else if (t instanceof Array)        this.poss.push(...t);
      else                                this.poss.push(t);
    }
    // enlever self des targets
    for (var i = this.poss.length - 1; i >= 0; i--)
      if (this.poss[i] === self)
        this.poss.splice(i, 1);
  }
  first() {
    if (this.filters.length === 0)
      return this.poss[0];
    var first;
    var i = 0;
    while (i < this.poss.length && !this.filters.every(f => f(this.poss[i])))
      i++;
    first = this.poss[i];
    return first; // peut être undefined
  }
  last() {
    if (this.filters.length === 0)
      return this.poss[this.poss.length - 1];
    var last;
    for (var i = 0; i < this.poss.length; i++)
      if (this.filters.every(f => f(this.poss[i])))
        last = this.poss[i];
    return last; // peut être undefined
  }
  toArray() {
    this.evalFilters();
    return this.poss;
  }
  // méthode interne pour appliquer les filtres stockés
  evalFilters() {
    if (this.filters.length > 0) {
      this.poss = this.poss.filter(e =>
        this.filters.every(f => f(e))
      );
      this.filters = [];
    }
  }
  // lazy filters
  filter(f) {
    this.filters.push(f);
    return this;
  }
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
  // sort nécessite de calculer le tableau
  sort(f) {
    this.evalFilters();
    this.poss.sort(f);
    return this;
  }
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
  // shuffle nécessite de calculer le tableau
  shuffle() {
    this.evalFilters();
    for (var i = this.poss.length - 1; i >= 0; i--) {
      var j = Math.random * i;
      var temp = this.poss[i];
      this.poss[i] = this.poss[j];
      this.poss[j] = temp;
    }
    return this;
  }
}

function filterTargets(self, targets) {
  return new FilterTargets(self, targets);
}
