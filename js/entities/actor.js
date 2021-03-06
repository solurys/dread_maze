class Actor extends Entity {
  constructor(game, config) {
    // frame de départ par défaut
    if (config.frame === undefined) {
      config.frame = 'walk-down-0';
    }

    if (config.oversize === undefined) {
      config.oversize = false;
    }

    var anims = ['walk', 'die'];
    for (let a of Object.keys(config.attacks)) {
      anims.push(config.attacks[a].anim);
    }

    super(game, config);

    LPC_Atlas.setup_list_animations(this, anims);
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
    this.attackList = config.attacks;
    this.ia = new config.ia.handler(this, config.ia);
    this.iaEnabled = true;

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
  cacDamage(amount) {
    console.log(amount - this.defense);
    if (amount - this.defense > 0) {
      this.damage(amount - this.defense);
    }
  }
  magicDamage(amount) {
    console.log(amount - this.defense);
    if (amount - this.defense > 0) {
      this.damage(amount - this.defense);
    }
  }
  update() {
    if (this.iaEnabled && this.ia !== undefined && this.alive)
      this.ia.update();
    super.update();
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
  hasAttack(attackName = 'default') {
    return this.attackList[attackName] !== undefined;
  }
  attack(entity, attackName = 'default') {
    if (this.isAttacking)
      return false;

    let attack = this.attackList[attackName];
    if (entity !== undefined) {
      attack.handler(this, entity, attack);
    }

    // animation
    var direction = this.facingDirection; // par defaut
    if (entity !== undefined)
      direction = Math2D.guessDirection(Vector.from_to(this, entity));
    var anim = this.animations.play(attack.anim + '-' + direction, undefined);

    // bloque les mouvement lors de l'attaque
    if (anim !== undefined) {
      this.isAttacking = true;
      this.body.velocity.setTo(0, 0);
      if (attack.oversize) {
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
