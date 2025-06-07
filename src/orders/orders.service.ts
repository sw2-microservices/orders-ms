import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from 'generated/prisma';
import { RpcException } from '@nestjs/microservices';
import { OrderPaginationDto } from './dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';


@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('OrdersService');

  constructor(
    //@Inject(RESERVATION_SERVICE) private readonly reservationClient: ClientProxy,
  ) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connection established');
  }

  async create(createOrderDto: CreateOrderDto) {

    //todo: aplicar cuando se tenga flight ya que tiene el atributo price
    // try {
    //   const reservationIds = createOrderDto.items.map(item => item.reservationId);

    //   const reservation = await firstValueFrom(
    //     this.reservationClient.send({ cmd: 'validate_reservation' }, reservationIds)
    //   )

    //   // Todo: implementar cuando se tenga Flight-ms
    //   // const totalAmount = createOrderDto.items.reduce( (acc, orderItem) => {
    //   //   const item = reservation.find
    //   // })
    //   return reservation;
    // } catch (error) {
    //   throw new RpcException({
    //     status: HttpStatus.BAD_REQUEST,
    //     message: 'Error validating reservation',
    //   });
    // }



  }

  async findAll(orderPaginationDto: OrderPaginationDto) {

    const totalPages = await this.order.count({
      where: {
        status: orderPaginationDto.status,
      }
    });

    const currentPage = orderPaginationDto.page;
    const perPage = orderPaginationDto.limit;

    return {
      data: await this.order.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: {
          status: orderPaginationDto.status,
        },
      }),
      meta: {
        total: totalPages,
        page: currentPage,
        lastPage: Math.ceil(totalPages / perPage),
      }
    }
  }

  async findOne(id: string) {
    const order = await this.order.findFirst({
      where: {
        id: id,
      },
    })

    if (!order) {
      throw new RpcException({ status: HttpStatus.NOT_FOUND, message: 'Order not found' });
    }

    return order;
  }

  async changeStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    const { id, status } = changeOrderStatusDto;

    const order = await this.findOne(id);
    if (order.status === status) {
      return order;
    }

    return this.order.update({
      where: { id },
      data: { status: status },
    })
  }
}
