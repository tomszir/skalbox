class SocketObject {
  constructor(io) {
    this.io = io;
  }

  getSocket(id) {
    // return this.io.sockets.sockets.get(id);
  }
}

module.exports = SocketObject;
