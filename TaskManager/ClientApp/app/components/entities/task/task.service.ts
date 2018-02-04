import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Task } from './task.model';
import { ApiCommunicationService } from '../../shared/auth/api-communication.service';

@Injectable()
export class TaskService {
    private resourceUrl: string;

    constructor(
        private http: Http,
        @Inject('SERVER_URL') baseUrl: string,
        private apiService: ApiCommunicationService
    ) {
        this.resourceUrl = baseUrl + 'api/tasks'
    }

    create(task: Task): Observable<Task> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.post(this.resourceUrl, task, { headers }).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    getAll(): Observable<Response> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.get(this.resourceUrl, { headers });
    }

    getAllByProjectId(projectId: any): Observable<Response> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.get(`${this.resourceUrl}/byProject/${projectId}`, { headers });
    }

    find(id: number): Observable<Response> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.get(`${this.resourceUrl}/${id}`, { headers });
    }

    delete(id?: number): Observable<Response> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.delete(`${this.resourceUrl}/${id}`, { headers });
    }

    update(task: Task): Observable<Task> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.put(`${this.resourceUrl}/${task.id}`, task, { headers }).map((res: Response) => {
            return res.json();
        });
    }
    
    private convertItemFromServer(json: any): Task {
        const entity: Task = Object.assign(new Task(), json);
        return entity;
    }
}