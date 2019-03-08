class KeyboardZQSDControl extends UserControl {
  constructor(self, speed = 200) {
    var key = keycode => self.game.input.keyboard.addKey(keycode);
    var k = Phaser.KeyCode;
    super(self, {
      up: key(k.Z),
      down: key(k.S),
      left: key(k.Q),
      right: key(k.D),
      attack: key(k.A),
      speed: speed
    });
  }
}
