import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksReposiroty } from './tasks.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksReposiroty])
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
