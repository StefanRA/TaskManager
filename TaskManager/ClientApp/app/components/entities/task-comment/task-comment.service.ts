import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { TaskComment } from './task-comment.model';
import { ApiCommunicationService } from '../../shared/auth/api-communication.service';

@Injectable()
export class TaskCommentService {
    private resourceUrl: string;

    constructor(
        private http: Http,
        @Inject('SERVER_URL') baseUrl: string,
        private apiService: ApiCommunicationService
    ) {
        this.resourceUrl = baseUrl + 'api/taskComments'
    }

    create(taskComment: TaskComment): Observable<TaskComment> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.post(this.resourceUrl, taskComment, { headers }).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    getAll(): Observable<Response> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.get(this.resourceUrl, { headers });
    }

    getAllByTaskId(taskId: any): Observable<Response> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.get(`${this.resourceUrl}/byTask/${taskId}`, { headers });
    }

    find(id: number): Observable<Response> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.get(`${this.resourceUrl}/${id}`, { headers });
    }

    delete(id?: number): Observable<Response> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.delete(`${this.resourceUrl}/${id}`, { headers });
    }

    update(taskComment: TaskComment): Observable<TaskComment> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.put(`${this.resourceUrl}/${taskComment.id}`, taskComment, { headers }).map((res: Response) => {
            return res.json();
        });
    }
    
    private convertItemFromServer(json: any): TaskComment {
        const entity: TaskComment = Object.assign(new TaskComment(), json);
        return entity;
    }
}