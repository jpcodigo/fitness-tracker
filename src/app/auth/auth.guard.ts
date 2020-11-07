import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import * as fromRoot from './auth.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private store: Store<fromRoot.State>,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromRoot.getIsAuth);
    }

    canLoad(route: Route) {
        return this.store.select(fromRoot.getIsAuth);
    }
}