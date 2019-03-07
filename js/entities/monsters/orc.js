class Orc extends Monster {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'orc',
      frame: 'walk-down-0',
      stats: {
        hpMax: 8,
        mpMax: 0,
        strength: 10,
        defense: 4,
        dodgeRate: 0.3
      },
      baseAttack: 'slash'
    });
    // this.animations.add('walk-up',[0,1,2,3,4,5,6,7,8],10);
    // this.animations.add('walk-left',[9,10,11,12,13,14,15,16,17],10);
    // this.animations.add('walk-down',[18,19,20,21,22,23,24,25,26],10);
    // this.animations.add('walk-right',[27,28,29,30,31,32,33,34,35],10);
    setup_lpc_animations(this);

    this.ia = new MonstreCac(this, 70);
  }
  static preload(game) {
    game.load.atlasJSONHash('orc', 'sprites/Monsters/Orc/orc.png', 'sprites/Monsters/Skeleton/skeleton_atlas.json');
  }
}

Orc.price = 100;
