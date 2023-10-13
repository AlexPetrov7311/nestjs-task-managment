import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TasksReposiroty extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task: Task = this.create({
          title,
          description,
          status: TaskStatus.OPEN,
          user,
        });

        await this.save(task);
        return task;
    }

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        query.where({ user })

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere(
                '(LOWER(task.title) Like LOWER(:search) OR LOWER(task.description) Like LOWER(:search))',
                { search: `%${search}%` }
            );
        }
        // query.leftJoinAndSelect("task.user", "user")

        const tasks = await query.getMany();
        console.log(tasks);
        return tasks;
    }
}
