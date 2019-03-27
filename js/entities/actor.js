class Actor extends Entity {
  constructor(game, config) {
    // frame de départ par défaut
    if (config.frame === undefined) {
      config.frame = 'walk-down-0';
    }

    super(game, config);
    //this.ia = config.ia; // impossible : ia prend en paramètre this
    this.baseAttack = config.baseAttack;
    this.health = config.stats.hpMax; // vie courante
    this.maxHealth = config.stats.hpMax; // vie maximum
    this.mp = config.stats.mpMax; // points de magie courant
    this.mpMax = config.stats.mpMax; // points de magie maximum
    this.strength = config.stats.strength; // force d'attaque
    this.defense = config.stats.defense; // défense
    this.dodgeRate = config.stats.dodgeRate; // taux d'esquive

    this.isAttacking = false;
    this.facingDirection = 'down';

     // animations centrées
    this.anchor.setTo(0.5, 0.5);
    // boite de collision pour la majorité des perso en 64x64
    // ne marche pas en 128x128
    game.physics.arcade.enable(this);
    this.body.setSize(35, 55, 15, 10);
  }
  update() {
    if (this.ia !== undefined && this.alive)
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
      // personnage debout : 1ère frame de marche
      this.animations.play('walk-'+this.facingDirection);
      this.animations.stop(undefined, true);
    }
  }
  attack(entity) {
    if (this.isAttacking)
      return false;

    if(entity !== undefined && Math.random() > entity.dodgeRate && this.strength > entity.defense){
        entity.damage(this.strength - entity.defense);
        console.log(this.strength - entity.defense);
    }
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
