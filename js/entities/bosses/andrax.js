class Andrax extends Boss {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'andrax',
      ia: {
        handler: KeyboardZQSDControl
      },
      stats: {
        hpMax: 50,
        mpMax: 70,
        strength: 10,
        defense: 2,
        dodgeRate: 0.3
      },
      attacks: {
        default: {
          handler: Attack.cac,
          anim: 'dragonSpear',
          oversize: true
        }
      }
    });
  }
  static preload(game) {
    game.load.atlasJSONHash('andrax', 'sprites/Boss/Andrax/andrax.png', 'sprites/Boss/Andrax/andrax_atlas.json');
  }
}
