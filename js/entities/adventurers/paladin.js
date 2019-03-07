class Paladin extends Adventurer {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'paladin',
      frame: 'walk-down-0',
      stats: {
        hpMax: 10,
        mpMax: 0,
        strength: 4,
        defense: 8,
        dodgeRate: 0.05
      },
      baseAttack: 'slash'
    });
    // this.animations.add('walk-up',[0,1,2,3,4,5,6,7,8],10);
    // this.animations.add('walk-left',[9,10,11,12,13,14,15,16,17],10);
    // this.animations.add('walk-down',[18,19,20,21,22,23,24,25,26],10);
    // this.animations.add('walk-right',[27,28,29,30,31,32,33,34,35],10);
    setup_lpc_animations(this);
    this.ia = new AdventurerCac(this, 70);
  }
  static preload(game) {
    game.load.atlasJSONHash('paladin', 'sprites/Adventurers/Paladin/paladin.png','sprites/Monsters/Skeleton/skeleton_atlas.json');
  }
}

Paladin.price = 100;
