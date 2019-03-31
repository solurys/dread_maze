class Boss extends Actor {
  constructor(game, config) {
    config.enemies = [Adventurer];
    super(game, config);
  }

  static preload(game) {
    Andrax.preload(game);
  }
}
