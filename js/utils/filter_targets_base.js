/*
 * La classe FilterTargets permet de choisir rapidement selon une liste de
 * critère une ou plusieurs cibles.
 *
 * Ici se trouve les opérations de base de la classe (filter, sort, ...).
 *
 * Pour les opérations plus spécifiques (nearby, sortByDistance, ...),
 * voir filter_targets.js
 */

class FilterTargetsBase {
  constructor(self, targets) {
    this.self = self;
    this.poss = [];
    this.filters = [];
    this.sorts = [];
    for (var t of targets) {
      // si c'est une classe
      if      (t === Adventurer) t = game.entityManager.adventurers;
      else if (t === Monster)    t = game.entityManager.monsters;
      else if (t === Boss)       t = game.entityManager.bosses;
      else if (t === Projectile) t = game.entityManager.projectiles;
      else if (t === Trap)       t = game.entityManager.traps;

      // décomposition des tableaux
      if      (t instanceof Phaser.Group)  this.poss.push(...t.children);
      else if (t instanceof Array)         this.poss.push(...t);
      else if (t instanceof FilterTargets) {t.evalPoss(); this.poss.push(...t.poss);}
      else                                 this.poss.push(t);
    }
    this.filter(e => e !== self);
  }
  removeDuplicates() {
    this.evalPoss();
    var set = new Set(this.poss);
    this.poss = [...set];
    return this;
  }
  clone() {
    this.evalPoss();
    return new FilterTargets(this.self, [this.poss]);
  }
  evalPoss() {
    this.evalFilters();
    this.evalSorts();
    return this;
  }
  evalFilters() {
    if (this.filters.length === 0) return;
    this.poss = this.poss.filter(e =>
      this.filters.every(f => f(e))
    );
    this.filters = [];
    return this;
  }
  evalSorts() {
    if (this.sorts.length === 0) return;
    this.poss.sort((e1, e2) => {
      for (var comparator of this.sorts) {
        var test = comparator(e1, e2);
        if (test > 0) return +1;
        else if (test < 0) return -1;
      }
      return 0; // tous les tests == 0
    });
    this.sorts = [];
    return this;
  }
  // accesseurs
  first() {
    this.evalPoss();
    return this.poss[0];
  }
  last() {
    this.evalPoss();
    return this.poss[this.poss.length - 1];
  }
  toArray() {
    this.evalPoss();
    return this.poss;
  }
  forEach(f, thisArg) {
    this.evalPoss();
    this.poss.forEach(f, thisArg);
    return this;
  }
  // operations de base
  filter(f) {
    this.filters.push(f);
    return this;
  }
  sort(comparator) {
    this.sorts.push(comparator);
    return this;
  }
  shuffle() {
    this.evalFilters();
    this.sorts = [];
    // https://fr.wikipedia.org/wiki/Mélange_de_Fisher-Yates
    // https://bost.ocks.org/mike/shuffle
    for (var i = this.poss.length - 1; i >= 1; i--) {
      var j = Phaser.Math.between(0, i); // aléa entre 0 et i
      // échange entre i et j
      var temp = this.poss[i];
      this.poss[i] = this.poss[j];
      this.poss[j] = temp;
    }
    return this;
  }
  splitTrueFalse(separator) {
    this.evalPoss();
    var bagOfTruth = [];
    var bagOfLies = [];
    for (var i = 0; i < this.poss.length; i++) {
      var theThing = this.poss[i];
      if (separator(theThing) === true) // explicitement intentionnel
        bagOfTruth.push(theThing);
      else
        bagOfLies.push(theThing);
    }
    this.poss = bagOfTruth;
    return new FilterTargets(this.self, [bagOfLies]);
  }
}
