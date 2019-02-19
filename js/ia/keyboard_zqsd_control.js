class KeyboardZQSDControl extends UserControl {
  constructor(self) {
    var key = keycode => self.game.input.keyboard.addKey(keycode);
    var k = Phaser.KeyCode;
    super(self, {
      up: key(k.Z),
      down: key(k.S),
      left: key(k.Q),
      right: key(k.D),
      speed: 600
    });
  }
}
