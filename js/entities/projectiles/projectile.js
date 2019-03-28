class Projectile extends Entity {
  constructor(game, config) {
    super(game, config);
    this.target = config.target;
  }
  static preload(game) {
      Fireball.preload(game);
  }

  hit(entity) {
      for (let type of this.target) {
          if (entity instanceof target) {
              this.applyEffect(entity);
              return true;
          }
      }
      return false;
  }

  applyEffect(entity) {}
}
