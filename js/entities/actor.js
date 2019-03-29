class Actor extends Entity {
  constructor(game, config) {
    // frame de départ par défaut
    if (config.frame === undefined) {
      config.frame = 'walk-down-0';
    }

    if (config.oversize === undefined) {
      config.oversize = false;
    }

    super(game, config);
    //this.ia = config.ia; // impossible : ia prend en paramètre this
    this.baseAttack = config.baseAttack;
    this.projectile = config.projectile;
    this.enemies = config.enemies;

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
    this.oversize = config.oversize;
  }
  damage(amount) {
    console.log(amount - this.defense);
    if (amount - this.defense > 0) {
      super.damage(amount - this.defense);
    }
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

    if(entity !== undefined && this.projectile === undefined && Math.random() > entity.dodgeRate){
        entity.damage(this.strength);
        console.log(this.strength - entity.defense);
    }
    else if (entity !== undefined && this.projectile !== undefined) {
        var proj = this.game.entityManager.add(new this.projectile(game, this.centerX, this.centerY, this.enemies));
        var dir = Vector.from_to(this, entity).normalize().multiply(200);
        proj.body.velocity.setTo(dir.x, dir.y);
    }
    // animation
    var direction = this.facingDirection; // par defaut
    if (entity !== undefined)
      direction = Math2D.guessDirection(Vector.from_to(this, entity));
    var anim = this.animations.play(this.baseAttack + '-' + direction, undefined);

    // bloque les mouvement lors de l'attaque
    if (anim !== undefined) {
      this.isAttacking = true;
      if (this.oversize)
      this.body.velocity.setTo(0, 0);
      if (this.oversize) {
        this.body.setSize(35, 55, 15*5, 10*7);
      }
      anim.onComplete.addOnce(() => {
        this.body.setSize(35, 55, 15, 10);
        this.isAttacking = false;
        this.stop();
      }, this);
    }

    //console.log("attaque");
    return true;
  }
}
