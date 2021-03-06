class FollowEnemy extends IA {
  constructor(self, config = {}) {
    super(self);
    this.enemies = self.enemies;
  }
  update() {
    var target =
      filterTargets(this.self, this.enemies)
        .alive()
        .nearby(200)
        .sortByDistance()
        .first();
    if (target !== undefined) {
      var speed = 100;
      var vel = Vector.from_to(this.self, target).normalize().multiply(speed);
      this.self.body.velocity.setTo(vel.x, vel.y);
    }
    else {
      this.self.body.velocity.setTo(0, 0);
    }
  }
  debug() {
    this.self.game.debug.geom(
      new Phaser.Circle(this.self.centerX, this.self.centerY, 400),
      'blue',
      /* filled = */ false
    );
  }
}
