import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Project } from './project.model';
import { ApiCommunicationService } from '../../shared/auth/api-communication.service';

@Injectable()
export class ProjectService {
    private resourceUrl: string;

    constructor(
        private http: Http,
        @Inject('SERVER_URL') baseUrl: string,
        private apiService: ApiCommunicationService
    ) {
        this.resourceUrl = baseUrl + 'api/projects'
    }

    create(project: Project): Observable<Project> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.post(this.resourceUrl, project, { headers }).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    getAll(): Observable<Response> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.get(this.resourceUrl, { headers });
    }

    find(id: number): Observable<Response> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.get(`${this.resourceUrl}/${id}`, { headers });
    }

    delete(id?: number): Observable<Response> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.delete(`${this.resourceUrl}/${id}`, { headers });
    }
    
    private convertItemFromServer(json: any): Project {
        const entity: Project = Object.assign(new Project(), json);
        return entity;
    }
}