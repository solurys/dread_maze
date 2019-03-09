class EntityManager {
  constructor(game) {
    this.game = game;

    var groups = ['adventurers', 'monsters', 'traps', 'bosses', 'projectiles'];
    for (var group of groups) {
      this[group] = game.add.group();
      this[group].name = group;
      this[group].enableBody = true;
    }
  }
  add(entity) {
         if (entity instanceof Adventurer) this.adventurers.add(entity);
    else if (entity instanceof Monster)    this.monsters.add(entity);
    else if (entity instanceof Trap)       this.traps.add(entity);
    else if (entity instanceof Boss)       this.bosses.add(entity);
    else if (entity instanceof Projectile) this.projectiles.add(entity);
    entity.body.syncBounds = true;
    return entity;
  }
  update() {
    var phys = this.game.physics.arcade;

    // activation des pièges
    function trapActivated(trap, adventurer) {
      trap.activate(adventurer);
    }
    phys.overlap(this.traps, this.adventurers, trapActivated, null, this);

    // collision des projectiles
    // le projectile décide lui même si il a de l'effet
    function projectileHit(projectile, entity) {
      projectile.hit(entity);
    }
    phys.overlap(this.projectiles, this.adventurers, projectileHit, null, this);
    phys.overlap(this.projectiles, this.monsters, projectileHit, null, this);
    phys.overlap(this.projectiles, this.bosses, projectileHit, null, this);

    // pas de passage à travers les sprites
    phys.collide(this.adventurers);
    phys.collide(this.monsters);
    phys.collide(this.bosses);
    phys.collide(this.adventurers, this.bosses);
    phys.collide(this.monsters, this.bosses);
    phys.collide(this.adventurers, this.monsters);
  }
}
