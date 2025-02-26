import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: 'http://localhost:5173' } }) // Permitir conexión desde Vite
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log(`Cliente conectado: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Cliente desconectado: ${client.id}`);
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: { message: string }) {
        console.log('Mensaje recibido:', data.message);
        this.server.emit('message', `Servidor responde: ${data.message}`);
    }
}
