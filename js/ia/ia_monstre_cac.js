// classe IA de base

class MonstreCac extends IA {
  // self : entité controllée par l'ia
  constructor(self) {
    super(self);
    this.etat = 1; // état inerte par défaut
    this.target = null;
    this.destination = {x: this.self.x, y: this.self.x};
    this.speed = 100;
  }
  update() {
    var that = this;
      function detecterProche () {
          return filterTargets(that.self, [that.self.game.entityManager.adventurers])
                  // filtres
                  .alive() // en vie, pas mort
                  .nearby(200) // distant de moins de 200px
                  // tris
                  .sortByDistance() // le plus proche devient le premier
                  // accesseur
                  .first();
      }
      function mouvementAleatoire() {
        var epsilon = 10;
        if (Math.abs(that.destination.x - that.self.x) < epsilon && Math.abs(that.destination.y - that.self.y) < epsilon){
          that.destination = {x: Phaser.Math.between(0,800), y: Phaser.Math.between(0,600)}; //limitation à la salle
        }
        else {
          var vel = Vector.from_to(that.self, that.destination).normalize().multiply(that.speed);
          that.self.walk(vel);
        }
      }

      switch(this.etat) {
          case 1: //patrouille
            //le personnage se déplace aléatoirement dans la piece
            mouvementAleatoire();
            //si ennemie detecter etat attaque
            this.target = detecterProche();
            if (this.target != undefined)
                this.etat = 2;
            break;
        case 2: //attaque
            if (Math2D.pixelDistance2(this.self, this.target) < 200**2) {
              this.self.attack(this.target);
            }

            if (Math2D.pixelDistance2(this.self, this.target) > 200**2) {
              this.etat = 1;
            }

            else{
              var vel = Vector.from_to(that.self, that.target).normalize().multiply(that.speed);
              this.self.walk(vel);
            }
      }
  }
  debug() {}

}
