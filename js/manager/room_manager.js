class Room {
  constructor(roomManager, line, col) {
    this.roomManager = roomManager;
    this.line = line;
    this.col = col;
    var pw = roomManager.pixwr;
    var ph = roomManager.pixhr;
    this.pixel = new Phaser.Rectangle(col * pw, line * ph, pw, ph);
  }
  getNext(direction) {
    var rm = this.roomManager;
    switch (direction) {
      case 'up': return rm.getRoom(this.line-1, this.col);
      case 'down': return rm.getRoom(this.line+1, this.col);
      case 'left': return rm.getRoom(this.line, this.col-1);
      case 'right': return rm.getRoom(this.line, this.col+1);
    }
  }
  isInside(sprite) {
    return this.pixel.intersects(sprite);
  }
}

class RoomManager {
  constructor(game) {
    this.game = game;
    this.rooms = [];
    this.nbLines = 0;
    this.nbCols = 0;
    this.pixwr = game.width;
    this.pixhr = game.height;
  }
  setRooms(nbLines, nbCols, rooms) {
    this.nbLines = nbLines;
    this.nbCols = nbCols;
    this.rooms = [];
    this.currentCol = 0;
    this.currentLine = 0;

    if (rooms.length !== nbLines) {
      console.warn('taille du tableau des salles incorrecte (lignes)');
    }

    for (var line = 0; line < nbLines; line++) {
      if (rooms[line].length !== nbCols) {
        console.warn('taille du tableau des salles incorrecte (colonnes)');
      }
      this.rooms[line] = [];
      for (var col = 0; col < nbCols; col++) {
        if (rooms[line][col] !== null && rooms[line][col] !== undefined) {
          this.rooms[line][col] = new Room(this, line, col);
        }
        else {
          this.rooms[line][col] = null;
        }
      }
    }
  }
  isValidRoomCoord(line, col) {
    return line >= 0 && line < this.nbLines
        &&  col >= 0 && col < this.nbCols
        && this.rooms[line][col] !== null;
  }
  getRoom(line, col) {
    if (!this.isValidRoomCoord(line, col)) {
      return undefined;
    }
    return this.rooms[line][col];
  }
  getRoomOf(sprite) {
    var roomOfSprite = undefined;
    this.forEachRoom(room => {
      if (room.isInside(sprite))
        roomOfSprite = room;
    });
    return roomOfSprite;
  }
  forEachRoom(f, thisArg) {
    for (var line = 0; line < this.rooms.length; line++) {
      for (var col = 0; col < this.rooms[line].length; col++) {
        var room = this.getRoom(line, col);
        if (room === undefined) continue;
        if (thisArg === undefined)
          f(room);
        else
          f.call(thisArg, room);
      }
    }
  }
}
