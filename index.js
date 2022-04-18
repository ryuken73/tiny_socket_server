const httpServer = require('http').createServer();
const options = {
  allowEIO3: true,
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }    
};
const io = require('socket.io')(httpServer, options);

const HTTP_PORT = 9009;

io.on('connection', socket =>{
    onConnect(socket);
    socket.name = 'guest';
    attachHandler(socket, io);
    socket.on('disconnect', reason => {
        console.log('disconnected:', socket.id);
        socket.broadcast.emit('disconnected', socket.id);
    })
})

const onConnect = socket => {
    console.log('connected: ', socket.handshake.address);
    socket.broadcast.emit('connected', socket.id);
}

const attachHandler = (socket, io) => {
    socket.onAny((eventName, ...args) => {
        if(eventName === 'join') { socket.name = args[0].hostname}
        console.log(`event: [${eventName}] from [${socket.name}][${socket.id}]:`, args);
        socket.broadcast.emit(eventName, args[0])
    })
}

httpServer.listen(HTTP_PORT);
httpServer.on('listening', () => console.log('listening..'))
