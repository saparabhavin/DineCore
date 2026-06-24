import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Example: This is how the POS would tell the backend there's a new order
  @SubscribeMessage('create_order')
  handleCreateOrder(client: Socket, payload: any): void {
    console.log('Order received:', payload);
    
    // Save to DB here (mocked for now)
    
    // Broadcast to all other connected clients (Kitchen Display, Admin Panel)
    this.server.emit('new_order', {
      id: Math.random().toString(36).substr(2, 9),
      status: 'PREPARING',
      ...payload
    });
  }
}
