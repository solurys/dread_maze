class Entity extends Phaser.Sprite {
  constructor(game, config) {
    super(game, config.x, config.y, config.sprite, config.frame);
  }
}
