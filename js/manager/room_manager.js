class RoomManager {
  constructor(game) {
    this.game = game;
    this.rooms = [];
    this.nbLines = 0;
    this.nbCols = 0;
    this.currentLine = 0;
    this.currentCol = 0;
    this.wr = game.width; // width of a room
    this.hr = game.height; // height of a room
  }
  get currentRoom() {
    return this.rooms[this.currentLine][this.currentCol];
  }
  handleInput(keys) {
    if (keys.up.justPressed()) {
      this.moveCamera('up');
    }
    if (keys.down.justPressed()) {
      this.moveCamera('down');
    }
    if (keys.left.justPressed()) {
      this.moveCamera('left');
    }
    if (keys.right.justPressed()) {
      this.moveCamera('right');
    }
  }
  setRooms(nbLines, nbCols, rooms) {
    this.nbLines = nbLines;
    this.nbCols = nbCols;
    this.rooms = rooms;
    this.currentCol = 0;
    this.currentLine = 0;

    if (this.rooms.length !== nbLines) {
      console.warn('taille du tableau des salles incorrecte (lignes)');
    }

    for (var i = 0; i < nbLines; i++) {
      if (this.rooms[i].length !== nbCols) {
        console.warn('taille du tableau des salles incorrecte (colonnes)');
      }
      for (var j = 0; j < nbCols; j++) {
        if (rooms[i][j] !== null) {
          rooms[i][j].x = i;
          rooms[i][j].y = j;
         }
      }
    }
    game.world.setBounds(0, 0, this.wr*nbLines, this.hr*nbCols);
  }
  isValidRoomCoord(line, col) {
    return line >= 0 && line < this.nbLines
        &&  col >= 0 && col < this.nbCols
        && this.rooms[line][col] !== null;
  }
  moveCameraTo(line, col) {
    if (this.isValidRoomCoord(line, col)) {
      this.currentLine = line;
      this.currentCol = col;
      this.game.camera.setPosition(this.wr*line, this.hr*col);
      return true;
    }
    else {
      return false;
    }
  }
  moveCamera(direction) {
    switch(direction) {
      case 'up': return this.moveCameraTo(this.currentLine-1, this.currentCol);
      case 'down': return this.moveCameraTo(this.currentLine+1, this.currentCol);
      case 'left': return this.moveCameraTo(this.currentLine, this.currentCol-1);
      case 'right': return this.moveCameraTo(this.currentLine, this.currentCol+1);
    }
  }
}
