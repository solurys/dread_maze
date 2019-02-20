class Swordsman extends Adventurer {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'swordsman'
    });
  }
  static preload(game) {
    game.load.image('swordsman', 'sprites/swordsman_idle0.png');
  }
}
