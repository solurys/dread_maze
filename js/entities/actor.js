class Actor extends Entity {
  constructor(game, config) {
    // frame de départ par défaut
    if (config.frame === undefined) {
      config.frame = 'walk-down-0';
    }

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
    this.facingDirection = 'down';
  }
  update() {
    if (this.ia !== undefined)
      this.ia.update();
  }
  // attaques ? animations ? TODO
  walk(velocity) {
    if (this.isAttacking)
      return false;
    this.body.velocity.setTo(velocity.x, velocity.y);
    var direction = Math2D.guessDirection(velocity);
    this.facingDirection = direction;
    this.animations.play('walk-' + direction, undefined, true);
    return true;
  }
  stop() {
    this.body.velocity.setTo(0,0);
    if (!this.isAttacking) {
      this.animations.play('walk-'+this.facingDirection);
      this.animations.stop();
    }
  }
  attack(entity) {
    if (this.isAttacking)
      return false;

    // animation
    var direction = this.facingDirection; // par defaut
    if (entity !== undefined)
      direction = Math2D.guessDirection(Vector.from_to(this, entity));
    var anim = this.animations.play(this.baseAttack + '-' + direction, undefined);

    // bloque les mouvement lors de l'attaque
    if (anim !== undefined) {
      this.isAttacking = true;
      this.body.velocity.setTo(0, 0);
      anim.onComplete.addOnce(() => {
        this.isAttacking = false;
        this.stop();
      }, this);
    }

    //console.log("attaque");
    return true;
  }
}
