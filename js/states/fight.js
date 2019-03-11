class FightState extends Phaser.State {
  preload(game) {
    // initialisation des outils de debug
    gameDebug.init();
    
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
    gameDebug.draw();
  }
}
