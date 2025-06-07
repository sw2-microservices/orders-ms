import { IsBoolean, IsNumber, IsOptional, IsPositive, IsUUID } from "class-validator";

export class OrderItemDto {

    @IsUUID()
    reservationId: string;

    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsNumber()
    @IsPositive()
    price: number;
}