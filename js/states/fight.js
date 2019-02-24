class FightState extends Phaser.State {
  update(game) {
    game.entityManager.update();
  }
  render(game) {
    game.entityManager.adventurers.forEach(adv => {
      if (adv.ia !== undefined)
        adv.ia.debug();
      game.debug.body(adv);
    });
  }
}
