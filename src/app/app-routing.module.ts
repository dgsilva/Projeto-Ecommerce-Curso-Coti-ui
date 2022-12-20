import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductsComponent } from './pages/products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CheckoutGuard } from './guards/checkout.guard';

const routes: Routes = [
  { path:'loja-de-produtos', component:ProductsComponent },
  {path:'acessar-conta', component:LoginComponent},
  {path:'cadastrar-conta', component:RegisterComponent},
  {path:'carrinho-de-compras', component:ShoppingCartComponent},
  {path:'finalizar-pedido',component:CheckoutComponent},
  { path: 'finalizar-pedido', component: CheckoutComponent, canActivate: [CheckoutGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


