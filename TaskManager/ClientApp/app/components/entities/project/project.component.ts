import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Project } from './project.model';
import { ProjectService } from './project.service';
import { UserService } from '../user/user.service';

@Component({
    selector: 'project',
    templateUrl: './project.component.html'
})

export class ProjectComponent {
    public projects: Project[];
    public newProject: Project;

    constructor(
        private projectService: ProjectService,
        private userService: UserService
        )
    {
        this.loadAll();
    }

    loadAll() {
        this.projectService.getAll().subscribe(result => {
            this.projects = result.json() as Project[];
        }, error => console.error(error));
    }

    add() {
        this.newProject = new Project();
        this.newProject.name = "DAW Project";
        this.newProject.description = "Proiectul de la DAW";
        this.userService.find(1).subscribe(result => {
            this.newProject.owner = result;
        }, error => console.error(error));

        const copy = this.convert(this.newProject);
        //this.http.post(this.resourceUrl, copy).subscribe(result => { this.newUser = result.json() },error=>console.error(error));
        this.projectService.create(this.newProject).subscribe(result => { this.newProject = result.json() }, error => console.error(error));
        this.projects.push(this.newProject);
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