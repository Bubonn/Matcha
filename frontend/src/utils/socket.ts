import { io, Socket } from 'socket.io-client';

let socketInstance: Socket | null = null;

export function initSocket() {
	if (!socketInstance) {
		socketInstance = io(`http://${process.env.REACT_APP_IP_FRONT}:${process.env.REACT_APP_FRONT_PORT}`);
	}
	return socketInstance;
}

export function getSocket(): Socket | null {
	if (!socketInstance) {
		socketInstance = io(`http://${process.env.REACT_APP_IP_FRONT}:${process.env.REACT_APP_FRONT_PORT}`);
	}
		return socketInstance;
}
