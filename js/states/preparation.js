class PreparationState extends Phaser.State {
  preload(game) {
    game.tiledmapManager = new TiledmapManager(game, {
      map: 'tiled/pièce.json',
      tileset: ['tiled/cute_lpc.png', 'tiled/dungeon_tiles.png', 'tiled/Dungeon_Tileset.png', 'tiled/logic.png']
    });
    game.entityManager = new EntityManager(game);
    game.roomManager = new RoomManager(game);
    var room = 'room';

    // game.roomManager.setRooms(4, 3, [
    //   [room, null, null],
    //   [room, room, room],
    //   [null, room, null],
    //   [null, room, null]
    // ]);

    game.roomManager.setRooms(1,1,[[room]]);

    game.cameraManager = new CameraManager(game, 0, 0);
  }
  create(game) {
    game.tiledmapManager.createLayers();
    // Création de l'HUD
    var h = new HUD(game);

    // temporaire

    // var sw1 = game.entityManager.add(new Swordsman(game, 0, 0));
    // sw1.ia = new KeyboardArrowControl(sw1);

    //var sw2 = game.entityManager.add(new Swordsman(game, 100, 100));
    //sw2.ia = new KeyboardArrowControl(sw2);

    var and = game.entityManager.add(new Andrax(game, 100, 100));
    game.cameraManager.follow(and);

    // var sw4 = game.entityManager.add(new Swordsman(game, 300, 300));
    //  sw4.ia = new  MonstreCac(sw4);//FollowEnemy(sw4, [game.entityManager.adventurers]);

    // Mise en commentaire car création via bouton IG
    /*var orc1 = game.entityManager.add(new Orc(game, 300, 300));*/

    var pal1 = game.entityManager.add(new Paladin(game, 666 , 600));

    // Mise en commentaire car création via bouton IG
	/*var ske1 = game.entityManager.add(new Skeleton(game, 400, 400));*/

    // Timer -- Faire plus propre (Reset pour atteindre un nombre de secondes écoulés dans le jeu depuis le clic sur play)
    game.time.reset();
    this.text = game.add.text(300,50, "", {fill: "#ffffff", backgroundColor: "#014900"});
    

    
  }
  
  update(game) {
  	
    // le joueur met en place le dungeon

    // Temps de préparation en secondes
    var tempsPreparation = 90;

    var texte = "Time preparation left : ";

    var time = game.time.totalElapsedSeconds();
    var secondes = (tempsPreparation - Number.parseInt(time));
    var minutes = Number.parseInt(secondes/60);
    secondes = secondes % 60;

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

    if(game.time.totalElapsedSeconds() >= tempsPreparation){
        game.state.start('fight', false);
        this.text.kill();
    }

  }

}
