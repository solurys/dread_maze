class Orc extends Monster {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'orc',
      frame: 18,
      stats: {
        hpMax: 6,
        mpMax: 0,
        strength: 3,
        defense: 3,
        dodgeRate: 0.1
      }
    });
    this.animations.add('walk-up',[0,1,2,3,4,5,6,7,8],10);
    this.animations.add('walk-left',[9,10,11,12,13,14,15,16,17],10);
    this.animations.add('walk-down',[18,19,20,21,22,23,24,25,26],10);
    this.animations.add('walk-right',[27,28,29,30,31,32,33,34,35],10);
  }
  static preload(game) {
    game.load.spritesheet('orc', 'sprites/Monsters/Orc/orc_walk.png',64,64);
  }
}

Orc.price = 100;
