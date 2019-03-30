// classe IA de base

class IA {
  // self : entité controllée par l'ia
  constructor(self, config = {}) {
    this.self = self;
  }
  update() {}
  debug() {}
}
