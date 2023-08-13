import { io, Socket } from 'socket.io-client';

let socketInstance: Socket | null = null;

export function initSocket() {
	if (!socketInstance) {
		socketInstance = io('http://localhost:3000');
	}
	return socketInstance;
}

export function getSocket(): Socket | null {
	if (!socketInstance) {
		socketInstance = io('http://localhost:3000');
	}
		return socketInstance;
}