import {Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';

import { TaskComment } from './task-comment.model';
import { TaskCommentService } from '../task-comment/task-comment.service';
import { AccountService } from '../../shared/user/account.service';
import { User } from '../user/user.model';
import { Task } from '../task/task.model';

@Component({
    selector: 'task-comment',
    templateUrl: './task-comment.component.html',
    styleUrls: [
        'task-comment.component.css'
    ]
})

export class TaskCommentComponent implements OnInit, OnChanges, OnDestroy {
    newComment: TaskComment;
    @Input('parentTask') parentTask: Task;
    comments: TaskComment[];
    isSaving: boolean;

    constructor(
        private commentService: TaskCommentService,
        private accountService: AccountService
        ) {
    }

    ngOnInit() {
        this.newComment = new TaskComment();
        this.loadComments();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.loadComments();
    }

    ngOnDestroy() {
        this.newComment.content = 'fuck';
    }

    loadComments() {
        this.commentService.getAllByTaskId(this.parentTask.id).subscribe(
            result => {
                this.comments = result.json() as TaskComment[];
            }, error => console.error(error));
    }

    saveComment() {
        if (!this.newComment.content || this.newComment.content.length == 0) {
            return;
        }
        this.newComment.creationDate = new Date();
        this.newComment.parentTask = this.parentTask;
        this.newComment.poster = new User();
        this.newComment.poster.userName = this.accountService.getUserName();
        this.subscribeToSaveResponse(
            this.commentService.create(this.newComment)
            );
    }

    private subscribeToSaveResponse(result: Observable<TaskComment>) {
        result.subscribe(
            (result: TaskComment) => this.onSaveSuccess(result),
            (result: Response) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: TaskComment) {
        this.comments.push(result);
        this.newComment = new TaskComment();
    }

    private onSaveError() {
        this.newComment.content = 'fail';
    }

    removeComment(taskComment: TaskComment) {
        this.commentService.delete(taskComment.id).subscribe((response) => {
            this.comments.splice(this.comments.indexOf(taskComment), 1);
        });
    }
}
