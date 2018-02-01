import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Task } from './task.model';

@Injectable()
export class TaskService {
    private resourceUrl: string;

    constructor(private http: Http, @Inject('SERVER_URL') baseUrl: string) {
        this.resourceUrl = baseUrl + 'api/tasks'
    }

    create(taskComment: Task): Observable<Task> {
        const copy = this.convert(taskComment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    getAll(): Observable<Response> {
        return this.http.get(this.resourceUrl);
    }

    getAllByProjectId(projectId: any): Observable<Response> {
        return this.http.get(`${this.resourceUrl}/byProject/${projectId}`);
    }

    find(id: number): Observable<Response> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    delete(id?: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    update(task: Task): Observable<Task> {
        return this.http.put(`${this.resourceUrl}/${task.id}`, task).map((res: Response) => {
            return res.json();
        });
    }
    
    private convertItemFromServer(json: any): Task {
        const entity: Task = Object.assign(new Task(), json);
        return entity;
    }
    
    private convert(user: Task): Task {
        const copy: Task = Object.assign({}, user);
        return copy;
    }
}