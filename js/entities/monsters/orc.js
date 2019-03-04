class Orc extends Monster {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'orc',
      stats: {
        hpMax: 6,
        mpMax: 0,
        strength: 3,
        defense: 3,
        dodgeRate: 0.1
      }
    });
  }
  static preload(game) {
    game.load.image('goblin', 'sprites/Monsters/Orc/orc.png');
  }
}

Orc.price = 100;
