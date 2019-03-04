class Goblin extends Monster {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'goblin',
      stats: {
        hpMax: 1,
        mpMax: 1,
        strength: 1,
        defense: 1,
        dodgeRate: 1
      }
    });
  }
  static preload(game) {
    game.load.image('goblin', '');
  }
}

Goblin.price = 1;
