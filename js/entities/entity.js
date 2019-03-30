class Entity extends Phaser.Sprite {
  constructor(game, config) {
    super(game, config.x, config.y, config.sprite, config.frame);
    this.scale.setTo(0.6,0.6);
    this.debugEnabled = true; // gameDebug
  }
  static preload(game) {
    Adventurer.preload(game);
    Monster.preload(game);
    Boss.preload(game);
    Projectile.preload(game);
    Trap.preload(game);
  }
}
