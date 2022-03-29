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
    attachHandler(socket, io);
    socket.on('disconnect', reason => {
        console.log('disconnected:', socket.customMode);
        if(socket.customMode){
            socket.broadcast.emit('reset:recorders', socket.customMode);
        }
    })
})

const onConnect = socket => {
    console.log('connected: ', socket.handshake.address);
}

const attachHandler = (socket, io) => {
    socket.onAny((eventName, ...args) => {
        console.log(`event: [${eventName}] from [${socket.handshake.address}]:`, args);
        if(eventName === 'setMode'){
            socket.customMode = args[0];
            return;
        }
        socket.broadcast.emit(eventName, args[0])
    })
}

httpServer.listen(HTTP_PORT);
httpServer.on('listening', () => console.log('listening..'))
