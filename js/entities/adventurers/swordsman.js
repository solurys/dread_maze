class Swordsman extends Adventurer {
  constructor(game, x, y) {
    super(game, x, y, 'swordsman', null);
    this.ia = new KeyboardArrowControl(this);
  }
  static preload(game) {
    game.load.image('swordsman', 'sprites/swordsman_idle0.png');
  }
}
