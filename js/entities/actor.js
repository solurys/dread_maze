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
  walk(velocity) {
    this.body.velocity.setTo(velocity.x, velocity.y);
    if (velocity.y > velocity.x && velocity.y > -velocity.x){
      this.animations.play('walk-down', undefined, true);
    }
    else if (velocity.y > velocity.x && velocity.y < -velocity.x){
      this.animations.play('walk-left', undefined, true);
    }
    else if (velocity.y < velocity.x && velocity.y < -velocity.x){
      this.animations.play('walk-up', undefined, true);
    }
    else if (velocity.y < velocity.x && velocity.y > -velocity.x){
      this.animations.play('walk-right', undefined, true);
    }

  }
  stop() {
    this.body.velocity.setTo(0,0);
    this.animations.stop();
  }
  attack(entity) {
    console.log("attaque");
  }
}
