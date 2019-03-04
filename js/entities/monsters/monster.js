class Monster extends Actor {
  constructor(game, config) {
    super(game, config);
  }
  static preload(game) {
    Orc.preload(game);
    Skeleton.preload(game);

  }
}
