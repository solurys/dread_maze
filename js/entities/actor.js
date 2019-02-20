class Actor extends Entity {
  constructor(game, config) {
    super(game, config);
    this.ia = config.ia; // undefined possible
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
