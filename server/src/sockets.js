const Player = require('./lib/Player');

module.exports = (io, rooms) => {
  io.on('connection', (socket) => {
    const log = (m, ...o) => console.log(`[${socket.id}] ${m}`, ...o);

    log(`Connected!`);

    socket.on('room/join', ({ roomId, username }) => {
      if (!rooms.has(roomId)) {
        log('Connected to a non-existing room.');
        return;
      }

      const room = rooms.get(roomId);
      const player = new Player(io, socket, {
        username
      });

      room.addPlayer(player);
      room.updatePlayerList();

      log(`Connected to room ${roomId}`, player);
    });

    socket.on('room/joinAsHost', ({ roomId }) => {
      if (!rooms.has(roomId)) {
        log('Connected to a non-existing room.');
        return;
      }

      room.setHost(socket.id);

      log(`The host connected to room ${roomId}`);
    });

    socket.on('disconnect', () => {
      log(`Disconnected!`);
    })
  });
}
