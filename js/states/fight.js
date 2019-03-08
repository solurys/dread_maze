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
    var db = (entity => {
      if (entity.ia !== undefined)
        entity.ia.debug();
      game.debug.body(entity);
    });
    game.entityManager.adventurers.forEach(db);
    game.entityManager.monsters.forEach(db);
  }
}
