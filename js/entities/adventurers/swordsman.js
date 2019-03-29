class Swordsman extends Adventurer {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'swordsman',
      stats: {
        hpMax: 1,
        mpMax: 1,
        strength: 1,
        defense: 1,
        dodgeRate: 1
      },
      attacks: {
        default: {
          handler: Attack.cac,
          anim: ''
        }
      }
    });
  }
  static preload(game) {
    game.load.image('swordsman', 'sprites/swordsman_idle0.png');
  }
}

Swordsman.price = 1;
