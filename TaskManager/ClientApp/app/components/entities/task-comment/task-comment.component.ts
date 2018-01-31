import {Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';

import { TaskComment } from './task-comment.model';

@Component({
    selector: 'task-comment',
    templateUrl: './task-comment.component.html',
    styleUrls: [
        'task-comment.component.css'
    ]
})

export class TaskCommentComponent implements OnInit, OnChanges, OnDestroy {
    newComment: TaskComment;
    @Input('comments') comments: TaskComment[];
    isSaving: boolean;

    constructor() {
    }

    ngOnInit() {
        this.newComment = new TaskComment();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.loadComments();
    }

    ngOnDestroy() {
    }

    loadComments() {
    }

    saveComment() {
    }
    

    removeComment(comment: Comment) {
    }
}
