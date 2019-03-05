class Andrax extends Boss {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'andrax',
      frame: 18,
      stats: {
        hpMax: 50,
        mpMax: 70,
        strength: 10,
        defense: 10,
        dodgeRate: 0.3
      }
    });
    this.animations.add('walk-up',[0,1,2,3,4,5,6,7,8],10);
    this.animations.add('walk-left',[9,10,11,12,13,14,15,16,17],10);
    this.animations.add('walk-down',[18,19,20,21,22,23,24,25,26],10);
    this.animations.add('walk-right',[27,28,29,30,31,32,33,34,35],10);

    this.ia = new KeyboardZQSDControl(this);
  }
  static preload(game) {
    game.load.spritesheet('andrax', 'sprites/Boss/Andrax/andrax-walk.png',64,64);
  }
}
