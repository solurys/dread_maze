class FinState extends Phaser.State {

    preload(game){
        game.load.image('dead', 'sprites/HUD/fondDead.png');
        game.load.image('win', 'sprites/HUD/fondWin.png');
    }

    create(game) {

      // Le boss est mort 
      if(this.game.varHealth == 0){
        game.add.sprite(0,0,'dead');
      }
      else{
        game.add.sprite(0,0,'win');
      }

      var buttonRetour = game.add.button(300, 300, 'back', () => {game.state.start('menu',true)}, this, 2, 1, 0);
      buttonRetour.scale.x = 0.2;
      buttonRetour.scale.y = 0.2;
    }


}