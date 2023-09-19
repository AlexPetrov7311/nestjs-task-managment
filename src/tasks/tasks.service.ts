import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksReposiroty } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksReposiroty)
    private tasksRepository: TasksReposiroty
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  //   const { status, search } = filterDto;

  //   // define a temporary array to hold the result
  //   let tasks = this.getAllTasks();

  //   // do something with status 
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }

  //   // do something with search
  //   if (search) {
  //     tasks = tasks.filter(task => {
  //       if (task.title.toLocaleLowerCase().includes(search) || task.description.toLocaleLowerCase().includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     }) ;
  //   }

  //   // return final result
  //   return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({
      where: {
        id,
    }});
      // if not found, throw an error (404 not found)
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    // otherwise, return the found task
    return found;
  }

  // getTaskById(id: string): Task {
  //   const found = this.tasks.find(task => task.id === id);
  //   // try to get task

  //   // if not found, throw an error (404 not found)
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   // otherwise, return the found task
  //   return found;
  // }

  async deleteTaskById(id: string): Promise<void> {
    const found = await this.tasksRepository.delete(id);
    if (found.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}}" not found`);
    }
  }

   async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN
  //   };

  //   this.tasks.push(task);

  //   return task;
  // }

  async updateTaskById(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  } 

}
