class KeyboardArrowControl extends UserControl {
  constructor(self) {
    var key = keycode => self.game.input.keyboard.addKey(keycode);
    var k = Phaser.KeyCode;
    super(self, {
      up: key(k.UP),
      down: key(k.DOWN),
      left: key(k.LEFT),
      right: key(k.RIGHT),
      attack: key(k.SPACEBAR),
      speed: 600
    });
  }
}
