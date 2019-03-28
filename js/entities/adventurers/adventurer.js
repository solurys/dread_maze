class Adventurer extends Actor {
  constructor(game, config) {
    super(game, config);
  }
  static preload(game) {
    Swordsman.preload(game);
    Paladin.preload(game);
    Healer.preload(game);
  }
}
