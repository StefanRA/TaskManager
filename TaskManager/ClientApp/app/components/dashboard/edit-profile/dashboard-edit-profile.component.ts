import { Component, OnInit } from '@angular/core';

import { UserProfile } from '../shared/models/user-profile.model';
import { DashboardService } from '../shared/services/dashboard.service';

@Component({
    selector: 'dashboard-edit-profile',
    templateUrl: './dashboard-edit-profile.component.html'
})
export class DashboardEditProfileComponent implements OnInit {
    userProfile: UserProfile;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
        this.dashboardService.getCurrentUserProfile()
            .subscribe((response) => {
                this.userProfile = response.json();
            });
    }

    editProfile() {
        this.dashboardService.updateUserProfile(this.userProfile).subscribe();
    }
}