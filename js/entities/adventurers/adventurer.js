class Adventurer extends Actor {
  constructor(game, config) {
    config.enemies = [Monster, Boss];
    super(game, config);
  }
  static preload(game) {
    Swordsman.preload(game);
    Paladin.preload(game);
    Healer.preload(game);
  }
}
