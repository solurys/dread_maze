class FollowEnemy extends IA {
  constructor(self, enemies) {
    super(self);
    this.enemies = enemies;
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
}
