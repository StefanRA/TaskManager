import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { User } from './user.model';
import { ApiCommunicationService } from '../../shared/auth/api-communication.service';

@Injectable()
export class UserService {
    private resourceUrl: string;

    constructor(
        private http: Http,
        @Inject('SERVER_URL') baseUrl: string,
        private apiService: ApiCommunicationService
    ) {
        this.resourceUrl = baseUrl + 'api/users'
    }

    create(user: User): Observable<User> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.post(this.resourceUrl, user, { headers }).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    getAll(): Observable<Response> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.get(this.resourceUrl, { headers });
    }

    delete(id?: number): Observable<Response> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.delete(`${this.resourceUrl}/${id}`, { headers });
    }

    find(id: number): Observable<Response> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.get(`${this.resourceUrl}/${id}`, { headers });
    }
    
    private convertItemFromServer(json: any): User {
        const entity: User = Object.assign(new User(), json);
        return entity;
    }
}