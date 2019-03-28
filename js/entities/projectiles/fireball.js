class Fireball extends Projectile {
  constructor(game, x, y, target) {
    super(game, {
        x: x,
        y: y,
        sprite: 'fireball',
        target: target
    });
  }
  static preload(game) {
      //spritesheet(key, url, frameWidth, frameHeight [, frameMax] [, margin] [, spacing] [, skipFrames])
      game.load.spritesheet('fireball', 'sprites/Spells/16_sunburn_spritesheet.png', 92, 92 );
  }

  applyEffect(entity) {
      entity.damage(5);
  }
}
