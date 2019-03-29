class Fireball extends Projectile {
  constructor(game, x, y, target) {
    super(game, {
        x: x,
        y: y,
        sprite: 'fireball',
        target: target
    });
    this.animations.add('flying', Phaser.ArrayUtils.numberArrayStep(61), undefined, true);
    this.play('flying');
  }
  static preload(game) {
      //spritesheet(key, url, frameWidth, frameHeight [, frameMax] [, margin] [, spacing] [, skipFrames])
      game.load.spritesheet('fireball', 'sprites/Spells/16_sunburn_spritesheet.png', 100, 100 );
  }

  applyEffect(entity) {
      entity.magicDamage(8);
  }
}
