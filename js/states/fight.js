class FightState extends Phaser.State {
  preload(game) {
    // initialisation des outils de debug
    gameDebug.init();
  }
  create(game) {
    this.cursors = game.input.keyboard.createCursorKeys();

    // Timer
    this.eventTimer = game.time.events.loop(/*Phaser.Timer.MINUTE * 1*/ + Phaser.Timer.SECOND*5, this.spawnVague, this);
    this.text = game.add.text(300,50, "", {fill: "#ffffff", backgroundColor: "#000000"});
  }

  // Méthode pour spawn les aventuriers
  spawnVague(){
    var nbSpawn = Math.random() * 5;
    for(var i = 0; i < nbSpawn; i++){
      var numAdventurer = Number.parseInt(Math.random() * 2);
      console.log(numAdventurer);
      switch (numAdventurer){
        case 0: 
            game.entityManager.add(new Paladin(game, 50+ (i*30), 0));
            break;
        case 1:
            game.entityManager.add(new Healer(game, 50+ (i*30), 0));
            break;
      }
    }
}

  update(game) {
    game.entityManager.update();
    game.cameraManager.handleInput(this.cursors);
    game.cameraManager.updateFollow();

    var texte = "Time spawn : ";

    var time = this.eventTimer.timer.duration.toFixed(0)
    var secondes = Number.parseInt(time / Phaser.Timer.SECOND);
    var minutes = Number.parseInt(secondes / 60);
    secondes = secondes%60;

    if(minutes < 10){
        texte += "0"
    }
    texte += minutes + ":"

    if(secondes <10){
        texte +="0"
    }
    texte += secondes

    // Si compteur inférieur à 1 minute et que les secondes sont pairs
    if(minutes == 0 && secondes%2 == 0){
    	this.text.setStyle({ fill: "#ffffff", backgroundColor: "#000000"});
    }
    // Si compteur inférieur à 1 minute et que les secondes sont impairs
    else if(minutes == 0 && secondes%2 != 0){
    	this.text.setStyle({ fill: "#ff0000", backgroundColor: "#000000"});
    }

    this.text.setText(texte);

  }

  render(game) {
    gameDebug.draw();
  }
}
