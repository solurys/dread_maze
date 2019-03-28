class Spike extends Trap {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'spike',
      nbUses: 3
    });
    this.animations.add('activate');
  }
  static preload(game) {
    game.load.spritesheet('spike', 'sprites/Traps/Spike_Trap.png', 32, 32);
  }
  activate(adventurer) {
    console.log('activate');
    adventurer.damage(5);
    super.activate(adventurer);
  }
}

Spike.price = 50;
