// http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/
var LPC_Atlas = {
  addAnim: function(sprite, name, length, fps=10) {
    var frames = Phaser.ArrayUtils.numberArray(length-1).map(num => name + '-' + num);
    sprite.animations.add(name, frames, fps);
  },
  addAnim4Dir: function(sprite, name, length) {
    LPC_Atlas.addAnim(sprite, name + '-left', length);
    LPC_Atlas.addAnim(sprite, name + '-right', length);
    LPC_Atlas.addAnim(sprite, name + '-up', length);
    LPC_Atlas.addAnim(sprite, name + '-down', length);
  },
  lpc_animations: {
    // animation et nombre de frames
    spellcast: {length: 7},
    thrust: {length: 8},
    walk: {length: 9},
    slash: {length: 6},
    shoot: {length: 13},
    dragonSpear: {length: 8},
    longSword: {length: 6},
    cudgel: {length: 6},
    die: {length: 6, noDirection: true}
  },
  setup_basic_lpc_animations : function(sprite) {
    LPC_Atlas.setup_list_animations(sprite, [
      'spellcast',
      'thrust',
      'walk',
      'slash',
      'shoot',
      'die'
    ]);
  },
  setup_animation: function(sprite, animName) {
    var animConf = LPC_Atlas.lpc_animations[animName];
    if (animConf === undefined) {
      console.warn('lpc animation not found : ' + animName);
      return;
    }
    if (animConf.noDirection) {
      LPC_Atlas.addAnim(sprite, animName, animConf.length);
    }
    else {
      LPC_Atlas.addAnim4Dir(sprite, animName, animConf.length);
    }
  },
  setup_list_animations: function(sprite, animsToSetup) {
    for (var animName of animsToSetup) {
      LPC_Atlas.setup_animation(sprite, animName);
    }
  }
};
