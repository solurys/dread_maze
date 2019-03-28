class FightState extends Phaser.State {
  preload(game) {
    // initialisation des outils de debug
    gameDebug.init();
  }
  create(game) {
    this.cursors = game.input.keyboard.createCursorKeys();

    this.compteurVague = 0;

    // Spawn après le timer de préparation
    this.spawnVague();

    // Timer
    this.eventTimer = game.time.events.loop(/*Phaser.Timer.MINUTE * 1*/ + Phaser.Timer.SECOND*5, this.spawnVague, this);
    this.text = game.add.text(300,50, "", {fill: "#ffffff", backgroundColor: "#000000"});
  }

  // Méthode pour spawn les aventuriers
  spawnVague(){
    
  	// Random pour le nombre d'aventuriers à spawn
    var nbSpawn = Math.random() * 5;

    // Boucle qui crée les nbSpawn aventuriers
    for(var i = 0; i < nbSpawn; i++){

      // Random pour la classe de l'aventurier à spawn (0 : Paladin // 1 : Healer)
      var numAdventurer = Number.parseInt(Math.random() * 2);
      switch (numAdventurer){
        case 0: 
            game.entityManager.add(new Paladin(game, 50+ (i*30), 0));
            break;
        case 1:
            game.entityManager.add(new Healer(game, 50+ (i*30), 0));
            break;
      }
    }
    console.log("test");
    this.compteurVague++;
}

  update(game) {
    game.entityManager.update();
    game.cameraManager.handleInput(this.cursors);
    game.cameraManager.updateFollow();


    // Nombre de vagues souhaités
    var nbVagues = 3;

    var texte = "Time spawn : ";

    var time = this.eventTimer.timer.duration.toFixed(0)
    var secondes = Number.parseInt(time / Phaser.Timer.SECOND);
    var minutes = Number.parseInt(secondes / 60);
    secondes = secondes%60;

    if(minutes < 10){
        texte += "0";
    }
    texte += minutes + ":";

    if(secondes <10){
        texte +="0";
    }
    texte += secondes;

    // Si compteur inférieur à 1 minute et que les secondes sont pairs
    if(minutes == 0 && secondes%2 == 0){
    	this.text.setStyle({ fill: "#ffffff", backgroundColor: "#000000"});
    }
    // Si compteur inférieur à 1 minute et que les secondes sont impairs
    else if(minutes == 0 && secondes%2 != 0){
    	this.text.setStyle({ fill: "#ff0000", backgroundColor: "#000000"});
    }

    this.text.setText(texte);

    if(this.compteurVague == nbVagues){
      this.eventTimer.timer.running = false;
      this.text.kill();
    }

    if(this.compteurVague == nbVagues && game.entityManager.adventurers.getFirstAlive() == null){
      game.state.start('fin', true);
    }
	
  }

  render(game) {
    gameDebug.draw();
  }
}
