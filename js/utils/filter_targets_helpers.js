/*
 * Suite de la classe FilterTargets.
 * Les filtres et les tris vont ici.
 */

// debug le résultat du filtre d'avant
// par exemple : .debugFilter(e => console.log(e))
FilterTargets.prototype.debugFilter = function(f) {
    return this.filter(e => { f(e); return true; });
}

/************* les filtres *************/

// ne garde que les cibles en vie.
FilterTargets.prototype.alive = function() {
  return this.filter(e => e.alive);
}

// ne garde que les cibles mortes
FilterTargets.prototype.dead = function() {
  return this.filter(e => !e.alive);
}

// ne garde que le type de cible donné par une classe
// par exemple : .ofType(Adventurer)
FilterTargets.prototype.ofType = function(type) {
  return this.filter(e => e instanceof type);
}

// ne garde que les ennemis proches selon un cercle de rayon "range" pixels
FilterTargets.prototype.nearby = function(range) {
  var s = this.self;
  return this.filter(e => Math2D.pixelDistance2(s, e) <= range**2);
}

// ne garde que les ennemis plus loin qu'un cercle de rayon "range" pixels
FilterTargets.prototype.faraway = function(range) {
  var s = this.self;
  return this.filter(e => Math2D.pixelDistance2(s, e) >= range**2);
}

// permet de filtrer selon les stats de la cible (avec une fonction donnée)
// par exemple : .filterStats(target => target.hp < 10)
FilterTargets.prototype.filterStats = function(f) {
  return this.filter(e => f(e.stats));
}

// permet de comparer les stats de la cible et de soi-même (avec une fonction donnée)
// par exemple : .compareStats( (self,target) => self.hp > target.hp )
FilterTargets.prototype.compareStats = function(f) {
  var self = this.self;
  return this.filter(target => f(self.stats, target.stats));
}


/************* les tris *************/

// tri par distance en pixels
// soit ascendant (par défaut, proche en premier) ou descendant (loin en premier)
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

// tri par une stat
// soit ascendant (par défaut, petit en premier) ou descendant (grand en premier)
// par exemple : .sortByStat('hp')
FilterTargets.prototype.sortByStat = function(stat, ascending = true) {
  if (ascending)
    this.sort((e1, e2) => e1.stats[stat] - e2.stats[stat]);
  else
    this.sort((e1, e2) => e2.stats[stat] - e1.stats[stat]);
  return this;
}
