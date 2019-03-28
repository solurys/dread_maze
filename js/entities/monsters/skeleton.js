class Skeleton extends Monster {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'skeleton',
      stats: {
        hpMax: 5,
        mpMax: 0,
        strength: 3,
        defense: 0,
        dodgeRate: 0
      },
      baseAttack: 'shoot'
    });
    // this.animations.add('walk-up',[0,1,2,3,4,5,6,7,8],10);
    // this.animations.add('walk-left',[9,10,11,12,13,14,15,16,17],10);
    // this.animations.add('walk-down',[18,19,20,21,22,23,24,25,26],10);
    // this.animations.add('walk-right',[27,28,29,30,31,32,33,34,35],10);

    LPC_Atlas.setup_basic_lpc_animations(this);

    this.ia = new  MonstreCac(this, 30, 130, 170, true);
  }
  static preload(game) {
    //game.load.spritesheet('skeleton', 'sprites/Monsters/Skeleton/skeleton_walk.png',64,64);
    game.load.atlasJSONHash('skeleton', 'sprites/Monsters/Skeleton/skeleton.png', 'sprites/Monsters/Skeleton/skeleton_atlas.json');
  }
}

Skeleton.price = 25;
