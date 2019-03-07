class Actor extends Entity {
  constructor(game, config) {
    super(game, config);
    //this.ia = config.ia; // undefined possible
    this.baseAttack = config.baseAttack;
    this.stats = {
      hpMax: config.stats.hpMax, // points de vie max
      mpMax: config.stats.mpMax, // points de magie
      strength: config.stats.strength, // force
      defense: config.stats.defense, // défense
      dodgeRate: config.stats.dodgeRate // taux d'esquive
    };
    this.stats.hp = this.stats.hpMax;
    this.stats.mp = this.stats.mpMax;
    this.isAttacking = false;
  }
  update() {
    if (this.ia !== undefined)
      this.ia.update();
  }
  // attaques ? animations ? TODO
  walk(velocity) {
    if (!this.isAttacking) {
      this.body.velocity.setTo(velocity.x, velocity.y);
      var direction = Math2D.guessDirection(velocity);
      this.animations.play('walk-' + direction, undefined, true);
    }
  }
  stop() {
    this.body.velocity.setTo(0,0);
    this.animations.stop();
  }
  attack(entity) {
    console.log("attaque");
    var direction = Math2D.guessDirection(Vector.from_to(this, entity));
    this.isAttacking = true;
    var anim = this.animations.play(this.baseAttack + '-' + direction);
    this.body.velocity.setTo(0, 0);
    anim.onComplete.addOnce(() => {this.isAttacking = false}, this);
  }
}
