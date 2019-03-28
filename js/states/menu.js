class MenuState extends Phaser.State {

    preload(game){
        game.load.image('buttonPlay', 'sprites/Menu/button1.png');
        game.load.image('buttonExit', 'sprites/Menu/button2.png');
        game.load.image('buttonInfo', 'sprites/Menu/button3.png');
        game.load.image('buttonClose', 'sprites/Menu/close.png');
        game.load.image('popupInfo', 'sprites/Menu/BackPopup.png');
    }

    create(game) {

      var canvas = game.world.game.canvas;
      canvas.style.position = "fixed";
      canvas.style.left = (document.body.clientWidth / 2)-400;

      var propos = "Projet de 4ème Semestre \n \n"+
                    "Ce jeu a été réalisé dans le cadre du projet de 4ème semestre de l'année 2019 par : \n \n"+
                    "CARBONERO Jack, DESFOURNEAUX Victor, FRANCEZ Gabriel, HANCE Anaël et LAPORTE Maëlle \n\n" +
                    "Merci à Monsieur BLANCHARD d'avoir supervisé ce projet \n\n" +
                    "© Dread Maze I - 2019";

      var stylePop = {
        font: "bold 78px flipps",
        fill: "black",
        wordWrap: true,
        wordWrapWidth: 3200,
        align: "center"
      };

      //à centrer
      var styleTitle = {
        font: "bold 65px flipps",
        fill: "#2c3e50"
      };

        var buttonPlay = game.add.button(game.world.centerX-61.7, game.world.centerY-100, 'buttonPlay', launchPreparation, this);
        buttonPlay.scale.x = 0.2;
        buttonPlay.scale.y = 0.2;

        var buttonExit = game.add.button(game.world.centerX-61.7, game.world.centerY, 'buttonExit',  closeGame , this);
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
        var heightPop = popup.height + 650;

        var closeButton = game.make.sprite(widthPop, -heightPop, 'buttonClose');
        closeButton.inputEnabled = true;
        closeButton.input.priorityID = 1;
        closeButton.events.onInputDown.add(closePopup, this);

        var textPop = game.add.text(-1500, -1000, propos, stylePop);

        popup.addChild(textPop);
        popup.addChild(closeButton);

        var textTitle = game.add.text(0, 0, "Dread Maze I", styleTitle);
    }

}

function launchPreparation(){
    game.state.start('preparation', true);
}

function openPopup(){
  game.world.children[3].revive();
  game.world.children[4].kill();
}

function closePopup(){
  game.world.children[3].kill();
  game.world.children[4].revive();
}

function closeGame(){
  if (confirm("Fermeture de la fenetre?")){
    //window.history.back();
    //window.location.replace("about:home");
    window.location.replace("https://www.google.fr");
  }
}
