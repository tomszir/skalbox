const SocketObject = require('./SocketObject');

class Player extends SocketObject {
  constructor(io, socket, options = {}) {
    super(io);

    this.id = socket.id;
    this.username = options.username || 'Undefined';
  }

  getSocket() {
    return super.getSocket(this.id);
  }
}

module.exports = Player;
