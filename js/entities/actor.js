class Actor extends Entity {
  constructor(game, config) {
    super(game, config);
    this.ia = config.ia; // undefined possible
    this.stats = {
      hpMax: config.stats.hpMax, // points de vie max
      mpMax: config.stats.mpMax, // points de magie
      strength: config.stats.strength, // force
      defense: config.stats.defense, // défense
      dodgeRate: config.stats.dodgeRate // taux d'esquive
    };
    this.stats.hp = this.stats.hpMax;
    this.stats.mp = this.stats.mpMax;
  }
  update() {
    if (this.ia !== undefined)
      this.ia.update();
  }
  // attaques ? animations ? TODO
  walk() {}
  idle() {}
  attack(entity) {}
}
