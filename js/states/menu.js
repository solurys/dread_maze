class MenuState extends Phaser.State {

    preload(game){
        game.load.image('buttonPlay', 'sprites/Menu/button1.png');
        game.load.image('buttonInfo', 'sprites/Menu/button2.png');
        game.load.image('buttonExit', 'sprites/Menu/button3.png');

    }

    create(game) {

        var buttonPlay = game.add.button(375, 200, 'buttonPlay', launchPreparation, this);
        buttonPlay.scale.x = 0.2;
        buttonPlay.scale.y = 0.2;
        var buttonInfo = game.add.button(375, 300, 'buttonInfo', this.openWindow, this);
        buttonInfo.scale.x = 0.2;
        buttonInfo.scale.y = 0.2;
        var buttonExit = game.add.button(375, 400, 'buttonExit', this.openWindow, this);
        buttonExit.scale.x = 0.2;
        buttonExit.scale.y = 0.2;

    }

  

}

function launchPreparation(){
    game.state.start('preparation', true);
}


