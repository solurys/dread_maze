// classe IA de base

class MonstreCaster extends IA {
    // self : entité controllée par l'ia
    constructor(self, speed = 100, range_attack = 40, range_detection = 100, est_dist = false, type = 0) {
      super(self);
      this.etat = 1; // état inerte par défaut
      this.target = null;
      this.destination = {x: this.self.x, y: this.self.x};
      this.speed = speed;
      this.range_attack = range_attack;
      this.range_detection = range_detection;
      this.est_distance = est_dist;
      this.type = type;
    }
    //Mise à jour et choix du comportement de l'entité
    update() {
      var that = this;
      function detecterProche () {
          return filterTargets(that.self, [that.self.game.entityManager.adventurers])
                  // filtres
                  .alive() // en vie, pas mort
                  .nearby(that.range_detection) //dans la range
                  // tris
                  .sortByDistance() // Autre filtre ?
                  // accesseur
                  .first();
      }
      function mouvementAleatoire() {
        var epsilon = 10;
        var pos = {x: that.self.centerX, y: that.self.centerY};
        if (Math.abs(that.destination.x - pos.x) < epsilon && Math.abs(that.destination.y - pos.y) < epsilon){
          that.destination = {x: Phaser.Math.between(0,800), y: Phaser.Math.between(0,600)}; //limitation à la salle
        }
        else {
          var vel = Vector.from_to(pos, that.destination).normalize().multiply(that.speed);
          that.self.walk(vel);
        }
      }
  
      switch(this.etat) {
            case 1: //patrouille
              //le personnage se déplace aléatoirement dans la piece
              mouvementAleatoire();
              //si ennemi detecté etat attaque
              this.target = detecterProche();
              if (this.target != undefined)
                  this.etat = 2;
              break;
          case 2: //attaque
              // si la cible est morte
              if (this.target.alive === false) {
                this.etat = 1;
              }
              // si la cible est à portée d'attaque
              if (Math2D.rangeCheck(this.self, this.target, this.range_attack)) {
                this.self.attack(this.target);
              }
  
              // si la cible est hors de détection
              else if (!Math2D.rangeCheck(this.self, this.target, this.range_detection)) {
                this.etat = 1;
              }
  
              // n'est pas à portée d'attaque mais détecté
              // on s'approche
              else{
                var vel = Vector.from_to(that.self, that.target).normalize().multiply(that.speed);
                this.self.walk(vel);
              }
              break;
        }
    }


    //Méthode de débuggage
    debug() {
      var s = this.self;

      var rd = this.range_detection;
      var ra = this.range_attack;

      var rec_rd = new Phaser.Rectangle(s.x-rd, s.y-rd, s.width+rd*2, s.height+rd*2);
      var rec_ra = new Phaser.Rectangle(s.x-ra, s.y-ra, s.width+ra*2, s.height+ra*2);

      var dg = this.self.game.debug;
      dg.rectangle(rec_rd, 'yellow', false);
      dg.rectangle(rec_ra, 'red', false);
      switch(this.etat) {
        case 1:
          var dest = this.destination;
          var line_dest = new Phaser.Line(s.centerX, s.centerY, dest.x, dest.y);
          dg.geom(line_dest, 'black');
          break;
        case 2:
          var t = this.target;
          var line_target = new Phaser.Line(s.centerX, s.centerY, t.centerX, t.centerY);
          dg.geom(line_target, 'red');
          break;
      }
    }
}
  