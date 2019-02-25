/*
 * Suite de la classe FilterTargets.
 * Les filtres et les tris vont ici.
 */


function filterTargets(self, targets) {
  return new FilterTargets(self, targets);
}

class FilterTargets extends FilterTargetsBase {
  constructor(self, targets) {
    super(self, targets);
  }

  // debug le résultat du filtre d'avant
  // par exemple : .debugFilter(e => console.log(e))
  debugFilter(f) {
      return this.filter(e => { f(e); return true; });
  }

  /************* les filtres *************/

  // ne garde que les cibles en vie.
  alive() {
    return this.filter(e => e.alive);
  }

  // ne garde que les cibles mortes
  dead() {
    return this.filter(e => !e.alive);
  }

  // ne garde que le type de cible donné par une classe
  // par exemple : .ofType(Adventurer)
  ofType(type) {
    return this.filter(e => e instanceof type);
  }

  // ne garde que les ennemis proches selon un cercle de rayon "range" pixels
  nearby(range) {
    var s = this.self;
    return this.filter(e => Math2D.pixelDistance2(s, e) <= range**2);
  }

  // ne garde que les ennemis plus loin qu'un cercle de rayon "range" pixels
  faraway(range) {
    var s = this.self;
    return this.filter(e => Math2D.pixelDistance2(s, e) >= range**2);
  }

  // permet de filtrer selon les stats de la cible (avec une fonction donnée)
  // par exemple : .filterStats(target => target.hp < 10)
  filterStats(f) {
    return this.filter(e => f(e.stats));
  }

  // permet de comparer les stats de la cible et de soi-même (avec une fonction donnée)
  // par exemple : .compareStats( (self,target) => self.hp > target.hp )
  compareStats(f) {
    var self = this.self;
    return this.filter(target => f(self.stats, target.stats));
  }


  /************* les tris *************/

  // tri par distance en pixels
  // soit ascendant (par défaut, proche en premier) ou descendant (loin en premier)
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

  // tri par une stat
  // soit ascendant (par défaut, petit en premier) ou descendant (grand en premier)
  // par exemple : .sortByStat('hp')
  sortByStat(stat, ascending = true) {
    if (ascending)
      this.sort((e1, e2) => e1.stats[stat] - e2.stats[stat]);
    else
      this.sort((e1, e2) => e2.stats[stat] - e1.stats[stat]);
    return this;
  }
}
