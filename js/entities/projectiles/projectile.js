class Projectile extends Entity {
  constructor(game, config) {
    super(game, config);
    this.anchor.setTo(0.5,0.5);
    this.target = config.target;
  }
  static preload(game) {
      Fireball.preload(game);
  }

  hit(entity) {
      for (let type of this.target) {
          if (entity instanceof type) {
              this.applyEffect(entity);
              this.kill();
              return true;
          }
      }
      return false;
  }

  applyEffect(entity) {}
}
