import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../user/account.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private userService: AccountService)
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {

        const authorities = route.data['authorities'];
        return this.checkLogin(authorities, state.url);
    }

    checkLogin(authorities: string[], url: string): boolean
    {
        if (!this.userService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }

        if (!authorities || authorities.length === 0) {
            return true;
        }

        if (this.userService.hasAnyAuthority(authorities)) {
            return true;
        }

        this.router.navigate(['/access-denied']);
        return false;
    }
}
