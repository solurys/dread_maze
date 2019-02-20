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
        .first(); // pas forcément le plus proche (sortByDistance)
    if (target !== undefined) {
      var speed = 100;
      var dir = Vector.from(this.self, target).normalize().multiply(speed);
      this.self.body.velocity.setTo(dir.x, dir.y);
    }
    else {
      this.self.body.velocity.setTo(0, 0);
    }
  }
}
