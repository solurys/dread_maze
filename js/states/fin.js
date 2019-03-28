class FinState extends Phaser.State {

    preload(game){
        game.load.image('dead', 'sprites/HUD/fondDead.png');
        //game.load.image('win', 'sprites/HUD/fondWin.png');
    }

    create(game) {

      // Le boss est mort 
      if(this.game.varHealth == 0){
        game.add.sprite(0,0,'dead');
      }
      //else{
        //game.add.sprite(0,0,'win');
     // }

    }

}