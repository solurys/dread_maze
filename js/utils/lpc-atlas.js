function setup_lpc_animations(sprite) {
  const fps = 10;
  function addAnim(name, length) {
    var frames = Phaser.ArrayUtils.numberArray(length-1).map(num => name + '-' + num);
    sprite.animations.add(name, frames, fps);
  }
  function addAnim4Dir(name, length) {
    addAnim(name + '-left', length);
    addAnim(name + '-right', length);
    addAnim(name + '-up', length);
    addAnim(name + '-down', length);
  }

  addAnim4Dir('spellcast', 7);
  addAnim4Dir('thrust', 8);
  addAnim4Dir('walk', 9);
  addAnim4Dir('slash', 6);
  addAnim4Dir('shoot', 13);
  addAnim('die', 6);
}
