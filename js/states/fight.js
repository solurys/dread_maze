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

    // Timer
    this.eventTimer = game.time.events.loop(2000, this.spawnVague, this);
    this.text = game.add.text(300,50, "");
  }

  // Méthode pour spawn les aventuriers
  spawnVague(){
    var nbSpawn = Math.random() * 5;
    for(var i = 0; i < nbSpawn; i++){
      game.entityManager.add(new Paladin(game, 50+ (i*30), 0));
    }
}

  update(game) {
    game.entityManager.update();
    game.cameraManager.handleInput(this.cursors);
    game.cameraManager.updateFollow();
    this.text.setText(this.eventTimer.timer.duration.toFixed(0));
  }

  render(game) {
    gameDebug.draw();
  }
}


