import { Task } from './task';

export class Workday {
  readonly id: string; // identifiant de la journée de travail
  dueDate: number; // date à laquelle est prévue la journée de travail
  displayDate: string;
  notes?: string; // facultatif : notes éventuelles prises par l’utilisateur
  tasks: Task[]; // la liste des tâches à faire
  userId: string; // identifiant de l’utilisateur
  remainingTasks?: number;
  doneTasks?: number;

  constructor(options: {
    id?: string,
    dueDate?: number,
    displayDate?: string,
    notes?: string,
    tasks?: Task[],
    userId: string,
    remainingTasks?: number,
    doneTasks?: number
  }) {
    this.id = options.id || null;
    this.dueDate = options.dueDate || 0;
    this.displayDate = options.displayDate || '';
    this.notes = options.notes || '';
    this.tasks = options.tasks || [new Task()];
    this.userId = options.userId;
    this.remainingTasks = options.remainingTasks || this.tasks.length;
    this.doneTasks = options.doneTasks || 0;
  }
}
