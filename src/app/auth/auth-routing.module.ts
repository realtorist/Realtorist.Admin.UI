import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent, NbLogoutComponent } from '@nebular/auth';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
    {
        path: '',
        component: NbAuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'logout',
                component: LogoutComponent,
            },
            {
                path: 'request-password',
                component: RequestPasswordComponent,
            },
            {
                path: 'reset-password',
                component: ResetPasswordComponent,
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {
}