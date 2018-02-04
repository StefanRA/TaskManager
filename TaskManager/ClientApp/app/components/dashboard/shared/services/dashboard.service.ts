import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { UserProfile } from '../models/user-profile.model';
import { ApiCommunicationService } from '../../../shared/auth/api-communication.service';

@Injectable()
export class DashboardService {
    private resourceUrl: string;

    constructor(
        private http: Http,
        @Inject('SERVER_URL') baseUrl: string,
        private apiService: ApiCommunicationService
    ) {
        this.resourceUrl = baseUrl + 'api/dashboard'
    }

    getCurrentUserProfile(): Observable<Response> {
        let headers = this.apiService.createAuthorizationHeaders();
        return this.http.get(this.resourceUrl, { headers });
    }
}