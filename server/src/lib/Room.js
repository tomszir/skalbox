const SocketObject = require('./SocketObject');

class Room extends SocketObject {
  constructor(io, roomId, options = {}) {
    super(io);

    // The ID of this room.
    this.id = roomId;

    // The socket id of the room host.
    this.host = null;

    // The connected players.
    this.players = [];

    // The submitted questions.
    this.questions = [];

    // The pregenerated questions.
    this.staticQuestions = [];

    // The current round.
    this.currentRound = 1;

    // How many rounds will happen.
    this.totalRounds = 3;

    // The number of questions each person is given to write.
    this.questionPerPerson = 2;

    // The time given to write a question.
    this.secondsPerQuestion = 30;
  }

  setHost(socket) {
    this.host = socket.id;
  }

  getHost() {
    return this.getSocket(this.host);
  }

  // Adds a player to this room.
  addPlayer(player) {
    player.getSocket().join(this.roomName);

    this.players.push(player);
    this.updatePlayerList();
  }

  // Removes a player from this room.
  removePlayer(player) {
    this.players = this.players.filter((p) => p != player);

    this.updatePlayerList();
    this.emit('client/broadcast', {
      message: `${player.username} has left.`
    });
  }

  kickPlayer(player, reason = null) {
    this.emit('client/broadcast', {
      message: `${player.username} has been kicked.`
    });

    // Figure out later how to actually kick the user.
  }

  updatePlayerList() {
    this.emit('client/updatePlayerList', this.players);
  }

  emit(key, ...params) {
    this.io.in(this.roomName).emit(`room/${key}`, ...params);
  }

  get roomName() {
    return `room/${this.id}`;
  }
}

module.exports = Room
