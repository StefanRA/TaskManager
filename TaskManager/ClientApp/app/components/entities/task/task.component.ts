import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Task } from './task.model';
import { TaskService } from './task.service';
import { UserService } from '../user/user.service';

@Component({
    selector: 'task',
    templateUrl: './task.component.html'
})

export class TaskComponent {
    public tasks: Task[];
    public newTask: Task;

    constructor(
        private taskService: TaskService,
        private userService: UserService
        )
    {
        this.loadAll();
    }

    loadAll() {
        this.taskService.getAll().subscribe(result => {
            this.tasks = result.json() as Task[];
        }, error => console.error(error));
    }

    add() {
        this.newTask = new Task();
        this.newTask.name = "Create Task entity";
        this.newTask.description = "Create the Task entity and implement CRUD operations for it";
        this.userService.find(1).subscribe(result => {
            this.newTask.reporter = result;
            this.newTask.assignee = result;
        }, error => console.error(error));

        const copy = this.convert(this.newTask);
        //this.http.post(this.resourceUrl, copy).subscribe(result => { this.newUser = result.json() },error=>console.error(error));
        this.taskService.create(this.newTask).subscribe(result => { this.newTask = result.json() }, error => console.error(error));
        this.tasks.push(this.newTask);
    }

    private convert(project: Task): Task {
        const copy: Task = Object.assign({}, project);
        return copy;
    }

    public remove(project: Task) {
        this.taskService.delete(project.id).subscribe((res) => { });
        this.tasks.splice(this.tasks.indexOf(project), 1);
    }

    previousState() {
        window.history.back();
    }
}