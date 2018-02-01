import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { User } from './user.model';

@Injectable()
export class UserService {
    private resourceUrl: string;

    constructor(private http: Http, @Inject('SERVER_URL') baseUrl: string) {
        this.resourceUrl = baseUrl + 'api/users'
    }

    create(user: User): Observable<Response> {
        const copy = this.convert(user);
        return this.http.post(this.resourceUrl, copy);
    }

    getAll(): Observable<Response> {
        return this.http.get(this.resourceUrl);
    }

    delete(id?: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    find(id: number): Observable<Response> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }
    
    private convertItemFromServer(json: any): User {
        const entity: User = Object.assign(new User(), json);
        return entity;
    }
    
    private convert(user: User): User {
        const copy: User = Object.assign({}, user);
        return copy;
    }
}