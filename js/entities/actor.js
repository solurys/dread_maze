class Actor extends Entity {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.attacking = false;
  }
  update() {
    if (this.ia !== undefined)
      this.ia.update();
  }
  walk() {
    // doc phaser : play(name, framerate, loop)
    //this.animations.play('walk', 4, true);
  }
  idle() {
    //this.animations.play('idle', 4, true);
  }
  attack(entity) {
    /*
    entity.damage(1);
    var anim = this.animations.play('attack', 4);
    if (anim === undefined)
      return true;
    this.attacking = true;
    anim.onComplete.addOnce(function() {
      this.attacking = false;
      this.idle();
    }, this);
    */
  }
}
