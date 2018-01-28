import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Project } from './project.model';

@Injectable()
export class ProjectService {
    private resourceUrl = 'api/projects';

    constructor(private http: Http) { }

    create(project: Project): Observable<Response> {
        const copy = this.convert(project);
        return this.http.post(this.resourceUrl, copy);
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

    /**
     * Convert a returned JSON object to City.
     */
    private convertItemFromServer(json: any): Project {
        const entity: Project = Object.assign(new Project(), json);
        return entity;
    }

    /**
     * Convert a City to a JSON which can be sent to the server.
     */
    private convert(user: Project): Project {
        const copy: Project = Object.assign({}, user);
        return copy;
    }
}
