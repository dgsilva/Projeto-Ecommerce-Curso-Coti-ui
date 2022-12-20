import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationHelpers } from 'src/app/helpers/authentication.helpers';
import { Authentication } from 'src/app/models/authentication.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 
  auth: Authentication | null = null;
 
  constructor(
    private authenticationHelper: AuthenticationHelpers,
    private router : Router

  ) { }
 
  ngOnInit(): void {
    this.auth = this.authenticationHelper.get();
  }

  logout(): void {
    if(window.confirm('Deseja realmente sair desta conta de cliente?')) {
      this.authenticationHelper.signOut();
      this.router.navigate(['/acessar-conta']);
    }
  }


}
