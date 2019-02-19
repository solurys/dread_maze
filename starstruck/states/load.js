var loadState= {

  // The preload function is another standard Phaser function that we
  // use to define and load our assets
  preload: function() {

    // Add a loading label on the screen
    var loadingLabel = game.add.text(80, 150, 'loading...',
    {font: '30px Courier', fill: '#ffffff'});

    // Load all assets. The first parameter is the variable that
    // will point to the image, and the second parameter is the
    // image file itsself.
    //game.load.image('background', 'asset/img/background.jpg');
  },

  create: function() {
    // Call the menu state
    game.state.start('menu');
  }
};
