import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { envs, RESERVATION_SERVICE } from 'src/config';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    ClientsModule.register([
      {
        name: RESERVATION_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.reservationsMicroserviceHost,
          port: envs.reservationsMicroservicePort,
        },
      }
    ])
  ],
})
export class OrdersModule {}
