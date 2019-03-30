class Skeleton extends Monster {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'skeleton',
      ia: {
        handler: MonstreCac,
        speed: 30,
        range_attack: 130,
        range_detection: 170,
        est_dist: true
      },
      stats: {
        hpMax: 10,
        mpMax: 0,
        strength: 3,
        defense: 0,
        dodgeRate: 0
      },
      attacks: {
        default: {
          //handler: Attack.projectile, // TODO les flèches
          handler: Attack.cac,
          anim: 'shoot'
        }
      }
    });
  }
  static preload(game) {
    //game.load.spritesheet('skeleton', 'sprites/Monsters/Skeleton/skeleton_walk.png',64,64);
    game.load.atlasJSONHash('skeleton', 'sprites/Monsters/Skeleton/skeleton.png', 'sprites/Monsters/Skeleton/skeleton_atlas.json');
  }
}

Skeleton.price = 25;
