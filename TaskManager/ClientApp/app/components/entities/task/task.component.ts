import { Component, Input, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Task } from './task.model';
import { TaskService } from './task.service';
import { UserService } from '../user/user.service';

import { Project } from '../project/project.model';

@Component({
    selector: 'task',
    templateUrl: './task.component.html'
})

export class TaskComponent {
    public tasks: Task[];
    public newTask: Task;
    @Input('parentProject') public parentProject: Project;

    constructor(
        private taskService: TaskService,
        private userService: UserService
        )
    {
    }

    ngOnInit() {
        this.newTask = new Task();
        this.loadAll();
    }

    loadAll() {
        this.taskService.getAllByProjectId(this.parentProject.id).subscribe(result => {
            this.tasks = result.json() as Task[];
        }, error => console.error(error));
    }

    add() {
        this.userService.find(1).subscribe(result => {
            this.newTask.reporter = result;
            this.newTask.assignee = result;
        }, error => console.error(error));
        this.newTask.creationDate = new Date();
        this.newTask.parentProject = this.parentProject;
        
        this.subscribeToCreateResponse(
            this.taskService.create(this.newTask)
            );
    }

    private convert(project: Task): Task {
        const copy: Task = Object.assign({}, project);
        return copy;
    }

    public remove(project: Task) {
        this.taskService.delete(project.id).subscribe((res) => { });
        this.tasks.splice(this.tasks.indexOf(project), 1);
    }

    private subscribeToCreateResponse(result: Observable<Task>) {
        result.subscribe(
            (result: Task) => this.onCreateSuccess(result),
            (result: Response) => this.onCreateError()
        );
    }

    private onCreateSuccess(result: Task) {
        this.tasks.push(result);
        this.newTask = new Task();
    }

    private onCreateError() {
    }
}