class Monster extends Actor {
  constructor(game, config) {
    config.enemies = [Adventurer];
    super(game, config);
  }

  static preload(game) {
    Orc.preload(game);
    Skeleton.preload(game);
    Blackwizard.preload(game);
  }
}
