class FinState extends Phaser.State {

    preload(game){
        game.load.image('dead', 'sprites/HUD/fondDead.png');
        game.load.image('win', 'sprites/HUD/fondWin.png');
        game.load.image('restart', 'sprites/Menu/buttonRestart.png');
    }

    create(game) {

      // Le boss est mort 
      if(this.game.varHealth == 0){
        game.add.sprite(0,0,'dead');
        var buttonRetour = game.add.button(290, 300, 'back', () => {game.state.start('menu',true)}, this, 2, 1, 0);
        var buttonRestart = game.add.button(400 , 300, 'restart', () => {game.state.start('preparation',true)}, this, 2, 1, 0);
      }
      else{
        game.add.sprite(0,0,'win');
        var buttonRetour = game.add.button(300, 520, 'back', () => {game.state.start('menu',true)}, this, 2, 1, 0);
        var buttonRestart = game.add.button(400, 520, 'restart', () => {game.state.start('preparation',true)}, this, 2, 1, 0);
      }

      buttonRetour.scale.x = 0.2;
      buttonRetour.scale.y = 0.2;

      buttonRestart.scale.x = 0.25;
      buttonRestart.scale.y = 0.25;
    }


}