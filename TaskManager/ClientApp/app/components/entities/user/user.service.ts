import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { User } from './user.model';

@Injectable()
export class UserService {
    private resourceUrl = 'api/users';

    constructor(private http: Http) { }

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

    /**
     * Convert a returned JSON object to City.
     */
    private convertItemFromServer(json: any): User {
        const entity: User = Object.assign(new User(), json);
        return entity;
    }

    /**
     * Convert a City to a JSON which can be sent to the server.
     */
    private convert(user: User): User {
        const copy: User = Object.assign({}, user);
        return copy;
    }
}
