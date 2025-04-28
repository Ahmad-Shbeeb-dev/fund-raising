import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [PrismaModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
