import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="admin-users">
      <h1>Admin Kullanıcı Yönetimi</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  loading: boolean = true;
  searchTerm: string = '';
  filteredUsers: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Normalde bir servis üzerinden kullanıcılar çekilecek
    setTimeout(() => {
      this.users = [
        { id: 1, username: 'johndoe', email: 'john@example.com', role: 'USER', status: 'Aktif', registeredDate: '2023-05-15' },
        { id: 2, username: 'janesmith', email: 'jane@example.com', role: 'USER', status: 'Aktif', registeredDate: '2023-06-20' },
        { id: 3, username: 'admin', email: 'admin@example.com', role: 'ADMIN', status: 'Aktif', registeredDate: '2023-01-10' },
        { id: 4, username: 'seller1', email: 'seller@example.com', role: 'SELLER', status: 'Aktif', registeredDate: '2023-03-22' },
        { id: 5, username: 'blockeduser', email: 'blocked@example.com', role: 'USER', status: 'Engelli', registeredDate: '2023-04-05' }
      ];
      this.filteredUsers = [...this.users];
      this.loading = false;
    }, 800);
  }

  search(): void {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = [...this.users];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }

  toggleUserStatus(user: any): void {
    user.status = user.status === 'Aktif' ? 'Engelli' : 'Aktif';
    // Burada normalde API çağrısı yapılacak
  }

  deleteUser(id: number): void {
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      this.users = this.users.filter(user => user.id !== id);
      this.filteredUsers = this.filteredUsers.filter(user => user.id !== id);
      // Burada normalde API çağrısı yapılacak
    }
  }

  getBadgeClass(role: string): string {
    switch(role) {
      case 'ADMIN': return 'bg-danger';
      case 'SELLER': return 'bg-success';
      default: return 'bg-primary';
    }
  }

  getStatusClass(status: string): string {
    return status === 'Aktif' ? 'text-success' : 'text-danger';
  }
}
