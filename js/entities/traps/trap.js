class Trap extends Entity {
  constructor(game, config) {
    super(game, config);
    this.nbUses = config.nbUses;
    this.active = false;
  }

  static preload(game) {
    Spike.preload(game);
  }

  activate(adventurer) {
    if (this.active) {
      return;
    }
    var anim = this.animations.play('activate');
    this.active = true;
    anim.onComplete.addOnce(() => {
      this.active = false;
      if (this.nbUses <= 0) {
        this.kill();
      }
    });
    this.nbUses--;
  }
}
