import { Logger, UnprocessableEntityException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getLogLevels from './config/config.logger';
import { AllExceptionsFilter } from './helpers/exceptions';
import { ResponseInterceptor } from './interceptors/response.interceptor';
require('dotenv').config();

async function bootstrap() {

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(process.env.NODE_ENV === 'production')
  });

  // To append a global prefix on all routes.
  app.setGlobalPrefix('api');

  // For security (helps in whitelisting request to the web server from certain locations)
  app.enableCors();

  const httpRef = app.getHttpAdapter().getHttpServer();
	//const logger = app.select(SharedModule).get(AppLoggerService, {strict: true});
	app.useGlobalFilters(new AllExceptionsFilter(httpRef, new Logger()));

	app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalPipes(new ValidationPipe({
		validationError: {
			target: false,
		},
		//forbidUnknownValues: true,
		transform: true,
		exceptionFactory: (errors: ValidationError[]) => {
			return new UnprocessableEntityException(errors);
		},
	}));

  await app.listen(port, () => console.log(`HN application running on port ${port}...`));

}
bootstrap();
