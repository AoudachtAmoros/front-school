import { io } from 'socket.io-client';

class SocketioService {
    socket;
    constructor() {}
    setupSocketConnection() {
        this.socket = io('http://192.168.1.54:7000');
        return this.socket
    }
}

export default new SocketioService();