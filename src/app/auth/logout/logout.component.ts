import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { NbAuthResult, NbAuthService, NbLogoutComponent, NbTokenService, NB_AUTH_OPTIONS } from '@nebular/auth';

@Component({
    selector: 'ngx-logout',
    template: '<div>Logging out, please wait...</div>',
})
export class LogoutComponent extends NbLogoutComponent {
    constructor(service: NbAuthService,
        @Inject(NB_AUTH_OPTIONS) options = {},
        router: Router,
        protected tokenService: NbTokenService) {
        super(service, options, router);
    }

    logout(strategy: string): void {
        this.router.navigateByUrl('/auth/login');
        this.tokenService.clear().subscribe(() => { });
        this.service.logout(strategy).subscribe((result: NbAuthResult) => {
            
        });
    }
}