import { Component, OnInit } from '@angular/core';

import { UserProfile } from '../shared/models/user-profile.model';
import { DashboardService } from '../shared/services/dashboard.service';

@Component({
    selector: 'dashboard-home',
    templateUrl: './dashboard-home.component.html'
})
export class DashboardHomeComponent implements OnInit {
    userProfile: UserProfile;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
        this.dashboardService.getCurrentUserProfile()
            .subscribe((response) => {
                this.userProfile = response.json();
            });

    }
}