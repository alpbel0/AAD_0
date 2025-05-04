import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CartStatusComponent } from '../cart-status/cart-status.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, CartStatusComponent, SearchComponent],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/products">KalorisizkodShop</a>

        <div class="search-container">
          <app-search></app-search>
        </div>

        <div class="d-flex align-items-center">
          <!-- Giriş yapılmadıysa giriş ve kayıt butonları -->
          <ng-container *ngIf="!(authService.isLoggedIn | async)">
            <a routerLink="/login" class="btn btn-primary me-2">Giriş Yap</a>
            <a routerLink="/register" class="btn btn-secondary me-2">Kayıt Ol</a>
          </ng-container>

          <!-- Giriş yapıldıysa profil düğmesi ve dropdown -->
          <div *ngIf="authService.isLoggedIn | async" class="dropdown">
            <button class="btn btn-outline-primary dropdown-toggle" type="button" id="profileDropdown"
                    data-bs-toggle="dropdown" aria-expanded="false">
              {{ authService.getUserName() }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li><a class="dropdown-item" routerLink="/profile">Profilim</a></li>
              <li><a class="dropdown-item" routerLink="/orders">Siparişlerim</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" (click)="logout()" style="cursor: pointer">Çıkış Yap</a></li>
            </ul>
          </div>

          <app-cart-status class="ms-3"></app-cart-status>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      padding: 0.5rem 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 1rem;
    }
    .search-container {
      flex: 1;
      max-width: 500px;
      margin: 0 1.5rem;
    }
    .navbar-brand {
      font-weight: bold;
    }
    .dropdown-menu {
      min-width: 10rem;
      padding: 0.5rem 0;
    }
    .dropdown-item {
      padding: 0.5rem 1rem;
    }
    .dropdown-item:hover {
      background-color: #f8f9fa;
    }
  `]
})
export class NavbarComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
