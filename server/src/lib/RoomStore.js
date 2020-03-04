const Room = require('./Room');

class RoomList {
  constructor() {
    this.rooms = {};
  }

  get(id) {
    if (this.has(id)) {
      return this.rooms[id];
    }
    return null;
  }

  add(room) {
    this.rooms[room.id] = room;
  }

  remove(room) {
    delete this.rooms[room.id];
  }

  has(id) {
    return this.rooms[id];
  }

  get length() {
    return Object.keys(this.rooms).length;
  }
}

module.exports = RoomList;
