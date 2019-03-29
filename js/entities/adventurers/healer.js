class Healer extends Adventurer {
  constructor(game, x, y) {
    super(game, {
      x: x,
      y: y,
      sprite: 'healer',
      stats: {
        hpMax: 10,
        mpMax: 20,
        strength: 1,
        defense: 3,
        dodgeRate: 0.5
      },
      attacks: {
        default: {
          handler: Attack.magicSpell,
          anim: 'spellcast'
        }
      }
    });
    LPC_Atlas.setup_basic_lpc_animations(this);
    this.ia = new AdventurerCac(this, 70);
  }
  static preload(game) {
    game.load.atlasJSONHash('healer', 'sprites/Adventurers/Healer/healer.png','sprites/Monsters/Skeleton/skeleton_atlas.json');
  }
}
