const Room = require('./Room');

class RoomStore {
  constructor() {
    this.rooms = {};
  }

  get(id) {
    return this.rooms[id];
  }

  has(id) {
    // ...
  }

  add(room) {
    this.rooms[room.id] = room;
  }

  remove(room) {
    delete this.rooms[room.id];
  }

  get length() {
    return Object.keys(this.rooms).length;
  }
}

module.exports = RoomStore;
