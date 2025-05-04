import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductCategoryMenuComponent } from "./components/product-category-menu/product-category-menu.component";
import { SearchComponent } from "./components/search/search.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from "./components/cart-status/cart-status.component";
import { KalorisizKodFormService } from './services/kalorisiz-kod-form.service';
import { CheckoutService } from './services/checkout.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductListComponent,
    HttpClientModule,
    RouterModule,
    ProductCategoryMenuComponent,
    SearchComponent,
    NgbModule,
    CartStatusComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent
  ],
  template: `
    <div class="page-wrapper">
      <app-navbar> </app-navbar>
      <div class="content-wrapper">
        <aside class="menu-sidebar d-none d-lg-block">
          <app-product-category-menu></app-product-category-menu>
        </aside>
        <div class="main-content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css'],
  providers: [ProductService, KalorisizKodFormService, CheckoutService]
})
export class AppComponent {
  title = 'kalorisizkod-ui';
}
