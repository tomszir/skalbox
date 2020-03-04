const chalk = require('chalk');
const bodyParser = require('body-parser');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const Room = require('./lib/Room');
const RoomStore = require('./lib/RoomStore');

const rooms = new RoomStore();

function generateRoomId(length = 4) {
  return Math.floor(Math.random() * (10 ** length - 10 ** (length - 1) - 1) + (10 ** (length - 1)) + 1);
}

app.use(bodyParser.json());
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/room/get/:roomId', (req, res) => {
  const { roomId } = req.params;

  if (!rooms.hasOwnProperty(roomId)) {
    return res.status(404).send({
      message: 'Room not found!'
    });
  }

  res.status(200).send({ room });
})

app.post('/room/create', (req, res) => {
  const { roomId, maxPlayers } = req.body;
  const room = new Room(io, roomId, {
    maxPlayers
  });

  if (rooms.has(room)) {
    return res.status(400).send({
      message: 'A room with the same id already exists!'
    });
  }

  rooms.add(room);
  res.status(200).send({
    message: 'Successfully created a room!'
  });
});

app.get('/room/generateId', (_, res) => {
  var id = generateRoomId();

  while (rooms.hasOwnProperty(id)) {
    id = generateRoomId();
  }

  res.status(200).send({ id });
});

http.listen(8081, () => {
  console.log(`Server listening on ${chalk.cyan('http://localhost:8081')}`)
});

require('./sockets')(io, rooms);