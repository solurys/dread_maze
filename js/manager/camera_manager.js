class CameraManager {
  constructor(game, line = 0, col = 0, rm = game.roomManager) {
    this.game = game;
    this.rm = rm;
    this.currentRoom = rm.getRoom(line, col);
    this.target = undefined;
    game.world.setBounds(0, 0, rm.pixwr*rm.nbCols, rm.pixhr*rm.nbLines);
  }
  get following() {
    return this.target !== undefined;
  }
  updateFollow() {
    if (this.following && this.currentRoom.isInside(this.target) === false) {
      var room = this.rm.getRoomOf(this.target);
      if (room !== undefined)
        this.setCurrentRoom(room);
    }
  }
  handleInput(keys, target /* si keys.follow défini */) {
    if (keys.up.justPressed()) {
      this.move('up');
      //this.unfollow();
    }
    if (keys.down.justPressed()) {
      this.move('down');
      //this.unfollow();
    }
    if (keys.left.justPressed()) {
      this.move('left');
      //this.unfollow();
    }
    if (keys.right.justPressed()) {
      this.move('right');
      //this.unfollow();
    }
    if (keys.unfollow !== undefined && keys.unfollow.justPressed()) {
      this.unfollow();
    }
    if (keys.follow !== undefined && keys.follow.justPressed()) {
      this.follow(target);
    }
  }
  setCurrentRoom(room) {
    this.currentRoom = room;
    this.game.camera.setPosition(room.pixel.x, room.pixel.y);
  }
  moveTo(line, col) {
    var room = this.rm.getRoom(line, col);
    if (room === undefined)
      return false;
    this.setCurrentRoom(room);
    return true;
  }
  move(direction) {
    var room = this.currentRoom.getNext(direction);
    if (room === undefined)
      return false;
    this.setCurrentRoom(room);
    return true;
  }
  follow(sprite) {
    this.target = sprite;
  }
  unfollow() {
    this.target = undefined;
  }
}
