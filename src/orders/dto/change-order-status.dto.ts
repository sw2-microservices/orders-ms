import { IsEnum, IsUUID } from "class-validator";
import { OrderStatusList } from "../enum/order.enum";
import { OrderStatus } from "generated/prisma";

export class ChangeOrderStatusDto {

    @IsUUID()
    id: string;

    @IsEnum( OrderStatusList, {
        message: `Valid status are: ${OrderStatusList.join(', ')}`,
    })
    status: OrderStatus;
}