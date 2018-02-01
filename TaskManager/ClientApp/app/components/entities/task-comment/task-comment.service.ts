import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { TaskComment } from './task-comment.model';

@Injectable()
export class TaskCommentService {
    private resourceUrl = 'api/taskComments';

    constructor(private http: Http) { }

    create(taskComment: TaskComment): Observable<TaskComment> {
        const copy = this.convert(taskComment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    getAll(): Observable<Response> {
        return this.http.get(this.resourceUrl);
    }

    getAllByProjectId(taskId: any): Observable<Response> {
        return this.http.get(`${this.resourceUrl}/${taskId}`);
    }

    find(id: number): Observable<Response> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    delete(id?: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    update(taskComment: TaskComment): Observable<TaskComment> {
        return this.http.put(`${this.resourceUrl}/${taskComment.id}`, taskComment).map((res: Response) => {
            return res.json();
        });
    }

    /**
     * Convert a returned JSON object to City.
     */
    private convertItemFromServer(json: any): TaskComment {
        const entity: TaskComment = Object.assign(new TaskComment(), json);
        return entity;
    }

    /**
     * Convert a City to a JSON which can be sent to the server.
     */
    private convert(user: TaskComment): TaskComment {
        const copy: TaskComment = Object.assign({}, user);
        return copy;
    }
}
