export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

enum TaskStatus {
  OPEN = 'OPEN',
  PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
