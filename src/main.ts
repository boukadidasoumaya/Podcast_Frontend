import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

async function bootstrap() {
  const appConfig = new AppConfig(); // Assuming you have a config class

  try {
    const app = await bootstrapApplication(AppComponent, {
      config: appConfig,
      cors: {
        origin: appConfig.corsOrigin || 'http://localhost:4200', // Replace with your allowed origin or dynamic config
      },
    });
    
    await app.listen(3000);
  } catch (err) {
    console.error(err);
  }
}

bootstrap();