import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Project } from './project.model';

@Injectable()
export class ProjectService {
    private resourceUrl: string;

    constructor(private http: Http, @Inject('SERVER_URL') baseUrl: string) {
        this.resourceUrl = baseUrl + 'api/projects'
    }

    create(taskComment: Project): Observable<Project> {
        const copy = this.convert(taskComment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    getAll(): Observable<Response> {
        return this.http.get(this.resourceUrl);
    }

    find(id: number): Observable<Response> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    delete(id?: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }
    
    private convertItemFromServer(json: any): Project {
        const entity: Project = Object.assign(new Project(), json);
        return entity;
    }
    
    private convert(user: Project): Project {
        const copy: Project = Object.assign({}, user);
        return copy;
    }
}