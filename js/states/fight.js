class FightState extends Phaser.State {
  preload(game) {
    game.load.image('carte', 'sprites/Carte/Level1/level1B.png');
  }
  create(game) {
    this.cursors = game.input.keyboard.createCursorKeys();
    var carte = game.add.sprite(0, 0, 'carte');
    carte.sendToBack(); // carte en dessous de toute sprite
  }

  update(game) {
    game.entityManager.update();
    game.cameraManager.handleInput(this.cursors);
    game.cameraManager.updateFollow();
  }
  render(game) {
    game.entityManager.adventurers.forEach(adv => {
      if (adv.ia !== undefined)
        adv.ia.debug();
      game.debug.body(adv);
    });
  }
}
