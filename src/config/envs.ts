import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;

    RESERVATIONS_MICROSERVICE_HOST: string;
    RESERVATIONS_MICROSERVICE_PORT: number;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    RESERVATIONS_MICROSERVICE_HOST: joi.string().required(),
    RESERVATIONS_MICROSERVICE_PORT: joi.number().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    
    reservationsMicroserviceHost: envVars.RESERVATIONS_MICROSERVICE_HOST,
    reservationsMicroservicePort: envVars.RESERVATIONS_MICROSERVICE_PORT,
}
