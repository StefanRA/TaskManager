import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Project } from './project.model';
import { ProjectService } from './project.service';
import { AccountService } from '../../shared/user/account.service';
import { User } from '../user/user.model';

@Component({
    selector: 'project',
    templateUrl: './project.component.html'
})

export class ProjectComponent {
    public projects: Project[];
    public newProject: Project;

    constructor(
        private projectService: ProjectService,
        private accountService: AccountService
        )
    {
    }

    ngOnInit() {
        this.newProject = new Project();
        this.loadAll();
    }

    loadAll() {
        this.projectService.getAll().subscribe(result => {
            this.projects = result.json() as Project[];
        }, error => console.error(error));
    }

    add() {
        if (!this.newProject.name || this.newProject.name.length == 0) {
            return;
        }
        this.newProject.owner = new User();
        this.newProject.owner.userName = this.accountService.getUserName();
        
        this.subscribeToCreateResponse(
            this.projectService.create(this.newProject)
            );
    }

    private subscribeToCreateResponse(result: Observable<Project>) {
        result.subscribe(
            (result: Project) => this.onCreateSuccess(result),
            (result: Response) => this.onCreateError()
        );
    }

    private onCreateSuccess(result: Project) {
        this.projects.push(result);
        this.newProject = new Project();
    }

    private onCreateError() {
    }

    private convert(project: Project): Project {
        const copy: Project = Object.assign({}, project);
        return copy;
    }

    public remove(project: Project) {
        this.projectService.delete(project.id).subscribe((res) => { });
        this.projects.splice(this.projects.indexOf(project), 1);
    }
}