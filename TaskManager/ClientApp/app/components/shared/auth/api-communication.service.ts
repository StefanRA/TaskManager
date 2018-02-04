import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class ApiCommunicationService {
    createAuthorizationHeaders() : Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        if (authToken) {            
            headers.append('Authorization', `Bearer ${authToken}`);
        }
        return headers;
    }
}