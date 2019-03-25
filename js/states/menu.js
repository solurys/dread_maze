class MenuState extends Phaser.State {

    preload(game){
        game.load.image('buttonPlay', 'sprites/Menu/button1.png');
        game.load.image('buttonExit', 'sprites/Menu/button2.png');
        game.load.image('buttonInfo', 'sprites/Menu/button3.png');
        game.load.image('buttonClose', 'sprites/Menu/close.png');
        game.load.image('popupInfo', 'sprites/Menu/BackPopup.png');
    }

    create(game) {

      var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eleifend massa nec varius dapibus. Vestibulum augue enim, vulputate dignissim interdum ut, vulputate quis velit. Nunc augue lorem, semper sed faucibus cursus, lobortis ac leo. Nullam congue tristique sodales. Vivamus at interdum nulla, sit amet tincidunt sapien. Curabitur in tristique dolor. Phasellus at diam gravida, porta est non, pharetra nunc. Duis condimentum commodo tortor vitae eleifend. Curabitur libero ante, volutpat.";

      var style = {
        font: "bold 80px Arial",
        fill: "black",
        wordWrap: true,
        wordWrapWidth: 3200,
        align: "center"
      };

        var buttonPlay = game.add.button(game.world.centerX-61.7, game.world.centerY-100, 'buttonPlay', launchPreparation, this);
        buttonPlay.scale.x = 0.2;
        buttonPlay.scale.y = 0.2;

        var buttonExit = game.add.button(game.world.centerX-61.7, game.world.centerY, 'buttonExit',  openPopup , this);
        buttonExit.scale.x = 0.2;
        buttonExit.scale.y = 0.2;

        var buttonInfo = game.add.button(game.world.centerX-61.7, game.world.centerY+100, 'buttonInfo', openPopup, this);
        buttonInfo.scale.x = 0.2;
        buttonInfo.scale.y = 0.2;

        // //popup info button
        var popup = game.add.sprite(400, 300, 'popupInfo');
        popup.alpha = 1;
        popup.anchor.set(0.5);
        popup.scale.set(0.2);
        popup.inputEnabled = true;
        popup.input.enableDrag();
        popup.kill();

        var widthPop = popup.width + 800;
        var heightPop = popup.height + 200;

        var closeButton = game.make.sprite(widthPop, -heightPop, 'buttonClose');
        closeButton.inputEnabled = true;
        closeButton.input.priorityID = 1;
        closeButton.events.onInputDown.add(closePopup, this);

        var text = game.add.text(-1700, -300, lorem, style);

        popup.addChild(text);
        popup.addChild(closeButton);

    }

}

function launchPreparation(){
    game.state.start('preparation', true);
}

function openPopup(){
  game.world.children[3].revive();
}

function closePopup(){
  game.world.children[3].kill();
}

// function closeGame(){
//   window.close();
// }
