import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());



  /** swagger  start*/
  const opt = new DocumentBuilder()
    .setTitle('flap')
    .setDescription('flapproducts Docs')
    .setVersion('1.0')
    .addSecurity('Authorization', { type: 'http', bearerFormat: 'Bearer ' })
    .build();

  const doc = SwaggerModule.createDocument(app, opt, {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  });
  SwaggerModule.setup('api', app, doc);
  /** swagger end  */


  const port = process.env.PORT || 5102
  await app.listen(port, () => {
    Logger.log(`flap server started at ${port}`, 'server');
    Logger.log(` DB connected on ${process.env.DB_HOST}`, 'DataBase')
    Logger.log(`http://localhost:${port}/api`, "swagger")
  });
}
bootstrap();
