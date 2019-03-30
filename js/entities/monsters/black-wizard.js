class Blackwizard extends Monster {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'blackwizard',
      ia: {
        handler: MonstreCac,
        speed: 30,
        range_attack: 130,
        range_detection: 170,
        est_dist: true
      },
      stats: {
        hpMax: 8,
        mpMax: 10,
        strength: 5,
        defense: 4,
        dodgeRate: 0.2
      },
      attacks: {
        default: {
          handler: Attack.magicProjectile,
          projectile: Fireball,
          anim: 'spellcast'
        }
      }
    });
  }
  static preload(game) {
    game.load.atlasJSONHash('blackwizard', 'sprites/Monsters/black_wizard/black-wizard.png', 'sprites/Monsters/Skeleton/skeleton_atlas.json');
  }
}

Blackwizard.price = 80;
