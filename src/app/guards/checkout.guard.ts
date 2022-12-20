import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Router } from "@angular/router";
import { AuthenticationHelpers } from "../helpers/authentication.helpers";
 
@Injectable()
export class CheckoutGuard implements CanActivate {
 
    constructor(
        private authenticationHelper: AuthenticationHelpers,
        private router: Router
    ) {
 
    }
 
    canActivate() {
 
        if (this.authenticationHelper.get() != null && this.authenticationHelper.get() != undefined)
            return true;
 
        this.router.navigate(['/acessar-conta']);
        return false;
    }
}
