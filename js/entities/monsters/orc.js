class Orc extends Monster {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'orc',
      stats: {
        hpMax: 14,
        mpMax: 0,
        strength: 7,
        defense: 4,
        dodgeRate: 0.3
      },
      attacks: {
        default: {
          handler: Attack.cac,
          anim: 'cudgel',
          oversize: true
        }
      }
    });
    // this.animations.add('walk-up',[0,1,2,3,4,5,6,7,8],10);
    // this.animations.add('walk-left',[9,10,11,12,13,14,15,16,17],10);
    // this.animations.add('walk-down',[18,19,20,21,22,23,24,25,26],10);
    // this.animations.add('walk-right',[27,28,29,30,31,32,33,34,35],10);
    LPC_Atlas.setup_basic_lpc_animations(this);
    LPC_Atlas.setup_animation(this, 'cudgel');
    this.ia = new MonstreCac(this, 70, 1, 100);
  }
  static preload(game) {
    game.load.atlasJSONHash('orc', 'sprites/Monsters/Orc/orc.png', 'sprites/Monsters/Orc/orc_atlas.json');
  }
}

Orc.price = 50;
