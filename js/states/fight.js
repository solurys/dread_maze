class FightState extends Phaser.State {
  preload(game) {
    game.load.image('carte', 'sprites/carte.png');
  }
  create(game) {
    this.cursors = game.input.keyboard.createCursorKeys();
    game.add.sprite(0, 0, 'carte');
  }

  update(game) {
    game.entityManager.update();
    game.roomManager.handleInput(this.cursors);

  }
  render(game) {
    game.entityManager.adventurers.forEach(adv => {
      if (adv.ia !== undefined)
        adv.ia.debug();
      game.debug.body(adv);
    });
  }
}
