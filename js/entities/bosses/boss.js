class Boss extends Actor {
  constructor(game, config) {
    super(game, config);
  }
  static preload(game) {
    Andrax.preload(game);
  }
}
