class Orc extends Monster {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'orc',
      ia: {
        handler: MonstreCac,
        speed: 70,
        range_attack: 1,
        range_detection: 100
      },
      stats: {
        hpMax: 14,
        mpMax: 0,
        strength: 7,
        defense: 4,
        dodgeRate: 0.3
      },
      attacks: {
        default: {
          handler: Attack.cac,
          anim: 'cudgel',
          oversize: true
        }
      }
    });
  }
  static preload(game) {
    game.load.atlasJSONHash('orc', 'sprites/Monsters/Orc/orc.png', 'sprites/Monsters/Orc/orc_atlas.json');
  }
}

Orc.price = 50;
