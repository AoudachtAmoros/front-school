import { io } from 'socket.io-client';

class SocketioService {
<<<<<<< HEAD
  socket;
  constructor() {}
  setupSocketConnection() {
    this.socket = io('http://192.168.1.61:7000');
    return this.socket
  }
=======
    socket;
    constructor() {}
    setupSocketConnection() {
        this.socket = io('http://192.168.1.54:7000');
        return this.socket
    }
>>>>>>> 0d859ce4d3f52803f937d6a16c0a067064b6df0d
}

export default new SocketioService();