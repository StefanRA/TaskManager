import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Task } from './task.model';

@Injectable()
export class TaskService {
    private resourceUrl = 'api/tasks';
    private resUrl = 'api/tasks/byProject';

    constructor(private http: Http) { }

    create(task: Task): Observable<Response> {
        const copy = this.convert(task);
        return this.http.post(this.resourceUrl, copy);
    }

    getAll(): Observable<Response> {
        return this.http.get(this.resourceUrl);
    }

    getAllByProjectId(projectId: any): Observable<Response> {
        return this.http.get(`${this.resUrl}/${projectId}`);
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

    /**
     * Convert a returned JSON object to City.
     */
    private convertItemFromServer(json: any): Task {
        const entity: Task = Object.assign(new Task(), json);
        return entity;
    }

    /**
     * Convert a City to a JSON which can be sent to the server.
     */
    private convert(user: Task): Task {
        const copy: Task = Object.assign({}, user);
        return copy;
    }
}
