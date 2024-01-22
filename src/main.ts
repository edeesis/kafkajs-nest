import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaConfig } from 'kafkajs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: KafkaConfig = {
    clientId: 'client-id',
    brokers: process.env.KAFKA_BROKERS.split(','),
  };
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: config,
    },
  });
  await app.listen(3000);
}
bootstrap();
