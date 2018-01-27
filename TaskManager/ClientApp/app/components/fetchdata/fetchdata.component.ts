import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public users: User[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/users').subscribe(result => {
            this.users = result.json() as User[];
        }, error => console.error(error));
    }
}

interface User {
    userId: number;
    displayName: string;
    firstName: string;
    lastName: string;
    email: string;
}