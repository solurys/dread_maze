class LazyFilterTargets extends FilterTargets {
  constructor(self, targets) {
    super(self, targets);
    this.filters = [];
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
  clone() {
    var clone = new LazyFilterTargets(this.self, this.poss);
    clone.filters = [...this.filters];
    return clone;
  }
  split() {
    this.evalFilters();
    return this.clone();
  }
  static merge(...filterResults) {
    for (var f of filterResults) {
      if (f instanceof LazyFilterTargets)
        f.evalFilters();
    }
    return new LazyFilterTargets(this.self, filterResults);
  }
  // méthode interne pour appliquer les filtres stockés
  evalFilters() {
    if (this.filters.length > 0) {
      this.poss = this.poss.filter(e =>
        this.filters.every(f => f(e))
      );
      this.filters = [];
    }
    return this;
  }
  // opérations de base
  filter(f) {
    this.filters.push(f);
    return this;
  }
  sort(f) {
    this.evalFilters();
    this.poss.sort(f);
    return this;
  }
  shuffle() {
    this.evalFilters();
    super.shuffle();
    return this;
  }
}

function lazyFilterTargets(self, targets) {
  return new LazyFilterTargets(self, targets);
}
