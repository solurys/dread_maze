class KeyboardArrowControl extends UserControl {
  constructor(self, {speed = 200} = {}) {
    var key = keycode => self.game.input.keyboard.addKey(keycode);
    var k = Phaser.KeyCode;
    super(self, {
      up: key(k.UP),
      down: key(k.DOWN),
      left: key(k.LEFT),
      right: key(k.RIGHT),
      attack: key(k.SPACEBAR),
      speed: speed
    });
  }
}
