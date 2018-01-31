import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Project } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
    selector: 'project-detail',
    templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
    project: Project;
    private subscription: Subscription;

    constructor(
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private router: Router
    )
    {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
    }

    load(id: number) {
        this.projectService.find(id).subscribe((projectRes) => {
            this.project = projectRes.json();
        });
    }

    previousState() {
        this.router.navigateByUrl('/project');
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
