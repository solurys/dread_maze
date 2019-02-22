/*
 * Suite de la classe FilterTargets.
 * Les filtres et les tris vont ici.
 */

/************* les filtres *************/

FilterTargets.prototype.alive = function() {
  return this.filter(e => e.alive);
}

FilterTargets.prototype.dead = function() {
  return this.filter(e => !e.alive);
}

FilterTargets.prototype.ofType = function(type) {
  return this.filter(e => e instanceof type);
}

FilterTargets.prototype.nearby = function(range) {
  var s = this.self;
  return this.filter(e => Math2D.pixelDistance2(s, e) <= range**2);
}

FilterTargets.prototype.faraway = function(range) {
  var s = this.self;
  return this.filter(e => Math2D.pixelDistance2(s, e) >= range**2);
}

FilterTargets.prototype.filterStats = function(f) {
  return this.filter(e => f(e.stats));
}

FilterTargets.prototype.compareStats = function(f) {
  var self = this.self;
  return this.filter(target => f(self.stats, target.stats));
}


/************* les tris *************/


FilterTargets.prototype.sortByDistance = function(ascending = true) {
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

FilterTargets.prototype.sortByStat = function(stat, ascending = true) {
  if (ascending)
    this.sort((e1, e2) => e1.stats[stat] - e2.stats[stat]);
  else
    this.sort((e1, e2) => e2.stats[stat] - e1.stats[stat]);
  return this;
}
