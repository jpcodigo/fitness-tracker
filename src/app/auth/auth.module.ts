import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';


@NgModule({
    declarations: [SignupComponent,
        LoginComponent],
    imports: [
        ReactiveFormsModule,
        AngularFireAuthModule,
        SharedModule
    ],
    exports: []
})
export class AuthModule {}