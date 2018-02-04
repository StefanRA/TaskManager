import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Project } from './project.model';

@Injectable()
export class ProjectService {
    private resourceUrl: string;

    constructor(private http: Http, @Inject('SERVER_URL') baseUrl: string) {
        this.resourceUrl = baseUrl + 'api/projects'
    }

    create(taskComment: Project): Observable<Project> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        const copy = this.convert(taskComment);
        return this.http.post(this.resourceUrl, copy, { headers }).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    getAll(): Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.get(this.resourceUrl, { headers });
    }

    find(id: number): Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.get(`${this.resourceUrl}/${id}`, { headers });
    }

    delete(id?: number): Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.delete(`${this.resourceUrl}/${id}`, { headers });
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