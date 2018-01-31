import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { TaskCommentComponent } from '../../task-comment/task-comment.component';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: [
        './task-detail.component.css'
    ]
})
export class TaskDetailComponent implements OnInit, OnDestroy {
    task: Task;
    private subscription: Subscription;

    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute
    )
    {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
    }

    load(id: number) {
        this.taskService.find(id).subscribe((taskRes) => {
            this.task = taskRes.json();
        });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
