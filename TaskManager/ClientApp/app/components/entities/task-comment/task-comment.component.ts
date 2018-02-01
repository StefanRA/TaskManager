import {Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';

import { TaskComment } from './task-comment.model';
import { TaskCommentService } from '../task-comment/task-comment.service';

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

    constructor(
        private commentService: TaskCommentService
        ) {
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
        this.commentService.getAll().subscribe(
            result => {
                this.comments = result.json() as TaskComment[];
            }, error => console.error(error));
    }

    saveComment() {
        this.newComment.creationDate = new Date();
        this.commentService.create(this.newComment).subscribe(
            result => this.comments.push(result)
        );
        this.newComment = new TaskComment();
        this.loadComments();
    }
    

    removeComment(taskComment: TaskComment) {
        this.commentService.delete(taskComment.id).subscribe((response) => {
            this.comments.splice(this.comments.indexOf(taskComment), 1);
        });
    }
}
