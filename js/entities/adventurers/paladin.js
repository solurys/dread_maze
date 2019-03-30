class Paladin extends Adventurer {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'paladin',
      ia: {
        handler: AdventurerCac,
        speed: 70,
        range_attack: 1,
        range_detection: 100
      },
      stats: {
        hpMax: 20,
        mpMax: 0,
        strength: 7,
        defense: 4,
        dodgeRate: 0.1
      },
      attacks: {
        default: {
          handler: Attack.cac,
          anim: 'longSword',
          oversize: true
        }
      }
    });
  }
  static preload(game) {
    game.load.atlasJSONHash('paladin', 'sprites/Adventurers/Paladin/paladin.png','sprites/Adventurers/Paladin/paladin_atlas.json');
  }
}

Paladin.price = 100;
