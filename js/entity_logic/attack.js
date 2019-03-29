window.Attack = {};

Attack.cac = function (self, target, config) {
  if (Math.random() > target.dodgeRate) {
    target.cacDamage(self.strength);
  }
};

// TODO magicSpell

Attack.magicSpell = function (self, target, config) {
  if (Math.random() > target.dodgeRate) {
    target.magicDamage(self.strength);
  }
};

Attack.magicProjectile = function (self, target, config) {
  if (config.speed === undefined) {config.speed = 200;}
  var proj = self.game.entityManager.add(new config.projectile(game, self.centerX, self.centerY, self.enemies));
  var dir = Vector.from_to(self, target).normalize().multiply(config.speed);
  proj.body.velocity.setTo(dir.x, dir.y);
};

Attack.projectile = function (self, target, config) {
  if (config.speed === undefined) {config.speed = 200;}
  var proj = self.game.entityManager.add(new config.projectile(game, self.centerX, self.centerY, self.enemies));
  var dir = Vector.from_to(self, target).normalize().multiply(config.speed);
  proj.body.velocity.setTo(dir.x, dir.y);
};
