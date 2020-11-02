import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router, private auth: AngularFireAuth) {}

    registerUser(authData: AuthData) {
        this.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            console.log(result);
            this.authSuccessfully();
        })
        .catch(error => {
            console.log(error);
        });
    }

    login(authData: AuthData) {
        this.auth.signInWithEmailAndPassword(
            authData.email, 
            authData.password
        )
        .then(result => {
            this.authSuccessfully();
        })
        .catch(error => {
            console.log(error);
        }); 
    }

    logout() {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    isAuth() {
        return this.isAuthenticated;
    }

    private authSuccessfully() {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}