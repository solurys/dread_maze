class UserControl extends IA {
  constructor(self, config) {
    super(self);
    this.keys = {
      up: config.up,
      down: config.down,
      left: config.left,
      right: config.right
    };
    this.speed = config.speed;
  }

  update() {
    var k = this.keys;
    var vel_x = 0;
    var vel_y = 0;

    if (k.up.isDown)    vel_y -= this.speed;
    if (k.down.isDown)  vel_y += this.speed;
    if (k.left.isDown)  vel_x -= this.speed;
    if (k.right.isDown) vel_x += this.speed;

    this.self.body.velocity.setTo(vel_x, vel_y);
  }
}
