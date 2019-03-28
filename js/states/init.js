class InitState extends Phaser.State {
  preload(game) {
    // preload des classes
    Entity.preload(game);
    HUD.preload(game);

    game.load.image('back', 'sprites/Menu/buttonRetour.png');


    game.stage.backgroundColor = "#4488AA";
    game.load.audio ('accueil', ['sprites/Music/accueil.mp3','sprites/Music/accueil.ogg']);
    game.load.audio ('intervague', ['sprites/Music/intervague.mp3','sprites/Music/intervague.ogg']);
    game.load.audio ('intervague', ['sprites/Music/intervague.mp3','sprites/Music/intervague.ogg']);
    game.load.audio ('vague', ['sprites/Music/vague.mp3','sprites/Music/vague.ogg']);
    
    



  }
  
  create(game) {
    // passage au menu
    game.state.start('menu', false);
    game.backgroundMusic = game.add.audio('accueil');
    game.backgroundMusic.play();


  }
  
}
