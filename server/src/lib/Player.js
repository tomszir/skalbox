const SocketObject = require('./SocketObject');

class Player extends SocketObject {
  constructor(io, socket, options = {}) {
    super(io);

    this.id = socket.id;
    this.socket = socket;
    this.username = options.username || 'Undefined';
  }

  toJSON() {
    const { id, username } = this;

    return Object.assign({}, {
      id, username
    });
  }
}

module.exports = Player;
