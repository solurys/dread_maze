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
    var vel = { x:0, y:0};

    if (k.up.isDown)    vel.y -= this.speed;
    if (k.down.isDown)  vel.y += this.speed;
    if (k.left.isDown)  vel.x -= this.speed;
    if (k.right.isDown) vel.x += this.speed;

    if (vel.x != 0 || vel.y != 0)
      this.self.walk(vel);
    else
      this.self.stop();
  }
}
