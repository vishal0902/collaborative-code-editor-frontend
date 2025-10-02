import { io } from "socket.io-client";

const initSocket = async () => {
    const options =  {
        forceNewConnection: true,
        reconnection: true,
        reconnectionAttempts: Infinity,
        timeout: 20000,
        transports: ['websocket'],
    }
    // console.log(import.meta.env.VITE_BACKEND_URL)
    return io(import.meta.env.VITE_BACKEND_URL, options)
}
export default initSocket;