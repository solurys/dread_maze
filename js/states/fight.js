class FightState extends Phaser.State {
  update(game) {
    game.entityManager.update();
  }
  render(game) {
    game.entityManager.adventurers.forEach(adv =>
      game.debug.body(adv)
    );
  }
}
